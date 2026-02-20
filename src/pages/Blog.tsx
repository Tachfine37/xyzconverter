import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

const POSTS = [
    {
        slug: 'how-to-compress-pdf',
        title: '5 Ways to Compress a PDF Without Losing Quality (2026)',
        description: '5 proven methods to compress a PDF file — from free browser tools to Adobe Acrobat. Includes a tool comparison table and step-by-step instructions.',
        date: 'February 20, 2026',
        readingTime: '6',
        category: 'Guides',
        href: '/blog/how-to-compress-pdf',
    },
    {
        slug: 'heic-to-jpg-windows',
        title: 'How to Convert iPhone HEIC Photos to JPG on Windows (Free, No Software)',
        description: 'Step-by-step guide to convert iPhone HEIC photos to JPG on Windows 10 & 11 without installing any software. Works online, free, and private.',
        date: 'February 20, 2026',
        readingTime: '7',
        category: 'Guides',
        href: '/blog/heic-to-jpg-windows',
    }
]

export function Blog() {
    useEffect(() => {
        document.title = 'Blog – File Conversion Guides & Tips | XYZCONVERTER'
        const desc = document.querySelector('meta[name="description"]')
        if (desc) desc.setAttribute('content', 'Free guides, tips, and tutorials on converting images, PDFs, and files. Learn how to convert HEIC, WebP, PDF and more.')
    }, [])

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">XYZConverter Blog</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Free guides, tutorials, and tips on converting images, PDFs, and data files.
                    No fluff — just actionable, step-by-step instructions.
                </p>
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-1 gap-6">
                {POSTS.map(post => (
                    <Link
                        key={post.slug}
                        to={post.href}
                        className="group block rounded-xl border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.readingTime} min read
                                </span>
                            </div>

                            <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">{post.description}</p>

                            <div className="flex items-center gap-1.5 text-sm text-primary font-medium mt-1">
                                Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
