import { useState } from 'react'
import { FileText, Download, RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { FAQSection } from "@/components/seo/FAQSection"
import { compressPdf } from '@/utils/pdf-processing'
import { COMPRESS_PDF_FAQ } from '@/utils/structured-data'
import { toast } from 'sonner'
import { analytics } from '@/lib/analytics'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { usePageSEO } from '@/utils/seo'

export function CompressPdf() {
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [resultUrl, setResultUrl] = useState<string | null>(null)
    const [originalSize, setOriginalSize] = useState<number>(0)
    const [compressedSize, setCompressedSize] = useState<number>(0)
    const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'strong'>('medium')
    const [progress, setProgress] = useState(0)

    const handleFilesDropped = async (files: File[]) => {
        if (files.length === 0) return
        const selectedFile = files[0]
        setFile(selectedFile)
        setOriginalSize(selectedFile.size)

        setOriginalSize(selectedFile.size)
        // reset progress
        setProgress(0)
    }

    const startCompression = () => {
        if (!file) return
        processFile(file)
    }

    const processFile = async (inputFile: File) => {
        setIsProcessing(true)
        try {

            analytics.track('compress_pdf_started', { fileSize: inputFile.size, level: compressionLevel })

            const compressedBlob = await compressPdf(inputFile, compressionLevel, (p) => setProgress(p))
            if (!compressedBlob) throw new Error("Compression returned empty result")

            const url = URL.createObjectURL(compressedBlob)

            setResultUrl(url)
            setCompressedSize(compressedBlob.size)

            analytics.track('compress_pdf_completed', {
                originalSize: inputFile.size,
                compressedSize: compressedBlob.size
            })

            toast.success('PDF Compressed Successfully')
        } catch (error) {
            console.error('Compression failed:', error)
            toast.error('Compression Failed', {
                description: error instanceof Error ? error.message : 'We could not compress this specific PDF.'
            })
            analytics.track('compress_pdf_failed', { error: (error as Error).message })
        } finally {
            setIsProcessing(false)
        }
    }

    const reset = () => {
        if (resultUrl) URL.revokeObjectURL(resultUrl)
        setFile(null)
        setResultUrl(null)
        setOriginalSize(0)
        setCompressedSize(0)
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const savings = originalSize > 0
        ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
        : 0

    usePageSEO()

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">Compress PDF Online - Reduce File Size</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Reduce PDF file size securely without losing quality. 100% client-side processing means your documents never leave your device.
                </p>
            </div>

            {!resultUrl ? (
                <div className="space-y-6">
                    <SmartDropzone
                        onFilesDropped={handleFilesDropped}
                        isConverting={isProcessing}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        label="Upload PDF to Compress"
                        formats={['PDF']}
                    />

                    {file && !isProcessing && (
                        <Card className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatSize(originalSize)}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <Label>Compression Level</Label>
                                <RadioGroup
                                    value={compressionLevel}
                                    onValueChange={(v: string) => setCompressionLevel(v as 'light' | 'medium' | 'strong')}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    <div>
                                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                        <Label
                                            htmlFor="light"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <span className="font-semibold">Light</span>
                                            <span className="text-xs text-muted-foreground text-center mt-1">Best Quality<br />Meta Cleaning</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                                        <Label
                                            htmlFor="medium"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <span className="font-semibold">Medium</span>
                                            <span className="text-xs text-muted-foreground text-center mt-1">Balanced<br />Standard Compression</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="strong" id="strong" className="peer sr-only" />
                                        <Label
                                            htmlFor="strong"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <span className="font-semibold">Strong</span>
                                            <span className="text-xs text-muted-foreground text-center mt-1">Max Reduction<br />Low Res Images</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button onClick={startCompression} size="lg" className="w-full">
                                Compress PDF
                            </Button>
                        </Card>
                    )}

                    {isProcessing && (
                        <Card className="p-8 text-center space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Compressing PDF...</h3>
                                <p className="text-sm text-muted-foreground">This happens locally in your browser</p>
                            </div>
                            <Progress value={progress} className="w-full" />
                            <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
                        </Card>
                    )}
                </div>
            ) : (
                <Card className="p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Compression Complete!</h2>
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <span className="text-muted-foreground Line-through">{formatSize(originalSize)}</span>
                            <span className="font-bold text-green-600">➜ {formatSize(compressedSize)}</span>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">-{savings}%</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href={resultUrl} download={`compressed-${file?.name || 'document.pdf'}`} className="w-full sm:w-auto">
                            <Button size="lg" className="w-full gap-2">
                                <Download className="w-4 h-4" />
                                Download Compressed PDF
                            </Button>
                        </a>
                        <Button variant="outline" size="lg" onClick={reset} className="w-full sm:w-auto gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Compress Another
                        </Button>
                    </div>
                </Card>
            )}

            <div className="grid md:grid-cols-3 gap-8 py-8">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Smart Compression</h3>
                    <p className="text-muted-foreground">
                        Automatically optimizes your PDF to preserve quality while minimizing file size.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">100% Private</h3>
                    <p className="text-muted-foreground">
                        Compression happens locally in your browser. Your files never leave your device.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">No Limits</h3>
                    <p className="text-muted-foreground">
                        Compress as many files as you need without any daily limits or hidden fees.
                    </p>
                </div>
            </div>

            <div className="py-12 border-t">
                <FAQSection faqs={COMPRESS_PDF_FAQ} />
            </div>
        </div>
    )
}
