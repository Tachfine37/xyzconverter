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
    },

    '/pdf-to-jpg': {
        title: 'Convert PDF to JPG Online - Free & Secure',
        description: 'Convert PDF documents to JPG images instantly in your browser. Extract all pages as high-quality JPG files with 2x resolution rendering. No upload required - 100% client-side processing ensures complete privacy.',
        features: [
            'High-quality JPG output - 2x resolution rendering',
            'Batch conversion - all pages converted at once',
            'Multi-page PDFs create ZIP archive automatically',
            'No file size limits - handle any PDF size',
            'Works offline after first load',
            'Privacy guaranteed - files never leave your device'
        ],
        howItWorks: {
            title: 'How to Convert PDF to JPG',
            steps: [
                'Upload your PDF file (drag and drop supported)',
                'Each page is rendered at 2x scale for quality',
                'Pages are converted to JPG format (90% quality)',
                'Download single image or ZIP archive with all pages'
            ]
        },
        benefits: [
            'Privacy-first - files never leave your device',
            'Fast conversion - no server upload/download delays',
            'Free forever - no limits, no watermarks',
            'Secure - client-side processing only',
            'High quality - 2x scale rendering for sharp images'
        ]
    },

    '/pdf-to-png': {
        title: 'Convert PDF to PNG Online - Lossless Quality',
        description: 'Convert PDF to PNG with perfect lossless quality. Extract all pages as high-resolution PNG images. Free, secure, and works entirely in your browser with no uploads or privacy concerns.',
        features: [
            'Lossless PNG quality - no compression artifacts',
            'Transparent background support',
            'High-resolution output - 2x scale rendering',
            'Batch processing for multi-page PDFs',
            'Automatic ZIP creation for multiple pages',
            'Privacy-first - 100% client-side processing'
        ],
        howItWorks: {
            title: 'How to Convert PDF to PNG',
            steps: [
                'Select your PDF document',
                'Pages are rendered to canvas at high resolution',
                'Converted to lossless PNG format',
                'Download images or ZIP file with all pages'
            ]
        },
        benefits: [
            'Perfect quality - lossless PNG format',
            'Private - no server upload required',
            'Fast - instant conversion in browser',
            'Free - unlimited conversions',
            'Secure - all processing happens locally'
        ]
    },

    '/pdf-to-webp': {
        title: 'Convert PDF to WebP - Modern Image Format',
        description: 'Convert PDF to WebP for smaller file sizes with excellent quality. Modern image format with better compression than JPG. 100% client-side processing ensures your files stay private.',
        features: [
            'Modern WebP format - next-generation compression',
            'Smaller file sizes than JPG/PNG - 25-35% reduction',
            'High quality at lower file size',
            'Multi-page support with automatic ZIP',
            'Fast browser-based conversion',
            'Privacy guaranteed - no uploads'
        ],
        howItWorks: {
            title: 'How to Convert PDF to WebP',
            steps: [
                'Upload PDF file',
                'Pages rendered at high resolution (2x scale)',
                'Converted to optimized WebP format',
                'Download modern, efficient images'
            ]
        },
        benefits: [
            'Efficient - 25-35% smaller than JPG',
            'Quality - better compression algorithm',
            'Secure - client-side only processing',
            'Free - no limits or fees',
            'Modern - perfect for web use'
        ]
    },

    '/png-to-jpg': {
        title: 'Convert PNG to JPG - Reduce File Size',
        description: 'Convert PNG images to JPG format for smaller file sizes and broader compatibility. Perfect for photos where lossless quality is not necessary. Our converter processes everything locally in your browser - no uploads, complete privacy.',
        features: [
            'Significant size reduction - JPG is much smaller than PNG',
            'Quality control - adjust compression level',
            'Batch conversion - process multiple files at once',
            'Privacy-first - files never leave your device',
            'Free and unlimited use'
        ],
        howItWorks: {
            title: 'How to Convert PNG to JPG',
            steps: [
                'Upload your PNG files (drag and drop supported)',
                'Conversion processes instantly in your browser',
                'Preview the result before downloading',
                'Download your optimized JPG files'
            ]
        },
        benefits: [
            'Smaller file sizes - easier to share and store',
            'Universal compatibility - JPG works everywhere',
            'Fast loading - perfect for web and email',
            'Privacy guaranteed - no server uploads',
            'Free forever - no watermarks or limits'
        ]
    },

    '/jpg-to-png': {
        title: 'Convert JPG to PNG - Lossless Quality',
        description: 'Convert JPG images to PNG format for lossless quality and transparency support. Ideal for graphics, logos, and images requiring transparent backgrounds. All processing happens locally in your browser.',
        features: [
            'Lossless conversion - no quality degradation',
            'Transparency support - PNG alpha channel',
            'High-resolution output - maintains original quality',
            'Privacy-first - 100% client-side processing',
            'Batch conversion support'
        ],
        howItWorks: {
            title: 'How to Convert JPG to PNG',
            steps: [
                'Select or drag JPG images to upload',
                'Automatic conversion to PNG format',
                'Preview lossless output',
                'Download high-quality PNG files'
            ]
        },
        benefits: [
            'Lossless quality - no compression artifacts',
            'Transparency ready - add backgrounds later',
            'Professional results - perfect for graphics',
            'Secure processing - files stay local',
            'Unlimited conversions - completely free'
        ]
    },

    '/webp-to-png': {
        title: 'Convert WEBP to PNG - Lossless Quality',
        description: 'Convert WEBP images to PNG for maximum compatibility and lossless quality. Perfect for when you need transparency support or maximum image fidelity. All processing is done locally in your browser.',
        features: [
            'Lossless conversion - preserves all image data',
            'Transparency support - maintains alpha channel',
            'Universal compatibility - PNG works everywhere',
            'Privacy guaranteed - no file uploads',
            'Instant processing - no waiting'
        ],
        howItWorks: {
            title: 'How to Convert WEBP to PNG',
            steps: [
                'Upload your WEBP files',
                'Automatic lossless conversion',
                'Preview the PNG output',
                'Download your files'
            ]
        },
        benefits: [
            'Maximum quality - lossless PNG format',
            'Full compatibility - works on all devices',
            'Transparency preserved - alpha channel intact',
            'Private and secure - local processing only',
            'Free and unlimited'
        ]
    },

    '/jfif-to-jpg': {
        title: 'Convert JFIF to JPG - Standard JPEG Format',
        description: 'Convert JFIF images to standard JPG format for better compatibility. JFIF and JPEG are technically the same format, but some applications prefer the .jpg extension. Quick and easy conversion in your browser.',
        features: [
            'Instant conversion - JFIF to JPG in seconds',
            'No quality loss - same image data',
            'Better compatibility - .jpg is more widely recognized',
            'Privacy-first - local processing only',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert JFIF to JPG',
            steps: [
                'Upload your JFIF files',
                'Automatic format conversion',
                'Download standard JPG files'
            ]
        },
        benefits: [
            'Universal compatibility - .jpg works everywhere',
            'No quality loss - same image preserved',
            'Quick and easy - instant results',
            'Private - no server uploads',
            'Free to use'
        ]
    },

    '/jfif-to-png': {
        title: 'Convert JFIF to PNG - Lossless Format',
        description: 'Convert JFIF images to PNG format for lossless quality and transparency support. Upgrade your photos to a format that does not lose quality on each save.',
        features: [
            'Lossless output - no compression artifacts',
            'Transparency support - add backgrounds later',
            'High quality - preserves image details',
            'Client-side processing - files stay private',
            'Batch conversion available'
        ],
        howItWorks: {
            title: 'How to Convert JFIF to PNG',
            steps: [
                'Select JFIF files to convert',
                'Automatic PNG conversion',
                'Preview and download'
            ]
        },
        benefits: [
            'Better quality - lossless PNG format',
            'Transparency ready - for graphics work',
            'Universal format - PNG works everywhere',
            'Secure - no file uploads',
            'Free forever'
        ]
    },

    '/svg-to-png': {
        title: 'Convert SVG to PNG - Rasterize Vector Graphics',
        description: 'Convert SVG vector graphics to PNG raster images. Perfect for using vector logos and icons in contexts that do not support SVG. Choose your output resolution for crisp results at any size.',
        features: [
            'High-quality rasterization - crisp output',
            'Transparent background - PNG alpha support',
            'Custom resolution - 1x, 2x, or 3x scale',
            'Privacy-first - local browser processing',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert SVG to PNG',
            steps: [
                'Upload your SVG file',
                'Select output resolution if needed',
                'Automatic rasterization to PNG',
                'Download high-quality PNG'
            ]
        },
        benefits: [
            'Universal compatibility - PNG works everywhere',
            'Transparent backgrounds - preserved from SVG',
            'Scalable output - choose your resolution',
            'Secure - no server-side processing',
            'Free to use - no limits'
        ]
    },

    '/svg-to-jpg': {
        title: 'Convert SVG to JPG - Vector to Photo Format',
        description: 'Convert SVG vector graphics to JPG format. Ideal for using vector designs in contexts requiring photo formats. Note: JPG does not support transparency, so backgrounds will be filled.',
        features: [
            'Quick conversion - SVG to JPG in seconds',
            'Quality control - adjust compression level',
            'Custom resolution support',
            'Local processing - your files stay private',
            'Batch conversion capable'
        ],
        howItWorks: {
            title: 'How to Convert SVG to JPG',
            steps: [
                'Upload your SVG file',
                'Choose resolution and quality settings',
                'Vector is rasterized to JPG',
                'Download your JPG file'
            ]
        },
        benefits: [
            'Broad compatibility - JPG works everywhere',
            'Smaller files - compressed format',
            'Easy sharing - universal format support',
            'Private - client-side only',
            'Free forever'
        ]
    },

    '/jpg-to-pdf': {
        title: 'Convert JPG to PDF - Create Documents from Photos',
        description: 'Convert JPG images to PDF documents. Perfect for creating printable documents, archiving photos, or sharing multiple images as a single file. All processing happens in your browser.',
        features: [
            'High-quality PDF output - preserves image resolution',
            'Multiple images support - combine into one PDF',
            'Custom page sizing - A4, Letter, or auto-fit',
            'Privacy guaranteed - no file uploads',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert JPG to PDF',
            steps: [
                'Upload one or more JPG images',
                'Automatic conversion to PDF',
                'Preview the document',
                'Download your PDF'
            ]
        },
        benefits: [
            'Professional documents - from simple photos',
            'Easy sharing - PDF is universal',
            'Print-ready - high-quality output',
            'Secure - local processing only',
            'Free to use'
        ]
    },

    '/compress-image': {
        title: 'Image Compressor - Reduce File Size Without Quality Loss',
        description: 'Compress your images to reduce file size while maintaining visual quality. Adjust compression levels with a quality slider and see real-time previews before downloading. Perfect for web optimization.',
        features: [
            'Real-time preview - see compression results instantly',
            'Quality slider - fine-tune compression level',
            'Size comparison - see before/after file sizes',
            'Multiple formats - JPG, PNG, WebP support',
            'Privacy-first - 100% local processing'
        ],
        howItWorks: {
            title: 'How to Compress Images',
            steps: [
                'Upload your image (JPG, PNG, or WebP)',
                'Adjust the quality slider to your preference',
                'Preview compressed result and size reduction',
                'Download optimized image'
            ]
        },
        benefits: [
            'Faster websites - optimized images load quickly',
            'Save storage - smaller files use less space',
            'Keep quality - smart compression preserves details',
            'Private - files never leave your device',
            'Free and unlimited'
        ]
    }
}

