import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDropzone } from 'react-dropzone'
import { FileSpreadsheet, FileUp, Loader2, CheckCircle, Zap, Shield, Settings, CheckCircle2 } from 'lucide-react'
import { toast } from "sonner"
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { PDF_TO_EXCEL_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"

// Configure worker - using unpkg for reliable worker loading matching the installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function PdfToExcel() {
    usePageSEO()

    // SEO Content
    const content = CONVERSION_CONTENT['/pdf-to-excel']

    // Inject Structured Data
    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'SpreadsheetApplication'
        })
        injectStructuredData(schema)
    }, [content])
    const [file, setFile] = useState<File | null>(null)
    const [isConverting, setIsConverting] = useState(false)
    const [isDone, setIsDone] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0]
        if (selectedFile?.type === 'application/pdf') {
            setFile(selectedFile)
            setIsDone(false)
        } else {
            toast.error("Please upload a PDF file")
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const convertToExcel = async () => {
        if (!file) return

        setIsConverting(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
            const pdf = await loadingTask.promise
            const numPages = pdf.numPages

            const workbook = XLSX.utils.book_new();

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()

                // Improved Table detection logic
                // 1. Group items by Y coordinate (rows) with tolerance
                // 2. Sort items in each row by X coordinate (cells)

                const rows: { [key: number]: any[] } = {};

                textContent.items.forEach((item: any) => {
                    // Y coordinate is transform[5]. 
                    // We use a tolerance of 5 units to group items on roughly same line
                    const y = Math.round(item.transform[5] / 5) * 5;
                    if (!rows[y]) rows[y] = [];
                    rows[y].push(item);
                });

                // Convert to array of arrays, sorted by Y (descending for top-to-bottom)
                const sortedY = Object.keys(rows).map(Number).sort((a, b) => b - a);

                const sheetData = sortedY.map(y => {
                    // Sort items in row by X (left-to-right)
                    const rowItems = rows[y].sort((a, b) => a.transform[4] - b.transform[4]);

                    // Simple heuristic: if items are very close (e.g. within 20px), merge them? 
                    // For now, let's keep them as separate cells or join if they look like parts of same word?
                    // We'll stick to simple cell separation for now.
                    return rowItems.map(item => item.str);
                });

                const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
                XLSX.utils.book_append_sheet(workbook, worksheet, `Page ${i}`);
            }

            XLSX.writeFile(workbook, file.name.replace('.pdf', '.xlsx'));

            setIsDone(true)
            toast.success("Converted to Excel successfully!")

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
    }

    if (isDone) {
        return (
            <div className="container max-w-4xl mx-auto py-12 px-4 flex flex-col items-center justify-center space-y-6 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold">Conversion Complete!</h2>
                <p className="text-muted-foreground">Your Excel spreadsheet has been downloaded.</p>
                <div className="flex gap-4">
                    <Button onClick={reset} variant="outline" size="lg">Convert Another File</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Convert PDF to Excel</h1>
                <p className="text-xl text-muted-foreground">
                    Extract tables and data from PDF files to Excel instantly.
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
                            <FileSpreadsheet className="w-10 h-10 text-primary" />
                        ) : (
                            <FileUp className="w-10 h-10 text-primary" />
                        )}
                    </div>

                    {isConverting ? (
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">Converting...</h3>
                            <p className="text-muted-foreground">Please wait while we process your file.</p>
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
                                        convertToExcel()
                                    }}
                                    className="rounded-full px-8"
                                >
                                    Convert to Excel
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
                        <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Precise Extraction</h3>
                    <p className="text-muted-foreground">
                        Intelligent algorithms identify rows and columns to accurately reconstruct tables from your PDF.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 w-fit rounded-lg">
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">100% Private</h3>
                    <p className="text-muted-foreground">
                        Your data never leaves your computer. We process everything locally in your browser.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 w-fit rounded-lg">
                        <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Native Excel Format</h3>
                    <p className="text-muted-foreground">
                        Outputs standard .xlsx files compatible with Microsoft Excel, Google Sheets, and Numbers.
                    </p>
                </div>
            </div>

            <div className="py-12 border-t space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold">{content.howItWorks.title}</h2>
                    <p className="text-muted-foreground">Follow these simple steps to extract data to Excel.</p>
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
                <h2 className="text-3xl font-bold text-center mb-12">Why Use Our PDF to Excel Tool?</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
                    {content.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">{feature}</h3>
                                <p className="text-muted-foreground text-sm">
                                    Automate your data entry and analysis workflow instantly.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-12 border-t mt-12">
                <FAQSection faqs={PDF_TO_EXCEL_FAQ} />
            </div>
        </div>
    )
}
