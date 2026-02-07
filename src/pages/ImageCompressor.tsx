import { useState, useEffect, useCallback, useRef } from 'react'
import { Download, Upload, RotateCcw, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { analytics } from '@/lib/analytics'

interface CompressionState {
    originalFile: File | null
    originalSize: number
    originalDimensions: { width: number; height: number } | null
    compressedBlob: Blob | null
    compressedSize: number
    previewUrl: string | null
    originalPreviewUrl: string | null
    quality: number
    outputFormat: 'jpg' | 'webp' | 'png'
    isProcessing: boolean
}

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getSizeReduction = (original: number, compressed: number): string => {
    if (original === 0) return '0%'
    const reduction = ((original - compressed) / original) * 100
    return reduction > 0 ? `-${reduction.toFixed(1)}%` : `+${Math.abs(reduction).toFixed(1)}%`
}

export function ImageCompressor() {
    const [state, setState] = useState<CompressionState>({
        originalFile: null,
        originalSize: 0,
        originalDimensions: null,
        compressedBlob: null,
        compressedSize: 0,
        previewUrl: null,
        originalPreviewUrl: null,
        quality: 80,
        outputFormat: 'jpg',
        isProcessing: false
    })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        document.title = 'Image Compressor - xyzconverter'
        analytics.pageView('compress-image')
    }, [])

    // Cleanup URLs on unmount
    useEffect(() => {
        return () => {
            if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)
            if (state.originalPreviewUrl) URL.revokeObjectURL(state.originalPreviewUrl)
        }
    }, [])

    const compressImage = useCallback(async (
        file: File,
        quality: number,
        format: 'jpg' | 'webp' | 'png'
    ): Promise<{ blob: Blob; dimensions: { width: number; height: number } }> => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.naturalWidth
                canvas.height = img.naturalHeight

                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Could not get canvas context'))
                    return
                }

                // White background for JPG (no transparency)
                if (format === 'jpg') {
                    ctx.fillStyle = '#FFFFFF'
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }

                ctx.drawImage(img, 0, 0)

                const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
                const qualityValue = format === 'png' ? undefined : quality / 100

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve({
                                blob,
                                dimensions: { width: img.naturalWidth, height: img.naturalHeight }
                            })
                        } else {
                            reject(new Error('Failed to create blob'))
                        }
                    },
                    mimeType,
                    qualityValue
                )

                URL.revokeObjectURL(img.src)
            }
            img.onerror = () => reject(new Error('Failed to load image'))
            img.src = URL.createObjectURL(file)
        })
    }, [])

    const processImage = useCallback(async (
        file: File,
        quality: number,
        format: 'jpg' | 'webp' | 'png'
    ) => {
        setState(prev => ({ ...prev, isProcessing: true }))

        try {
            const { blob, dimensions } = await compressImage(file, quality, format)

            // Revoke old preview URL
            setState(prev => {
                if (prev.previewUrl) URL.revokeObjectURL(prev.previewUrl)
                return prev
            })

            const previewUrl = URL.createObjectURL(blob)

            setState(prev => ({
                ...prev,
                compressedBlob: blob,
                compressedSize: blob.size,
                previewUrl,
                originalDimensions: dimensions,
                isProcessing: false
            }))
        } catch (error) {
            console.error('Compression failed:', error)
            setState(prev => ({ ...prev, isProcessing: false }))
        }
    }, [compressImage])

    const handleFileSelect = useCallback(async (file: File) => {
        // Revoke old URLs
        if (state.originalPreviewUrl) URL.revokeObjectURL(state.originalPreviewUrl)
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)

        const originalPreviewUrl = URL.createObjectURL(file)

        setState(prev => ({
            ...prev,
            originalFile: file,
            originalSize: file.size,
            originalPreviewUrl,
            compressedBlob: null,
            compressedSize: 0,
            previewUrl: null
        }))

        // Auto-detect best output format
        const ext = file.name.toLowerCase()
        let format: 'jpg' | 'webp' | 'png' = 'jpg'
        if (ext.endsWith('.png')) format = 'png'
        else if (ext.endsWith('.webp')) format = 'webp'

        setState(prev => ({ ...prev, outputFormat: format }))

        // Start compression
        await processImage(file, state.quality, format)

        analytics.track('compress_start', { format, originalSize: file.size })
    }, [state.originalPreviewUrl, state.previewUrl, state.quality, processImage])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            handleFileSelect(file)
        }
    }, [handleFileSelect])

    const handleQualityChange = useCallback((value: number[]) => {
        const quality = value[0]
        setState(prev => ({ ...prev, quality }))

        // Debounce compression
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            if (state.originalFile) {
                processImage(state.originalFile, quality, state.outputFormat)
            }
        }, 150)
    }, [state.originalFile, state.outputFormat, processImage])

    const handleFormatChange = useCallback((format: 'jpg' | 'webp' | 'png') => {
        setState(prev => ({ ...prev, outputFormat: format }))
        if (state.originalFile) {
            processImage(state.originalFile, state.quality, format)
        }
    }, [state.originalFile, state.quality, processImage])

    const handleDownload = useCallback(() => {
        if (!state.compressedBlob || !state.originalFile) return

        const url = URL.createObjectURL(state.compressedBlob)
        const a = document.createElement('a')
        a.href = url
        const baseName = state.originalFile.name.replace(/\.[^/.]+$/, '')
        a.download = `${baseName}-compressed.${state.outputFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        analytics.track('compress_download', {
            format: state.outputFormat,
            quality: state.quality,
            originalSize: state.originalSize,
            compressedSize: state.compressedSize,
            reduction: getSizeReduction(state.originalSize, state.compressedSize)
        })
    }, [state])

    const handleReset = useCallback(() => {
        if (state.originalPreviewUrl) URL.revokeObjectURL(state.originalPreviewUrl)
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)

        setState({
            originalFile: null,
            originalSize: 0,
            originalDimensions: null,
            compressedBlob: null,
            compressedSize: 0,
            previewUrl: null,
            originalPreviewUrl: null,
            quality: 80,
            outputFormat: 'jpg',
            isProcessing: false
        })
    }, [state.originalPreviewUrl, state.previewUrl])

    const sizeReduction = getSizeReduction(state.originalSize, state.compressedSize)
    const isReduced = state.compressedSize < state.originalSize

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:py-12">
            <div className="max-w-4xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-primary-700">
                        Image Compressor
                    </h1>
                    <p className="text-muted-foreground">
                        Reduce file size while maintaining quality. 100% client-side processing.
                    </p>
                </div>

                {/* Upload Area or Preview */}
                {!state.originalFile ? (
                    <Card
                        className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer p-12"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="p-4 rounded-full bg-primary/10">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Drop your image here</p>
                                <p className="text-sm text-muted-foreground">
                                    or click to browse (JPG, PNG, WebP)
                                </p>
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileSelect(file)
                            }}
                        />
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Preview Comparison */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Original */}
                            <Card className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Original</span>
                                    <span className="text-sm font-mono">{formatBytes(state.originalSize)}</span>
                                </div>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                                    {state.originalPreviewUrl && (
                                        <img
                                            src={state.originalPreviewUrl}
                                            alt="Original"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    )}
                                </div>
                                {state.originalDimensions && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        {state.originalDimensions.width} × {state.originalDimensions.height} px
                                    </p>
                                )}
                            </Card>

                            {/* Compressed */}
                            <Card className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Compressed</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono">{formatBytes(state.compressedSize)}</span>
                                        {state.compressedSize > 0 && (
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${isReduced ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
                                                {sizeReduction}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center relative">
                                    {state.isProcessing && (
                                        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                                        </div>
                                    )}
                                    {state.previewUrl && (
                                        <img
                                            src={state.previewUrl}
                                            alt="Compressed"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    {state.outputFormat.toUpperCase()} • Quality: {state.quality}%
                                </p>
                            </Card>
                        </div>

                        {/* Controls */}
                        <Card className="p-6 space-y-6">
                            {/* Quality Slider */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">Quality</label>
                                    <span className="text-sm font-mono text-muted-foreground">{state.quality}%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ZoomOut className="w-4 h-4 text-muted-foreground" />
                                    <Slider
                                        value={[state.quality]}
                                        onValueChange={handleQualityChange}
                                        min={10}
                                        max={100}
                                        step={1}
                                        className="flex-1"
                                        disabled={state.outputFormat === 'png'}
                                    />
                                    <ZoomIn className="w-4 h-4 text-muted-foreground" />
                                </div>
                                {state.outputFormat === 'png' && (
                                    <p className="text-xs text-muted-foreground">
                                        PNG is lossless - quality slider doesn't apply
                                    </p>
                                )}
                            </div>

                            {/* Output Format */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Output Format</label>
                                <div className="flex gap-2">
                                    {(['jpg', 'webp', 'png'] as const).map((format) => (
                                        <Button
                                            key={format}
                                            variant={state.outputFormat === format ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => handleFormatChange(format)}
                                            className="flex-1"
                                        >
                                            {format.toUpperCase()}
                                        </Button>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {state.outputFormat === 'jpg' && 'Best for photos - smaller file size'}
                                    {state.outputFormat === 'webp' && 'Modern format - best compression'}
                                    {state.outputFormat === 'png' && 'Lossless - preserves all details'}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={handleDownload}
                                    disabled={!state.compressedBlob || state.isProcessing}
                                    className="flex-1"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                                <Button variant="outline" onClick={handleReset}>
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                            </div>
                        </Card>

                        {/* Info Card */}
                        <Card className="p-4 bg-muted/30">
                            <div className="flex items-start gap-3">
                                <ImageIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div className="text-sm text-muted-foreground">
                                    <p className="font-medium text-foreground mb-1">Privacy First</p>
                                    <p>
                                        All compression happens in your browser. Your images never leave your device
                                        and are not uploaded to any server.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
