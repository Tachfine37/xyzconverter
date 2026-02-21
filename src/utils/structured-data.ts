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
    }
]

/**
 * Specific FAQ questions for Compress PDF
 */
export const COMPRESS_PDF_FAQ = [
    {
        question: 'How do I compress a PDF file?',
        answer: 'Upload your PDF file to the tool. It will automatically optimized and compressed to reduce file size while maintaining readability.'
    },
    {
        question: 'Is it free to compress PDFs?',
        answer: 'Yes, our PDF compressor is 100% free. You can compress as many files as you need without any limits or hidden processing fees.'
    },
    {
        question: 'Will compression reduce quality?',
        answer: 'Our tool optimizes the internal structure of the PDF to reduce size. In some cases, it may slightly reduce image quality to achieve better compression, but text remains sharp and readable.'
    }
]

/**
 * Specific FAQ questions for PDF to Text
 */
export const PDF_TO_TEXT_FAQ = [
    {
        question: 'How do I extract text from PDF?',
        answer: 'Simply upload your PDF document. Our tool will instantly extract all text content from the file and present it to you for copying or downloading.'
    },
    {
        question: 'Does it work with scanned PDFs?',
        answer: 'Our tool extracts text layer data. If your PDF is a scanned image without a text layer, you might need OCR software. This tool works best with PDFs created from text documents.'
    },
    {
        question: 'Is my document secure?',
        answer: 'Absolutely. Text extraction happens entirely in your browser using JavaScript. Your confidential documents are never uploaded to any server.'
    }
]

/**
 * Specific FAQ questions for Rotate PDF
 */
export const ROTATE_PDF_FAQ = [
    {
        question: 'How do I rotate PDF pages?',
        answer: 'Upload your PDF and choose the rotation angle (90, 180, or 270 degrees). You can rotate all pages at once and download the corrected document.'
    },
    {
        question: 'Can I rotate specific pages?',
        answer: 'Currently, our tool rotates the entire document. This is perfect for fixing PDFs that were scanned upside down or sideways.'
    },
    {
        question: 'Is it free?',
        answer: 'Yes, our rotate PDF tool is completely free and works instantly in your browser without uploading your files.'
    }
]

/**
 * Specific FAQ questions for Images to PDF
 */
export const IMAGES_TO_PDF_FAQ = [
    {
        question: 'How do I convert images to PDF?',
        answer: 'Select your JPG or PNG images and drop them into the tool. We will automatically combine them into a single, high-quality PDF document.'
    },
    {
        question: 'Can I reorder images?',
        answer: 'Yes, you can upload multiple images and they will be added to the PDF in the order you selected them.'
    },
    {
        question: 'Is there a limit on images?',
        answer: 'There is no strict limit, but for browser performance, we recommend converting reasonable batches of images at a time. The tool is free and processes everything locally.'
    }
]
export const WATERMARK_FAQ = [
    {
        question: "Is it safe to watermark PDFs here?",
        answer: "Yes! All processing happens in your browser. Your files are never uploaded to any server."
    },
    {
        question: "Can I use an image as a watermark?",
        answer: "Currently, we support text watermarks. Image watermark support is coming soon!"
    },
    {
        question: "Is this tool free?",
        answer: "Yes, our watermark tool is 100% free with no limits."
    }
]

export const PDF_TO_WORD_FAQ = [
    {
        question: "Does the converted Word file keep formatting?",
        answer: "We aim to preserve text and basic layout. Complex formatting might require some adjustments in Word."
    },
    {
        question: "Can I convert scanned PDFs?",
        answer: "This tool works best with text-based PDFs. Scanned PDFs (images) only contain images and text extraction might not work."
    }
]

export const PDF_TO_EXCEL_FAQ = [
    {
        question: "How accurate is the table extraction?",
        answer: "It works well for clear, grid-based tables. Complex or merged cells might need manual cleanup."
    },
    {
        question: "Do you support CSV export?",
        answer: "Currently we export to .xlsx (Excel), which can be easily saved as CSV from Excel."
    }
]
export const PDF_TO_POWERPOINT_FAQ = [
    {
        question: "Does the conversion preserve layout?",
        answer: "Yes! Our converter renders each PDF page as a high-quality image on a PowerPoint slide, ensuring 100% visual fidelity."
    },
    {
        question: "Is the text editable?",
        answer: "Currently, the slides are image-based to preserve exact layout. Text is not directly editable, but you can add new text boxes over the slides."
    },
    {
        question: "Is my presentation private?",
        answer: "Absolutely. The entire conversion happens in your browser. Your PDF never leaves your device."
    }
]

