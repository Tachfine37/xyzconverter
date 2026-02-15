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
 * Specific FAQ questions for HEIC to JPG
 */
export const HEIC_TO_JPG_FAQ = [
    {
        question: 'How do I convert HEIC to JPG?',
        answer: 'Simply drag and drop your HEIC or HEIF photos into the upload box. Our free online converter will instantly process them and provide high-quality JPG images for download.'
    },
    {
        question: 'Is it free to use?',
        answer: 'Yes, our HEIC to JPG converter is completely free. You can convert unlimited photos without any hidden costs, watermarks, or registration requirements.'
    },
    {
        question: 'Is it safe?',
        answer: 'Yes, absolutely. We use client-side processing technology, which means your photos never leave your computer. The conversion happens right in your browser, ensuring 100% privacy.'
    },
    {
        question: 'Can I convert multiple photos?',
        answer: 'Yes! You can upload and convert multiple HEIC files at once. Our tool handles batch conversions efficiently, saving you time.'
    }
]

/**
 * Specific FAQ questions for HEIC to PNG
 */
export const HEIC_TO_PNG_FAQ = [
    {
        question: 'How do I convert HEIC to PNG?',
        answer: 'Simply drag and drop your HEIC photos into the converter. Our tool will instantly process them and provide high-quality PNG images for download.'
    },
    {
        question: 'Is PNG better than JPG for HEIC?',
        answer: 'PNG is a lossless format, meaning it preserves all image data without compression artifacts. This makes it better for editing or archiving, though the file sizes will be larger than JPG.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Yes, our tool is 100% free and secure. We use client-side processing, so your photos never leave your browser and are never uploaded to any server.'
    }
]

/**
 * Specific FAQ questions for PNG to JPG
 */
export const PNG_TO_JPG_FAQ = [
    {
        question: 'How do I convert PNG to JPG?',
        answer: 'Simply upload your PNG images to the converter. They will be instantly converted to JPG format, which you can then download.'
    },
    {
        question: 'What happens to transparent backgrounds?',
        answer: 'JPG does not support transparency. When converting from PNG to JPG, transparent areas will automatically be replaced with a white background.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Yes, our tool is 100% free and secure. Conversions happen locally in your browser, so your files are never uploaded to any server.'
    }
]

/**
 * Specific FAQ questions for PNG to WebP
 */
export const PNG_TO_WEBP_FAQ = [
    {
        question: 'How do I convert PNG to WebP?',
        answer: 'Drag and drop your PNG images into the tool. They will be instantly converted to WebP format, offering smaller file sizes with high quality.'
    },
    {
        question: 'Does WebP support transparency?',
        answer: 'Yes! WebP fully supports transparency (alpha channel), just like PNG. You can convert transparent PNGs to WebP without losing the transparent background.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Completely. Our converter runs entirely in your browser, so your images are never uploaded to a server. It is free to use with no limits.'
    }
]

/**
 * Specific FAQ questions for PNG to PDF
 */
export const PNG_TO_PDF_FAQ = [
    {
        question: 'How do I convert PNG to PDF?',
        answer: 'Upload one or more PNG images to the converter. You can arrange them in your preferred order and download them as a single PDF document.'
    },
    {
        question: 'Can I merge multiple PNGs into one PDF?',
        answer: 'Yes! Our tool is designed to combine multiple PNG images into a single PDF file. You can drag and drop multiple files at once.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Absolutely. The conversion happens entirely in your browser, so your files are never uploaded to any server. It is completely free to use.'
    }
]

/**
 * Specific FAQ questions for JPG to PNG
 */
export const JPG_TO_PNG_FAQ = [
    {
        question: 'How do I convert JPG to PNG?',
        answer: 'Simply upload your JPG images to the tool. They will be instantly converted to PNG format, which is perfect for editing and maintaining quality.'
    },
    {
        question: 'Does converting JPG to PNG improve quality?',
        answer: 'Converting to PNG prevents further quality loss if you plan to edit the image, as PNG is a lossless format. However, it cannot restore detail that was already lost in the original JPG compression.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Yes, our tool is 100% free and secure. We use client-side processing, so your photos never leave your browser and are never uploaded to any server.'
    }
]

/**
 * Specific FAQ questions for JPG to WebP
 */
export const JPG_TO_WEBP_FAQ = [
    {
        question: 'How do I convert JPG to WebP?',
        answer: 'Upload your JPG images to the converter. They will be transformed into WebP format, which offers superior compression and quality.'
    },
    {
        question: 'Why convert JPG to WebP?',
        answer: 'WebP images are significantly smaller than JPGs while maintaining the same quality. This makes your website load faster and improves your SEO/Core Web Vitals scores.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Yes. Our converter is free to use and processes all files locally in your browser, ensuring your images remain private.'
    }
]

/**
 * Specific FAQ questions for JPG to PDF
 */
