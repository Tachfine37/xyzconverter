import { useState } from 'react'
import { ArrowRightLeft, Copy, Download, ArrowRight } from 'lucide-react'
import { usePageSEO } from "@/utils/seo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { convertData, type DataFormat } from '@/utils/data-tools'
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { DATA_TOOLS_FAQ } from "@/utils/structured-data"
import { FAQSection } from "@/components/seo/FAQSection"

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
                        <h1 className="text-3xl font-bold tracking-tight text-primary-700">Online Data Format Converter – JSON, YAML, XML & Base64 Tools</h1>
                        <p className="text-muted-foreground mt-1 max-w-3xl leading-relaxed">
                            Easily <strong className="font-medium text-foreground">convert JSON to YAML</strong>, <strong className="font-medium text-foreground">JSON to XML</strong>, or perform <strong className="font-medium text-foreground">XML to JSON</strong> conversions online. Includes a <strong className="font-medium text-foreground">Base64 encoder and decoder</strong>. This <strong className="font-medium text-foreground">browser-based tool</strong> ensures <strong className="font-medium text-foreground">no upload required</strong>—securely process your data locally.
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


                {
                    CONVERSION_CONTENT['/data-tools'] && (
                        <div className="space-y-12 pt-8 border-t">
                            {/* Supported Conversions */}
                            <div className="space-y-8">
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tight">Supported Data Conversions</h2>
                                    <p className="text-muted-foreground">Versatile tools for developers</p>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {CONVERSION_CONTENT['/data-tools'].features?.map((feature, i) => (
                                        <div key={i} className="flex gap-3 items-center p-4 rounded-lg bg-muted/30 border border-border/50">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            <span className="font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How It Works */}
                            <div className="space-y-8">
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
                                    <p className="text-muted-foreground">Simple steps to convert your data</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {CONVERSION_CONTENT['/data-tools'].howItWorks?.steps.map((step, i) => (
                                        <div key={i} className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors shadow-sm text-center space-y-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto">{i + 1}</div>
                                            <p className="font-medium">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <FAQSection faqs={DATA_TOOLS_FAQ} />
                        </div>
                    )
                }
            </main >
        </div >
    )
}
