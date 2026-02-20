import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDropzone } from 'react-dropzone'
import { FileUp, Loader2, CheckCircle, Presentation, Zap, Shield, Image as ImageIcon, CheckCircle2 } from 'lucide-react'
import { toast } from "sonner"
import * as pdfjsLib from 'pdfjs-dist';
import pptxgen from "pptxgenjs";
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { PDF_TO_POWERPOINT_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function PdfToPowerPoint() {
    usePageSEO()

    // SEO Content
    const content = CONVERSION_CONTENT['/pdf-to-powerpoint']

    // Inject Structured Data
    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'PresentationApplication'
        })
        injectStructuredData(schema)
    }, [content])

    const [file, setFile] = useState<File | null>(null)
    const [isConverting, setIsConverting] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [progress, setProgress] = useState(0)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0]
        if (selectedFile?.type === 'application/pdf') {
            setFile(selectedFile)
            setIsDone(false)
            setProgress(0)
        } else {
            toast.error("Please upload a PDF file")
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const convertToPowerPoint = async () => {
        if (!file) return

        setIsConverting(true)
        setProgress(0)

        try {
            const arrayBuffer = await file.arrayBuffer()
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
            const pdf = await loadingTask.promise
            const numPages = pdf.numPages

            // Handle potential ESM/CJS interop issues with pptxgenjs v4
            const PptxGenJS = (pptxgen as any).default || pptxgen;
            const pres = new PptxGenJS();

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i)
                const viewport = page.getViewport({ scale: 2.0 }) // 2x scale for better quality

                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width

                if (!context) throw new Error("Could not create canvas context")

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                } as any).promise

                const imgData = canvas.toDataURL('image/jpeg', 0.8)

                // Create a slide
                const slide = pres.addSlide();

                // Add the image to the slide covering the whole area
                slide.addImage({
                    data: imgData,
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: "100%"
                });

                setProgress(Math.round((i / numPages) * 100))
            }

            await pres.writeFile({ fileName: file.name.replace('.pdf', '.pptx') });

            setIsDone(true)
            toast.success("Converted to PowerPoint successfully!")

        } catch (error) {
            console.error("Conversion failed:", error)
            toast.error("Conversion failed. Please try another file.")
        } finally {
            setIsConverting(false)
        }
    }

    const reset = () => {
        setFile(null)
        setIsDone(false)
        setProgress(0)
    }

    if (isDone) {
        return (
            <div className="container max-w-4xl mx-auto py-12 px-4 flex flex-col items-center justify-center space-y-6 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold">Conversion Complete!</h2>
                <p className="text-muted-foreground">Your PowerPoint presentation has been downloaded.</p>
                <div className="flex gap-4">
                    <Button onClick={reset} variant="outline" size="lg">Convert Another File</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Convert PDF to PowerPoint</h1>
                <p className="text-xl text-muted-foreground">
                    Turn your PDF pages into editable PowerPoint slides instantly.
                </p>
            </div>

            <Card className="border-2 border-dashed">
                <CardContent
                    {...getRootProps()}
                    className="py-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                >
                    <input {...getInputProps()} />
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        {isConverting ? (
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        ) : file ? (
                            <Presentation className="w-10 h-10 text-primary" />
                        ) : (
                            <FileUp className="w-10 h-10 text-primary" />
                        )}
                    </div>

                    {isConverting ? (
                        <div className="space-y-4 w-full max-w-xs mx-auto">
                            <h3 className="text-2xl font-semibold">Converting...</h3>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-muted-foreground text-sm">{progress}% Complete</p>
                        </div>
                    ) : file ? (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">{file.name}</h3>
                            <p className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    size="lg"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        convertToPowerPoint()
                                    }}
                                    className="rounded-full px-8"
                                >
                                    Convert to PowerPoint
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        reset()
                                    }}
                                    className="rounded-full px-8"
                                >
                                    Remove File
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-semibold mb-2">
                                {isDragActive ? "Drop PDF here" : "Drag & Drop PDF here"}
                            </h3>
                            <p className="text-muted-foreground mb-6">or click to browse files</p>
                            <Button size="lg" className="rounded-full px-8">
                                Select PDF File
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Features Grid for SEO - only visible when no file selected */}
            {!file && !isConverting && (
                <div className="grid md:grid-cols-3 gap-6 pt-8">
                    {content.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                            <h3 className="font-semibold mb-2">{feature}</h3>
                        </div>
                    ))}
                </div>
            )}

            {/* Rich Content Sections */}
            <div className="grid md:grid-cols-3 gap-8 py-12">
                <div className="space-y-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 w-fit rounded-lg">
                        <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold">High Fidelity</h3>
                    <p className="text-muted-foreground">
                        Each page is rendered as a high-quality image, ensuring 100% preservation of fonts, layout, and graphics.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 w-fit rounded-lg">
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Secure & Private</h3>
                    <p className="text-muted-foreground">
                        Conversion happens entirely in your browser. Your confidential presentation decks never leave your computer.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 w-fit rounded-lg">
                        <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Instant Download</h3>
                    <p className="text-muted-foreground">
                        No waiting for server uploads or queues. Get your .pptx file seconds after selecting your PDF.
                    </p>
                </div>
            </div>

            <div className="py-12 border-t space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold">{content.howItWorks.title}</h2>
                    <p className="text-muted-foreground">Follow these simple steps to convert PDF to PowerPoint.</p>
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
                <h2 className="text-3xl font-bold text-center mb-12">Why Use Our PDF to PowerPoint Tool?</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
                    {content.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">{feature}</h3>
                                <p className="text-muted-foreground text-sm">
                                    The easiest way to turn PDF documents into presentation slides.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-12 border-t mt-12">
                <FAQSection faqs={PDF_TO_POWERPOINT_FAQ} />
            </div>
        </div>
    )
}
