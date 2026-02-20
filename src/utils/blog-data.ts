/**
 * blog-data.ts
 * Single source of truth for all blog posts and categories.
 * When adding a new post, add an entry to POSTS and (if needed) CATEGORIES.
 */

export interface BlogCategory {
    slug: string
    label: string
    description: string
    color: string   // Tailwind bg-* class for the badge
}

export interface BlogPostMeta {
    slug: string
    title: string
    description: string
    date: string
    readingTime: string
    category: string    // must match a CATEGORIES slug
    href: string
}

// ── Categories ─────────────────────────────────────────────────────────────

export const CATEGORIES: BlogCategory[] = [
    {
        slug: 'image-tips',
        label: 'Image Tips',
        description: 'Guides on converting, compressing, and editing images — HEIC, WebP, PNG, JPG, and more.',
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
        slug: 'pdf-tips',
        label: 'PDF Tips',
        description: 'How-to guides for compressing, merging, splitting, and converting PDF files.',
        color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    {
        slug: 'guides',
        label: 'Guides',
        description: 'General tutorials on file conversion, privacy, and making the most of XYZConverter tools.',
        color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
]

// ── Posts ────────────────────────────────────────────────────────────────────
// Most recent first.

export const POSTS: BlogPostMeta[] = [
    {
        slug: 'how-to-compress-pdf',
        title: '5 Ways to Compress a PDF Without Losing Quality (2026)',
        description: '5 proven methods to compress a PDF file — from free browser tools to Adobe Acrobat. Includes a tool comparison table and step-by-step instructions.',
        date: 'February 20, 2026',
        readingTime: '6',
        category: 'pdf-tips',
        href: '/blog/how-to-compress-pdf',
    },
    {
        slug: 'heic-to-jpg-windows',
        title: 'How to Convert iPhone HEIC Photos to JPG on Windows (Free, No Software)',
        description: 'Step-by-step guide to convert iPhone HEIC photos to JPG on Windows 10 & 11 without installing any software. Works online, free, and private.',
        date: 'February 20, 2026',
        readingTime: '7',
        category: 'image-tips',
        href: '/blog/heic-to-jpg-windows',
    },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
    return CATEGORIES.find(c => c.slug === slug)
}

export function getPostsByCategory(slug: string): BlogPostMeta[] {
    return POSTS.filter(p => p.category === slug)
}
