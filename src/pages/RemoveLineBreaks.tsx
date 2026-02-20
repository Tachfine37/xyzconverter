import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Copy, ArrowRight } from 'lucide-react'
import { toast } from "sonner"
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { REMOVE_LINE_BREAKS_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { SEOContentSection } from "@/components/seo/SEOContentSection"

export function RemoveLineBreaks() {
    usePageSEO()
    const content = CONVERSION_CONTENT['/remove-line-breaks']

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
    const [mode, setMode] = useState("space")

    const handleRemove = () => {
        let result = input

        // Normalize line endings
        result = result.replace(/\r\n/g, "\n");
        result = result.replace(/\r/g, "\n");

        switch (mode) {
            case "space":
                result = result.replace(/\n/g, " ");
                break;
            case "comma":
                result = result.replace(/\n/g, ", ");
                break;
            case "none":
                result = result.replace(/\n/g, "");
                break;
        }

        // Clean up double spaces if any
        if (mode === "space") {
            result = result.replace(/ +/g, " ");
        }

        setOutput(result.trim())
        toast.success("Line breaks removed!")
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        toast.success("Copied to clipboard")
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Remove Line Breaks</h1>
                <p className="text-xl text-muted-foreground">
                    Clean up your text by removing unnecessary line breaks and newlines.
                </p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Input Text</Label>
                        <Textarea
                            placeholder="Paste your text with line breaks here..."
                            className="min-h-[200px] font-mono"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-2 w-full md:w-auto">
                            <Label>Replace line breaks with:</Label>
                            <RadioGroup value={mode} onValueChange={setMode} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="space" id="space" />
                                    <Label htmlFor="space">Space</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comma" id="comma" />
                                    <Label htmlFor="comma">Comma</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="none" />
                                    <Label htmlFor="none">Nothing</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button onClick={handleRemove} size="lg" className="w-full md:w-auto gap-2">
                            Remove Breaks <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>Result</Label>
                            <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={!output} className="gap-2">
                                <Copy className="w-4 h-4" /> Copy
                            </Button>
                        </div>
                        <Textarea
                            readOnly
                            placeholder="Result will appear here..."
                            className="min-h-[200px] font-mono bg-muted"
                            value={output}
                        />
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
                <FAQSection faqs={REMOVE_LINE_BREAKS_FAQ} />
            </div>
        </div>
    )
}