export const JPG_TO_PDF_FAQ = [
    {
        question: 'How do I convert JPG to PDF?',
        answer: 'Upload one or more JPG images to the converter. You can arrange them in your preferred order and download them as a single PDF document.'
    },
    {
        question: 'Can I merge multiple JPGs into one PDF?',
        answer: 'Yes! Our tool is designed to combine multiple JPG images into a single PDF file. You can drag and drop multiple files at once.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Absolutely. The conversion happens entirely in your browser, so your files are never uploaded to any server. It is completely free to use.'
    }
]

/**
 * Specific FAQ questions for WebP to JPG
 */
export const WEBP_TO_JPG_FAQ = [
    {
        question: 'How do I convert WebP to JPG?',
        answer: 'Upload your WebP images to the converter. They will be instantly converted to JPG format, making them compatible with all devices and software.'
    },
    {
        question: 'Why convert WebP to JPG?',
        answer: 'While WebP is efficient for the web, some older image viewers and editors do not support it. Converting to JPG ensures your images can be opened and edited everywhere.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Yes, our tool is 100% free and secure. We use client-side processing, so your photos never leave your browser and are never uploaded to any server.'
    }
]

/**
 * Specific FAQ questions for WebP to PNG
 */
export const WEBP_TO_PNG_FAQ = [
    {
        question: 'How do I convert WebP to PNG?',
        answer: 'Upload your WebP images to the converter. They will be instantly converted to PNG format, preserving quality and transparency.'
    },
    {
        question: 'Why convert WebP to PNG?',
        answer: 'PNG is a lossless format that is widely supported. Converting WebP to PNG ensures maximum compatibility and quality retention, especially for images with text or transparency.'
    },
    {
        question: 'Is it free and secure?',
        answer: 'Yes, our tool is 100% free and secure. We use client-side processing, so your photos never leave your browser and are never uploaded to any server.'
    }
]

/**
 * Specific FAQ questions for SVG to PNG
 */
export const SVG_TO_PNG_FAQ = [
    {
        question: 'How do I convert SVG to PNG?',
        answer: 'Upload your SVG file to the converter. It will be automatically rasterized into a high-quality PNG image.'
    },
    {
        question: 'Why convert SVG to PNG?',
        answer: 'While SVG is great for vectors, many applications and websites require raster images like PNG. Converting ensures your graphics can be used specifically where vectors aren\'t supported.'
    },
    {
        question: 'Does it support transparency?',
        answer: 'Yes! Our converter preserves the transparency of your SVG files in the output PNG.'
    }
]

/**
 * Specific FAQ questions for SVG to JPG
 */
export const SVG_TO_JPG_FAQ = [
    {
        question: 'How do I convert SVG to JPG?',
        answer: 'Upload your SVG file to the converter. It will be automatically rasterized into a high-quality JPG image.'
    },
    {
        question: 'Why convert SVG to JPG?',
        answer: 'JPG is the most widely supported image format. Converting SVG to JPG ensures your images can be viewed on any device, shared on social media, or used in documents that don\'t support vectors.'
    },
    {
        question: 'What happens to transparent backgrounds?',
        answer: 'Since JPG does not support transparency, any transparent areas in your SVG will seamlessly become a white background in the resulting JPG.'
    }
]

/**
 * Specific FAQ questions for Image Resizer
 */
export const RESIZE_IMAGE_FAQ = [
    {
        question: 'How do I resize an image without losing quality?',
        answer: 'Our tool uses advanced algorithms to resize your images while maintaining the highest possible quality. When scaling down, detail is preserved. When scaling up, we use smart interpolation to minimize pixelation.'
    },
    {
        question: 'Is this image resizer free?',
        answer: 'Yes, our image resizer is 100% free to use. There are no limits on the number of images you can resize and no hidden costs.'
    },
    {
        question: 'Does resizing reduce file size?',
        answer: 'Yes, resizing an image to smaller dimensions significantly reduces its file size. You can also adjust the quality setting to further compress the image.'
    },
    {
        question: 'Are my images secure?',
        answer: 'Absolutely. All processing happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security.'
    }
]

/**
 * Specific FAQ questions for Image Compressor
 */
export const COMPRESS_IMAGE_FAQ = [
    {
        question: 'How do I compress an image without losing quality?',
        answer: 'Our advanced compression algorithms reduce file size by removing unnecessary metadata and optimizing image data. You can adjust the quality level to find the perfect balance between file size and visual fidelity.'
    },
    {
        question: 'Is this image compressor free?',
        answer: 'Yes, our image compressor is completely free to use. You can compress as many images as you need without any daily limits or hidden fees.'
    },
    {
        question: 'Which formats are supported?',
        answer: 'We support compression for all major image formats including JPG, PNG, and WebP. The tool automatically detects the best compression method for your file type.'
    },
    {
        question: 'Are my images secure?',
        answer: 'Security is our top priority. All compression is performed locally in your browser, meaning your images are never uploaded to our servers or seen by anyone else.'
    }
]

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
 * Common FAQ questions for HEIC to PDF conversions
 */
