import { PDFDocument } from 'pdf-lib'

export interface SplitOptions {
    range?: string // "1-5", "1,3,5", "1-"
    extractAll?: boolean
}

export async function splitPdf(file: File, options: SplitOptions): Promise<Blob[]> {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pageCount = pdfDoc.getPageCount()
    const resultBlobs: Blob[] = []

    if (options.extractAll) {
        // Extract every single page as a separate PDF
        for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create()
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [i])
            newPdf.addPage(copiedPage)
            const bytes = await newPdf.save()
            resultBlobs.push(new Blob([bytes as BlobPart], { type: 'application/pdf' }))
        }
    } else if (options.range) {
        // Extract specific range and merge into ONE single output PDF (usually user wants extracted subset)
        // OR return multiple blobs if they asked for page comma separation? 
        // Standard "Split" usually means "Extract Pages" -> One PDF with selected pages.
        // Or "Burst" -> Multiple PDFs.
        // Let's implement "Extract Selected Pages to New PDF" as default first.

        const pagesToKeep = parsePageRange(options.range, pageCount)
        const newPdf = await PDFDocument.create()
        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToKeep)
        copiedPages.forEach(page => newPdf.addPage(page))
        const bytes = await newPdf.save()
        resultBlobs.push(new Blob([bytes as BlobPart], { type: 'application/pdf' }))
    }

    return resultBlobs
}

function parsePageRange(range: string, totalPages: number): number[] {
    const pages = new Set<number>()
    const parts = range.split(',')

    parts.forEach(part => {
        const trimmed = part.trim()
        if (trimmed.includes('-')) {
            const [startStr, endStr] = trimmed.split('-')

            let start = parseInt(startStr)
            let end = endStr ? parseInt(endStr) : totalPages

            if (isNaN(start)) start = 1
            if (isNaN(end)) end = totalPages

            // Constrain
            start = Math.max(1, start)
            end = Math.min(totalPages, end)

            if (start <= end) {
                for (let i = start; i <= end; i++) {
                    pages.add(i - 1) // 0-index
                }
            }
        } else {
            const page = parseInt(trimmed)
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                pages.add(page - 1)
            }
        }
    })

    return Array.from(pages).sort((a, b) => a - b)
}

export async function getPdfPageCount(file: File): Promise<number> {
    try {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        // Note: Protected PDFs might fail load without password, ignoreEncryption helps reading metadata sometimes but not always content
        return pdfDoc.getPageCount()
    } catch (e) {
        console.error(e)
        return 0
    }
}
