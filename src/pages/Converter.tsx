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
import { HEIC_FAQ, WEBP_FAQ, PDF_FAQ } from "@/utils/structured-data"

import type { ConversionFormat } from "@/core/types"

export function Converter() {
    const { conversion } = useParams()
    const location = useLocation()
    // Check if we have incoming files from navigation state
    const hasIncomingFiles = !!(location.state as { uploadedFiles?: File[] } | null)?.uploadedFiles
    // If we have incoming files, start in initializing mode to hide dropzone
    const [isInitializing, setIsInitializing] = useState(hasIncomingFiles)

    const { isReady, isConverting, convertFiles, queue, reset } = useConversion()

    // Initialize SEO
    usePageSEO()

    // Determine effective conversion string from param (legacy) or path (new)
    // For path /heic-to-jpg, conversion is undefined, so we use pathname without leading slash
    const effectiveConversion = conversion || location.pathname.substring(1)

    // Parse conversion type from route
    const [sourceFormat, targetFormat] = (effectiveConversion || '').split('-to-')
    const format: ConversionFormat = (targetFormat === 'pdf' ? 'pdf' : targetFormat === 'png' ? 'png' : targetFormat === 'webp' ? 'webp' : 'jpg') as ConversionFormat

    const handleFileSelect = (files: File[]) => {
        convertFiles(files, format)
    }

    // Handle files passed from Hero/Navigation state
    useEffect(() => {
        const state = location.state as { uploadedFiles?: File[] } | null
        if (state?.uploadedFiles && state.uploadedFiles.length > 0) {
            // Only trigger if queue is empty (fresh start)
            if (queue.length === 0) {
                handleFileSelect(state.uploadedFiles)
            }
            // Clear state and turn off initializing
            window.history.replaceState({}, document.title)
            setIsInitializing(false)
        } else {
            // No files likely meant direct access or refresh
            setIsInitializing(false)
        }
    }, [location.state, queue.length]) // format is stable for this render cycle

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
        reset()
    }

    // Get SEO content and related tools
    const seoContent = CONVERSION_CONTENT[location.pathname]
    const relatedTools = RELATED_TOOLS_MAP[location.pathname] || []

    // Determine which FAQ to show based on conversion type
    const getFAQForConversion = () => {
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
                        <h1 className="text-4xl font-bold tracking-tight text-primary-700 capitalize">
                            {effectiveConversion?.replace(/-/g, ' ')}
                        </h1>
                        <p className="text-muted-foreground">
                            Upload {sourceFormat?.toUpperCase()} files and convert to {targetFormat?.toUpperCase()}
                        </p>
                    </div>

                    {(queue.length === 0 && !isInitializing) ? (
                        <SmartDropzone
                            onFilesDropped={handleFileSelect}
                            isConverting={isReady && isConverting}
                            accept={{ [`image/${sourceFormat}`]: [`.${sourceFormat}`] }}
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
