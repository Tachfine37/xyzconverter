import { usePageSEO } from '@/utils/seo'
import { useState } from 'react'
import { Copy, Trash2, Eraser, AlignLeft, Type, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { FAQSection } from '@/components/seo/FAQSection'
import { REMOVE_EXTRA_SPACES_FAQ } from '@/utils/structured-data'

export function RemoveExtraSpaces() {
    usePageSEO()
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

    const removeExtraSpaces = () => {
        // Replaces 2 or more spaces with a single space
        setText(text.replace(/\s{2,}/g, ' ').trim())
        toast.success('Extra spaces removed')
    }

    const removeAllSpaces = () => {
        setText(text.replace(/\s/g, ''))
        toast.success('All spaces removed')
    }

    const removeLineBreaks = () => {
        setText(text.replace(/[\r\n]+/g, ' ').trim())
        toast.success('Line breaks removed')
    }

    const removeEmptyLines = () => {
        setText(text.split('\n').filter(line => line.trim() !== '').join('\n'))
        toast.success('Empty lines removed')
    }

    const trimLines = () => {
        setText(text.split('\n').map(line => line.trim()).join('\n'))
        toast.success('Lines trimmed')
    }

    return (
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">


            <div className="text-center mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Remove Extra Spaces</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Clean up your text by removing unnecessary spaces, tabs, and line breaks.
                    Perfect for formatting code, essays, or data.
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
                            placeholder="Paste your text here..."
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
                        <h3 className="font-semibold text-lg text-foreground pb-2 border-b">Cleanup Options</h3>

                        <div className="grid grid-cols-1 gap-3">
                            <Button onClick={removeExtraSpaces} variant="outline" className="justify-start">
                                <Eraser className="w-4 h-4 mr-2 text-muted-foreground" /> Remove Extra Spaces
                            </Button>
                            <Button onClick={trimLines} variant="outline" className="justify-start">
                                <AlignLeft className="w-4 h-4 mr-2 text-muted-foreground" /> Trim Each Line
                            </Button>
                            <Button onClick={removeEmptyLines} variant="outline" className="justify-start">
                                <AlignLeft className="w-4 h-4 mr-2 text-muted-foreground" /> Remove Empty Lines
                            </Button>
                            <Button onClick={removeLineBreaks} variant="outline" className="justify-start">
                                <Type className="w-4 h-4 mr-2 text-muted-foreground" /> Remove Line Breaks
                            </Button>
                            <Button onClick={removeAllSpaces} variant="outline" className="justify-start">
                                <Eraser className="w-4 h-4 mr-2 text-muted-foreground" /> Remove All Spaces
                            </Button>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border text-sm text-muted-foreground">
                            <p>Click an option to instantly process your text.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Tools Section */}
            <section className="mt-16 mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Related Text Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/word-counter" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <Type className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Word Counter</h3>
                        <p className="text-muted-foreground text-sm">Count words, characters, sentences, and paragraphs in real-time.</p>
                    </Link>

                    <Link to="/case-converter" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                <Type className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Case Converter</h3>
                        <p className="text-muted-foreground text-sm">Convert text to Uppercase, Lowercase, Title Case, and more.</p>
                    </Link>

                    <Link to="/character-counter" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                                <Type className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Character Counter</h3>
                        <p className="text-muted-foreground text-sm">Track character counts with and without spaces for social media.</p>
                    </Link>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="mt-20 mb-20 bg-slate-50/50 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-3xl mx-auto prose prose-slate max-w-none">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">About This Tool</h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">What does it do?</h3>
                            <p className="text-muted-foreground mb-4">
                                This tool helps you format text by solving common spacing issues. It can remove double spaces,
                                delete empty lines, trim extra trailing spaces from lines, or remove line breaks completely.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Why remove extra spaces?</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li><strong>Fix Formating:</strong> Clean up text copied from PDFs or websites that has weird spacing.</li>
                                <li><strong>Compress Text:</strong> Remove line breaks to make text occupy less space.</li>
                                <li><strong>Prepare Data:</strong> Standardize whitespace before CSV or database import.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection faqs={REMOVE_EXTRA_SPACES_FAQ} />
        </div>
    )
}
