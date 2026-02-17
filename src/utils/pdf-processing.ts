import { PDFDocument } from 'pdf-lib'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'

// Set worker source for pdfjs-dist
// We use the CDN for the worker to avoid complex build configuration
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs`

/**
 * Rotate all pages in a PDF by 90 degrees clockwise
 */
export async function rotatePdf(file: File, rotation: 90 | 180 | 270): Promise<Blob> {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()

    pages.forEach(page => {
        const currentRotation = page.getRotation().angle
        page.setRotation(degrees((currentRotation + rotation) % 360))
    })

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
}

// Helper for degrees
function degrees(angle: number) {
    return { angle, type: 'degrees' } as any
}

/**
 * Convert multiple images to a single PDF
 */
export async function imagesToPdf(files: File[]): Promise<Blob> {
    const pdfDoc = await PDFDocument.create()

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        let image

        if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
            image = await pdfDoc.embedJpg(arrayBuffer)
        } else if (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')) {
            image = await pdfDoc.embedPng(arrayBuffer)
        } else {
            console.warn(`Unsupported image type: ${file.type}`)
            continue
        }

        const page = pdfDoc.addPage([image.width, image.height])
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
        })
    }

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
}

/**
 * Extract text from a PDF
 */
export async function extractTextFromPdf(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const loadingTask = getDocument(new Uint8Array(arrayBuffer))
    const pdf = await loadingTask.promise

    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item: any) => item.str).join(' ')
        fullText += `--- Page ${i} ---\n${pageText}\n\n`
    }

    return fullText
}

/**
 * "Compress" a PDF by saving it with stream compression
 * Note: Browser-side compression is limited. pdf-lib compresses streams by default.
 * We can attempt to reduce quality if we re-encoded images, but for now we'll just save it which often cleans up the structure.
 */
/**
 * Compress a PDF using different strategies
 * Light: Object streams only (lossless structure)
 * Medium: Rasterize pages at 150 DPI (0.7 quality)
 * Strong: Rasterize pages at 72 DPI (0.5 quality)
 */
export async function compressPdf(
    file: File,
    level: 'light' | 'medium' | 'strong' = 'medium',
    onProgress?: (progress: number) => void
): Promise<Blob> {
    const arrayBuffer = await file.arrayBuffer()

    // Light compression: Just structure optimization
    if (level === 'light') {
        if (onProgress) onProgress(50)
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true })
        if (onProgress) onProgress(100)
        return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
    }

    // Medium/Strong: Rasterize pages
    // This effectively "scans" the PDF to images and rebuilds it.
    // Quality trade-off is significant but guarantees size reduction for complex PDFs.

    // Config
    const scale = level === 'medium' ? 1.5 : 1.0 // 1.5 ~ 108 DPI (standard screen), 1.0 ~ 72 DPI
    const quality = level === 'medium' ? 0.7 : 0.5

    const loadingTask = getDocument(new Uint8Array(arrayBuffer))
    const pdf = await loadingTask.promise
    const newPdfDoc = await PDFDocument.create()

    const totalPages = pdf.numPages

    for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale })

        // Create canvas
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        if (!context) throw new Error('Could not create canvas context')

        // Render page
        await page.render({ canvasContext: context, viewport } as any).promise

        // Convert to JPG
        const imgDataUrl = canvas.toDataURL('image/jpeg', quality)
        const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer())

        // Embed in new PDF
        const embeddedImage = await newPdfDoc.embedJpg(imgBytes)
        const newPage = newPdfDoc.addPage([viewport.width, viewport.height])
        newPage.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
        })

        if (onProgress) onProgress(Math.round((i / totalPages) * 100))
    }

    const pdfBytes = await newPdfDoc.save({ useObjectStreams: true })
    return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
}
