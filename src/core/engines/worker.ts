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
    const { file, toFormat, quality = 0.8 } = request
    let sourceBlob: Blob = file

    // Report starting
    self.postMessage({
        type: 'STATUS',
        payload: { id: request.id, status: 'processing', progress: 10 }
    } satisfies WorkerResponse)

    // Step 1: Handle HEIC decoding if needed
    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        try {
            // Load script from public folder, bypassing bundler
            // Use variable to prevent Rollup from trying to bundle it
            const scriptPath = '/scripts/heic2any.js'
            await import(/* @vite-ignore */ scriptPath)

            // heic2any attaches to global scope in some builds, or we might get it from import
            const globalHeic2Any = (self as any).heic2any
            if (!globalHeic2Any) throw new Error('heic2any not loaded')

            const result = await globalHeic2Any({
                blob: file,
                toType: 'image/jpeg',
                quality: quality
            })
            sourceBlob = Array.isArray(result) ? result[0] : result
        } catch (err) {
            console.error('HEIC conversion failed', err)
            throw new Error('HEIC conversion failed: ' + (err as Error).message)
        }
    }

    self.postMessage({
        type: 'STATUS',
        payload: { id: request.id, status: 'processing', progress: 30 }
    } satisfies WorkerResponse)

    // Step 2: Handle PDF Conversion
    if (toFormat === 'pdf') {
        try {
            // Load jsPDF from public folder
            const scriptPath = '/scripts/jspdf.js'
            await import(/* @vite-ignore */ scriptPath)

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

    // Step 3: Handle Image Conversion (WebP, JPG, PNG)
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
