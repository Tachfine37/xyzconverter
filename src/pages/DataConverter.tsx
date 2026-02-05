import { useState } from 'react'
import { ArrowRightLeft, Copy, Download, ArrowRight } from 'lucide-react'
import { usePageSEO } from "@/utils/seo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { convertData, type DataFormat } from '@/utils/data-tools'

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        {...props}
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`}
    />
)

export function DataConverter() {
    usePageSEO({
        title: 'Data Format Converter (JSON, YAML, XML, Base64)',
        description: 'Convert between JSON, YAML, XML, and Base64 instantly. Developer friendly tools running 100% locally.'
    })

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [inputFormat, setInputFormat] = useState<DataFormat>('json')
    const [outputFormat, setOutputFormat] = useState<DataFormat>('yaml')

    const handleConvert = () => {
        if (!input.trim()) return

        const result = convertData(input, inputFormat, outputFormat)
        if (result.error) {
            toast.error('Conversion Failed', { description: result.error })
            setOutput('')
        } else {
            setOutput(result.data)
            toast.success('Converted Successfully')
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(output)
        toast.success('Copied to clipboard')
    }

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `converted-${Date.now()}.${outputFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const swapFormats = () => {
        setInputFormat(outputFormat)
        setOutputFormat(inputFormat)
        setInput(output)
        setOutput(input) // Swapping content too as a convenience
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <main className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Data Converter</h1>
                        <p className="text-muted-foreground mt-1">
                            Convert between JSON, YAML, XML, and Base64.
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 bg-muted/40 p-4 rounded-lg border">
                    <Select value={inputFormat} onValueChange={(v) => setInputFormat(v as DataFormat)}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Input" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="yaml">YAML</SelectItem>
                            <SelectItem value="xml">XML</SelectItem>
                            <SelectItem value="base64">Base64</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                        </SelectContent>
                    </Select>

                    <ArrowRight className="w-4 h-4 text-muted-foreground" />

                    <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as DataFormat)}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Output" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="yaml">YAML</SelectItem>
                            <SelectItem value="xml">XML</SelectItem>
                            <SelectItem value="base64">Base64</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="ghost" size="icon" onClick={swapFormats} title="Swap Formats">
                        <ArrowRightLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex-1" />

                    <Button onClick={handleConvert}>Convert</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
                    {/* Input Pane */}
                    <Card className="flex flex-col h-full">
                        <CardHeader className="pb-3 px-4 pt-4">
                            <CardTitle className="text-sm font-medium">Input ({inputFormat.toUpperCase()})</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 relative">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
                                className="h-full w-full border-0 resize-none rounded-none p-4 font-mono text-sm focus-visible:ring-0"
                            />
                        </CardContent>
                    </Card>

                    {/* Output Pane */}
                    <Card className="flex flex-col h-full bg-muted/30">
                        <CardHeader className="pb-3 px-4 pt-4">
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <span>Output ({outputFormat.toUpperCase()})</span>
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
            </main>
        </div>
    )
}
