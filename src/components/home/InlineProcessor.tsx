import { useState, useEffect, useCallback } from 'react'
import { Download, RotateCcw, CheckCircle2, Loader2, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useConversion } from '@/hooks/use-conversion'
import { convertPdfToImages } from '@/utils/pdf-to-images'
import { createZipFromBlobs } from '@/utils/zip-utils'
import type { FileAction, ConversionOption } from '@/utils/file-actions'
import type { ConversionFormat } from '@/core/types'

interface InlineProcessorProps {
    file: File
    action: FileAction
    conversionOption?: ConversionOption
    onComplete: () => void
    onReset: () => void
}

export function InlineProcessor({
    file,
    action,
    conversionOption,
    onComplete,
    onReset
}: InlineProcessorProps) {
    const navigate = useNavigate()
    const { isReady, convertFiles, queue, reset } = useConversion()
    const [hasStarted, setHasStarted] = useState(false)

    // PDF to images state (separate from worker-based conversions)
    const [pdfConversionState, setPdfConversionState] = useState<{
        status: 'idle' | 'processing' | 'completed' | 'error'
        progress: number
        result?: Blob
        error?: string
    }>({ status: 'idle', progress: 0 })

    // Check if this is a conversion action
    const isConversionAction = action.type === 'convert'
    const isPdfToImages = file.type === 'application/pdf' && isConversionAction

    // PDF to images conversion handler
    const handlePdfToImageConversion = useCallback(async () => {
        try {
            setPdfConversionState({ status: 'processing', progress: 0.1 })

            const format = conversionOption?.format as 'jpg' | 'png'
            const blobs = await convertPdfToImages(file, format, 0.9)

            setPdfConversionState({ status: 'processing', progress: 0.8 })

            let resultBlob: Blob
            if (blobs.length === 1) {
                // Single page - download as image
                resultBlob = blobs[0]
            } else {
                // Multiple pages - create ZIP
                resultBlob = await createZipFromBlobs(blobs, format)
            }

            setPdfConversionState({
                status: 'completed',
                progress: 1,
                result: resultBlob
            })
        } catch (err) {
            setPdfConversionState({
                status: 'error',
                progress: 0,
                error: (err as Error).message
            })
        }
    }, [file, conversionOption])

    // Auto-start conversion when component mounts (only for conversion actions)
    useEffect(() => {
        console.log('[InlineProcessor] useEffect triggered', {
            hasStarted,
            isConversionAction,
            conversionOption,
            isPdfToImages,
            isReady,
            fileName: file.name
        })

        if (!hasStarted && isConversionAction && conversionOption) {
            console.log('[InlineProcessor] Starting conversion...')
            if (isPdfToImages) {
                console.log('[InlineProcessor] PDF to images conversion')
                // Handle PDF to images separately (not through worker)
                handlePdfToImageConversion()
                setHasStarted(true)
            } else if (isReady) {
                console.log('[InlineProcessor] Image conversion via worker', {
                    format: conversionOption.format
                })
                // Regular image conversions through worker
                convertFiles([file], conversionOption.format as ConversionFormat)
                setHasStarted(true)
            } else {
                console.warn('[InlineProcessor] Worker not ready yet, waiting...')
                // Don't set hasStarted - let it retry when isReady becomes true
            }
        } else {
            console.log('[InlineProcessor] Conversion not started', {
                reason: hasStarted ? 'already started' : !isConversionAction ? 'not conversion action' : 'no conversion option'
            })
        }
    }, [hasStarted, isReady, file, isConversionAction, conversionOption, isPdfToImages, convertFiles, handlePdfToImageConversion])

    // Check if conversion is complete
    const currentItem = queue[0]
    const isComplete = isPdfToImages
        ? pdfConversionState.status === 'completed'
        : currentItem && currentItem.status === 'completed'
    const isError = isPdfToImages
        ? pdfConversionState.status === 'error'
        : currentItem && currentItem.status === 'error'
    const progress = isPdfToImages
        ? pdfConversionState.progress
        : currentItem?.progress || 0

    useEffect(() => {
        if (isComplete) {
            onComplete()
        }
    }, [isComplete, onComplete])

    const handleDownload = () => {
        const blob = isPdfToImages ? pdfConversionState.result : currentItem?.result

        if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url

            if (isPdfToImages) {
                // Check if it's a ZIP (multiple pages) or single image
                const isZip = blob.type === 'application/zip'
                const ext = isZip ? 'zip' : conversionOption?.format || 'jpg'
                a.download = `${file.name.replace(/\.pdf$/i, '')}.${ext}`
            } else {
                const ext = conversionOption?.format || 'jpg'
                a.download = `converted-${file.name.replace(/\.[^/.]+$/, '')}.${ext}`
            }

            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }

    const handleReset = () => {
        reset()
        setPdfConversionState({ status: 'idle', progress: 0 })
        onReset()
    }

    const handleNavigateToTool = () => {
        const routes: Record<string, string> = {
            'resize': '/resize-image',
            'crop': '/resize-image',      // ImageResizer handles crop
            'rotate': '/resize-image',    // ImageResizer handles rotation/flip
            'merge': '/merge-pdf',
            'compress': '/compress-pdf'
        }

        const route = routes[action.id] || routes[action.type]
        if (route) {
            navigate(route, { state: { uploadedFiles: [file] } })
        }
    }

    // For non-conversion actions, show a redirect message
    if (!isConversionAction) {
        return (
            <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="p-8">
                    <div className="space-y-6 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <ExternalLink className="w-8 h-8 text-primary" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold text-xl">
                                {action.label} Tool
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                This action requires a dedicated interface with advanced controls.
                                Click below to open the full tool with your file already loaded.
                            </p>
                        </div>

                        <div className="flex gap-3 justify-center pt-4">
                            <Button
                                size="lg"
                                className="gap-2"
                                onClick={handleNavigateToTool}
                            >
                                Open {action.label} Tool
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleReset}
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="text-center text-sm text-muted-foreground">
                    <p>All processing happens locally in your browser</p>
                    <p>Your files never leave your device</p>
                </div>
            </div>
        )
    }

    // For conversion actions, show the conversion UI
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-6">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">
                                {isComplete ? 'Conversion Complete!' : isError ? 'Conversion Failed' : 'Converting...'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {file.name} → {conversionOption?.label || action.label}
                            </p>
                        </div>
                        {isComplete && (
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        )}
                        {!isComplete && !isError && (
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        )}
                    </div>

                    {/* Progress Bar */}
                    {!isComplete && !isError && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{Math.round(progress * 100)}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300 ease-out"
                                    style={{ width: `${progress * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {isError && (
                        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                            <p className="text-sm font-medium">
                                {isPdfToImages
                                    ? pdfConversionState.error || 'PDF conversion failed'
                                    : currentItem?.error || 'An error occurred during conversion'
                                }
                            </p>
                        </div>
                    )}

                    {/* Preview (if available) */}
                    {!isPdfToImages && currentItem?.result && (file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.heic')) && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Preview</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-xs text-muted-foreground">Original</p>
                                    {file.name.toLowerCase().endsWith('.heic') ? (
                                        <div className="w-full rounded-lg border bg-muted flex items-center justify-center p-8">
                                            <p className="text-sm text-muted-foreground text-center">
                                                HEIC preview not supported<br />
                                                <span className="text-xs">See converted image →</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Original"
                                            className="w-full rounded-lg border"
                                        />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-muted-foreground">Converted</p>
                                    <img
                                        src={URL.createObjectURL(currentItem.result)}
                                        alt="Converted"
                                        className="w-full rounded-lg border"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        {isComplete && (
                            <Button
                                size="lg"
                                className="flex-1 gap-2"
                                onClick={handleDownload}
                            >
                                <Download className="w-4 h-4" />
                                Download {isPdfToImages && pdfConversionState.result?.type === 'application/zip'
                                    ? 'ZIP Archive'
                                    : conversionOption?.format?.toUpperCase() || 'File'}
                            </Button>
                        )}
                        <Button
                            variant={isComplete ? 'outline' : 'secondary'}
                            size="lg"
                            className={isComplete ? '' : 'flex-1'}
                            onClick={handleReset}
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Convert Another
                        </Button>
                    </div>
                </div>
            </Card>

            {/* File Info */}
            <div className="text-center text-sm text-muted-foreground">
                <p>All processing happens locally in your browser</p>
                <p>Your files never leave your device</p>
            </div>
        </div>
    )
}
