import { usePageSEO } from '@/utils/seo'
import { useState } from 'react'
import { FileText, Download, RotateCcw, RotateCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { FAQSection } from "@/components/seo/FAQSection"
import { rotatePdf } from '@/utils/pdf-processing'
import { ROTATE_PDF_FAQ } from '@/utils/structured-data'
import { toast } from 'sonner'
import { analytics } from '@/lib/analytics'

export function RotatePdf() {
    usePageSEO()
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [resultUrl, setResultUrl] = useState<string | null>(null)
    const [rotation, setRotation] = useState<90 | 180 | 270>(90)

    const handleFilesDropped = async (files: File[]) => {
        if (files.length === 0) return
        setFile(files[0])
    }

    const handleRotate = async () => {
        if (!file) return

        setIsProcessing(true)
        try {
            analytics.track('rotate_pdf_started', { fileSize: file.size, rotation })

            const rotatedBlob = await rotatePdf(file, rotation)
            const url = URL.createObjectURL(rotatedBlob)

            setResultUrl(url)

            analytics.track('rotate_pdf_completed', { rotation })
            toast.success('PDF Rotated Successfully')
        } catch (error) {
            console.error('Rotation failed:', error)
            toast.error('Rotation Failed', {
                description: 'We could not rotate this PDF.'
            })
            analytics.track('rotate_pdf_failed', { error: (error as Error).message })
        } finally {
            setIsProcessing(false)
        }
    }

    const reset = () => {
        if (resultUrl) URL.revokeObjectURL(resultUrl)
        setFile(null)
        setResultUrl(null)
        setRotation(90)
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">


            <div className="space-y-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">Rotate PDF Online</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Rotate PDF pages permanently directly in your browser. simple, fast, and secure.
                </p>
            </div>

            {!resultUrl ? (
                <div className="space-y-6">
                    {!file ? (
                        <SmartDropzone
                            onFilesDropped={handleFilesDropped}
                            isConverting={isProcessing}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            label="Upload PDF to Rotate"
                            formats={['PDF']}
                        />
                    ) : (
                        <Card className="p-8 text-center space-y-8 max-w-xl mx-auto">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-muted rounded-full">
                                    <FileText className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <h3 className="font-medium text-lg">{file.name}</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Button
                                    variant={rotation === 90 ? "default" : "outline"}
                                    onClick={() => setRotation(90)}
                                    className="flex flex-col h-auto py-4 gap-2"
                                >
                                    <RotateCw className="w-6 h-6" />
                                    <span>90° CW</span>
                                </Button>
                                <Button
                                    variant={rotation === 180 ? "default" : "outline"}
                                    onClick={() => setRotation(180)}
                                    className="flex flex-col h-auto py-4 gap-2"
                                >
                                    <RotateCw className="w-6 h-6 rotate-90" />
                                    <span>180°</span>
                                </Button>
                                <Button
                                    variant={rotation === 270 ? "default" : "outline"}
                                    onClick={() => setRotation(270)}
                                    className="flex flex-col h-auto py-4 gap-2"
                                >
                                    <RotateCw className="w-6 h-6 rotate-180" />
                                    <span>270° CW</span>
                                </Button>
                            </div>

                            <div className="flex gap-4 justify-center pt-4">
                                <Button variant="ghost" onClick={reset}>Cancel</Button>
                                <Button size="lg" onClick={handleRotate} disabled={isProcessing}>
                                    {isProcessing ? 'Rotating...' : 'Rotate PDF'}
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            ) : (
                <Card className="p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                        <RotateCw className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">PDF Rotated!</h2>
                        <p className="text-muted-foreground">Your document has been successfully rotated.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href={resultUrl} download={`rotated-${file?.name || 'document.pdf'}`} className="w-full sm:w-auto">
                            <Button size="lg" className="w-full gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                        </a>
                        <Button variant="outline" size="lg" onClick={reset} className="w-full sm:w-auto gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Rotate Another
                        </Button>
                    </div>
                </Card>
            )}

            <div className="py-12 border-t">
                <FAQSection faqs={ROTATE_PDF_FAQ} />
            </div>

            {/* SEO Content Section */}
            <div className="mt-8 border-t pt-12 space-y-12 max-w-4xl mx-auto">
                <section>
                    <h2 className="text-2xl font-semibold mb-6">How to Rotate a PDF Online</h2>
                    <ol className="space-y-4">
                        {[
                            { step: '1', title: 'Upload your PDF', desc: 'Drag and drop your PDF file into the upload box or click to browse your files.' },
                            { step: '2', title: 'Choose rotation angle', desc: 'Select your desired rotation: 90° clockwise, 180° (upside down), or 270° clockwise.' },
                            { step: '3', title: 'Click "Rotate PDF"', desc: 'Hit the rotate button and your PDF will be processed instantly in your browser.' },
                            { step: '4', title: 'Download your rotated PDF', desc: 'Once done, click download to save your properly oriented PDF document.' },
                        ].map(({ step, title, desc }) => (
                            <li key={step} className="flex gap-4 items-start">
                                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{step}</span>
                                <div>
                                    <h3 className="font-semibold mb-1">{title}</h3>
                                    <p className="text-muted-foreground">{desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6">Why Use Our Free PDF Rotator?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: '100% Free & No Registration', desc: 'Rotate as many PDFs as you need without creating an account or paying anything.' },
                            { title: 'Permanent Rotation', desc: 'Unlike some viewers, our tool permanently rotates the PDF pages so they open correctly every time.' },
                            { title: 'Complete Privacy', desc: 'Your PDF is processed locally in your browser — it never leaves your device or gets uploaded to any server.' },
                            { title: 'All Devices Supported', desc: 'Works on Windows, Mac, iOS, and Android. No software installation needed — just your browser.' },
                        ].map(({ title, desc }) => (
                            <div key={title} className="p-5 rounded-lg border bg-card">
                                <h3 className="font-semibold mb-2">{title}</h3>
                                <p className="text-muted-foreground text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
