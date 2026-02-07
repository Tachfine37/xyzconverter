import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOConfig {
    title: string
    description: string
    canonical?: string
    ogImage?: string
    ogType?: 'website' | 'article'
    keywords?: string
    author?: string
    twitterCard?: 'summary' | 'summary_large_image'
    twitterSite?: string
}

export const DEFAULT_SEO: SEOConfig = {
    title: 'xyzconverter - Privacy-First Image Converter',
    description: 'Free, fast, and private image converter. Convert HEIC, WEBP, PNG to JPG or PDF entirely in your browser. No uploads, no tracking.',
    canonical: 'https://xyzconverter.com',
    ogType: 'website',
    ogImage: 'https://xyzconverter.com/og-image.png',
    twitterCard: 'summary_large_image',
    keywords: 'image converter, heic to jpg, webp to jpg, png to pdf, pdf merge, privacy-first, client-side',
    author: 'xyzconverter'
}

// Map of clean paths to SEO configurations
// Keywords derived from high-volume search data
export const ROUTE_SEO: Record<string, SEOConfig> = {
    '/heic-to-jpg': {
        title: 'Convert HEIC to JPG - Free, Secure, & Instant | xyzconverter',
        description: 'Free HEIC to JPG converter. Convert iPhone photos to JPG instantly in your browser. No uploads, 100% private, and no quality loss.',
    },
    '/heic-to-png': {
        title: 'Convert HEIC to PNG - High Quality & Transparent | xyzconverter',
        description: 'Convert HEIC to PNG online. Best free tool to turn HEIC files into high-quality PNGs with transparency support. Private and fast.',
    },
    '/heic-to-pdf': {
        title: 'Convert HEIC to PDF - Easy Document Conversion | xyzconverter',
        description: 'Convert HEIC images to PDF documents online for free. Merge multiple HEIC files into a single PDF securely in your browser.',
    },
    '/webp-to-jpg': {
        title: 'Convert WEBP to JPG - Universal Image Format | xyzconverter',
        description: 'Fast WEBP to JPG converter. Change WebP images to standard JPG format for better compatibility. Zero quality loss, 100% client-side.',
    },
    '/png-to-pdf': {
        title: 'PNG to PDF Converter - Merge Images to PDF Online',
        description: 'Easily convert PNG images to PDF files. Drag and drop to merge multiple PNGs into one secure PDF document. No software installation needed.',
    },
    '/image-to-pdf': {
        title: 'Image to PDF Converter - JPG, PNG, HEIC, WEBP',
        description: 'Universal Image to PDF converter. Turn your photos and graphics into professional PDF documents instantly and securely.',
    },
    '/jpg-to-webp': {
        title: 'Convert JPG to WEBP - Optimise Images for Web | xyzconverter',
        description: 'Free JPG to WEBP converter. Reduce file size significantly without visible quality loss. Perfect for web developers and site speed.',
    },
    '/png-to-webp': {
        title: 'Convert PNG to WEBP - Transparent & Lightweight | xyzconverter',
        description: 'Convert PNG images to WEBP format. Keep transparency while reducing file size by up to 30%. Fast, private, and free.',
    },
    '/pdf-to-jpg': {
        title: 'Convert PDF to JPG Online - Free & Secure | xyzconverter',
        description: 'Convert PDF documents to JPG images instantly. Extract all pages as high-quality JPG files. No upload required - 100% client-side processing.',
        keywords: 'pdf to jpg, pdf to jpeg, convert pdf to image, pdf to jpg converter, extract pdf pages, pdf to image online',
    },
    '/pdf-to-png': {
        title: 'Convert PDF to PNG Online - Lossless Quality | xyzconverter',
        description: 'Convert PDF to PNG with perfect lossless quality. Extract all pages as high-resolution PNG images. Free, secure, and works entirely in your browser.',
        keywords: 'pdf to png, convert pdf to png, pdf to png converter, pdf image extraction, lossless pdf conversion',
    },
    '/pdf-to-webp': {
        title: 'Convert PDF to WebP - Modern Image Format | xyzconverter',
        description: 'Convert PDF to WebP for smaller file sizes with excellent quality. Modern image format with better compression than JPG. 100% client-side.',
        keywords: 'pdf to webp, convert pdf to webp, pdf webp converter, modern image format, pdf optimization',
    }
}

export function usePageSEO(override?: Partial<SEOConfig>) {
    const location = useLocation()

    useEffect(() => {
        // Determine config based on path or override
        const pathConfig = ROUTE_SEO[location.pathname] || {}
        const config = {
            ...DEFAULT_SEO,
            ...pathConfig,
            ...override
        }

        // Update Title
        document.title = config.title

        // Update Meta Description
        updateNameMeta('description', config.description)

        // Update Keywords (if provided)
        if (config.keywords) {
            updateNameMeta('keywords', config.keywords)
        }

        // Update Author (if provided)
        if (config.author) {
            updateNameMeta('author', config.author)
        }

        // Update Canonical URL
        let linkCanonical = document.querySelector('link[rel="canonical"]')
        if (!linkCanonical) {
            linkCanonical = document.createElement('link')
            linkCanonical.setAttribute('rel', 'canonical')
            document.head.appendChild(linkCanonical)
        }
        // Clean up trailing slashes for canonical self-reference
        const cleanPath = location.pathname.endsWith('/') && location.pathname.length > 1
            ? location.pathname.slice(0, -1)
            : location.pathname

        // Use override canonical if provided, otherwise construct from current path
        const canonicalUrl = config.canonical === DEFAULT_SEO.canonical && location.pathname !== '/'
            ? `${DEFAULT_SEO.canonical}${cleanPath}`
            : config.canonical || DEFAULT_SEO.canonical

        if (canonicalUrl) {
            linkCanonical.setAttribute('href', canonicalUrl)
        }

        // Update Open Graph tags
        updatePropertyMeta('og:type', config.ogType || 'website')
        updatePropertyMeta('og:title', config.title)
        updatePropertyMeta('og:description', config.description)
        updatePropertyMeta('og:url', canonicalUrl || window.location.href)
        updatePropertyMeta('og:site_name', 'xyzconverter')

        if (config.ogImage) {
            updatePropertyMeta('og:image', config.ogImage)
            updatePropertyMeta('og:image:alt', config.title)
        }

        // Update Twitter Card tags
        updateNameMeta('twitter:card', config.twitterCard || 'summary_large_image')
        updateNameMeta('twitter:title', config.title)
        updateNameMeta('twitter:description', config.description)

        if (config.ogImage) {
            updateNameMeta('twitter:image', config.ogImage)
            updateNameMeta('twitter:image:alt', config.title)
        }

        if (config.twitterSite) {
            updateNameMeta('twitter:site', config.twitterSite)
        }

        // Additional SEO meta tags
        updateNameMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
        updateNameMeta('googlebot', 'index, follow')

    }, [location.pathname, override])
}

/**
 * Update meta tag with 'name' attribute (for standard meta tags and Twitter Cards)
 */
function updateNameMeta(name: string, content: string) {
    let tag = document.querySelector(`meta[name="${name}"]`)
    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
}

/**
 * Update meta tag with 'property' attribute (for Open Graph tags)
 */
function updatePropertyMeta(property: string, content: string) {
    let tag = document.querySelector(`meta[property="${property}"]`)
    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
}

