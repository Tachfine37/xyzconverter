import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Copy } from 'lucide-react'
import { toast } from "sonner"
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { REVERSE_TEXT_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { SEOContentSection } from "@/components/seo/SEOContentSection"

export function ReverseText() {
    usePageSEO()
    const content = CONVERSION_CONTENT['/reverse-text']

    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'UtilitiesApplication'
        })
        injectStructuredData(schema)
    }, [content])

    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [mode, setMode] = useState("reverse-text") // reverse-text, reverse-words

    useEffect(() => {
        if (!input) {
            setOutput("")
            return
        }

        if (mode === "reverse-text") {
            setOutput(input.split("").reverse().join(""))
        } else {
            if (mode === "reverse-words") {
                // Split by space, reverse array, join
                setOutput(input.split(" ").reverse().join(" "))
            }
        }
    }, [input, mode])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        toast.success("Copied to clipboard")
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Reverse Text Generator</h1>
                <p className="text-xl text-muted-foreground">
                    Instantly reverse text, flip words, or mirror lettering.
                </p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-lg">
                            <RadioGroup value={mode} onValueChange={setMode} className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="reverse-text" id="r-text" />
                                    <Label htmlFor="r-text">Reverse Text (dlroW olleH)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="reverse-words" id="r-words" />
                                    <Label htmlFor="r-words">Reverse Words (World Hello)</Label>
                                </div>
                            </RadioGroup>
                            <Button variant="outline" onClick={() => setInput("")}>Clear</Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Input</Label>
                                <Textarea
                                    placeholder="Type here..."
                                    className="min-h-[300px]"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>Result</Label>
                                    <Button size="sm" variant="ghost" onClick={copyToClipboard} disabled={!output}>
                                        <Copy className="w-4 h-4 mr-2" /> Copy
                                    </Button>
                                </div>
                                <Textarea
                                    readOnly
                                    className="min-h-[300px] bg-muted/50"
                                    value={output}
                                />
                            </div>
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
                <FAQSection faqs={REVERSE_TEXT_FAQ} />
            </div>
        </div>
    )
}
