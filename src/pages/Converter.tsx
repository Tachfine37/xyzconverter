import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { usePageSEO } from "@/utils/seo"
import { useConversion } from "@/hooks/use-conversion"
import { SmartDropzone } from "@/components/feature/smart-dropzone"
import { ConversionQueue } from "@/components/feature/conversion-queue"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { SEOContentBlock } from "@/components/seo/SEOContentBlock"
import { FAQSection } from "@/components/seo/FAQSection"
import { RelatedTools, RELATED_TOOLS_MAP } from "@/components/seo/RelatedTools"
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { HEIC_FAQ, WEBP_FAQ, PDF_FAQ, PDF_TO_IMAGE_FAQ, HEIC_TO_PDF_FAQ, PDF_TO_JPG_FAQ, PDF_TO_PNG_FAQ, HEIC_TO_JPG_FAQ, HEIC_TO_PNG_FAQ, PNG_TO_JPG_FAQ, PNG_TO_WEBP_FAQ, PNG_TO_PDF_FAQ, JPG_TO_PNG_FAQ, JPG_TO_WEBP_FAQ, JPG_TO_PDF_FAQ, WEBP_TO_JPG_FAQ, WEBP_TO_PNG_FAQ, SVG_TO_PNG_FAQ, SVG_TO_JPG_FAQ } from "@/utils/structured-data"
import { convertPdfToImages } from '@/utils/pdf-to-images'
import { createZipFromBlobs } from '@/utils/zip-utils'
import { Button } from '@/components/ui/button'
import { Download, RefreshCw } from 'lucide-react'

import type { ConversionFormat } from "@/core/types"

interface PdfConversionState {
    status: 'idle' | 'processing' | 'completed' | 'error'
    progress: number
    result?: Blob
    fileName?: string
    error?: string
}

