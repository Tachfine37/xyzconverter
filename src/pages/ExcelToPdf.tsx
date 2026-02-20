import { useState } from 'react'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileSpreadsheet, Loader2, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageSEO } from '@/utils/seo'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function ExcelToPdf() {
    usePageSEO({
        title: 'Excel to PDF Converter - Convert XLSX to PDF Online Free | XYZCONVERTER',
        description: 'Convert Excel spreadsheets (XLSX, XLS) to PDF format instantly. 100% free, secure, and completed locally without uploading your financial data.',
        keywords: 'excel to pdf, xlsx to pdf, convert excel to pdf, free spreadsheet converter',
    })

    const [file, setFile] = useState<File | null>(null)
    const [isConverting, setIsConverting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

    const handleFileSelect = async (selectedFiles: File[]) => {
        if (selectedFiles.length === 0) return
        const selected = selectedFiles[0]
        if (!selected.name.match(/\.(xlsx|xls|csv)$/i)) {
            toast.error('Currently only Excel (.xlsx, .xls) and CSV files are supported.')
            return
        }
        setFile(selected)
        setPdfBlob(null)
    }

    const resetTool = () => {
        setFile(null)
        setPdfBlob(null)
        setProgress(0)
    }

    const startConversion = async () => {
        if (!file) return
        setIsConverting(true)
        setProgress(10)

        try {
            // Step 1: Read File
            const arrayBuffer = await file.arrayBuffer()
            setProgress(30)

            // Step 2: Parse Excel
            const workbook = XLSX.read(arrayBuffer, { type: 'array' })
            setProgress(50)

            // We'll create a single PDF, maybe with one page per sheet (or just the first sheet)
            const pdf = new jsPDF('p', 'pt', 'a4')

            // For simplicity, we process the first sheet
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]

            // Convert to 2D array
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
            setProgress(70)

            if (jsonData.length === 0) {
                throw new Error("Spreadsheet is empty.")
            }

            const headers = jsonData[0]
            const body = jsonData.slice(1)

            // Write PDF title
            pdf.setFontSize(16)
            pdf.text(`Document: ${file.name}`, 40, 40)
            pdf.setFontSize(10)
            pdf.text(`Sheet: ${firstSheetName}`, 40, 55)

            // @ts-ignore (jspdf-autotable adds autoTable to jsPDF instance)
            pdf.autoTable({
                head: [headers],
                body: body,
                startY: 70,
                theme: 'striped',
                styles: { fontSize: 8, cellPadding: 3 },
                headStyles: { fillColor: [59, 130, 246] }, // blue-500
            })

            setProgress(90)

            // Generate Blob
            const outputBlob = pdf.output('blob')
            setPdfBlob(outputBlob)
            setProgress(100)
            toast.success('Spreadsheet converted to PDF successfully!')

        } catch (error) {
            console.error('Excel to PDF Error:', error)
            toast.error('Failed to convert spreadsheet. It may be too large or complex.')
        } finally {
            setIsConverting(false)
        }
    }

    const downloadPdf = () => {
        if (!pdfBlob || !file) return
        const url = URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = url
        const originalName = file.name.split('.').slice(0, -1).join('.')
        a.download = `${originalName}.pdf`
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
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Convert Excel to PDF</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Turn spreadsheets into easy-to-read PDF documents instantly. 100% processed securely on your device.
                    </p>
                </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm">
                {!file ? (
                    <SmartDropzone
                        onFilesDropped={handleFileSelect}
                        accept={{
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                            'application/vnd.ms-excel': ['.xls'],
                            'text/csv': ['.csv']
                        }}
                        label="Drop your Excel file here"
                        formats={['XLSX', 'XLS', 'CSV']}
                        isConverting={isConverting}
                    />
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <FileSpreadsheet className="w-8 h-8 text-green-500" />
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
                                        <p className="text-sm text-green-600/80 dark:text-green-400/80">Your financial data was converted privately.</p>
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
                    </div>
                )}
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-center">How to Convert Excel to PDF</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">1</div>
                            <h3 className="font-medium mb-2">Upload Spreadsheet</h3>
                            <p className="text-sm text-muted-foreground">Select or drag and drop your XLSX, XLS, or CSV file. We never upload your data to our servers.</p>
                        </div>
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">2</div>
                            <h3 className="font-medium mb-2">Private Conversion</h3>
                            <p className="text-sm text-muted-foreground">Our client-side tool extracts the data from your spreadsheet and formats it into a printable PDF table.</p>
                        </div>
                        <div className="p-6 bg-card border rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">3</div>
                            <h3 className="font-medium mb-2">Save PDF</h3>
                            <p className="text-sm text-muted-foreground">Download your brand new PDF file immediately with zero wait time and zero cost.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Why Use a Local Excel to PDF Converter?</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="font-medium text-primary flex-shrink-0">✓</div>
                            <p><strong>Protect Financial Data:</strong> Spreadsheets often contain sensitive financial or personal information. By processing files in your browser, nobody else can ever see your data.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="font-medium text-primary flex-shrink-0">✓</div>
                            <p><strong>Ready for Print:</strong> PDFs freeze the layout of your data so it looks exactly the same whether it's viewed on a phone, desktop, or printed out on paper.</p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
