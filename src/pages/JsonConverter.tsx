import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRightLeft, Copy, Download, Check } from 'lucide-react'
import { usePageSEO } from "@/utils/seo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { convertJsonToCsv, convertCsvToJson } from '@/utils/json-csv'

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        {...props}
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`}
    />
)

export function JsonConverter() {
    const navigate = useNavigate()
    const location = useLocation()

    // Determine mode based on path
    const isJsonToCsv = location.pathname.includes('json-to-csv')

    // Check if we have incoming files from navigation state
    const hasIncomingFiles = !!(location.state as { uploadedFiles?: File[] } | null)?.uploadedFiles
    const [isInitializing, setIsInitializing] = useState(hasIncomingFiles)

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [error, setError] = useState<string | null>(null)

    // SEO
    usePageSEO()

    useEffect(() => {
        const state = location.state as { uploadedFiles?: File[] } | null
        if (state?.uploadedFiles && state.uploadedFiles.length > 0) {
            const file = state.uploadedFiles[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const text = e.target?.result as string
                    setInput(text)
                }
                reader.readAsText(file)
            }
            window.history.replaceState({}, document.title)
        }
        setIsInitializing(false)
    }, [location.state])

    const handleConvert = () => {
        setError(null)
        try {
            if (!input.trim()) return

            let result = ''
            if (isJsonToCsv) {
                result = convertJsonToCsv(input)
            } else {
                result = convertCsvToJson(input)
            }
            setOutput(result)
            toast.success("Conversion successful")
        } catch (err) {
            console.error(err)
            const msg = err instanceof Error ? err.message : "Conversion failed"
            setError(msg)
            toast.error(msg)
        }
    }

    const handleCopy = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        toast.success("Copied to clipboard")
    }

    const handleDownload = () => {
        if (!output) return
        const blob = new Blob([output], { type: isJsonToCsv ? 'text/csv' : 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `converted.${isJsonToCsv ? 'csv' : 'json'}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const toggleMode = () => {
        if (isJsonToCsv) {
            navigate('/csv-to-json')
        } else {
            navigate('/json-to-csv')
        }
        if (output && !error) {
            setInput(output)
            setOutput('')
        } else {
            setInput('')
            setOutput('')
        }
        setError(null)
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target?.result as string
            setInput(text)
        }
        reader.readAsText(file)
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <main className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isJsonToCsv ? 'JSON to CSV' : 'CSV to JSON'} Converter
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {isJsonToCsv
                                ? 'Convert flattened JSON arrays to CSV for Excel/Sheets.'
                                : 'Convert CSV data to structured JSON arrays.'}
                        </p>
                    </div>
                    <Button variant="outline" onClick={toggleMode} className="gap-2">
                        <ArrowRightLeft className="w-4 h-4" />
                        Switch to {isJsonToCsv ? 'CSV -> JSON' : 'JSON -> CSV'}
                    </Button>
                </div>

                {isInitializing ? (
                    <div className="h-[600px] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
                        {/* Input Pane */}
                        <Card className="flex flex-col h-full">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center justify-between">
                                    <span>Input {isJsonToCsv ? 'JSON' : 'CSV'}</span>
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="file-upload" className="cursor-pointer text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80 transition-colors">
                                            Upload File
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept={isJsonToCsv ? ".json" : ".csv,.txt"}
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 p-0 relative">
                                <Textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isJsonToCsv
                                        ? '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]'
                                        : 'name,age\nAlice,30\nBob,25'}
                                    className="h-full w-full border-0 resize-none rounded-none p-4 font-mono text-sm focus-visible:ring-0"
                                />
                            </CardContent>
                        </Card>

                        {/* Output Pane */}
                        <Card className="flex flex-col h-full bg-muted/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center justify-between">
                                    <span>Output {isJsonToCsv ? 'CSV' : 'JSON'}</span>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleCopy} disabled={!output}>
                                            <Copy className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleDownload} disabled={!output}>
                                            <Download className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 p-0">
                                <Textarea
                                    value={output}
                                    readOnly
                                    placeholder="Result will appear here..."
                                    className="h-full w-full border-0 resize-none rounded-none p-4 font-mono text-sm focus-visible:ring-0 bg-transparent"
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="flex justify-center">
                    <Button size="lg" onClick={handleConvert} className="w-full md:w-auto min-w-[200px] gap-2">
                        <Check className="w-4 h-4" />
                        Convert {isJsonToCsv ? 'to CSV' : 'to JSON'}
                    </Button>
                </div>
            </main>
        </div>
    )
}
