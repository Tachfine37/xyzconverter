import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { analytics } from '@/lib/analytics'

export function usePdfMerge() {
    const [isMerging, setIsMerging] = useState(false)
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null)

    const mergePdfs = useCallback(async (files: File[]) => {
        if (files.length < 2) {
            toast.error('Not enough files', {
                description: 'Please select at least 2 PDF files to merge.'
            })
            return
        }

        setIsMerging(true)
        const startTime = Date.now()

        try {
            analytics.track('merge_started', { fileCount: files.length })

            // Create a new PDFDocument
            const mergedPdf = await PDFDocument.create()

            for (const file of files) {
                // Read file as ArrayBuffer
                const fileBuffer = await file.arrayBuffer()

                // Load the source PDF
                const pdf = await PDFDocument.load(fileBuffer)

                // Copy all pages
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())

                // Add pages to the new document
                copiedPages.forEach((page) => mergedPdf.addPage(page))
            }

            // Save the merged PDF
            const pdfBytes = await mergedPdf.save()
            const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)

            setMergedPdfUrl(url)

            analytics.track('merge_completed', {
                duration: Date.now() - startTime,
                pageCount: mergedPdf.getPageCount(),
                fileCount: files.length
            })

            toast.success('Merge Successful', {
                description: `Combined ${files.length} PDFs into one document.`
            })

        } catch (error) {
            console.error('Merge failed:', error)
            analytics.track('merge_failed', { error: (error as Error).message })

            toast.error('Merge Failed', {
                description: 'Could not merge PDF files. Please ensure they are valid PDFs.'
            })
        } finally {
            setIsMerging(false)
        }
    }, [])

    const reset = useCallback(() => {
        if (mergedPdfUrl) {
            URL.revokeObjectURL(mergedPdfUrl)
        }
        setMergedPdfUrl(null)
        setIsMerging(false)
    }, [mergedPdfUrl])

    return {
        isMerging,
        mergedPdfUrl,
        mergePdfs,
        reset
    }
}
