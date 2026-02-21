import { usePageSEO } from '@/utils/seo'
import { useState, useEffect } from 'react'
import { Copy, Trash2, Clock, Info, Twitter, Instagram, Facebook, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { FAQSection } from '@/components/seo/FAQSection'
import { CHARACTER_COUNTER_FAQ } from '@/utils/structured-data'

export function CharacterCounter() {
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
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Free Online Character Counter Tool</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Simply type or paste your text below to see real-time character, word, and sentence counts.
                    Essential for social media posts, Meta titles, and ad copy.
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
                            placeholder="Type or paste your text here to start counting characters..."
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
                                <div className="text-3xl font-bold text-blue-600">{stats.chars}</div>
                                <div className="text-sm text-muted-foreground font-medium">Characters</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border transition-all hover:translate-y-[-2px] hover:shadow-sm">
                                <div className="text-3xl font-bold text-primary">{stats.charsNoSpace}</div>
                                <div className="text-sm text-muted-foreground font-medium">No Spaces</div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                                <span className="text-muted-foreground">Words</span>
                                <span className="font-mono font-medium text-foreground">{stats.words}</span>
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
                        Twitter (X) allows 280 characters. SMS messages are typically limited to 160 characters.
                    </div>
                </div>
            </div>

            {/* SEO Content Section */}
            <section className="mt-20 mb-20 bg-slate-50/50 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-3xl mx-auto prose prose-slate max-w-none">

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">About the Character Counter Tool</h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">What is a Character Counter?</h3>
                            <p className="text-muted-foreground mb-4">
                                A character counter is a tool that counts every single character in your text, including
                                letters, numbers, spaces, and punctuation marks.
                            </p>
                            <p className="text-muted-foreground">
                                Our <strong>online character counter</strong> provides instant, real-time results directly
                                in your browser, helping you stay within strict limits for social media and advertising
                                platforms.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Why Count Characters?</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li><strong>Social Media:</strong> Twitter (280), Instagram Bio (150).</li>
                                <li><strong>Advertising:</strong> Google Ads headlines (30).</li>
                                <li><strong>SEO:</strong> Meta Titles (&lt;60), Meta Descriptions (~160).</li>
                                <li><strong>SMS:</strong> Standard text messages (160).</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-xl border shadow-sm mb-12 md:mb-16">
                        <h3 className="text-xl font-semibold mb-6 text-foreground text-center">Character Limits Guide</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto">
                                    <Twitter className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">Twitter (280)</div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto">
                                    <Instagram className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">Instagram (2200)</div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                                    <Facebook className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">Facebook (63k)</div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="font-medium text-foreground">SMS (160)</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">Why differentiate "With Spaces" vs "No Spaces"?</h3>
                            <p className="text-muted-foreground mb-4">
                                Most platforms count spaces as characters (e.g., Twitter, SMS). However, some translation
                                services or specific writing guidelines may ask for a character count <em>excluding</em>
                                spaces to measure the actual volume of content more accurately. Our tool provides both
                                metrics instantly.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <FAQSection faqs={CHARACTER_COUNTER_FAQ} />
        </div>
    )
}
