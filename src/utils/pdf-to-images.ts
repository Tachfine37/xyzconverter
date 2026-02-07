import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

/**
 * Convert PDF file to array of image blobs
 * @param file PDF file
 * @param format Output format ('jpg' or 'png')
 * @param quality JPEG quality (0-1), ignored for PNG
 * @param scale Rendering scale (default 2.0 for high quality)
 * @returns Array of image blobs, one per page
 */
export async function convertPdfToImages(
    file: File,
    format: 'jpg' | 'png' = 'jpg',
    quality: number = 0.9,
    scale: number = 2.0
): Promise<Blob[]> {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const numPages = pdf.numPages
    const blobs: Blob[] = []

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const canvas = await renderPdfPageToCanvas(page, scale)
        const blob = await canvasToBlob(canvas, format, quality)
        blobs.push(blob)
    }

    return blobs
}

/**
 * Render a PDF page to canvas
 * @param page PDF page proxy
 * @param scale Rendering scale
 * @returns Canvas element with rendered page
 */
async function renderPdfPageToCanvas(
    page: pdfjsLib.PDFPageProxy,
    scale: number
): Promise<HTMLCanvasElement> {
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
        throw new Error('Could not get canvas 2D context')
    }

    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas
    } as any).promise

    return canvas
}

/**
 * Convert canvas to blob
 * @param canvas Canvas element
 * @param format Output format
 * @param quality JPEG quality
 * @returns Image blob
 */
function canvasToBlob(
    canvas: HTMLCanvasElement,
    format: 'jpg' | 'png',
    quality: number
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject(new Error('Failed to convert canvas to blob'))
                }
            },
            mimeType,
            quality
        )
    })
}