export function Converter() {
    const { conversion } = useParams()
    const location = useLocation()
    // Check if we have incoming files from navigation state
    const hasIncomingFiles = !!(location.state as { uploadedFiles?: File[] } | null)?.uploadedFiles
    // If we have incoming files, start in initializing mode to hide dropzone
    const [isInitializing, setIsInitializing] = useState(hasIncomingFiles)
    const [pdfConversionState, setPdfConversionState] = useState<PdfConversionState>({
        status: 'idle',
        progress: 0
    })

    const { isReady, isConverting, convertFiles, queue, reset } = useConversion()

    // Initialize SEO
    usePageSEO()

    // Determine effective conversion string from param (legacy) or path (new)
    // For path /heic-to-jpg, conversion is undefined, so we use pathname without leading slash
    const effectiveConversion = conversion || location.pathname.substring(1)

    // Parse conversion type from route
    const [sourceFormat, targetFormat] = (effectiveConversion || '').split('-to-')
    const format: ConversionFormat = (targetFormat === 'pdf' ? 'pdf' : targetFormat === 'png' ? 'png' : targetFormat === 'webp' ? 'webp' : 'jpg') as ConversionFormat

    const isPdfToImage = sourceFormat === 'pdf' && (targetFormat === 'jpg' || targetFormat === 'png')

    const handleFileSelect = async (files: File[]) => {
        // Check if this is a PDF to image conversion
        if (isPdfToImage) {
            const file = files[0] // Handle one file at a time for PDF conversions
            if (!file) return

            setPdfConversionState({ status: 'processing', progress: 0.1 })

            try {
                const imageFormat = targetFormat as 'jpg' | 'png'
                const blobs = await convertPdfToImages(file, imageFormat, 0.9)

                setPdfConversionState(prev => ({ ...prev, progress: 0.8 }))

                let resultBlob: Blob
                let fileName: string

                if (blobs.length === 1) {
                    resultBlob = blobs[0]
                    fileName = file.name.replace('.pdf', `.${imageFormat}`)
                } else {
                    resultBlob = await createZipFromBlobs(blobs, imageFormat)
                    fileName = file.name.replace('.pdf', `.zip`)
                }

                setPdfConversionState({
                    status: 'completed',
                    progress: 1,
                    result: resultBlob,
                    fileName
                })
            } catch (err) {
                setPdfConversionState({
                    status: 'error',
                    progress: 0,
                    error: (err as Error).message
                })
            }
        } else {
            // Regular image conversion
            convertFiles(files, format)
        }
    }

    // Handle files passed from Hero/Navigation state
    useEffect(() => {
        const state = location.state as { uploadedFiles?: File[] } | null
        if (state?.uploadedFiles && state.uploadedFiles.length > 0) {
            // Only trigger if queue is empty (fresh start)
            const isProcessing = isPdfToImage ? pdfConversionState.status === 'processing' : false
            if (queue.length === 0 && !isProcessing) {
                handleFileSelect(state.uploadedFiles)
            }
            // Clear state and turn off initializing
            window.history.replaceState({}, document.title)
            setIsInitializing(false)
        } else {
            // No files likely meant direct access or refresh
            setIsInitializing(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state, queue.length])


    const handleDownload = (index: number) => {
        const item = queue[index]
        if (item?.result) {
            const blob = item.result
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url

            let ext = format === 'pdf' ? 'pdf' : format === 'png' ? 'png' : 'jpg'
            a.download = `converted-${item.file.name.replace(/\.[^/.]+$/, "")}.${ext}`

            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }

    const handleDownloadAll = () => {
        queue.forEach((item, index) => {
            if (item.status === 'completed') {
                setTimeout(() => handleDownload(index), index * 100)
            }
        })
    }

    const handleReset = () => {
        if (isPdfToImage) {
            setPdfConversionState({ status: 'idle', progress: 0 })
        } else {
            reset()
        }
    }

    const handlePdfDownload = () => {
        if (pdfConversionState.result && pdfConversionState.fileName) {
            const url = URL.createObjectURL(pdfConversionState.result)
            const a = document.createElement('a')
            a.href = url
            a.download = pdfConversionState.fileName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }

    // Get SEO content and related tools
    const seoContent = CONVERSION_CONTENT[location.pathname]
    const relatedTools = RELATED_TOOLS_MAP[location.pathname] || []

    // Determine which FAQ to show based on conversion type
    const getFAQForConversion = () => {
        if (location.pathname === '/pdf-to-jpg') return PDF_TO_JPG_FAQ
        if (location.pathname === '/pdf-to-png') return PDF_TO_PNG_FAQ
        if (location.pathname.startsWith('/pdf-to-')) return PDF_TO_IMAGE_FAQ
        if (location.pathname === '/heic-to-pdf') return HEIC_TO_PDF_FAQ
        if (location.pathname === '/heic-to-jpg') return HEIC_TO_JPG_FAQ
        if (location.pathname === '/heic-to-png') return HEIC_TO_PNG_FAQ
        if (location.pathname === '/png-to-jpg') return PNG_TO_JPG_FAQ
        if (location.pathname === '/png-to-webp') return PNG_TO_WEBP_FAQ
        if (location.pathname === '/png-to-pdf') return PNG_TO_PDF_FAQ
        if (location.pathname === '/jpg-to-png') return JPG_TO_PNG_FAQ
        if (location.pathname === '/jpg-to-webp') return JPG_TO_WEBP_FAQ
        if (location.pathname === '/jpg-to-pdf') return JPG_TO_PDF_FAQ
        if (location.pathname === '/webp-to-jpg') return WEBP_TO_JPG_FAQ
        if (location.pathname === '/webp-to-png') return WEBP_TO_PNG_FAQ
        if (location.pathname === '/svg-to-png') return SVG_TO_PNG_FAQ
        if (location.pathname === '/svg-to-jpg') return SVG_TO_JPG_FAQ
        if (targetFormat === 'pdf') return PDF_FAQ
        if (location.pathname.includes('heic')) return HEIC_FAQ
        if (location.pathname.includes('webp')) return WEBP_FAQ
        if (location.pathname.includes('pdf')) return PDF_FAQ
        return null
    }
    const currentFAQ = getFAQForConversion()

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Header */}
            <main className="flex-1 flex flex-col items-center p-4">
                <div className="max-w-2xl w-full space-y-8">
                    <div className="text-center space-y-2">
                        {location.pathname === '/pdf-to-jpg' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert PDF to JPG Online – Free & Secure PDF to JPG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert PDF to JPG online</strong> with our <strong className="font-medium text-foreground">free PDF to JPG converter</strong>. <strong className="font-medium text-foreground">No upload required</strong>—process your files locally and securely in your browser for the fastest results.
                                </p>
                            </>
                        ) : location.pathname === '/pdf-to-png' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert PDF to PNG Online – Free & Secure PDF to PNG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert PDF to PNG online</strong> with our <strong className="font-medium text-foreground">free PDF to PNG converter</strong>. <strong className="font-medium text-foreground">No upload required</strong>—process your files locally and securely in your browser for the fastest results.
                                </p>
                            </>
                        ) : location.pathname === '/heic-to-jpg' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert HEIC to JPG Online – Free HEIC to JPG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert HEIC to JPG online</strong> with our <strong className="font-medium text-foreground">free HEIC to JPG converter</strong>. Perfect for <strong className="font-medium text-foreground">iPhone photos</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>—secure, private, and fast.
                                </p>
                            </>
                        ) : location.pathname === '/heic-to-png' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert HEIC to PNG Online – Free HEIC to PNG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert HEIC to PNG online</strong> with our <strong className="font-medium text-foreground">free HEIC to PNG converter</strong>. <strong className="font-medium text-foreground">High-quality, lossless conversion</strong> for <strong className="font-medium text-foreground">iPhone photos</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/heic-to-pdf' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert HEIC to PDF Online – Free HEIC to PDF Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert HEIC to PDF online</strong> with our <strong className="font-medium text-foreground">free HEIC to PDF converter</strong>. Perfect for <strong className="font-medium text-foreground">iPhone photos</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/png-to-jpg' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert PNG to JPG Online – Free PNG to JPG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert PNG to JPG online</strong> with our <strong className="font-medium text-foreground">free PNG to JPG converter</strong>. Perfect for <strong className="font-medium text-foreground">reducing file size</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/png-to-webp' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert PNG to WebP Online – Free PNG to WebP Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert PNG to WebP online</strong> with our <strong className="font-medium text-foreground">free PNG to WebP converter</strong>. Perfect for <strong className="font-medium text-foreground">web optimization</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/png-to-pdf' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert PNG to PDF Online – Free PNG to PDF Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert PNG to PDF online</strong> with our <strong className="font-medium text-foreground">free PNG to PDF converter</strong>. Perfect for <strong className="font-medium text-foreground">creating documents</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/jpg-to-png' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert JPG to PNG Online – Free JPG to PNG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert JPG to PNG online</strong> with our <strong className="font-medium text-foreground">free JPG to PNG converter</strong>. Perfect for <strong className="font-medium text-foreground">lossless editing</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/jpg-to-webp' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert JPG to WebP Online – Free JPG to WebP Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert JPG to WebP online</strong> with our <strong className="font-medium text-foreground">free JPG to WebP converter</strong>. Perfect for <strong className="font-medium text-foreground">web optimization</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/jpg-to-pdf' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert JPG to PDF Online – Free JPG to PDF Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert JPG to PDF online</strong> with our <strong className="font-medium text-foreground">free JPG to PDF converter</strong>. Perfect for <strong className="font-medium text-foreground">creating documents</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/webp-to-jpg' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert WebP to JPG Online – Free WebP to JPG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert WebP to JPG online</strong> with our <strong className="font-medium text-foreground">free WebP to JPG converter</strong>. Perfect for <strong className="font-medium text-foreground">compatibility</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/webp-to-png' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert WebP to PNG Online – Free WebP to PNG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert WebP to PNG online</strong> with our <strong className="font-medium text-foreground">free WebP to PNG converter</strong>. Perfect for <strong className="font-medium text-foreground">lossless conversion</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/svg-to-png' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert SVG to PNG Online – Free SVG to PNG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert SVG to PNG online</strong> with our <strong className="font-medium text-foreground">free SVG to PNG converter</strong>. Perfect for <strong className="font-medium text-foreground">converting vectors to images</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : location.pathname === '/svg-to-jpg' ? (
                            <>
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">
                                    Convert SVG to JPG Online – Free SVG to JPG Converter
                                </h1>
                                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Easily <strong className="font-medium text-foreground">convert SVG to JPG online</strong> with our <strong className="font-medium text-foreground">free SVG to JPG converter</strong>. Perfect for <strong className="font-medium text-foreground">compatibility</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold tracking-tight text-primary-700 capitalize">
                                    {effectiveConversion?.replace(/-/g, ' ')}
                                </h1>
                                <p className="text-muted-foreground">
                                    Upload {sourceFormat?.toUpperCase()} files and convert to {targetFormat?.toUpperCase()}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Show PDF conversion result if PDF to image */}
                    {isPdfToImage && pdfConversionState.status !== 'idle' ? (
                        <div className="space-y-6">
                            <div className="bg-card border rounded-lg p-6 space-y-4">
                                <h2 className="text-lg font-semibold">
                                    {pdfConversionState.status === 'processing' && 'Converting PDF...'}
                                    {pdfConversionState.status === 'completed' && 'Conversion Complete!'}
                                    {pdfConversionState.status === 'error' && 'Conversion Failed'}
                                </h2>

                                {/* Progress Bar */}
                                {pdfConversionState.status === 'processing' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{Math.round(pdfConversionState.progress * 100)}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-300 ease-out"
                                                style={{ width: `${pdfConversionState.progress * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {pdfConversionState.status === 'error' && (
                                    <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                                        <p className="text-sm font-medium">{pdfConversionState.error || 'An error occurred during conversion'}</p>
                                    </div>
                                )}

                                {/* Success - Download Button */}
                                {pdfConversionState.status === 'completed' && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">
                                            File: <span className="font-medium text-foreground">{pdfConversionState.fileName}</span>
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Button onClick={handlePdfDownload} className="flex-1">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download {targetFormat?.toUpperCase()}
                                            </Button>
                                            <Button onClick={handleReset} variant="outline" className="sm:flex-none">
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                Convert Another
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (queue.length === 0 && !isInitializing) ? (
                        <SmartDropzone
                            onFilesDropped={handleFileSelect}
                            isConverting={isReady && isConverting}
                            accept={
                                sourceFormat === 'pdf'
                                    ? { 'application/pdf': ['.pdf'] }
                                    : sourceFormat === 'svg'
                                        ? { 'image/svg+xml': ['.svg'] }
                                        : sourceFormat === 'heic'
                                            ? { 'image/heic': ['.heic', '.HEIC'] }
                                            : sourceFormat === 'jfif'
                                                ? { 'image/jpeg': ['.jfif', '.JFIF'] }
                                                : { [`image/${sourceFormat}`]: [`.${sourceFormat}`] }
                            }
                            label={
                                sourceFormat === 'pdf'
                                    ? 'Upload your PDF'
                                    : sourceFormat === 'svg'
                                        ? 'Upload your SVG'
                                        : sourceFormat === 'heic'
                                            ? 'Upload your HEIC files'
                                            : undefined
                            }
                            formats={
                                sourceFormat === 'pdf'
                                    ? ['PDF']
                                    : sourceFormat === 'svg'
                                        ? ['SVG']
                                        : sourceFormat === 'jfif'
                                            ? ['JFIF']
                                            : sourceFormat === 'heic'
                                                ? ['HEIC']
                                                : undefined
                            }
                        />
                    ) : (
                        <ConversionQueue
                            queue={queue}
                            targetFormat={targetFormat?.toUpperCase() || 'JPG'}
                            onDownload={handleDownload}
                            onDownloadAll={handleDownloadAll}
                            onReset={handleReset}
                        />
                    )}

                    {/* Status Indicator */}
                    <div className="fixed bottom-4 right-4 text-xs font-mono text-muted-foreground/30 flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                        <span className={`h-2 w-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        ENGINE:{isReady ? 'ONLINE' : 'INIT'}
                    </div>
                </div>

                {/* SEO Content Block - Only show if content exists */}
                {seoContent && (
                    <SEOContentBlock
                        title={seoContent.title}
                        description={seoContent.description}
                        features={seoContent.features}
                        howItWorks={seoContent.howItWorks}
                        benefits={seoContent.benefits}
                    />
                )}

                {/* Related Tools - Only show if tools exist */}
                {relatedTools.length > 0 && (
                    <RelatedTools tools={relatedTools} />
                )}

                {/* FAQ Section - Only show if FAQ exists */}
                {currentFAQ && (
                    <FAQSection faqs={currentFAQ} />
                )}
            </main>
        </div>
    )
}
