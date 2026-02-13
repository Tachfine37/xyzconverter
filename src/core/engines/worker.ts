/// <reference lib="webworker" />
import type { WorkerMessage, WorkerResponse, ConversionRequest, ConversionResponse } from '../types'

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const { type } = e.data

    if (type === 'PING') {
        self.postMessage({ type: 'PONG' } satisfies WorkerResponse)
        return
    }

    if (type === 'CONVERT') {
        const request = e.data.payload
        try {
            const result = await processConversion(request)
            self.postMessage({
                type: 'STATUS',
                payload: result
            } satisfies WorkerResponse)
        } catch (error) {
            self.postMessage({
                type: 'STATUS',
                payload: {
                    id: request.id,
                    status: 'error',
                    progress: 0,
                    error: (error as Error).message
                }
            } satisfies WorkerResponse)
        }
    }
}

async function processConversion(request: ConversionRequest): Promise<ConversionResponse> {
    const { file, toFormat, quality = 0.8, scale = 1 } = request

    // Report starting
    self.postMessage({
        type: 'STATUS',
        payload: { id: request.id, status: 'processing', progress: 10 }
    } satisfies WorkerResponse)

    let sourceBlob: Blob = file
    const fileName = (file as File).name?.toLowerCase() || ''
    const fileType = (file as File).type || ''

    // Handle SVG files - need special processing
    const isSvg = fileType === 'image/svg+xml' || fileName.endsWith('.svg')
    if (isSvg) {
        try {
            // Read SVG content as text
            const svgText = await sourceBlob.text()

            // Parse SVG to get dimensions
            const parser = new DOMParser()
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
            const svgElement = svgDoc.documentElement

            // Get intrinsic dimensions from SVG
            let width = 300 // default
            let height = 150 // default

            const viewBox = svgElement.getAttribute('viewBox')
            if (viewBox) {
                const parts = viewBox.split(/\s+|,/)
                if (parts.length >= 4) {
                    width = parseFloat(parts[2]) || width
                    height = parseFloat(parts[3]) || height
                }
            }

            const svgWidth = svgElement.getAttribute('width')
            const svgHeight = svgElement.getAttribute('height')
            if (svgWidth && !svgWidth.includes('%')) {
                width = parseFloat(svgWidth) || width
            }
            if (svgHeight && !svgHeight.includes('%')) {
                height = parseFloat(svgHeight) || height
            }

            // Apply scale factor
            const scaledWidth = Math.round(width * scale)
            const scaledHeight = Math.round(height * scale)

            // Create a blob URL and render via fetch + createImageBitmap
            // We need to encode SVG properly for rendering
            const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
            const bitmap = await createImageBitmap(svgBlob)

            const canvas = new OffscreenCanvas(scaledWidth, scaledHeight)
            const ctx = canvas.getContext('2d')
            if (!ctx) throw new Error('Could not get OffscreenCanvas context')

            // Draw scaled bitmap
            ctx.drawImage(bitmap, 0, 0, scaledWidth, scaledHeight)

            self.postMessage({
                type: 'STATUS',
                payload: { id: request.id, status: 'processing', progress: 70 }
            } satisfies WorkerResponse)

            let mimeType = 'image/png'
            if (toFormat === 'jpg') mimeType = 'image/jpeg'
            if (toFormat === 'webp') mimeType = 'image/webp'

            const resultBlob = await canvas.convertToBlob({
                type: mimeType,
                quality: toFormat === 'png' ? undefined : quality
            })

            return {
                id: request.id,
                status: 'completed',
                progress: 100,
                result: resultBlob
            }
        } catch (err) {
            console.error('SVG conversion failed', err)
            throw new Error('SVG conversion failed: ' + (err as Error).message)
        }
    }

    // Note: JFIF files are treated as JPEG - the same format internally
    // No special handling needed, they will be processed by the standard image conversion path

    self.postMessage({
        type: 'STATUS',
        payload: { id: request.id, status: 'processing', progress: 30 }
    } satisfies WorkerResponse)

    // Handle PDF Conversion
    if (toFormat === 'pdf') {
        try {
            // Load jsPDF from public folder (module workers can't use importScripts)
            if (!(self as any).jspdf && !(self as any).jsPDF) {
                const resp = await fetch('/scripts/jspdf.js')
                const code = await resp.text()
                eval(code)
            }

            // jsPDF UMD attaches to self.jspdf or self.jsPDF
            const jsPDFClass = (self as any).jspdf?.jsPDF || (self as any).jsPDF
            if (!jsPDFClass) throw new Error('jsPDF not loaded')

            const pdf = new jsPDFClass()

            // Use createImageBitmap which is available in Workers
            const bitmap = await createImageBitmap(sourceBlob)
            const width = bitmap.width
            const height = bitmap.height

            // Fit image to A4 page size: 210 x 297 mm
            const pageWidth = 210
            const pageHeight = 297
            const ratio = width / height

            let w = pageWidth
            let h = w / ratio
            if (h > pageHeight) {
                h = pageHeight
                w = h * ratio
            }

            const canvas = new OffscreenCanvas(width, height)
            const ctx = canvas.getContext('2d')
            if (!ctx) throw new Error('Could not get OffscreenCanvas context')

            ctx.drawImage(bitmap, 0, 0)

            // Convert to JPEG blob first
            const jpegBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality })
            const buffer = await jpegBlob.arrayBuffer()
            const uint8Array = new Uint8Array(buffer)

            pdf.addImage(uint8Array, 'JPEG', 0, 0, w, h)
            const pdfBlob = pdf.output('blob')

            return {
                id: request.id,
                status: 'completed',
                progress: 100,
                result: pdfBlob
            }
        } catch (err) {
            console.error('PDF conversion failed', err)
            throw new Error('PDF conversion failed: ' + (err as Error).message)
        }
    }

    // Handle Image Conversion (WebP, JPG, PNG)
    try {
        const bitmap = await createImageBitmap(sourceBlob)
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Could not get OffscreenCanvas context')

        ctx.drawImage(bitmap, 0, 0)

        let mimeType = 'image/jpeg'
        if (toFormat === 'webp') mimeType = 'image/webp'
        if (toFormat === 'png') mimeType = 'image/png'

        const resultBlob = await canvas.convertToBlob({
            type: mimeType,
            quality: toFormat === 'png' ? undefined : quality
        })

        return {
            id: request.id,
            status: 'completed',
            progress: 100,
            result: resultBlob
        }
    } catch (err) {
        console.error('Image conversion failed', err)
        throw new Error('Image conversion failed: ' + (err as Error).message)
    }
}

