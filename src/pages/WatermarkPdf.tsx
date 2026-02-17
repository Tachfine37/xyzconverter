import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDropzone } from 'react-dropzone'
import { FileUp, Eye, Image as ImageIcon, CheckCircle2, Zap, Shield, Settings } from 'lucide-react'
import { toast } from "sonner"
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib'
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { WATERMARK_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"

export function WatermarkPdf() {
    usePageSEO()

    // SEO Content
    const content = CONVERSION_CONTENT['/watermark-pdf']

    // Inject Structured Data
    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'MultimediaApplication'
        })
        injectStructuredData(schema)
    }, [content])

    const [file, setFile] = useState<File | null>(null)
    const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // Watermark Settings
    const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text')
    const [text, setText] = useState('CONFIDENTIAL')
    const [fontSize, setFontSize] = useState(48)
    const [opacity, setOpacity] = useState(0.5)
    const [rotation, setRotation] = useState(-45)
    const [color, setColor] = useState('#808080')
    const [position, setPosition] = useState<'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('center')

    // Image Watermark Settings
    const [watermarkImage, setWatermarkImage] = useState<File | null>(null)
    const [imageScale, setImageScale] = useState(0.5)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0]
        if (selectedFile?.type === 'application/pdf') {
            setFile(selectedFile)
            try {
                const arrayBuffer = await selectedFile.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                setPdfDoc(pdf)
            } catch (err) {
                toast.error("Error loading PDF")
                console.error(err)
            }
        } else {
            toast.error("Please upload a PDF file")
        }
    }, [])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type.startsWith('image/')) {
                setWatermarkImage(file)
            } else {
                toast.error("Please upload a valid image file")
            }
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const processPdf = async () => {
        if (!file || !pdfDoc) return

        try {
            setIsProcessing(true)

            // Reload PDF to ensure clean state
            const arrayBuffer = await file.arrayBuffer()
            const currentPdf = await PDFDocument.load(arrayBuffer)
            const pages = currentPdf.getPages()

            if (watermarkType === 'text') {
                const font = await currentPdf.embedFont(StandardFonts.HelveticaBold)

                // Convert hex color to RGB
                const r = parseInt(color.slice(1, 3), 16) / 255
                const g = parseInt(color.slice(3, 5), 16) / 255
                const b = parseInt(color.slice(5, 7), 16) / 255

                pages.forEach(page => {
                    const { width, height } = page.getSize()
                    let x = width / 2
                    let y = height / 2

                    if (position === 'top-left') { x = 50; y = height - 50 }
                    if (position === 'top-right') { x = width - 50; y = height - 50 }
                    if (position === 'bottom-left') { x = 50; y = 50 }
                    if (position === 'bottom-right') { x = width - 50; y = 50 }

                    page.drawText(text, {
                        x,
                        y,
                        size: fontSize,
                        font,
                        color: rgb(r, g, b),
                        opacity,
                        rotate: degrees(rotation),
                    })
                })
            } else if (watermarkType === 'image' && watermarkImage) {
                const imageBytes = await watermarkImage.arrayBuffer()
                let embeddedImage
                if (watermarkImage.type === 'image/png') {
                    embeddedImage = await currentPdf.embedPng(imageBytes)
                } else {
                    embeddedImage = await currentPdf.embedJpg(imageBytes)
                }

                const imgDims = embeddedImage.scale(imageScale)

                pages.forEach(page => {
                    const { width, height } = page.getSize()
                    let x = width / 2 - imgDims.width / 2
                    let y = height / 2 - imgDims.height / 2

                    if (position === 'top-left') { x = 20; y = height - imgDims.height - 20 }
                    if (position === 'top-right') { x = width - imgDims.width - 20; y = height - imgDims.height - 20 }
                    if (position === 'bottom-left') { x = 20; y = 20 }
                    if (position === 'bottom-right') { x = width - imgDims.width - 20; y = 20 }

                    // Adjust for rotation if needed (rotation pivots around bottom-left of image usually)
                    // For simplicity, we might skip complex rotation logic for images or try to handle it.
                    // pdf-lib rotate options rotate around the origin point (x,y). 
                    // To rotate around center, we need to translate.

                    page.drawImage(embeddedImage, {
                        x,
                        y,
                        width: imgDims.width,
                        height: imgDims.height,
                        opacity,
                        rotate: degrees(rotation),
                    })
                })
            }

            const pdfBytes = await currentPdf.save()
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = `watermarked-${file.name}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success("PDF Watermarked Successfully!")
        } catch (err) {
            console.error(err)
            toast.error("Error processing PDF")
        } finally {
            setIsProcessing(false)
        }
    }

    if (!file) {
        return (
            <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">


                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Add Watermark to PDF</h1>
                    <p className="text-xl text-muted-foreground">
                        Protect your intellectual property with custom watermarks.
                    </p>
                </div>

                <Card className="border-2 border-dashed">
                    <CardContent
                        {...getRootProps()}
                        className="py-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                        <input {...getInputProps()} />
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <FileUp className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">
                            {isDragActive ? "Drop PDF here" : "Drag & Drop PDF here"}
                        </h3>
                        <p className="text-muted-foreground mb-6">or click to browse files</p>
                        <Button size="lg" className="rounded-full px-8">
                            Select PDF File
                        </Button>
                    </CardContent>
                </Card>

                {/* Features Grid for SEO */}
                <div className="grid md:grid-cols-3 gap-6 pt-8">
                    {content.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                            <h3 className="font-semibold mb-2">{feature}</h3>
                        </div>
                    ))}
                </div>

                <div className="py-12 border-t mt-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
                        <h2 className="text-2xl font-bold">{content.howItWorks.title}</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {content.howItWorks.steps.map((step, i) => (
                            <div key={i} className="text-center p-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 font-bold">
                                    {i + 1}
                                </div>
                                <p className="text-sm text-muted-foreground">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-8 border-t">
                    <FAQSection faqs={WATERMARK_FAQ} />
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-6xl mx-auto py-8 px-4">


            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Watermark PDF</h1>
                <Button variant="outline" onClick={() => setFile(null)}>
                    Change File
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Watermark Settings</CardTitle>
                        <CardDescription>Customize your watermark</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <Tabs className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger
                                    onClick={() => setWatermarkType('text')}
                                    dataState={watermarkType === 'text' ? 'active' : 'inactive'}
                                >
                                    Text
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setWatermarkType('image')}
                                    dataState={watermarkType === 'image' ? 'active' : 'inactive'}
                                >
                                    Image
                                </TabsTrigger>
                            </TabsList>

                            {watermarkType === 'text' && (
                                <TabsContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Watermark Text</Label>
                                        <Input
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Enter text..."
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <Label>Font Size</Label>
                                            <span className="text-sm text-muted-foreground">{fontSize}px</span>
                                        </div>
                                        <Slider
                                            value={[fontSize]}
                                            onValueChange={(v) => setFontSize(v[0])}
                                            min={10}
                                            max={200}
                                            step={1}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Color</Label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="h-10 w-full cursor-pointer rounded-md border border-input p-1"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                            )}

                            {watermarkType === 'image' && (
                                <TabsContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Upload Image</Label>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-full">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="cursor-pointer"
                                                />
                                                {watermarkImage && (
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                                                        <ImageIcon className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">JPEG or PNG images supported</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <Label>Image Scale</Label>
                                            <span className="text-sm text-muted-foreground">{Math.round(imageScale * 100)}%</span>
                                        </div>
                                        <Slider
                                            value={[imageScale]}
                                            onValueChange={(v) => setImageScale(v[0])}
                                            min={0.1}
                                            max={2.0}
                                            step={0.1}
                                        />
                                    </div>
                                </TabsContent>
                            )}
                        </Tabs>

                        <div className="space-y-4 pt-4 border-t">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>Opacity</Label>
                                    <span className="text-sm text-muted-foreground">{Math.round(opacity * 100)}%</span>
                                </div>
                                <Slider
                                    value={[opacity]}
                                    onValueChange={(v) => setOpacity(v[0])}
                                    min={0.1}
                                    max={1}
                                    step={0.1}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>Rotation</Label>
                                    <span className="text-sm text-muted-foreground">{rotation}°</span>
                                </div>
                                <Slider
                                    value={[rotation]}
                                    onValueChange={(v) => setRotation(v[0])}
                                    min={-180}
                                    max={180}
                                    step={15}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Position</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['top-left', 'center', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                                        <Button
                                            key={pos}
                                            variant={position === pos ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setPosition(pos as any)}
                                            className="capitalize text-xs"
                                        >
                                            {pos.replace('-', ' ')}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button onClick={processPdf} className="w-full" disabled={isProcessing}>
                            {isProcessing ? "Processing..." : "Add Watermark & Download"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Preview Area */}
                <div className="lg:col-span-2 bg-muted/30 rounded-xl border flex items-center justify-center min-h-[600px] p-8">
                    <div className="text-center space-y-4 max-w-md">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Eye className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Preview Not Available</h3>
                        <p className="text-muted-foreground">
                            Due to browser limitations, a live preview of the PDF modification is not shown here.
                            However, your settings will be applied exactly as configured when you download.
                        </p>
                        <p className="text-sm text-muted-foreground italic">
                            (Live preview requires heavy PDF rendering libraries which may slow down the page)
                        </p>
                    </div>
                </div>
            </div>
            {/* Rich Content Sections */}
            <div className="grid md:grid-cols-3 gap-8 py-12">
                <div className="space-y-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 w-fit rounded-lg">
                        <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Fast & Efficient</h3>
                    <p className="text-muted-foreground">
                        Add watermarks instantly in your browser. No upload queues or server processing times.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 w-fit rounded-lg">
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">100% Secure</h3>
                    <p className="text-muted-foreground">
                        Files never leave your device. All processing happens locally for maximum privacy.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 w-fit rounded-lg">
                        <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Fully Customizable</h3>
                    <p className="text-muted-foreground">
                        Control opacity, rotation, position, and size for both text and image watermarks.
                    </p>
                </div>
            </div>

            <div className="py-12 border-t space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold">{content.howItWorks.title}</h2>
                    <p className="text-muted-foreground">Follow these simple steps to watermark your PDF documents.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {content.howItWorks.steps.map((step, i) => (
                        <Card key={i} className="relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl select-none">
                                {i + 1}
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">Step {i + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="py-12 border-t">
                <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Watermark Tool?</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
                    {content.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">{feature}</h3>
                                <p className="text-muted-foreground text-sm">
                                    Professional grade watermarking without the cost or complexity of desktop software.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-12 border-t mt-12">
                <FAQSection faqs={WATERMARK_FAQ} />
            </div>
        </div>
    )
}
