/**
 * BlogCategory page — rendered at /blog/category/:slug
 * Shows the category title, description, and all posts in that category.
 */

import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'
import { CATEGORIES, POSTS, getCategoryBySlug } from '@/utils/blog-data'

export function BlogCategory() {
    const { slug = '' } = useParams<{ slug: string }>()
    const category = getCategoryBySlug(slug)

    useEffect(() => {
        if (!category) return
        document.title = `${category.label} – Blog | XYZCONVERTER`
        const desc = document.querySelector('meta[name="description"]')
        if (desc) desc.setAttribute('content', category.description)
        const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
        if (canonical) canonical.href = `https://xyzconverter.com/blog/category/${slug}`
    }, [category, slug])

    if (!category) return <Navigate to="/blog" replace />

    const posts = POSTS.filter(p => p.category === slug)

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12 space-y-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-foreground">{category.label}</span>
            </nav>

            {/* Category header */}
            <div className="space-y-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                    <BookOpen className="w-3.5 h-3.5" />
                    {category.label}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{category.label}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">{category.description}</p>
            </div>

            {/* Other categories */}
            <div className="flex flex-wrap gap-2">
                <Link
                    to="/blog"
                    className="px-3 py-1.5 rounded-full border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                    All Posts
                </Link>
                {CATEGORIES.filter(c => c.slug !== slug).map(c => (
                    <Link
                        key={c.slug}
                        to={`/blog/category/${c.slug}`}
                        className="px-3 py-1.5 rounded-full border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                        {c.label}
                    </Link>
                ))}
            </div>

            {/* Post list */}
            {posts.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                    <p className="text-lg">No posts yet in this category.</p>
                    <Link to="/blog" className="text-primary hover:underline text-sm mt-2 inline-block">← View all posts</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {posts.map(post => (
                        <Link
                            key={post.slug}
                            to={post.href}
                            className="group block rounded-xl border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-3">
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
        </div>
    )
}
