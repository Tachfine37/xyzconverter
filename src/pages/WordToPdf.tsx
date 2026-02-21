import { useState, useRef } from 'react'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, Loader2, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageSEO } from '@/utils/seo'
import mammoth from 'mammoth'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { toast } from 'sonner'
import { FAQSection } from '@/components/seo/FAQSection'
import { WORD_TO_PDF_FAQ } from '@/utils/structured-data'

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function WordToPdf() {
    usePageSEO({
        title: 'Word to PDF Converter - Convert DOCX to PDF Online Free | XYZCONVERTER',
        description: 'Convert Microsoft Word (DOCX) documents to PDF format instantly. 100% free, secure, and completed locally without uploading your files.',
        keywords: 'word to pdf, docx to pdf, convert word to pdf, free docx converter',
    })

    const [file, setFile] = useState<File | null>(null)
    const [isConverting, setIsConverting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [htmlContent, setHtmlContent] = useState<string>('')
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

    const contentRef = useRef<HTMLDivElement>(null)

    const handleFileSelect = async (selectedFiles: File[]) => {
        if (selectedFiles.length === 0) return
        const selected = selectedFiles[0]
        if (!selected.name.endsWith('.docx')) {
            toast.error('Currently only .docx files are supported.')
            return
        }
        setFile(selected)
        setPdfBlob(null)
        setHtmlContent('')
    }

    const resetTool = () => {
        setFile(null)
        setPdfBlob(null)
        setHtmlContent('')
        setProgress(0)
    }

    const startConversion = async () => {
        if (!file || !contentRef.current) return
        setIsConverting(true)
        setProgress(10)

        try {
            // Step 1: Read DOCX
            const arrayBuffer = await file.arrayBuffer()
            setProgress(30)

            // Step 2: Convert to HTML
            const result = await mammoth.convertToHtml({ arrayBuffer })
            setHtmlContent(result.value)
            setProgress(50)

            // Allow React to render the HTML content to the DOM offscreen
            await new Promise(resolve => setTimeout(resolve, 500))

            const element = contentRef.current
            if (!element) throw new Error("Render element not found")

            setProgress(70)

            // Step 3: Render HTML to Canvas
            const canvas = await html2canvas(element, {
                scale: 2, // higher scale for better PDF quality
                useCORS: true,
                logging: false,
                windowWidth: 800 // simulate A4 width
            })

            setProgress(85)

            // Step 4: Add Canvas to PDF
            const imgData = canvas.toDataURL('image/jpeg', 1.0)
            const pdf = new jsPDF('p', 'pt', 'a4')
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)

            // Generate Blob
            const outputBlob = pdf.output('blob')
            setPdfBlob(outputBlob)
            setProgress(100)
            toast.success('Document converted successfully!')

        } catch (error) {
            console.error('Word to PDF Error:', error)
            toast.error('Failed to convert document. It may contain unsupported formatting.')
        } finally {
            setIsConverting(false)
        }
    }

    const downloadPdf = () => {
        if (!pdfBlob || !file) return
        const url = URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name.replace('.docx', '.pdf')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
                <Link to="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to tools
                </Link>
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Convert Word to PDF</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Turn DOCX files into universally accepted PDFs without losing formatting. Fully processed on your device for total privacy.
                    </p>
                </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm">
                {!file ? (
                    <SmartDropzone
                        onFilesDropped={handleFileSelect}
                        accept={{
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                        }}
                        formats={['DOCX']}
                        isConverting={isConverting}
                    />
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-blue-500" />
                                <div>
                                    <p className="font-medium line-clamp-1">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={resetTool} disabled={isConverting}>
                                Remove
                            </Button>
                        </div>

                        {!pdfBlob ? (
                            <div className="space-y-4">
                                <Button
                                    className="w-full h-12 text-lg"
                                    onClick={startConversion}
                                    disabled={isConverting}
                                >
                                    {isConverting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Converting... {progress}%
                                        </>
                                    ) : (
                                        'Convert to PDF'
                                    )}
                                </Button>
                                {isConverting && (
                                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary h-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-green-700 dark:text-green-400">Conversion Complete!</p>
                                        <p className="text-sm text-green-600/80 dark:text-green-400/80">Your PDF is ready to download.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button className="w-full h-12" onClick={downloadPdf}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </Button>
                                    <Button variant="outline" className="w-full h-12" onClick={resetTool}>
                                        Convert Another File
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Hidden container to render DOCX HTML for canvas capture */}
                        <div className="overflow-hidden h-0 opacity-0 relative">
                            <div
                                ref={contentRef}
                                className="absolute top-0 left-0 w-[800px] bg-white text-black p-12 text-base"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-center">How to Convert Word to PDF</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">1</div>
                            <h3 className="font-medium mb-2">Upload your Document</h3>
                            <p className="text-sm text-muted-foreground">Select or drag and drop your DOCX file into our tool. We process everything locally in your browser.</p>
                        </div>
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">2</div>
                            <h3 className="font-medium mb-2">Instant Conversion</h3>
                            <p className="text-sm text-muted-foreground">We instantly read the text and structure of your document and generate a pixel-perfect PDF rendering.</p>
                        </div>
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">3</div>
                            <h3 className="font-medium mb-2">Download PDF</h3>
                            <p className="text-sm text-muted-foreground">Click download to save your new PDF. There are no watermarks or page limits.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Why Convert Word to PDF Offline?</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="font-medium text-primary flex-shrink-0">✓</div>
                            <p><strong>Strict Privacy:</strong> Standard online converters require you to upload your sensitive contracts or essays to their servers. We do all the processing right on your device.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="font-medium text-primary flex-shrink-0">✓</div>
                            <p><strong>Universal Compatibility:</strong> PDFs look exactly the same on every device, making it the perfect format for sharing resumes, invoices, and reports.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="font-medium text-primary flex-shrink-0">✓</div>
                            <p><strong>Fast and Free:</strong> Without server upload speeds to worry about, the conversion is practically instantaneous and completely free to use.</p>
                        </li>
                    </ul>
                </section>
            </div>

            <FAQSection faqs={WORD_TO_PDF_FAQ} />
        </div>
    )
}
