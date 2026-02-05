/**
 * SEO Content Configurations
 * Pre-written SEO content for each conversion page
 */

interface ConversionSEOContent {
    title: string
    description: string
    features: string[]
    howItWorks: {
        title: string
        steps: string[]
    }
    benefits: string[]
}

export const CONVERSION_CONTENT: Record<string, ConversionSEOContent> = {
    '/heic-to-jpg': {
        title: 'What is HEIC to JPG Conversion?',
        description: 'HEIC (High Efficiency Image Container) is the default photo format on modern iPhones and iPads. While HEIC offers excellent compression and quality, it\'s not universally supported. Converting HEIC to JPG ensures your photos work on any device, platform, or website. Our converter processes everything locally in your browser—no uploads, complete privacy, and instant results.',
        features: [
            '100% client-side processing - your photos never leave your device',
            'Batch conversion - convert multiple HEIC files at once',
            'High-quality output - preserve image quality with customizable settings',
            'No file size limits - convert photos of any resolution',
            'Works offline - no internet required after page load',
            'Free forever - no watermarks, no accounts, no hidden fees'
        ],
        howItWorks: {
            title: 'How to Convert HEIC to JPG',
            steps: [
                'Drag and drop your HEIC files or click to browse',
                'Our conversion engine processes files instantly in your browser',
                'Download individual JPG files or all at once',
                'Delete the originals if needed - all processing is local and private'
            ]
        },
        benefits: [
            'Universal compatibility - JPG works on all devices and platforms',
            'Smaller file sizes - easier to share via email or messaging',
            'Privacy-first - no cloud uploads, no tracking, no data collection',
            'Lightning fast - powered by WebAssembly for maximum performance',
            'Open source - transparent and trustworthy code'
        ]
    },

    '/webp-to-jpg': {
        title: 'Convert WEBP to JPG for Better Compatibility',
        description: 'WEBP is a modern image format developed by Google that offers superior compression. However, not all software and platforms support WEBP files. Converting WEBP to JPG ensures your images are viewable everywhere—from older photo viewers to social media platforms. Our tool handles the conversion entirely in your browser with zero uploads.',
        features: [
            'Privacy-first architecture - files stay on your device',
            'Batch processing - convert dozens of images simultaneously',
            'Quality control - adjust compression to balance size and quality',
            'Instant preview - see the converted image before downloading',
            'Cross-platform - works on Windows, Mac, Linux, iOS, and Android',
            'No installation required - runs directly in your browser'
        ],
        howItWorks: {
            title: 'How to Convert WEBP to JPG',
            steps: [
                'Upload one or more WEBP images (drag and drop supported)',
                'Conversion happens automatically using browser APIs',
                'Review quality and file size in the preview',
                'Download your high-quality JPG images'
            ]
        },
        benefits: [
            'Better compatibility with older devices and software',
            'Easier sharing on social media and messaging apps',
            'No server uploads - complete privacy and security',
            'Free and unlimited - convert as many files as you need',
            'Reliable quality - tested with millions of conversions'
        ]
    },

    '/png-to-pdf': {
        title: 'Convert PNG Images to PDF Documents',
        description: 'Need to turn PNG images into a professional PDF document? Our PNG to PDF converter makes it easy. Whether you\'re creating a photo album, archiving documents, or preparing files for printing, you can merge multiple PNG images into a single multi-page PDF. Everything processes locally in your browser for maximum privacy.',
        features: [
            'Multi-page PDFs - combine multiple PNGs into one document',
            'Custom page order - rearrange images before conversion',
            'Quality preservation - maintain original image resolution',
            'Adjustable page size - A4, Letter, or custom dimensions',
            'No file uploads - 100% client-side processing',
            'Fast and reliable - instant conversion with pdf-lib'
        ],
        howItWorks: {
            title: 'How to Convert PNG to PDF',
            steps: [
                'Select or drag multiple PNG images to upload',
                'Arrange them in your preferred order',
                'Choose page size and orientation settings',
                'Download your completed PDF document'
            ]
        },
        benefits: [
            'Create professional documents from images',
            'Easy sharing - PDF is universally supported',
            'Preservation - PDF maintains quality for long-term storage',
            'Privacy guaranteed - no server-side processing',
            'Free and unlimited use'
        ]
    },

    '/heic-to-png': {
        title: 'Convert HEIC to PNG with Transparency',
        description: 'PNG format offers lossless compression and transparency support, making it ideal for graphics, logos, and high-quality photos. Converting HEIC to PNG ensures your iPhone photos maintain maximum quality while gaining universal compatibility. Our converter processes everything locally—no uploads, no privacy concerns.',
        features: [
            'Lossless conversion - preserve maximum image quality',
            'Transparency support - PNG alpha channel maintained',
            'Batch conversion - process multiple files at once',
            'Privacy-first - files never leave your device',
            'High-resolution support - works with any image size',
            'Free and open - no accounts or subscriptions'
        ],
        howItWorks: {
            title: 'How to Convert HEIC to PNG',
            steps: [
                'Upload your HEIC files from iPhone or iPad',
                'Conversion runs automatically in your browser',
                'Preview the PNG output quality',
                'Download your high-quality PNG images'
            ]
        },
        benefits: [
            'Better quality than JPG - lossless compression',
            'Transparency support - perfect for graphics',
            'Universal compatibility - works everywhere',
            'No privacy risks - 100% local processing',
            'Unlimited conversions - completely free'
        ]
    },

    '/jpg-to-webp': {
        title: 'Optimize Images by Converting JPG to WEBP',
        description: 'WEBP is a next-generation image format that offers 30-40% better compression than JPG while maintaining similar visual quality. Perfect for web developers looking to speed up their sites and reduce bandwidth costs. Our converter processes everything locally with no server uploads.',
        features: [
            'Significant file size reduction - up to 40% smaller',
            'Quality preservation - maintains visual fidelity',
            'Batch optimization - convert multiple images at once',
            'Privacy guaranteed - no file uploads required',
            'Adjustable quality - fine-tune compression settings',
            'Free and unlimited - no restrictions'
        ],
        howItWorks: {
            title: 'How to Convert JPG to WEBP',
            steps: [
                'Upload JPG images you want to optimize',
                'Adjust quality settings if desired (default: 85%)',
                'Conversion processes instantly in browser',
                'Download optimized WEBP files'
            ]
        },
        benefits: [
            'Faster website loading - improved Core Web Vitals',
            'Lower bandwidth costs - smaller file sizes',
            'Better SEO - faster sites rank higher',
            'Privacy-first - all processing is local',
            'Developer-friendly - perfect for web optimization'
        ]
    },

    '/merge-pdf': {
        title: 'Merge Multiple PDF Files into One',
        description: 'Combine multiple PDF documents into a single file with our secure PDF merger. Perfect for consolidating reports, merging scanned documents, or organizing files. All merging happens in your browser using pdf-lib—no uploads, no cloud storage, complete privacy.',
        features: [
            'Unlimited file merging - combine as many PDFs as needed',
            'Drag-and-drop reordering - arrange pages easily',
            'Privacy guaranteed - no server uploads',
            'Fast processing - instant local merging',
            'No file size limits - merge large PDFs',
            'Free forever - no premium features or paywalls'
        ],
        howItWorks: {
            title: 'How to Merge PDFs',
            steps: [
                'Upload two or more PDF files',
                'Drag to reorder PDFs in your preferred sequence',
                'Click "Merge PDFs" to combine them',
                'Download your merged PDF document'
            ]
        },
        benefits: [
            'Consolidate documents - keep everything organized',
            'Easy sharing - one file instead of many',
            'Privacy-first - no cloud uploads',
            'Professional results - maintains PDF quality',
            'Completely free - unlimited use'
        ]
    }
}
