import { useState } from 'react'
import { FileText, Download, Scissors, CheckCircle2 } from 'lucide-react'
import { usePageSEO } from "@/utils/seo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { toast } from "sonner"
import { splitPdf, getPdfPageCount } from '@/utils/pdf-tools'

// Simple radio group since we don't have Radix RadioGroup installed/created yet
const RadioOption = ({
    checked,
    onChange,
    label,
    description
}: {
    checked: boolean,
    onChange: () => void,
    label: string,
    description?: string
}) => (
    <div
        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${checked ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
        onClick={onChange}
    >
        <div className={`mt-0.5 w-4 h-4 rounded-full border border-primary flex items-center justify-center ${checked ? 'bg-primary' : ''}`}>
            {checked && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
        </div>
        <div className="space-y-1">
            <div className="font-medium text-sm leading-none">{label}</div>
            {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
    </div>
)

export function PdfSplitter() {
    usePageSEO({
        title: 'Split PDF - Extract Pages Online',
        description: 'Split PDF files locally. Extract specific pages or split every page into a separate file.'
    })

    const [file, setFile] = useState<File | null>(null)
    const [pageCount, setPageCount] = useState<number>(0)
    const [mode, setMode] = useState<'extract' | 'range'>('range')
    const [range, setRange] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [results, setResults] = useState<{ blob: Blob, name: string }[]>([])

    const handleFilesDropped = async (files: File[]) => {
        const pdF = files[0]
        if (!pdF) return

        if (pdF.type !== 'application/pdf' && !pdF.name.toLowerCase().endsWith('.pdf')) {
            toast.error('Invalid file type', { description: 'Please upload a PDF file.' })
            return
        }

        setFile(pdF)
        setResults([])

        // Get page count
        const count = await getPdfPageCount(pdF)
        setPageCount(count)
        if (count > 0) {
            setRange(`1-${Math.min(count, 5)}`) // Default range suggestion
        }
    }

    const handleSplit = async () => {
        if (!file) return

        setIsProcessing(true)
        setResults([])

        try {
            const blobs = await splitPdf(file, {
                range: mode === 'range' ? range : undefined,
                extractAll: mode === 'extract'
            })

            const newResults = blobs.map((blob, i) => {
                let name = `split-${i + 1}.pdf`
                if (mode === 'range') {
                    name = `${file.name.replace('.pdf', '')}-extracted.pdf`
                } else {
                    name = `${file.name.replace('.pdf', '')}-page-${i + 1}.pdf`
                }
                return { blob, name }
            })

            setResults(newResults)
            toast.success('Split Successful', { description: `Created ${newResults.length} file(s).` })

        } catch (error) {
            console.error(error)
            toast.error('Split Failed', { description: 'Could not process PDF.' })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = (blob: Blob, name: string) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Split PDF</h1>
                <p className="text-muted-foreground">Extract pages from your PDF documents.</p>
            </div>

            {!file ? (
                <SmartDropzone
                    onFilesDropped={handleFilesDropped}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    isConverting={false}
                    label="Upload your PDF"
                    formats={['PDF']}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Settings */}
                    <Card className="md:col-span-2 p-6 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b">
                            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded">
                                <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{file.name}</h3>
                                <p className="text-sm text-muted-foreground">{pageCount > 0 ? `${pageCount} pages` : 'Scanning...'} • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => { setFile(null); setResults([]) }}>
                                Change File
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base">Split Mode</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <RadioOption
                                    label="Extract Pages"
                                    description="Extract specific pages into a new PDF"
                                    checked={mode === 'range'}
                                    onChange={() => setMode('range')}
                                />
                                <RadioOption
                                    label="Burst All Pages"
                                    description="Save every page as a separate PDF"
                                    checked={mode === 'extract'}
                                    onChange={() => setMode('extract')}
                                />
                            </div>

                            {mode === 'range' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <Label>Page Range</Label>
                                    <Input
                                        value={range}
                                        onChange={(e) => setRange(e.target.value)}
                                        placeholder="e.g. 1-5, 8, 11-13"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Enter page numbers and/or ranges separated by commas.
                                    </p>
                                </div>
                            )}

                            <Button className="w-full" size="lg" onClick={handleSplit} disabled={isProcessing || (mode === 'range' && !range)}>
                                <Scissors className="w-4 h-4 mr-2" />
                                {isProcessing ? 'Splitting...' : 'Split PDF'}
                            </Button>
                        </div>
                    </Card>

                    {/* Results */}
                    <div className="space-y-4">
                        {results.length > 0 && (
                            <Card className="p-4 space-y-4 bg-muted/30 border-dashed">
                                <div className="flex items-center gap-2 font-medium text-green-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Ready to Download</span>
                                </div>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                                    {results.map((res, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-background rounded border text-sm">
                                            <span className="truncate max-w-[120px]" title={res.name}>{res.name}</span>
                                            <Button size="sm" variant="outline" className="h-7" onClick={() => handleDownload(res.blob, res.name)}>
                                                <Download className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {results.length === 0 && !isProcessing && (
                            <Card className="p-8 border-dashed flex flex-col items-center justify-center text-center text-muted-foreground h-full min-h-[200px]">
                                <Scissors className="w-8 h-8 mb-2 opacity-20" />
                                <p className="text-sm">Processed files will appear here</p>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
