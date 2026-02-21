import { usePageSEO } from '@/utils/seo'
import { useState, useEffect } from 'react'
import { Copy, Trash2, Link as LinkIcon, Settings2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FAQSection } from '@/components/seo/FAQSection'
import { SLUG_GENERATOR_FAQ } from '@/utils/structured-data'

export function SlugGenerator() {
    usePageSEO()
    const [text, setText] = useState('')
    const [slug, setSlug] = useState('')
    const [separator, setSeparator] = useState('-')
    const [removeNumbers, setRemoveNumbers] = useState(false)

    useEffect(() => {
        generateSlug()
    }, [text, separator, removeNumbers])

    const generateSlug = () => {
        let result = text.toLowerCase()

        // Remove numbers if checked
        if (removeNumbers) {
            result = result.replace(/[0-9]/g, '')
        }

        const currentSeparator = separator === 'none' ? '' : separator

        result = result
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .trim()
            .replace(/[\s_-]+/g, currentSeparator) // Replace spaces and separators with chosen separator

        if (currentSeparator) {
            result = result.replace(new RegExp(`^\\${currentSeparator}|\\${currentSeparator}$`, 'g'), '') // Remove leading/trailing separator
        }

        setSlug(result)
    }

    const handleCopy = () => {
        if (!slug) return
        navigator.clipboard.writeText(slug)
        toast.success('Slug copied to clipboard')
    }

    const handleClear = () => {
        setText('')
        setSlug('')
        toast.success('Cleared')
    }

    return (
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">


            <div className="text-center mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">URL Slug Generator</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Turn your text into clean, SEO-friendly URL slugs.
                    Perfect for blog posts, product pages, and permalinks.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input & Output Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Input */}
                    <div className="space-y-2">
                        <Label htmlFor="input-text">Input Text</Label>
                        <div className="relative bg-white border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                            <Textarea
                                id="input-text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-32 p-4 text-lg bg-transparent border-none focus-visible:ring-0 outline-none resize-none placeholder:text-muted-foreground/50"
                                placeholder="Type your title or text here..."
                            />
                            <div className="absolute bottom-2 right-2">
                                <Button onClick={handleClear} variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive" title="Clear">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-2">
                        <Label htmlFor="output-slug">Generated Slug</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    id="output-slug"
                                    value={slug}
                                    readOnly
                                    className="bg-muted/50 font-mono text-lg h-12 pr-12"
                                    placeholder="your-generated-slug-will-appear-here"
                                />
                            </div>
                            <Button onClick={handleCopy} className="h-12 px-6" disabled={!slug}>
                                <Copy className="w-4 h-4 mr-2" /> Copy
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Settings Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
                        <h3 className="font-semibold text-lg text-foreground pb-2 border-b flex items-center gap-2">
                            <Settings2 className="w-4 h-4" /> Settings
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Separator</Label>
                                <Select value={separator} onValueChange={setSeparator}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select separator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="-">Hyphen ( - )</SelectItem>
                                        <SelectItem value="_">Underscore ( _ )</SelectItem>
                                        <SelectItem value=".">Dot ( . )</SelectItem>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="remove-numbers" className="cursor-pointer">Remove Numbers</Label>
                                <input
                                    type="checkbox"
                                    id="remove-numbers"
                                    checked={removeNumbers}
                                    onChange={(e) => setRemoveNumbers(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <h4 className="font-semibold text-blue-900 mb-2 text-sm">SEO Tip</h4>
                        <p className="text-sm text-blue-700">
                            Use hyphens (-) for separators. Google treats hyphens as space separators, but treats underscores (_) as joining characters.
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Tools Section */}
            <section className="mt-16 mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Related Text Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/case-converter" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                <Settings2 className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Case Converter</h3>
                        <p className="text-muted-foreground text-sm">Convert text to Uppercase, Lowercase, Title Case, and more.</p>
                    </Link>

                    <Link to="/remove-extra-spaces" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                <LinkIcon className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Remove Extra Spaces</h3>
                        <p className="text-muted-foreground text-sm">Clean up your text by removing double spaces and line breaks.</p>
                    </Link>

                    <Link to="/word-counter" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <LinkIcon className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Word Counter</h3>
                        <p className="text-muted-foreground text-sm">Count words, characters, sentences, and paragraphs.</p>
                    </Link>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="mt-20 mb-20 bg-slate-50/50 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-3xl mx-auto prose prose-slate max-w-none">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">About Slug Generator</h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">What is a URL Slug?</h3>
                            <p className="text-muted-foreground mb-4">
                                A URL slug is the part of a URL that identifies a specific page. It's usually the end part of the URL
                                and should be easy to read for both people and search engines.
                                <br />
                                Example: <code>xyzconverter.com/<strong>slug-generator</strong></code>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Why optimize slugs?</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li><strong>SEO:</strong> Clean slugs help search engines understand what your page is about.</li>
                                <li><strong>Readability:</strong> Users are more likely to click on clear, descriptive URLs.</li>
                                <li><strong>Sharing:</strong> Short, clean URLs are easier to share on social media.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection faqs={SLUG_GENERATOR_FAQ} />
        </div>
    )
}
