import { useState, useRef, useCallback } from 'react'
import { Upload, X, Download, Sliders, Lock, Unlock, Sparkles, Crop as CropIcon, RotateCw, RefreshCw, FlipHorizontal, FlipVertical } from 'lucide-react'
import Cropper from 'react-easy-crop'
import type { Area, Point } from 'react-easy-crop'
import { usePageSEO } from "@/utils/seo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { processImage, getImageDimensions } from '@/utils/image-processing'
import { FAQSection } from "@/components/seo/FAQSection"
import { RESIZE_IMAGE_FAQ } from "@/utils/structured-data"

type PresetCategory = 'social' | 'web' | 'print'

interface Preset {
    id: string
    label: string
    width: number
    height: number
    icon?: string
    popular?: boolean
    aspect?: number // aspect ratio for crop
}

const PRESETS: Record<PresetCategory, Preset[]> = {
    social: [
        { id: 'ig-post', label: 'Instagram Post', width: 1080, height: 1080, popular: true, aspect: 1 },
        { id: 'ig-story', label: 'Instagram Story', width: 1080, height: 1920, aspect: 9 / 16 },
        { id: 'ig-profile', label: 'Instagram Profile', width: 320, height: 320, aspect: 1 },
        { id: 'fb-post', label: 'Facebook Post', width: 1200, height: 630, popular: true, aspect: 1.91 },
        { id: 'fb-cover', label: 'Facebook Cover', width: 820, height: 312, aspect: 820 / 312 },
        { id: 'tw-post', label: 'X / Twitter Post', width: 1200, height: 675, aspect: 16 / 9 },
        { id: 'ln-post', label: 'LinkedIn Post', width: 1200, height: 627, aspect: 1.91 },
    ],
    web: [
        { id: 'web-banner', label: 'Website Banner', width: 1920, height: 1080, popular: true, aspect: 16 / 9 },
        { id: 'blog-post', label: 'Blog Image', width: 1200, height: 628, aspect: 1.91 },
        { id: 'thumbnail', label: 'Thumbnail', width: 400, height: 400, aspect: 1 },
        { id: 'hero', label: 'Hero Image', width: 2560, height: 1440, aspect: 16 / 9 },
    ],
    print: [
        { id: 'a4', label: 'A4', width: 2480, height: 3508, aspect: 2480 / 3508 },
        { id: 'a5', label: 'A5', width: 1748, height: 2480, aspect: 1748 / 2480 },
        { id: 'flyer', label: 'Flyer', width: 1240, height: 1754, aspect: 1240 / 1754 },
    ]
}

