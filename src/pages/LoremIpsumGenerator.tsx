import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, RefreshCw } from 'lucide-react'
import { toast } from "sonner"
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { LOREM_IPSUM_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { SEOContentSection } from "@/components/seo/SEOContentSection"

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, quas.

Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.`

const SENTENCES = LOREM_TEXT.replace(/\.\s+/g, ".|").split("|")
const WORDS = LOREM_TEXT.replace(/[.,]/g, "").split(/\s+/)

export function LoremIpsumGenerator() {
    usePageSEO()
    const content = CONVERSION_CONTENT['/lorem-ipsum-generator']

    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'UtilitiesApplication'
        })
        injectStructuredData(schema)
    }, [content])

    const [type, setType] = useState("paragraphs")
    const [count, setCount] = useState(3)
    const [output, setOutput] = useState("")

    useEffect(() => {
        generate()
    }, [type, count])

    const generate = () => {
        let result = ""
        if (type === "paragraphs") {
            // Simple looped paragraph generation
            const paragraphs = LOREM_TEXT.split("\n\n")
            let generated = []
            for (let i = 0; i < count; i++) {
                generated.push(paragraphs[i % paragraphs.length])
            }
            result = generated.join("\n\n")
        } else if (type === "sentences") {
            let generated = []
            for (let i = 0; i < count; i++) {
                generated.push(SENTENCES[i % SENTENCES.length])
            }
            result = generated.join(" ")
        } else if (type === "words") {
            let generated = []
            for (let i = 0; i < count; i++) {
                generated.push(WORDS[i % WORDS.length])
            }
            result = generated.join(" ")
        }
        setOutput(result)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        toast.success("Copied to clipboard")
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Lorem Ipsum Generator</h1>
                <p className="text-xl text-muted-foreground">
                    Generate placeholder text for your designs and layouts.
                </p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/30 p-4 rounded-lg">
                        <div className="space-y-2 flex-1">
                            <Label>Generate</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    min="1"
                                    max="500"
                                    value={count}
                                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                                    className="w-24"
                                />
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                                        <SelectItem value="sentences">Sentences</SelectItem>
                                        <SelectItem value="words">Words</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button onClick={generate} size="lg" className="gap-2">
                            <RefreshCw className="w-4 h-4" /> Generate
                        </Button>
                        <Button onClick={copyToClipboard} size="lg" variant="secondary" className="gap-2">
                            <Copy className="w-4 h-4" /> Copy
                        </Button>
                    </div>

                    <Textarea
                        readOnly
                        value={output}
                        className="min-h-[400px] font-serif text-lg leading-relaxed p-6"
                    />
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
                <FAQSection faqs={LOREM_IPSUM_FAQ} />
            </div>
        </div>
    )
}
