import { useState } from 'react'
import { Copy, Trash2, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

export function CaseConverter() {
    const [text, setText] = useState('')

    const handleCopy = () => {
        if (!text) return
        navigator.clipboard.writeText(text)
        toast.success('Text copied to clipboard')
    }

    const handleClear = () => {
        setText('')
        toast.success('Text cleared')
    }

    const toUpperCase = () => setText(text.toUpperCase())
    const toLowerCase = () => setText(text.toLowerCase())

    const toTitleCase = () => {
        setText(
            text.toLowerCase().split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        )
    }

    const toSentenceCase = () => {
        setText(
            text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
        )
    }

    const toAlternatingCase = () => {
        let result = ''
        for (let i = 0; i < text.length; i++) {
            if (i % 2 === 0) {
                result += text[i].toLowerCase()
            } else {
                result += text[i].toUpperCase()
            }
        }
        setText(result)
    }

    const toInverseCase = () => {
        let result = ''
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            if (char === char.toUpperCase()) {
                result += char.toLowerCase()
            } else {
                result += char.toUpperCase()
            }
        }
        setText(result)
    }

    const toCapitalizedCase = () => {
        setText(
            text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
        )
    }

    return (
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
            <Helmet>
                <title>Free Online Case Converter Tool - Uppercase, Lowercase, Title Case | XYZCONVERTER</title>
                <meta name="description" content="Convert text between Uppercase, Lowercase, Title Case, Sentence Case, and more instantly. Free online text case converter tool." />
            </Helmet>

            <div className="text-center mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Free Online Case Converter</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Instantly convert your text to Uppercase, Lowercase, Title Case, Sentence Case, and more.
                    Simply paste your text and choose your desired format.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative bg-white border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-64 md:h-[400px] p-6 text-lg bg-transparent border-none focus-visible:ring-0 outline-none resize-none font-mono text-foreground placeholder:text-muted-foreground/50"
                            placeholder="Type or paste your text here to convert..."
                        />

                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button onClick={handleCopy} variant="outline" size="icon" className="h-9 w-9" title="Copy Text">
                                <Copy className="w-4 h-4" />
                            </Button>
                            <Button onClick={handleClear} variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30" title="Clear Text">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Controls Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
                        <h3 className="font-semibold text-lg text-foreground pb-2 border-b">Conversion Options</h3>

                        <div className="grid grid-cols-1 gap-3">
                            <Button onClick={toUpperCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> UPPERCASE
                            </Button>
                            <Button onClick={toLowerCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> lowercase
                            </Button>
                            <Button onClick={toTitleCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> Title Case
                            </Button>
                            <Button onClick={toSentenceCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> Sentence case
                            </Button>
                            <Button onClick={toCapitalizedCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> Capitalized Case
                            </Button>
                            <Button onClick={toAlternatingCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> aLtErNaTiNg cAsE
                            </Button>
                            <Button onClick={toInverseCase} variant="outline" className="justify-start">
                                <ArrowRightLeft className="w-4 h-4 mr-2 text-muted-foreground" /> InVeRsE CaSe
                            </Button>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border text-sm text-muted-foreground">
                            <p>Select an option above to instantly convert your text.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Content Section */}
            <section className="mt-20 mb-20 bg-slate-50/50 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-3xl mx-auto prose prose-slate max-w-none">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">About Case Converter</h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">What is a Case Converter?</h3>
                            <p className="text-muted-foreground mb-4">
                                A case converter is a simple tool that changes the capitalization of your text.
                                Whether you left caps lock on, want to format a title properly, or need to standardize user input,
                                this tool handles it instantly.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Why Use It?</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li><strong>Fix Accidental Caps Lock:</strong> Use "Sentence case" or "lowercase" to fix text typed with Caps Lock on.</li>
                                <li><strong>Format Titles:</strong> Use "Title Case" for blog posts, essays, and headlines.</li>
                                <li><strong>Clean Up Data:</strong> Standardize lists of names or addresses with "Capitalized Case".</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">Available Formats</h3>
                            <ul className="text-muted-foreground list-disc pl-5 space-y-2">
                                <li><strong>UPPERCASE:</strong> Converts all letters to capitals. Example: HELLO WORLD.</li>
                                <li><strong>lowercase:</strong> Converts all letters to small letters. Example: hello world.</li>
                                <li><strong>Title Case:</strong> Capitalizes the first letter of major words. Example: Hello World.</li>
                                <li><strong>Sentence case:</strong> Capitalizes the first letter of the sentence. Example: Hello world.</li>
                                <li><strong>Capitalized Case:</strong> Capitalizes the first letter of every word. Example: Hello World.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto mb-20">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 md:mb-10">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        { q: "Is the text conversion private?", a: "Yes, absolutely. All conversions happen directly in your browser using JavaScript. Your text is never sent to our servers." },
                        { q: "Is there a limit to how much text I can convert?", a: "No, there is no practical limit. You can paste large documents and converting them will be nearly instant." },
                        { q: "Can I use this for coding variables?", a: "While this tool handles standard text, for coding cases like camelCase or snake_case, check out our other developer tools." }
                    ].map((faq, i) => (
                        <div key={i} className="border rounded-lg p-5 bg-white hover:border-primary/50 transition-colors shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