export const TEXT_TO_SPEECH_FAQ = [
    {
        question: "Is this text to speech tool free?",
        answer: "Yes, it uses your browser's built-in speech synthesis capabilities, which are completely free to use."
    },
    {
        question: "Can I download the audio?",
        answer: "Currently, this tool is for playback only. Browser security restrictions make direct audio download difficult without server processing (which we avoid for privacy)."
    },
    {
        question: "What voices are available?",
        answer: "The available voices depend on your operating system and browser. Most modern devices include several high-quality male and female voices."
    }
]

export const REMOVE_LINE_BREAKS_FAQ = [
    {
        question: "Does this remove all formatting?",
        answer: "It specifically targets line breaks (newlines). You can choose to replace them with spaces (to make a paragraph) or nothing (to compact text)."
    },
    {
        question: "Is my text saved?",
        answer: "No. Your text is processed temporarily in your browser memory and is cleared when you refresh or leave the page."
    }
]

export const REVERSE_TEXT_FAQ = [
    {
        question: "Can I reverse words but keep them in order?",
        answer: "Yes, we have a 'Reverse Words' mode that keeps the word order but flips the letters allowed within each word."
    },
    {
        question: "Why would I use this?",
        answer: "It's popular for social media posts, creating puzzles, or simple encryption (obfuscation) of text spoilers."
    }
]

export const LOREM_IPSUM_FAQ = [
    {
        question: "What is Lorem Ipsum?",
        answer: "Lorem Ipsum is standard placeholder text used in the printing and typesetting industry. It looks like Latin but is actually nonsense text."
    },
    {
        question: "Is the text unique?",
        answer: "We use a standard generator algorithm to create randomized Lorem Ipsum text that looks natural and non-repetitive."
    }
]

export const RANDOM_TEXT_FAQ = [
    {
        question: "Is this safe for passwords?",
        answer: "Yes! We use the browser's cryptographically secure random number generator (window.crypto), making it safe for generating strong passwords."
    },
    {
        question: "Is the generated text stored?",
        answer: "Never. The generation happens locally on your device and is never sent to our servers."
    }
]

export const CROP_IMAGE_FAQ = [
    {
        question: 'How do I crop an image online for free?',
        answer: 'Upload any JPG, PNG, or WebP image to our cropper. Drag to pan, use the slider to zoom, then resize the crop box to your desired area. Click "Apply Crop" and download the result — completely free with no watermarks.'
    },
    {
        question: 'Is my photo uploaded to a server?',
        answer: 'No. All cropping happens directly in your browser using HTML5 Canvas. Your image never leaves your device, making it the most private way to crop photos online.'
    },
    {
        question: 'What image formats can I crop?',
        answer: 'You can crop JPG/JPEG, PNG, and WebP images. The output keeps the same format as your original file to preserve quality and transparency.'
    },
    {
        question: 'Can I crop to a specific aspect ratio?',
        answer: 'Currently our cropper supports free-form cropping so you can select any region you like. This gives you maximum flexibility for any use case.'
    }
]

export const WORD_TO_PDF_FAQ = [
    {
        question: 'How do I convert Word to PDF online?',
        answer: 'Upload your .docx file, and our tool will convert it to a PDF document instantly in your browser. No Microsoft Word installation or account required.'
    },
    {
        question: 'Does it preserve formatting?',
        answer: 'Yes. Our converter maintains text, headings, paragraphs, and basic styling from your Word document when creating the PDF output.'
    },
    {
        question: 'Is my document kept private?',
        answer: 'Absolutely. The conversion runs entirely in your browser using client-side JavaScript. Your Word file is never uploaded to any server.'
    },
    {
        question: 'What Word formats are supported?',
        answer: 'We support .docx files (Microsoft Word 2007 and later). For older .doc files, save them as .docx in Word first, then upload.'
    }
]

export const CASE_CONVERTER_FAQ = [
    {
        question: 'What text cases can I convert between?',
        answer: 'You can convert to UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg CaSe, iNVERSE cASE, and Capitalized Case — all with one click.'
    },
    {
        question: 'Can I use this for code variable naming?',
        answer: 'Yes! Title Case and Capitalized Case are great starting points for camelCase or PascalCase variable names. Paste in your text and convert instantly.'
    },
    {
        question: 'Is there a character limit?',
        answer: 'No hard limit. The tool processes text locally in your browser, so it can handle very long documents without issues.'
    }
]

