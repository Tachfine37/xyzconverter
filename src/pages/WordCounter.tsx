import { usePageSEO } from '@/utils/seo'
import { useState, useEffect } from 'react'
import { Copy, Trash2, Clock, Info, PenTool, GraduationCap, Search, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { RelatedTools, RELATED_TOOLS_MAP } from '@/components/seo/RelatedTools'

export function WordCounter() {
    usePageSEO()
const [text, setText] = useState('')
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpace: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
    })

    useEffect(() => {
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
        const chars = text.length
        const charsNoSpace = text.replace(/\s/g, '').length
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length
        const readingTime = Math.ceil(words / 200)

        setStats({
            words,
            chars,
            charsNoSpace,
            sentences,
            paragraphs,
            readingTime
        })
    }, [text])

    const copyText = () => {
        if (text) {
            navigator.clipboard.writeText(text)
            toast.success("Text copied to clipboard")
        }
    }

    const clearText = () => {
        setText('')
        toast.success("Text cleared")
    }

    return (
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
            

            <div className="text-center mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Free Online Word Counter Tool</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Simply type or paste your text below to see real-time word, character, and sentence counts.
                    Perfect for writers, students, and SEO professionals.
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
                            placeholder="Type or paste your text here to start counting..."
                        />

                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button onClick={copyText} variant="outline" size="icon" className="h-9 w-9" title="Copy Text">
                                <Copy className="w-4 h-4" />
                            </Button>
                            <Button onClick={clearText} variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30" title="Clear Text">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-4 h-fit">
                    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
                        <h3 className="font-semibold text-lg text-foreground pb-2 border-b">Statistics</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-lg border transition-all hover:translate-y-[-2px] hover:shadow-sm">
                                <div className="text-3xl font-bold text-primary">{stats.words}</div>
                                <div className="text-sm text-muted-foreground font-medium">Words</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border transition-all hover:translate-y-[-2px] hover:shadow-sm">
                                <div className="text-3xl font-bold text-blue-600">{stats.chars}</div>
                                <div className="text-sm text-muted-foreground font-medium">Characters</div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                                <span className="text-muted-foreground">Chars (no spaces)</span>
                                <span className="font-mono font-medium text-foreground">{stats.charsNoSpace}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                                <span className="text-muted-foreground">Sentences</span>
                                <span className="font-mono font-medium text-foreground">{stats.sentences}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                                <span className="text-muted-foreground">Paragraphs</span>
                                <span className="font-mono font-medium text-foreground">{stats.paragraphs}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-2">
                                <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Reading Time</span>
                                <span className="font-mono font-medium text-foreground">{stats.readingTime} min</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-800">
                        <div className="flex gap-2 font-medium mb-1"><Info className="w-4 h-4" /> Did you know?</div>
                        The average speaking rate is 130 words per minute, while reading speed is about 200 words per minute.
                    </div>
                </div>
            </div>

            {/* SEO Content Section */}
            <section className="mt-20 mb-20 bg-slate-50/50 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-3xl mx-auto prose prose-slate max-w-none">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">About the Word Counter Tool</h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">What is a Word Counter?</h3>
                            <p className="text-muted-foreground mb-4">
                                A word counter is a utility that counts the number of words, characters, sentences, and paragraphs in a text.
                                It is an essential tool for ensuring your writing meets specific length requirements for assignments, articles, social media posts, or reports.
                            </p>
                            <p className="text-muted-foreground">
                                Our <strong>online word counter</strong> analyzes your text instantly in your browser, providing accurate metrics without ever storing your data.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Why Use an Online Word Counter?</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li><strong>For Social Media:</strong> Check character limits for Twitter (280) or Instagram captions.</li>
                                <li><strong>For SEO:</strong> Ensure your blog posts have the optimal length (usually &gt;800 words) to rank on Google.</li>
                                <li><strong>For Students:</strong> Verify you meet the minimum word count for essays and papers.</li>
                                <li><strong>For Translators:</strong> Estimate pricing based on word count.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-xl border shadow-sm mb-12 md:mb-16">
                        <h3 className="text-xl font-semibold mb-6 text-foreground text-center">Who Needs a Word Counter?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                                    <PenTool className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">Content Writers</div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">Students</div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                    <Search className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">SEO Experts</div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">Social Managers</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">Tips to Reduce Word Count</h3>
                            <p className="text-muted-foreground mb-2">If you're over your limit, try these strategies:</p>
                            <ul className="text-muted-foreground list-disc pl-5 space-y-1">
                                <li><strong>Remove redundant adverbs:</strong> Instead of "ran quickly," use "sprinted".</li>
                                <li><strong>Eliminate filler words:</strong> Words like "basically," "actually," and "very" often add no value.</li>
                                <li><strong>Use active voice:</strong> "The ball was thrown by John" (6 words) vs "John threw the ball" (4 words).</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">Tips to Increase Word Count</h3>
                            <p className="text-muted-foreground mb-2">Need to reach a minimum length? Expand your ideas:</p>
                            <ul className="text-muted-foreground list-disc pl-5 space-y-1">
                                <li><strong>Add examples:</strong> Use concrete examples to illustrate your points.</li>
                                <li><strong>Clarify with "In other words":</strong> Rephrase complex ideas for better understanding.</li>
                                <li><strong>Include counter-arguments:</strong> Address opposing views to add depth to your writing.</li>
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
                        { q: "How does the word counter work?", a: "Our tool uses JavaScript to analyze your text in real-time. It detects spaces to count words and standard punctuation to identify sentences and paragraphs." },
                        { q: "Does this tool store my text?", a: "No, absolutely not. All processing happens locally on your device (client-side). Your text is never sent to our servers." },
                        { q: "Is there a limit to how many words I can count?", a: "There is no hard limit. You can paste thousands of words, and our tool will handle it instantly." },
                        { q: "Can I use this for social media posts?", a: "Yes! Use the character count with and without spaces to check limits for Twitter, Instagram, LinkedIn, and Facebook posts." }
                    ].map((faq, i) => (
                        <div key={i} className="border rounded-lg p-5 bg-white hover:border-primary/50 transition-colors shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Tools */}
            <RelatedTools tools={RELATED_TOOLS_MAP['/word-counter'] || []} />
        </div>
    )
}
