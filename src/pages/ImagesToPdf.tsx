import { useState } from 'react'
import { FileText, Download, RotateCcw, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { FAQSection } from "@/components/seo/FAQSection"
import { imagesToPdf } from '@/utils/pdf-processing'
import { IMAGES_TO_PDF_FAQ } from '@/utils/structured-data'
import { toast } from 'sonner'
import { analytics } from '@/lib/analytics'
import { usePageSEO } from '@/utils/seo'

export function ImagesToPdf() {
    const [files, setFiles] = useState<File[]>([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [resultUrl, setResultUrl] = useState<string | null>(null)

    const handleFilesDropped = async (newFiles: File[]) => {
        setFiles(prev => [...prev, ...newFiles])
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleConvert = async () => {
        if (files.length === 0) return

        setIsProcessing(true)
        try {
            analytics.track('images_to_pdf_started', { fileCount: files.length })

            const pdfBlob = await imagesToPdf(files)
            const url = URL.createObjectURL(pdfBlob)

            setResultUrl(url)

            analytics.track('images_to_pdf_completed', { fileCount: files.length })
            toast.success('PDF Created Successfully')
        } catch (error) {
            console.error('Conversion failed:', error)
            toast.error('Conversion Failed', {
                description: 'We could not create the PDF.'
            })
            analytics.track('images_to_pdf_failed', { error: (error as Error).message })
        } finally {
            setIsProcessing(false)
        }
    }

    const reset = () => {
        if (resultUrl) URL.revokeObjectURL(resultUrl)
        setFiles([])
        setResultUrl(null)
    }

    usePageSEO()

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">Images to PDF Converter - Combine Photos to PDF</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Convert and combine your images into a single PDF document instantly. Supports JPG, PNG, and more. 100% free and secure client-side processing.
                </p>
            </div>

            {!resultUrl ? (
                <div className="space-y-6">
                    <SmartDropzone
                        onFilesDropped={handleFilesDropped}
                        isConverting={isProcessing}
                        accept={{
                            'image/jpeg': ['.jpg', '.jpeg'],
                            'image/png': ['.png']
                        }}
                        label="Upload Images (JPG, PNG)"
                        formats={['JPG', 'PNG']}
                    />

                    {files.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selected Images ({files.length})</h2>
                                <Button variant="ghost" size="sm" onClick={() => setFiles([])} disabled={isProcessing}>
                                    Clear All
                                </Button>
                            </div>

                            <div className="grid gap-2">
                                {files.map((file, idx) => (
                                    <Card key={`${file.name}-${idx}`} className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                                                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="text-sm font-medium truncate max-w-[200px] sm:max-w-md">
                                                {file.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {(file.size / 1024).toFixed(0)} KB
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => removeFile(idx)}
                                            disabled={isProcessing}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </Card>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className="w-full"
                                onClick={handleConvert}
                                disabled={files.length === 0 || isProcessing}
                            >
                                {isProcessing ? 'Creating PDF...' : 'Convert to PDF'}
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <Card className="p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">PDF Created!</h2>
                        <p className="text-muted-foreground">Your images have been combined into a PDF.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href={resultUrl} download="images-combined.pdf" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                        </a>
                        <Button variant="outline" size="lg" onClick={reset} className="w-full sm:w-auto gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Convert More
                        </Button>
                    </div>
                </Card>
            )}

            <div className="grid md:grid-cols-3 gap-8 py-8">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Multiple Formats</h3>
                    <p className="text-muted-foreground">
                        Support for JPG, JPEG, PNG, HEIC, and WebP. Combine different formats into one PDF.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">100% Secure</h3>
                    <p className="text-muted-foreground">
                        Files are processed locally in your browser. No uploads to servers ensures complete privacy.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">High Quality</h3>
                    <p className="text-muted-foreground">
                        Images are automatically optimized and scaled to fit A4 pages while maintaining visual quality.
                    </p>
                </div>
            </div>

            <div className="py-12 border-t">
                <FAQSection faqs={IMAGES_TO_PDF_FAQ} />
            </div>
        </div>
    )
}
