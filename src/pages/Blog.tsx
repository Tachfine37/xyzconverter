import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'
import { POSTS, CATEGORIES } from '@/utils/blog-data'

type Filter = 'all' | string

export function Blog() {
    const [activeCategory, setActiveCategory] = useState<Filter>('all')

    useEffect(() => {
        document.title = 'Blog – File Conversion Guides & Tips | XYZCONVERTER'
        const desc = document.querySelector('meta[name="description"]')
        if (desc) desc.setAttribute('content', 'Free guides, tips, and tutorials on converting images, PDFs, and files. Learn how to convert HEIC, WebP, PDF and more.')
        const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
        if (canonical) canonical.href = 'https://xyzconverter.com/blog'
    }, [])

    const filtered = activeCategory === 'all'
        ? POSTS
        : POSTS.filter(p => p.category === activeCategory)

    const getCategoryLabel = (slug: string) =>
        CATEGORIES.find(c => c.slug === slug)?.label ?? slug

    const getCategoryColor = (slug: string) =>
        CATEGORIES.find(c => c.slug === slug)?.color ?? 'bg-muted text-muted-foreground'

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12 space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-widest">XYZConverter Blog</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Guides &amp; Tutorials</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Free, no-fluff guides on converting images, PDFs, and data files.
                    Step-by-step instructions that actually work.
                </p>
            </div>

            {/* Category tab bar */}
            <div className="flex flex-wrap gap-2 border-b pb-4">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all'
                            ? 'bg-primary text-primary-foreground'
                            : 'border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                        }`}
                >
                    All Posts
                    <span className="ml-1.5 text-xs opacity-70">({POSTS.length})</span>
                </button>
                {CATEGORIES.map(cat => {
                    const count = POSTS.filter(p => p.category === cat.slug).length
                    if (count === 0) return null
                    const isActive = activeCategory === cat.slug
                    return (
                        <button
                            key={cat.slug}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                                }`}
                        >
                            {cat.label}
                            <span className="ml-1.5 text-xs opacity-70">({count})</span>
                        </button>
                    )
                })}
            </div>

            {/* Category description (shown when filtering) */}
            {activeCategory !== 'all' && (() => {
                const cat = CATEGORIES.find(c => c.slug === activeCategory)
                if (!cat) return null
                return (
                    <div className={`flex items-start gap-3 rounded-lg p-4 ${cat.color} bg-opacity-50`}>
                        <BookOpen className="w-4 h-4 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">{cat.label}</p>
                            <p className="text-sm opacity-80 mt-0.5">{cat.description}</p>
                            <Link
                                to={`/blog/category/${cat.slug}`}
                                className="text-xs underline mt-1 inline-block opacity-70 hover:opacity-100"
                            >
                                View category page →
                            </Link>
                        </div>
                    </div>
                )
            })()}

            {/* Post grid */}
            {filtered.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">No posts in this category yet.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filtered.map(post => (
                        <Link
                            key={post.slug}
                            to={post.href}
                            className="group block rounded-xl border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(post.category)}`}>
                                        {getCategoryLabel(post.category)}
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
            )}

            {/* Category quick-links footer */}
            <div className="border-t pt-8">
                <p className="text-sm font-medium text-foreground mb-4">Browse by category</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {CATEGORIES.map(cat => (
                        <Link
                            key={cat.slug}
                            to={`/blog/category/${cat.slug}`}
                            className="group rounded-lg border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                        >
                            <p className={`text-sm font-semibold group-hover:text-primary transition-colors ${cat.color.split(' ').find(c => c.startsWith('text-'))}`}>
                                {cat.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{cat.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
