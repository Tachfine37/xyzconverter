import { useState } from 'react'
import { FileText, Copy, RotateCcw, Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { FAQSection } from "@/components/seo/FAQSection"
import { extractTextFromPdf } from '@/utils/pdf-processing'
import { PDF_TO_TEXT_FAQ } from '@/utils/structured-data'
import { toast } from 'sonner'
import { analytics } from '@/lib/analytics'
import { usePageSEO } from '@/utils/seo'

export function PdfToText() {
    usePageSEO()
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [extractedText, setExtractedText] = useState<string>('')

    const handleFilesDropped = async (files: File[]) => {
        if (files.length === 0) return
        const selectedFile = files[0]
        setFile(selectedFile)

        processFile(selectedFile)
    }

    const processFile = async (inputFile: File) => {
        setIsProcessing(true)
        try {
            analytics.track('pdf_to_text_started', { fileSize: inputFile.size })

            const text = await extractTextFromPdf(inputFile)
            setExtractedText(text)

            analytics.track('pdf_to_text_completed', {
                charCount: text.length
            })

            toast.success('Text Extracted Successfully')
        } catch (error) {
            console.error('Extraction failed:', error)
            toast.error('Extraction Failed', {
                description: 'Could not extract text from this PDF. It might be a scanned image.'
            })
            analytics.track('pdf_to_text_failed', { error: (error as Error).message })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(extractedText)
        toast.success('copied to clipboard')
    }

    const handleDownload = () => {
        const blob = new Blob([extractedText], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${file?.name.replace('.pdf', '') || 'extracted'}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const reset = () => {
        setFile(null)
        setExtractedText('')
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">PDF to Text Converter - Extract Text Online</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Extract text from your PDF documents instantly. Secure client-side processing means your files never leave your browser. Perfect for converting PDF to editable text.
                </p>
            </div>

            {!extractedText ? (
                <div className="space-y-6">
                    <SmartDropzone
                        onFilesDropped={handleFilesDropped}
                        isConverting={isProcessing}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        label="Upload PDF to Extract Text"
                        formats={['PDF']}
                    />
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <Card className="flex flex-col h-[500px]">
                        <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{file?.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handleCopy}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy
                                </Button>
                                <Button size="sm" onClick={handleDownload}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download .txt
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-auto bg-muted/10 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                            {extractedText}
                        </div>
                    </Card>

                    <div className="flex justify-center">
                        <Button variant="outline" size="lg" onClick={reset} className="gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Convert Another
                        </Button>
                    </div>
                </div>
            )}

            <div className="py-12 border-t">
                <FAQSection faqs={PDF_TO_TEXT_FAQ} />
            </div>
        </div>
    )
}
