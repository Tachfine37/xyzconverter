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
    '/images-to-pdf': {
        title: 'Images to PDF Converter - JPG & PNG to PDF Online | xyzconverter',
        description: 'Convert and combine multiple images into a single PDF document. Support for JPG, PNG, and more. Free, secure, and 100% client-side processing.',
        keywords: 'images to pdf, jpg to pdf, png to pdf, combine images to pdf, convert photos to pdf, online pdf converter',
    },
    '/compress-pdf': {
        title: 'Compress PDF Online - Minimize & Reduce PDF File Size Free | xyzconverter',
        description: 'Reduce PDF file size online without losing quality. Compress PDF documents securely in your browser. Free, fast, and no file uploads required.',
        keywords: 'compress pdf, reduce pdf size, shrink pdf, quiet pdf, optimize pdf, pdf compressor online',
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
    },
    // PDF Tools
    '/watermark-pdf': {
        title: 'Add Watermark to PDF - Free & Secure | xyzconverter',
        description: 'Add text or image watermarks to your PDF documents instantly. Customizable opacity, position, and rotation. 100% free and private.',
        keywords: 'watermark pdf, add watermark, pdf watermark online, free pdf watermark, secure pdf tools',
    },
    '/pdf-to-word': {
        title: 'Convert PDF to Word - Editable DOCX | xyzconverter',
        description: 'Convert PDF documents to editable Microsoft Word (.docx) files. Maintain formatting and layout. Free, fast, and secure client-side conversion.',
        keywords: 'pdf to word, convert pdf to docx, pdf to docx, editable pdf, free pdf converter',
    },
    '/pdf-to-powerpoint': {
        title: 'Convert PDF to PowerPoint Free - PDF to PPTX Converter',
        description: 'Turn PDF documents into PowerPoint presentations (.pptx) online. Convert slides with high fidelity. Free, secure, and private - no file uploads required.',
        keywords: 'pdf to powerpoint, pdf to pptx, convert pdf to slides, free pdf converter, pdf presentation',
    },
    '/pdf-to-excel': {
        title: 'Convert PDF to Excel - Extract Tables to XLSX | xyzconverter',
        description: 'Convert PDF tables to Microsoft Excel (.xlsx) spreadsheets effortlessly. Accurate data extraction. Free and secure client-side processing.',
        keywords: 'pdf to excel, convert pdf to xlsx, pdf table extractor, pdf to spreadsheet, free pdf tools',
    },

    '/pdf-to-text': {
        title: 'PDF to Text Converter - Extract Text Online for Free | xyzconverter',
        description: 'Extract text from PDF documents instantly. Convert PDF to TXT online. Free, secure, and 100% client-side processing. Copy or download extracted text.',
        keywords: 'pdf to text, extract text from pdf, convert pdf to text, pdf to txt, online pdf ocr, scrape pdf text',
    },
    // Data Category Pages
    '/data/json': {
        title: 'JSON Converter & Tools - Convert, Format, Validate | xyzconverter',
        description: 'Free JSON converter and formatter. Convert JSON to CSV, validate JSON syntax, format and minify JSON data. Perfect for developers and data analysts. 100% client-side processing.',
        keywords: 'json converter, json to csv, json formatter, json validator, json minifier, json beautifier, json tools, api data converter',
    },
    '/data/csv': {
        title: 'CSV Converter & Tools - Convert, Validate CSV Files | xyzconverter',
        description: 'Free CSV converter and validator. Convert CSV to JSON, validate CSV structure, and transform spreadsheet data. Works with Excel and Google Sheets. Privacy-first, client-side only.',
        keywords: 'csv converter, csv to json, csv validator, excel converter, spreadsheet converter, csv tools, data conversion',
    },
    '/data/yaml': {
        title: 'YAML Converter & Tools - Convert, Validate YAML Config | xyzconverter',
        description: 'Free YAML converter for DevOps and developers. Convert YAML to JSON or XML, validate YAML syntax, format configuration files. Perfect for Kubernetes, Docker Compose, CI/CD. 100% private.',
        keywords: 'yaml converter, yaml to json, yaml to xml, yaml validator, kubernetes yaml, docker compose converter, yaml formatter, devops tools',
    },
    '/data/xml': {
        title: 'XML Converter & Tools - Convert, Validate XML Data | xyzconverter',
        description: 'Free XML converter and validator. Convert XML to JSON or YAML, validate XML structure, format XML documents. Perfect for SOAP APIs and legacy systems. Client-side processing only.',
        keywords: 'xml converter, xml to json, xml to yaml, xml validator, soap converter, xml formatter, xml parser, xml tools',
    },
    '/data/base64': {
        title: 'Base64 Encoder & Decoder - Free Online Tool | xyzconverter',
        description: 'Free Base64 encoder and decoder. Encode text to Base64, decode Base64 to text, validate Base64 strings. Perfect for data URIs, API authentication, email encoding. 100% secure and private.',
        keywords: 'base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, base64 validator, data uri, base64 tools',
    },

    // Text Tools
    '/text-to-speech': {
        title: 'Text to Speech Online - Free TTS Reader | xyzconverter',
        description: 'Convert text to speech online for free. Listen to any text with natural-sounding voices. Adjustable speed and pitch. Works entirely in your browser.',
        keywords: 'text to speech, tts online, free text to speech, read text aloud, voice generator, speech synthesis, online tts reader',
    },
    '/remove-line-breaks': {
        title: 'Remove Line Breaks Online - Text Cleaner | xyzconverter',
        description: 'Remove line breaks from text online. Convert multi-line text to a single line or paragraph. Perfect for cleaning up copied text or code snippets.',
        keywords: 'remove line breaks, remove newlines, text cleaner, line break remover, flatten text, remove return characters',
    },
    '/reverse-text': {
        title: 'Reverse Text Generator - Flip Text Online | xyzconverter',
        description: 'Reverse text instantly. Flip wording, reverse letters, or reverse order of words. Fun tool for puzzles, coding, and social media.',
        keywords: 'reverse text, flip text, backwards text, mirror text, reverse string, reverse words, text reverser',
    },
    '/lorem-ipsum-generator': {
        title: 'Lorem Ipsum Generator - Dummy Text | xyzconverter',
        description: 'Generate Lorem Ipsum placeholder text for web design and publishing. Customize number of paragraphs, sentences, or words. Copy instantly.',
        keywords: 'lorem ipsum generator, dummy text, placeholder text, lipsum generator, latin text generator, web design tools',
    },
    '/random-text-generator': {
        title: 'Random Text Generator - Strings & Words | xyzconverter',
        description: 'Generate random text, strings, and passwords. Customize length and character types (letters, numbers, symbols). Secure and client-side.',
        keywords: 'random text generator, random string generator, password generator, random words, generate random characters, security tools',
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

