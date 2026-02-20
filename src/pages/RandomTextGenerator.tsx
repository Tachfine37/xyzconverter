import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from 'lucide-react'
import { toast } from "sonner"
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { RANDOM_TEXT_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { SEOContentSection } from "@/components/seo/SEOContentSection"

export function RandomTextGenerator() {
    usePageSEO()
    const content = CONVERSION_CONTENT['/random-text-generator']

    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'UtilitiesApplication'
        })
        injectStructuredData(schema)
    }, [content])

    const [length, setLength] = useState(16)
    const [count, setCount] = useState(1)
    const [useUppercase, setUseUppercase] = useState(true)
    const [useLowercase, setUseLowercase] = useState(true)
    const [useNumbers, setUseNumbers] = useState(true)
    const [useSymbols, setUseSymbols] = useState(true)
    const [output, setOutput] = useState("")

    useEffect(() => {
        generate()
    }, [])

    const generate = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowercase = "abcdefghijklmnopqrstuvwxyz"
        const numbers = "0123456789"
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

        let chars = ""
        if (useUppercase) chars += uppercase
        if (useLowercase) chars += lowercase
        if (useNumbers) chars += numbers
        if (useSymbols) chars += symbols

        if (chars === "") {
            setOutput("Please select at least one character type.")
            return
        }

        let result = []
        for (let i = 0; i < count; i++) {
            let str = ""
            const array = new Uint32Array(length);
            window.crypto.getRandomValues(array);
            for (let j = 0; j < length; j++) {
                str += chars[array[j] % chars.length]
            }
            result.push(str)
        }

        setOutput(result.join("\n"))
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        toast.success("Copied to clipboard")
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Random Text Generator</h1>
                <p className="text-xl text-muted-foreground">
                    Generate secure random strings, passwords, and characters.
                </p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Label>Settings</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="upper" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="upper">Uppercase (A-Z)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="lower" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="lower">Lowercase (a-z)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="num" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="num">Numbers (0-9)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="sym" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="sym">Symbols (!@#)</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="length">Length</Label>
                                    <Input
                                        id="length"
                                        type="number"
                                        min="1"
                                        max="1024"
                                        value={length}
                                        onChange={(e) => setLength(parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="count">Quantity</Label>
                                    <Input
                                        id="count"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={count}
                                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                                    />
                                </div>
                            </div>

                            <Button onClick={generate} size="lg" className="w-full gap-2">
                                <RefreshCw className="w-4 h-4" /> Generate Random Text
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>Result</Label>
                                <Button size="sm" variant="ghost" onClick={copyToClipboard} disabled={!output} className="gap-2">
                                    <Copy className="w-4 h-4" /> Copy
                                </Button>
                            </div>
                            <Textarea
                                readOnly
                                value={output}
                                className="min-h-[250px] font-mono text-sm leading-relaxed"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {content.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                        <h3 className="font-semibold mb-2">{feature}</h3>
                    </div>
                ))}
            </div>

            <SEOContentSection content={content} />

            <div className="py-12 border-t">
                <FAQSection faqs={RANDOM_TEXT_FAQ} />
            </div>
        </div>
    )
}