export const CHARACTER_COUNTER_FAQ = [
    {
        question: 'How does the character counter work?',
        answer: 'Simply paste or type text into the box. The tool instantly counts characters (with and without spaces), words, sentences, paragraphs, and estimates reading time.'
    },
    {
        question: 'Does it count spaces as characters?',
        answer: 'We show both counts: total characters including spaces and characters excluding spaces, so you have the exact numbers for any platform limit.'
    },
    {
        question: 'Can I check social media character limits?',
        answer: 'Yes! We display limits for Twitter/X (280), Instagram captions (2,200), Facebook posts (63,206), and more — with a visual indicator showing how close you are.'
    },
    {
        question: 'Is my text stored or sent anywhere?',
        answer: 'Never. All counting happens locally in your browser. Your text is processed in memory and cleared when you leave the page.'
    }
]

export const REMOVE_EXTRA_SPACES_FAQ = [
    {
        question: 'What does "remove extra spaces" do?',
        answer: 'It collapses multiple consecutive spaces into a single space, trims leading/trailing whitespace, and can optionally remove empty lines or all line breaks from your text.'
    },
    {
        question: 'Can I also remove line breaks?',
        answer: 'Yes. We offer separate options to remove extra spaces only, remove all spaces, remove line breaks, remove empty lines, and trim each line — all in one tool.'
    },
    {
        question: 'Will this fix text copied from PDFs?',
        answer: 'Often yes. PDF-copied text frequently has extra spaces and line breaks. Our tool cleans these up in one click, giving you clean, readable text.'
    }
]

export const SLUG_GENERATOR_FAQ = [
    {
        question: 'What is a URL slug?',
        answer: 'A slug is the URL-friendly version of a title or text. It converts spaces to hyphens, removes special characters, and lowercases everything (e.g., "My Blog Post" becomes "my-blog-post").'
    },
    {
        question: 'Why are slugs important for SEO?',
        answer: 'Clean, descriptive URL slugs help search engines understand page content and improve click-through rates. Users also prefer readable URLs over random character strings.'
    },
    {
        question: 'Does it handle non-English characters?',
        answer: 'Yes. Our generator transliterates accented and special characters (é→e, ñ→n) to create ASCII-safe slugs that work in any browser or CMS.'
    }
]

export const PASSWORD_GENERATOR_FAQ = [
    {
        question: 'How secure are the generated passwords?',
        answer: "Very secure. We use the browser's built-in cryptographic random number generator (crypto.getRandomValues) which produces truly unpredictable values — the same technology used by password managers."
    },
    {
        question: 'Are my passwords stored anywhere?',
        answer: 'Never. Passwords are generated entirely on your device and exist only in your browser memory. We have no server, database, or analytics that could capture them.'
    },
    {
        question: 'How long should my password be?',
        answer: 'Security experts recommend at least 12-16 characters with a mix of uppercase, lowercase, numbers, and symbols. Our tool lets you customize length up to 128 characters.'
    },
    {
        question: 'Can I generate multiple passwords at once?',
        answer: 'Yes. Generate as many passwords as you need — each one is created fresh with cryptographic randomness. Use different passwords for different accounts for maximum security.'
    }
]

export const QR_GENERATOR_FAQ = [
    {
        question: 'How do I create a QR code for free?',
        answer: 'Type or paste any URL, text, email, phone number, or Wi-Fi credentials into our generator. A QR code is created instantly that you can download as a PNG image.'
    },
    {
        question: 'Do the QR codes expire?',
        answer: 'No. QR codes generated here are static — they encode the data directly in the image pattern. They will work forever and never expire, with no subscription needed.'
    },
    {
        question: 'Can I use these for commercial purposes?',
        answer: 'Absolutely. The QR codes you generate are yours to use however you like — on business cards, flyers, product packaging, menus, or any other application.'
    },
    {
        question: 'Is the QR code generated privately?',
        answer: 'Yes. The QR code is generated entirely in your browser. The URL or data you enter is never sent to our servers.'
    }
]

export const QR_SCANNER_FAQ = [
    {
        question: 'How do I scan a QR code on my computer?',
        answer: 'Upload a screenshot or photo containing a QR code, or use your webcam to scan it in real-time. Our tool detects and decodes the QR code instantly in your browser.'
    },
    {
        question: 'What types of QR codes can it read?',
        answer: 'Our scanner reads all standard QR code types including URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, vCards, and more.'
    },
    {
        question: 'Does it work with blurry or small QR codes?',
        answer: 'Our decoder handles most readable QR codes, but for best results use a clear, well-lit image. If using a webcam, hold the QR code steady and close to the camera.'
    }
]
