/**
 * BlogPost layout component
 * Wraps blog articles with consistent styling, breadcrumbs, and related tools CTAs.
 */

import { Link } from 'react-router-dom'
import { ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogPostProps {
    children: React.ReactNode
    title: string
    description: string
    publishDate: string
    readingTime: string
    category?: string
    categoryHref?: string
    ctaPath?: string
    ctaLabel?: string
}

export function BlogPost({
    children,
    title,
    description,
    publishDate,
    readingTime,
    category = 'Guides',
    categoryHref = '/blog',
    ctaPath = '/heic-to-jpg',
    ctaLabel = 'Convert HEIC to JPG Free →'
}: BlogPostProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero / header */}
            <div className="border-b bg-muted/30">
                <div className="container max-w-4xl mx-auto px-4 py-12 space-y-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to={categoryHref} className="hover:text-foreground transition-colors">{category}</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-foreground truncate max-w-xs">{title}</span>
                    </nav>

                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {publishDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {readingTime} min read
                        </span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
                    {/* Article content */}
                    <article className="prose prose-slate dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:leading-relaxed prose-p:text-foreground/90
                        prose-li:text-foreground/90 prose-li:my-1
                        prose-strong:text-foreground
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-code:text-primary prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:text-sm
                        prose-blockquote:border-primary prose-blockquote:bg-muted/40 prose-blockquote:rounded-r-md prose-blockquote:py-1">
                        {children}
                    </article>

                    {/* Sticky sidebar */}
                    <aside className="space-y-6">
                        <div className="sticky top-24 space-y-4">
                            {/* CTA card */}
                            <div className="rounded-xl border bg-card p-6 space-y-4">
                                <div className="text-2xl font-bold text-center">📱➡️🖼️</div>
                                <h3 className="font-bold text-base text-center">Try it right now</h3>
                                <p className="text-sm text-muted-foreground text-center">
                                    Free, instant, no software needed. Works directly in your browser.
                                </p>
                                <Link
                                    to={ctaPath}
                                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    {ctaLabel}
                                </Link>
                                <p className="text-xs text-center text-muted-foreground">
                                    ✅ No uploads • ✅ No account • ✅ Free forever
                                </p>
                            </div>

                            {/* Related links */}
                            <div className="rounded-xl border bg-card p-5 space-y-3">
                                <h3 className="font-semibold text-sm text-foreground">More HEIC Guides</h3>
                                <div className="space-y-2">
                                    {[
                                        { label: 'Convert HEIC to PNG', href: '/heic-to-png' },
                                        { label: 'Convert HEIC to PDF', href: '/heic-to-pdf' },
                                        { label: 'Compress Images', href: '/compress-image' },
                                        { label: 'All Image Tools', href: '/tools' },
                                    ].map(link => (
                                        <Link
                                            key={link.href}
                                            to={link.href}
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
