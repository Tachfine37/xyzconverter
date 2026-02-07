/**
 * Structured Data (Schema.org) Utilities
 * Creates JSON-LD markup for SEO
 */

export interface SchemaOrgBase {
    '@context': 'https://schema.org'
    '@type': string
}

export interface SoftwareApplicationSchema extends SchemaOrgBase {
    '@type': 'SoftwareApplication'
    name: string
    applicationCategory: string
    operatingSystem: string
    offers: {
        '@type': 'Offer'
        price: string
        priceCurrency: string
    }
    description?: string
    url?: string
    softwareVersion?: string
    featureList?: string[]
}

export interface FAQPageSchema extends SchemaOrgBase {
    '@type': 'FAQPage'
    mainEntity: Array<{
        '@type': 'Question'
        name: string
        acceptedAnswer: {
            '@type': 'Answer'
            text: string
        }
    }>
}

export interface BreadcrumbListSchema extends SchemaOrgBase {
    '@type': 'BreadcrumbList'
    itemListElement: Array<{
        '@type': 'ListItem'
        position: number
        name: string
        item?: string
    }>
}

export interface HowToSchema extends SchemaOrgBase {
    '@type': 'HowTo'
    name: string
    description?: string
    step: Array<{
        '@type': 'HowToStep'
        name: string
        text: string
        position: number
    }>
}

/**
 * Generate SoftwareApplication schema for the app
 */
export function generateSoftwareApplicationSchema(
    overrides?: Partial<SoftwareApplicationSchema>
): SoftwareApplicationSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'xyzconverter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser (Chrome, Firefox, Safari, Edge)',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        description: 'Privacy-first file converter. Convert HEIC, WEBP, PNG, JPG, and PDF files entirely in your browser with no uploads.',
        url: 'https://xyzconverter.com',
        softwareVersion: '2.0',
        featureList: [
            'HEIC to JPG Conversion',
            'WEBP to JPG Conversion',
            'PNG to PDF Conversion',
            'Image Resizing and Cropping',
            'PDF Merge and Split',
            'JSON to CSV Conversion',
            '100% Client-Side Processing',
            'No File Uploads',
            'Privacy-First Architecture'
        ],
        ...overrides
    }
}

/**
 * Generate FAQ schema for conversion pages
 */
export function generateFAQSchema(
    faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    }
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(
    breadcrumbs: Array<{ name: string; url?: string }>
): BreadcrumbListSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url ? `https://xyzconverter.com${crumb.url}` : undefined
        }))
    }
}

/**
 * Generate HowTo schema
 */
export function generateHowToSchema(
    title: string,
    steps: Array<{ name: string; text: string }>,
    description?: string
): HowToSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            name: step.name,
            text: step.text,
            position: index + 1
        }))
    }
}

/**
 * Inject JSON-LD schema into page
 */
export function injectStructuredData(schema: SchemaOrgBase | SchemaOrgBase[]) {
    const schemas = Array.isArray(schema) ? schema : [schema]

    // Remove existing structured data scripts (if any)
    const existingScripts = document.querySelectorAll('script[data-schema="true"]')
    existingScripts.forEach(script => script.remove())

    // Inject new schemas
    schemas.forEach(s => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-schema', 'true')
        script.textContent = JSON.stringify(s, null, 2)
        document.head.appendChild(script)
    })
}

/**
 * Common FAQ questions for HEIC conversions
 */
export const HEIC_FAQ = [
    {
        question: 'Is HEIC to JPG conversion safe?',
        answer: 'Yes, our HEIC to JPG converter is 100% safe. All conversions happen locally in your browser using JavaScript. Your files never leave your device, and nothing is uploaded to any server.'
    },
    {
        question: 'Will I lose quality when converting HEIC to JPG?',
        answer: 'The quality of your converted JPG files depends on the settings you choose. By default, we use high-quality settings (90-95%) that preserve most visual quality while reducing file size. You can adjust quality settings before conversion.'
    },
    {
        question: 'Can I convert multiple HEIC files at once?',
        answer: 'Yes! You can drag and drop multiple HEIC files simultaneously. Our converter will process them in parallel and let you download each one individually or all at once.'
    },
    {
        question: 'Does HEIC to JPG conversion work offline?',
        answer: 'Yes, after loading the page once, the converter works entirely offline. All processing happens in your browser without requiring an internet connection.'
    },
    {
        question: 'What is a HEIC file?',
        answer: 'HEIC (High Efficiency Image Container) is a modern image format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining quality, but it\'s not supported by all devices and platforms.'
    }
]

/**
 * Common FAQ questions for WEBP conversions
 */
export const WEBP_FAQ = [
    {
        question: 'Why should I convert WEBP to JPG?',
        answer: 'While WEBP offers excellent compression, JPG has better compatibility with older software, social media platforms, and devices. Converting to JPG ensures your images work everywhere.'
    },
    {
        question: 'Is WEBP to JPG conversion free?',
        answer: 'Yes, our WEBP to JPG converter is completely free with no limitations. Convert as many files as you want, with no file size restrictions or watermarks.'
    },
    {
        question: 'Does converting WEBP to JPG reduce quality?',
        answer: 'Both WEBP and JPG use lossy compression. When converting, some quality loss may occur, but we use high-quality settings by default to minimize this. You can adjust quality settings to balance file size and visual quality.'
    }
]

/**
 * Common FAQ questions for PDF conversions
 */
export const PDF_FAQ = [
    {
        question: 'Is PNG to PDF conversion secure?',
        answer: 'Absolutely. All PDF conversions are performed entirely in your browser using the pdf-lib library. Your images are never uploaded to any server, ensuring complete privacy.'
    },
    {
        question: 'Can I merge multiple images into one PDF?',
        answer: 'Yes! You can upload multiple PNG, JPG, HEIC, or WEBP images and convert them into a single multi-page PDF document. Each image becomes a separate page in the PDF.'
    },
    {
        question: 'What image formats can be converted to PDF?',
        answer: 'We support PNG, JPG, JPEG, HEIC, WEBP, and other common image formats. Simply drag and drop your images, and they\'ll be converted to PDF instantly.'
    }
]

/**
 * Common FAQ questions for PDF to Image conversions
 */
export const PDF_TO_IMAGE_FAQ = [
    {
        question: 'How do I convert PDF to JPG?',
        answer: 'Upload your PDF file, and each page will be automatically converted to a high-quality JPG image. For multi-page PDFs, all images are bundled into a ZIP file for easy download.'
    },
    {
        question: 'Is PDF to JPG conversion free?',
        answer: 'Yes, completely free with no limits. All conversion happens in your browser, so there are no server costs or restrictions.'
    },
    {
        question: 'What happens to my PDF files?',
        answer: 'Your files never leave your device. All conversion happens locally in your browser using JavaScript. No files are uploaded to any server.'
    },
    {
        question: 'Can I convert multi-page PDFs?',
        answer: 'Yes! Multi-page PDFs are fully supported. Each page is converted to a separate image, and all images are automatically packaged into a ZIP file.'
    },
    {
        question: 'What image quality can I expect?',
        answer: 'Images are rendered at 2x scale for high quality. JPG quality is set to 90%, and PNG is lossless. The output is suitable for professional use.'
    },
    {
        question: 'Can I convert PDF to PNG or WebP?',
        answer: 'Yes! You can convert PDF to JPG, PNG, or WebP format. PNG offers lossless quality, while WebP provides smaller file sizes with excellent quality.'
    }
]