export function ImageResizer() {
    usePageSEO({
        title: 'Resize Image Online – Free Image Resizer Tool',
        description: 'Resize image online with our free image resizer. Resize image without losing quality. Works in your browser with no upload required.',

    })

    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [originalDims, setOriginalDims] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

    // Editor State
    const [mode, setMode] = useState<'resize' | 'crop'>('resize')

    // Crop State
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState<number | undefined>(undefined)
    const [rotation, setRotation] = useState(0)
    const [flip, setFlip] = useState({ horizontal: false, vertical: false })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [showGrid, setShowGrid] = useState(true)

    // Resize State
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [lockAspectRatio, setLockAspectRatio] = useState(true)
    const [quality, setQuality] = useState(0.9)
    const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg')

    // Initial state for reset functionality
    const [initialState, setInitialState] = useState<{
        width: number
        height: number
    }>({ width: 0, height: 0 })

    const [isProcessing, setIsProcessing] = useState(false)
    const [resultBlob, setResultBlob] = useState<Blob | null>(null)
    const [activePresetId, setActivePresetId] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<PresetCategory>('social')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleWidthChange = (val: number) => {
        setWidth(val)
        if (lockAspectRatio && originalDims.width > 0) {
            const ratio = originalDims.height / originalDims.width
            setHeight(Math.round(val * ratio))
        }
    }

    const handleHeightChange = (val: number) => {
        setHeight(val)
        if (lockAspectRatio && originalDims.height > 0) {
            const ratio = originalDims.width / originalDims.height
            setWidth(Math.round(val * ratio))
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await processNewFile(e.target.files[0])
        }
    }

    const processNewFile = async (f: File) => {
        setFile(f)
        const url = URL.createObjectURL(f)
        setPreviewUrl(url)
        setFormat(f.type as any || 'image/jpeg')

        try {
            const dims = await getImageDimensions(f)
            setOriginalDims(dims)
            setWidth(dims.width)
            setHeight(dims.height)
            setResultBlob(null)
            setActivePresetId(null)

            // Store initial state for reset functionality
            setInitialState({ width: dims.width, height: dims.height })

            // Reset transforms
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setRotation(0)
            setFlip({ horizontal: false, vertical: false })
            setAspect(undefined)


        } catch (error) {
            toast.error('Could not load image')
        }
    }

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handlePresetSelect = (preset: Preset) => {
        setActivePresetId(preset.id)

        if (mode === 'crop') {
            setAspect(preset.aspect)
            toast.info(`Aspect Ratio set to ${preset.label}`)
        } else {
            setWidth(preset.width)
            setHeight(preset.height)
            setLockAspectRatio(false)
        }
    }

    const handleResultGeneration = async (downloadIt: boolean = false) => {
        if (!file || !previewUrl) return

        setIsProcessing(true)
        try {
            // If in crop mode, we use the crop pixels. If in resize mode, we might just be resizing the original
            // BUT, the user might have rotated/flipped in crop mode then switched to resize.
            // So we should always apply the transform state.

            const blob = await processImage(file, {
                width: mode === 'resize' ? width : undefined, // Only enforce resize logic in resize mode or if explicitly desired
                height: mode === 'resize' ? height : undefined,
                rotation,
                flip,
                crop: croppedAreaPixels ? {
                    x: croppedAreaPixels.x,
                    y: croppedAreaPixels.y,
                    width: croppedAreaPixels.width,
                    height: croppedAreaPixels.height
                } : undefined,
                quality,
                format
            })

            setResultBlob(blob)

            if (downloadIt) {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                let ext = 'jpg'
                if (format === 'image/png') ext = 'png'
                if (format === 'image/webp') ext = 'webp'

                const originalName = file.name.split('.')[0]
                a.download = `${originalName}-edited.${ext}`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
                toast.success('Downloaded successfully')
            } else {
                toast.success('Preview updated')
            }

        } catch (error) {
            console.error(error)
            toast.error('Processing failed')
        } finally {
            setIsProcessing(false)
        }
    }

    // Live preview update (debounced ideally, but button driven for heavy ops for now as requested "Preview Before Download")
    // User requirement: "Preview Before Download (MANDATORY)" -> "Before / After preview"

    // Aspect Ratio Utils
    const setAspectRatio = (ratio: number | undefined) => {
        setAspect(ratio)
        if (ratio) toast.info('Aspect ratio locked')
        else toast.info('Free crop mode')
    }

    // Reset Functions
    const resetAll = () => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setRotation(0)
        setFlip({ horizontal: false, vertical: false })
        setAspect(undefined)
        setWidth(initialState.width)
        setHeight(initialState.height)
        setLockAspectRatio(true)
        setActivePresetId(null)
        toast.success('All changes reset')
    }

    const resetCrop = () => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setAspect(undefined)
        toast.success('Crop reset')
    }

    const resetDimensions = () => {
        setWidth(initialState.width)
        setHeight(initialState.height)
        setLockAspectRatio(true)
        toast.success('Dimensions reset')
    }

    const resetTransforms = () => {
        setRotation(0)
        setFlip({ horizontal: false, vertical: false })
        toast.success('Transforms reset')
    }

    // Zoom controls
    const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3))
    const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 1))
    const zoomFit = () => setZoom(1)

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <main className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8">

                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">Resize Image Online – Free Image Resizer Tool</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                        <strong className="font-medium text-foreground">Resize image online</strong> with our <strong className="font-medium text-foreground">free image resizer</strong>. Resize image <strong className="font-medium text-foreground">without losing quality</strong>. <strong className="font-medium text-foreground">Works in your browser</strong> with <strong className="font-medium text-foreground">no upload required</strong>.
                    </p>
                </div>

                {!file ? (
                    <Card
                        className="border-dashed border-2 h-64 flex flex-col items-center justify-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="p-4 bg-muted rounded-full">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP supported</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Editor Canvas */}
                        <div className="lg:col-span-8 space-y-4">
                            <Card className="p-1 bg-muted/20 relative h-[500px] flex items-center justify-center overflow-hidden border-2 border-muted">
                                {previewUrl && (
                                    <div className="relative w-full h-full">
                                        {/* Dimension Overlay */}
                                        <div className="absolute top-2 left-2 z-30 bg-background/90 backdrop-blur px-3 py-2 rounded-lg border shadow-sm text-xs space-y-1">
                                            <div className="font-medium">Original: {originalDims.width} × {originalDims.height}</div>
                                            {mode === 'resize' && (
                                                <div className="text-primary font-semibold">Output: {width} × {height}</div>
                                            )}
                                            {mode === 'crop' && aspect && (
                                                <div className="text-muted-foreground">Aspect: {aspect === 1 ? '1:1' : aspect === 16 / 9 ? '16:9' : aspect === 9 / 16 ? '9:16' : aspect === 4 / 3 ? '4:3' : aspect === 3 / 2 ? '3:2' : aspect === 4 / 5 ? '4:5' : aspect === 21 / 9 ? '21:9' : aspect.toFixed(2)}</div>
                                            )}
                                        </div>
                                        <Cropper
                                            image={previewUrl}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={aspect}
                                            rotation={rotation}
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={setZoom}
                                            showGrid={showGrid}
                                            transform={[
                                                `translate(${crop.x}px, ${crop.y}px)`,
                                                `rotateZ(${rotation}deg)`,
                                                `rotateY(${flip.horizontal ? 180 : 0}deg)`,
                                                `rotateX(${flip.vertical ? 180 : 0}deg)`,
                                                `scale(${zoom})`,
                                            ].join(' ')} // Cropper might handle rotation internaly but let's check docs safely. React-easy-crop manages view.
                                            // Actually react-easy-crop has 'rotation' prop.
                                            // However, scaling x/y (-1) for flip is not natively supported by prop, 
                                            // but we can rotate 180 on axis? No, easy-crop is 2D.
                                            // Trick: we can flip the CSS of the container or feed a flipped image.
                                            // Or just apply CSS transform to the `videoComponent` or `imageComponent` props if avail.
                                            // Simplest: The generic transform prop isn't there for the image directly. 
                                            // Let's rely on standard rotation prop for rotation. 
                                            // For Flip: react-easy-crop allows rotation, but not flip.
                                            // We might need to CSS transform the style object.
                                            style={{
                                                mediaStyle: {
                                                    transform: `scale(${flip.horizontal ? -1 : 1}, ${flip.vertical ? -1 : 1})`
                                                }
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <Button size="sm" variant="secondary" onClick={resetAll} title="Reset all changes">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Reset All
                                    </Button>
                                    <Button size="sm" variant="secondary" onClick={() => {
                                        setFile(null); setResultBlob(null); setPreviewUrl(null);
                                    }}>
                                        <X className="w-4 h-4 mr-2" />
                                        Close
                                    </Button>
                                </div>

                                {/* Editor Mode Toggles Overlay */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-background/90 p-1 rounded-lg border shadow-lg backdrop-blur">
                                    <Button
                                        variant={mode === 'crop' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setMode('crop')}
                                    >
                                        <CropIcon className="w-4 h-4 mr-2" />
                                        Crop & Transform
                                    </Button>
                                    <Button
                                        variant={mode === 'resize' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setMode('resize')}
                                    >
                                        <Sliders className="w-4 h-4 mr-2" />
                                        Resize & Export
                                    </Button>
                                </div>
                            </Card>

                            {/* Rotation & Flip Controls (Visible in Crop Mode, or always? Always is handy) */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-semibold">Transform</Label>
                                    <Button variant="ghost" size="sm" onClick={resetTransforms}>
                                        <RefreshCw className="w-3 h-3 mr-1" />
                                        Reset
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <Button variant="outline" onClick={() => setRotation((r) => r - 90)}>
                                        <RotateCw className="w-4 h-4 mr-2 -scale-x-100" />
                                        Rotate -90°
                                    </Button>
                                    <Button variant="outline" onClick={() => setRotation((r) => r + 90)}>
                                        <RotateCw className="w-4 h-4 mr-2" />
                                        Rotate +90°
                                    </Button>
                                    <Button variant="outline" onClick={() => setFlip(f => ({ ...f, horizontal: !f.horizontal }))}>
                                        <FlipHorizontal className="w-4 h-4 mr-2" />
                                        Flip H
                                    </Button>
                                    <Button variant="outline" onClick={() => setFlip(f => ({ ...f, vertical: !f.vertical }))}>
                                        <FlipVertical className="w-4 h-4 mr-2" />
                                        Flip V
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Controls */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* PRESETS */}
                            <Card className="p-4 space-y-4">
                                <div className="flex items-center gap-2 font-semibold">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span>Presets</span>
                                </div>
                                <Tabs className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger
                                            onClick={() => setActiveTab('social')}
                                            dataState={activeTab === 'social' ? 'active' : 'inactive'}
                                        >
                                            Social
                                        </TabsTrigger>
                                        <TabsTrigger
                                            onClick={() => setActiveTab('web')}
                                            dataState={activeTab === 'web' ? 'active' : 'inactive'}
                                        >
                                            Web
                                        </TabsTrigger>
                                        <TabsTrigger
                                            onClick={() => setActiveTab('print')}
                                            dataState={activeTab === 'print' ? 'active' : 'inactive'}
                                        >
                                            Print
                                        </TabsTrigger>
                                    </TabsList>
                                    <div className="mt-4 grid grid-cols-2 gap-2 h-[200px] overflow-y-auto pr-1">
                                        {PRESETS[activeTab].map((p) => (
                                            <div
                                                key={p.id}
                                                onClick={() => handlePresetSelect(p)}
                                                className={`
                                                    cursor-pointer rounded border p-2 text-xs hover:bg-muted/50 transition-colors
                                                    ${activePresetId === p.id ? 'border-primary bg-primary/5' : ''}
                                                `}
                                            >
                                                <div className="font-medium truncate" title={p.label}>{p.label}</div>
                                                <div className="text-muted-foreground">{p.width}x{p.height}</div>
                                            </div>
                                        ))}
                                    </div>
                                </Tabs>
                            </Card>

                            {mode === 'crop' && (
                                <Card className="p-4 space-y-4 animate-in fade-in">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <CropIcon className="w-4 h-4" />
                                        <span>Crop Settings</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-xs text-muted-foreground mb-2 block">Aspect Ratio</Label>
                                            <div className="grid grid-cols-4 gap-2">
                                                <Button variant={!aspect ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(undefined)}>Free</Button>
                                                <Button variant={aspect === 1 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(1)}>1:1</Button>
                                                <Button variant={aspect === 4 / 3 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(4 / 3)}>4:3</Button>
                                                <Button variant={aspect === 3 / 2 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(3 / 2)}>3:2</Button>
                                            </div>
                                            <div className="grid grid-cols-4 gap-2 mt-2">
                                                <Button variant={aspect === 16 / 9 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(16 / 9)}>16:9</Button>
                                                <Button variant={aspect === 9 / 16 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(9 / 16)}>9:16</Button>
                                                <Button variant={aspect === 4 / 5 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(4 / 5)}>4:5</Button>
                                                <Button variant={aspect === 21 / 9 ? "secondary" : "outline"} size="sm" onClick={() => setAspectRatio(21 / 9)}>21:9</Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm">Show Grid</Label>
                                            <Button
                                                variant={showGrid ? "secondary" : "outline"}
                                                size="sm"
                                                onClick={() => setShowGrid(!showGrid)}
                                            >
                                                {showGrid ? 'On' : 'Off'}
                                            </Button>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label>Zoom: {Math.round(zoom * 100)}%</Label>
                                                <div className="flex gap-1">
                                                    <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoom <= 1}>-</Button>
                                                    <Button variant="outline" size="sm" onClick={zoomFit} disabled={zoom === 1}>Fit</Button>
                                                    <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoom >= 3}>+</Button>
                                                </div>
                                            </div>
                                            <Slider
                                                value={[zoom]}
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                onValueChange={(v) => setZoom(v[0])}
                                            />
                                        </div>

                                        <Button variant="outline" size="sm" className="w-full" onClick={resetCrop}>
                                            <RefreshCw className="w-3 h-3 mr-2" />
                                            Reset Crop
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            {mode === 'resize' && (
                                <Card className="p-4 space-y-4 animate-in fade-in">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Sliders className="w-4 h-4" />
                                        <span>Resize Settings</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <div className="space-y-1 flex-1">
                                                <Label>Width</Label>
                                                <Input type="number" value={width || ''} onChange={(e) => handleWidthChange(Number(e.target.value))} />
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <Label>Height</Label>
                                                <Input type="number" value={height || ''} onChange={(e) => handleHeightChange(Number(e.target.value))} />
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="w-full"
                                            onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                        >
                                            {lockAspectRatio ? <Lock className="w-3 h-3 mr-2" /> : <Unlock className="w-3 h-3 mr-2" />}
                                            {lockAspectRatio ? 'Ratio Locked' : 'Ratio Unlocked'}
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full" onClick={resetDimensions}>
                                            <RefreshCw className="w-3 h-3 mr-2" />
                                            Reset Dimensions
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            <Card className="p-4 space-y-4 bg-muted/30">
                                <div className="space-y-2">
                                    <Label>Quality & Format</Label>
                                    <div className="flex gap-2">
                                        <Select value={format} onValueChange={(v: any) => setFormat(v)}>
                                            <SelectTrigger className="flex-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="image/jpeg">JPG</SelectItem>
                                                <SelectItem value="image/png">PNG</SelectItem>
                                                <SelectItem value="image/webp">WebP</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {format !== 'image/png' && (
                                            <div className="flex items-center gap-2 bg-background border rounded px-3 w-24">
                                                <span className="text-xs text-muted-foreground">{Math.round(quality * 100)}%</span>
                                            </div>
                                        )}
                                    </div>
                                    {format !== 'image/png' && (
                                        <Slider value={[quality]} min={0.1} max={1} step={0.1} onValueChange={(v) => setQuality(v[0])} />
                                    )}
                                </div>

                                {resultBlob && (
                                    <div className="text-xs text-muted-foreground text-center bg-muted p-2 rounded">
                                        Estimated Size: {Math.round(resultBlob.size / 1024)} KB
                                    </div>
                                )}

                                <Button className="w-full" onClick={() => handleResultGeneration(false)} disabled={isProcessing} variant="secondary">
                                    {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                    Update Size Est.
                                </Button>

                                <Button className="w-full" onClick={() => handleResultGeneration(true)} disabled={isProcessing}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Image
                                </Button>
                            </Card>

                        </div>
                    </div>
                )}

                <div className="mt-16 space-y-16">
                    {/* How to Resize Section */}
                    <section className="bg-muted/30 rounded-2xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-center mb-12">How to Resize an Image Online</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
                                <h3 className="font-semibold text-xl">Upload Image</h3>
                                <p className="text-muted-foreground">Upload your JPG, PNG, or WebP image to the resizer tool.</p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
                                <h3 className="font-semibold text-xl">Resize & Edit</h3>
                                <p className="text-muted-foreground">Enter new dimensions or choose a preset. Crop if needed.</p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
                                <h3 className="font-semibold text-xl">Download</h3>
                                <p className="text-muted-foreground">Download your resized image instantly in high quality.</p>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <FAQSection faqs={RESIZE_IMAGE_FAQ} title="Frequently Asked Questions" />
                </div>
            </main >
        </div >
    )
}