export const HEIC_TO_PDF_FAQ = [
    {
        question: 'How do I convert HEIC to PDF?',
        answer: 'Simply drag and drop your HEIC files into the converter. Your iPhone photos are decoded locally in your browser, then converted into a high-quality PDF document. No uploads, no accounts needed.'
    },
    {
        question: 'Is HEIC to PDF conversion secure?',
        answer: 'Absolutely. All conversions happen entirely in your browser using JavaScript. Your HEIC photos are never uploaded to any server, ensuring complete privacy and security.'
    },
    {
        question: 'Can I convert multiple HEIC files to one PDF?',
        answer: 'Yes! You can upload multiple HEIC files and each will be converted to PDF. Each image is automatically scaled to fit an A4 page for professional-looking results.'
    },
    {
        question: 'Will I lose quality when converting HEIC to PDF?',
        answer: 'The converter uses high-quality settings by default (90% JPEG quality). Your HEIC photos are decoded at full resolution, then embedded in the PDF at optimal quality.'
    },
    {
        question: 'Does HEIC to PDF work offline?',
        answer: 'Yes, after loading the page once, the converter works entirely offline. All HEIC decoding and PDF generation happens locally in your browser.'
    }
]

/**
 * Specific FAQ questions for Data Tools
 */
export const DATA_TOOLS_FAQ = [
    {
        question: 'What formats are supported?',
        answer: 'We support conversion between JSON, YAML, XML, and Base64. You can convert from any of these formats to any other.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes, your data is 100% secure. All conversions happen locally in your browser using JavaScript. We never upload your data to any server.'
    },
    {
        question: 'Is it free?',
        answer: 'Yes, this data converter tool is completely free to use for unlimited conversions. There are no hidden fees or subscriptions.'
    }
]

/**
 * Specific FAQ questions for JSON to CSV
 */
export const JSON_TO_CSV_FAQ = [
    {
        question: 'Is this JSON to CSV tool free?',
        answer: 'Yes, our JSON converter is completely free. You can convert unlimited JSON data to CSV format without any fees or registration.'
    },
    {
        question: 'Does it support large JSON files?',
        answer: 'Yes! Since the conversion happens entirely in your browser using JavaScript, you can process very large JSON files instantly without waiting for server uploads.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. We use client-side processing, which means your sensitive data never leaves your computer. It is converted locally in your browser and is never stored on our servers.'
    }
]

/**
 * Specific FAQ questions for PDF Splitter
 */
export const SPLIT_PDF_FAQ = [
    {
        question: 'Is this PDF splitter free?',
        answer: 'Yes, our PDF splitter is completely free to use. You can extract pages from as many PDF documents as you need without any restrictions or hidden costs.'
    },
    {
        question: 'Are my files secure?',
        answer: 'Your privacy is 100% guaranteed. All PDF splitting happens locally in your browser, meaning your files are never uploaded to our servers or accessed by anyone else.'
    },
    {
        question: 'Can I split large PDF files?',
        answer: 'Absolutely. Because the process runs entirely on your device, you can split large PDF files quickly without worrying about file size limits or slow upload times.'
    }
]

/**
 * Specific FAQ questions for PDF Merger
 */
export const MERGE_PDF_FAQ = [
    {
        question: 'Is this PDF merger free?',
        answer: 'Yes, our PDF merger is completely free to use. You can combine as many PDF files as you want without any cost, watermarks, or hidden fees.'
    },
    {
        question: 'Are my files secure?',
        answer: 'Your security is guaranteed. We use client-side processing, which means your files are merged directly in your browser and never uploaded to any server. Your documents remain private on your device.'
    },
    {
        question: 'Can I merge large PDF files?',
        answer: 'Yes! Since processing happens on your device, you are not limited by server upload caps. You can merge large PDF files quickly and efficiently, depending only on your device\'s performance.'
    }
]

/**
 * Specific FAQ questions for PDF to PNG conversions
 */
export const PDF_TO_PNG_FAQ = [
    {
        question: 'Is this PDF to PNG converter free?',
        answer: 'Yes, completely free. You can convert unlimited PDF pages to PNG formatting without any costs, watermarks, or registration requirements.'
    },
    {
        question: 'Are my files secure?',
        answer: 'Your privacy is our priority. Since all conversions happen locally in your web browser, your files are never uploaded to our servers or seen by anyone else.'
    },
    {
        question: 'Can I convert multi-page PDFs?',
        answer: 'Absolutely. The tool automatically separates multi-page PDF documents into individual PNG images, which you can download as a single ZIP file for convenience.'
    }
]

/**
 * Specific FAQ questions for PDF to JPG conversions
 */
export const PDF_TO_JPG_FAQ = [
    {
        question: 'Is this PDF to JPG converter free?',
        answer: 'Yes, our PDF to JPG converter is 100% free with no limits. You can convert as many PDF pages to JPG images as you need without any cost or registration.'
    },
    {
        question: 'Are my files secure?',
        answer: 'Absolutely. We use advanced client-side technology to process your files directly in your browser. Your PDF documents never leave your device and are never uploaded to any server, guaranteeing complete privacy.'
    },
    {
        question: 'Can I convert multi-page PDFs?',
        answer: 'Yes! Our tool automatically detects multi-page PDFs and converts each page into a high-quality separate JPG image. You can then download them all at once.'
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
