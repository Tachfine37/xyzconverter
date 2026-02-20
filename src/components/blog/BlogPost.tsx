/**
 * BlogPost layout component
 * Mobile-first: inline CTA banner shows at the top on mobile.
 * On lg+ screens the sidebar CTA is sticky on the right.
 */

import { Link } from 'react-router-dom'
import { ChevronRight, Calendar, Clock, ArrowRight, Zap } from 'lucide-react'

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
    relatedLinks?: { label: string; href: string }[]
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
    ctaLabel = 'Try it Free →',
    relatedLinks = [
        { label: 'Compress Images', href: '/compress-image' },
        { label: 'Convert HEIC to PNG', href: '/heic-to-png' },
        { label: 'Merge PDF', href: '/merge-pdf' },
        { label: 'All Tools', href: '/tools' },
    ],
}: BlogPostProps) {
    return (
        <div className="min-h-screen bg-background">

            {/* ── Hero header ─────────────────────────────────────────── */}
            <div className="border-b bg-muted/30">
                <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-3 md:space-y-4">

                    {/* Breadcrumb — truncates long title gracefully */}
                    <nav className="flex items-center gap-1 text-sm text-muted-foreground overflow-hidden">
                        <Link to="/" className="hover:text-foreground transition-colors shrink-0">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        <Link to="/blog" className="hover:text-foreground transition-colors shrink-0">Blog</Link>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        <Link to={categoryHref} className="hover:text-foreground transition-colors shrink-0">{category}</Link>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 hidden sm:block" />
                        <span className="text-foreground truncate hidden sm:block">{title}</span>
                    </nav>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{description}</p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-muted-foreground">
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

            {/* ── Mobile-only inline CTA banner ───────────────────────── */}
            <div className="lg:hidden border-b bg-primary/5">
                <div className="container max-w-5xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Zap className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-muted-foreground">Works in your browser — no uploads</span>
                        </div>
                        <Link
                            to={ctaPath}
                            className="shrink-0 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                        >
                            {ctaLabel}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Body ────────────────────────────────────────────────── */}
            <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 lg:gap-12">

                    {/* Article */}
                    <article className="
                        blog-article
                        prose prose-slate dark:prose-invert max-w-none
                        prose-base
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-3
                        prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:mb-2
                        prose-p:leading-relaxed prose-p:text-foreground/90
                        prose-li:text-foreground/90 prose-li:my-0.5
                        prose-strong:text-foreground
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-code:text-primary prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                        prose-pre:overflow-x-auto prose-pre:text-sm
                        prose-blockquote:border-primary prose-blockquote:bg-muted/40 prose-blockquote:rounded-r-md prose-blockquote:py-1 prose-blockquote:not-italic
                        prose-table:text-sm prose-th:font-semibold
                        [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full
                    ">
                        {children}
                    </article>

                    {/* ── Desktop sticky sidebar ───────────────────────── */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-4">
                            {/* CTA card */}
                            <div className="rounded-xl border bg-card p-5 space-y-4">
                                <div className="text-2xl text-center">⚡</div>
                                <h3 className="font-bold text-sm text-center leading-snug">Free browser tool — no uploads</h3>
                                <Link
                                    to={ctaPath}
                                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    {ctaLabel}
                                </Link>
                                <p className="text-xs text-center text-muted-foreground">
                                    ✅ Private &nbsp;·&nbsp; ✅ Free &nbsp;·&nbsp; ✅ Instant
                                </p>
                            </div>

                            {/* Related links */}
                            <div className="rounded-xl border bg-card p-4 space-y-3">
                                <h3 className="font-semibold text-sm text-foreground">Related Tools</h3>
                                <div className="space-y-2">
                                    {relatedLinks.map(link => (
                                        <Link
                                            key={link.href}
                                            to={link.href}
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Back to blog */}
                            <Link
                                to="/blog"
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                                All guides
                            </Link>
                        </div>
                    </aside>
                </div>

                {/* ── Mobile footer CTA ───────────────────────────────── */}
                <div className="lg:hidden mt-10 pt-8 border-t space-y-4">
                    <p className="text-sm font-semibold text-foreground">Try the free tool →</p>
                    <Link
                        to={ctaPath}
                        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-xl px-4 py-4 text-base font-semibold hover:bg-primary/90 transition-colors"
                    >
                        {ctaLabel}
                    </Link>
                    <p className="text-xs text-center text-muted-foreground">
                        ✅ No uploads &nbsp;·&nbsp; ✅ No account &nbsp;·&nbsp; ✅ Free forever
                    </p>

                    {/* Related links grid on mobile */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        {relatedLinks.map(link => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowRight className="w-3 h-3 shrink-0" />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <Link
                        to="/blog"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors pt-2"
                    >
                        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                        Back to all guides
                    </Link>
                </div>
            </div>
        </div>
    )
}
