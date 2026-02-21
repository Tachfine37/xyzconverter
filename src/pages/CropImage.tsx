import { useState, useCallback } from 'react'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Crop as CropIcon, Download, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageSEO } from '@/utils/seo'
import Cropper from 'react-easy-crop'
import { toast } from 'sonner'
import { FAQSection } from '@/components/seo/FAQSection'
import { CROP_IMAGE_FAQ } from '@/utils/structured-data'

interface Point { x: number; y: number }
interface Area { x: number; y: number; width: number; height: number }

export function CropImage() {
    usePageSEO({
        title: 'Crop Image Online - Fast, Free & Private Image Cropper | XYZCONVERTER',
        description: 'Crop JPG, PNG, and WebP images directly in your browser. 100% free, no watermarks, and zero server uploads for total privacy.',
        keywords: 'crop image, crop photo online, image cropper, free crop tool',
    })

    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [fileType, setFileType] = useState<string>('image/jpeg')
    const [originalName, setOriginalName] = useState<string>('')

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [croppedImage, setCroppedImage] = useState<string | null>(null)

    const handleFileSelect = async (selectedFiles: File[]) => {
        if (selectedFiles.length === 0) return
        const file = selectedFiles[0]
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file.')
            return
        }

        setFileType(file.type)
        setOriginalName(file.name)

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageSrc(reader.result?.toString() || null)
        })
        reader.readAsDataURL(file)
    }

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const resetTool = () => {
        setImageSrc(null)
        setCroppedImage(null)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
    }

    const generateCroppedImage = async () => {
        if (!imageSrc || !croppedAreaPixels) return

        try {
            const canvas = document.createElement('canvas')
            const image = new Image()
            image.src = imageSrc

            await new Promise((resolve, reject) => {
                image.onload = resolve
                image.onerror = reject
            })

            canvas.width = croppedAreaPixels.width
            canvas.height = croppedAreaPixels.height
            const ctx = canvas.getContext('2d')

            if (!ctx) throw new Error('No 2d context')

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            )

            // Convert canvas to blob/dataURL
            const dataUrl = canvas.toDataURL(fileType, 0.95)
            setCroppedImage(dataUrl)
            toast.success('Image cropped successfully!')
        } catch (e) {
            console.error(e)
            toast.error('Failed to crop image.')
        }
    }

    const downloadImage = () => {
        if (!croppedImage) return
        const a = document.createElement('a')
        a.href = croppedImage
        const extension = fileType.split('/')[1] || 'jpg'
        const baseName = originalName.split('.').slice(0, -1).join('.')
        a.download = `${baseName}-cropped.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
                <Link to="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to tools
                </Link>
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Crop Image Online</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Quickly pan, zoom, and crop pictures to the perfect size. Works 100% offline in your browser so your photos stay totally private.
                    </p>
                </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm">
                {!imageSrc ? (
                    <SmartDropzone
                        onFilesDropped={handleFileSelect}
                        accept={{ 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }}
                        label="Drop an image to crop"
                        formats={['JPG', 'PNG', 'WEBP']}
                        isConverting={false}
                    />
                ) : !croppedImage ? (
                    <div className="space-y-6">
                        <div className="relative w-full h-[500px] bg-black/5 rounded-xl overflow-hidden">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={undefined} // free form cropping
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Zoom</label>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-label="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button className="flex-1 h-12 text-lg" onClick={generateCroppedImage}>
                                <CropIcon className="w-5 h-5 mr-2" />
                                Apply Crop
                            </Button>
                            <Button variant="outline" className="h-12 px-6" onClick={resetTool}>
                                <RotateCcw className="w-5 h-5 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <p className="font-medium text-green-700 dark:text-green-400 text-center">Your image is ready!</p>
                        </div>

                        <div className="flex justify-center bg-black/5 rounded-xl p-4">
                            <img src={croppedImage} alt="Cropped preview" className="max-h-[400px] max-w-full rounded-md shadow-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button className="w-full h-12" onClick={downloadImage}>
                                <Download className="w-4 h-4 mr-2" />
                                Download Image
                            </Button>
                            <Button variant="outline" className="w-full h-12" onClick={resetTool}>
                                Crop Another Image
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-center">How to Crop Pictures Online</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">1</div>
                            <h3 className="font-medium mb-2">Upload Photo</h3>
                            <p className="text-sm text-muted-foreground">Select any JPG, PNG, or WebP image. Your file never leaves your device thanks to local browser processing.</p>
                        </div>
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">2</div>
                            <h3 className="font-medium mb-2">Adjust Frame</h3>
                            <p className="text-sm text-muted-foreground">Drag the image to pan, use the slider to zoom in perfectly, and resize the glowing crop box to your desired area.</p>
                        </div>
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">3</div>
                            <h3 className="font-medium mb-2">Apply & Download</h3>
                            <p className="text-sm text-muted-foreground">Hit apply to slice your image exactly as previewed, then download the cropped file free of watermarks.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">The Safest Image Cropper</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="font-medium text-primary flex-shrink-0">✓</div>
                            <p><strong>Private by Design:</strong> Instead of sending pictures of your family or documents to a remote server, our cropper draws and slices the pixels directly on your computer's memory.</p>
                        </li>
                    </ul>
                </section>
            </div>

            <FAQSection faqs={CROP_IMAGE_FAQ} />
        </div>
    )
}
