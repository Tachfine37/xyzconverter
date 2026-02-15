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
        title: 'Convert HEIC to JPG Online – Free HEIC to JPG Converter',
        description: 'Easily convert HEIC to JPG online with our free HEIC converter. Perfect for iPhone photos. Works in your browser with no upload required–secure, private, and fast.',
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
                'Drag and drop your HEIC/HEIF photos',
                'The converter processes files instantly in your browser',
                'Download your JPG images individually or as a ZIP'
            ]
        },
        benefits: [
            'Convert iPhone HEIC photos to widely supported JPG',
            '100% private - photos never leave your device',
            'Batch convert multiple files at once',
            'No file size limits'
        ]
    },
    '/heic-to-png': {
        title: 'Convert HEIC to PNG Online – Free HEIC to PNG Converter',
        description: 'Easily convert HEIC to PNG online with our free HEIC converter. High-quality, lossless conversion for iPhone photos. Works in your browser with no upload required.',
        features: [
            'Lossless PNG quality - preserve every detail',
            '100% client-side processing - your photos never leave your device',
            'Batch conversion - convert multiple HEIC files at once',
            'No file size limits - convert photos of any resolution',
            'Works offline - no internet required after page load',
            'Free forever - no watermarks, no accounts'
        ],
        howItWorks: {
            title: 'How to Convert HEIC to PNG',
            steps: [
                'Drag and drop your HEIC/HEIF photos',
                'The converter processes files instantly in your browser',
                'Download your PNG images individually or as a ZIP'
            ]
        },
        benefits: [
            'Convert iPhone HEIC photos to lossless PNG',
            'Maintain highest possible image quality',
            '100% private - photos never leave your device',
            'Batch convert multiple files'
        ]
    },

    '/webp-to-jpg': {
        title: 'Convert WebP to JPG Online – Free WebP to JPG Converter',
        description: 'Easily convert WebP images to JPG online with our free WebP to JPG converter. Make your WebP images compatible with all devices. Works in your browser with no upload required.',
        features: [
            'Convert WebP to universally supported JPG',
            'Batch processing - convert multiple files at once',
            'High-quality JPG output',
            '100% client-side processing - files never leave your device',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert WebP to JPG',
            steps: [
                'Drag and drop your WebP images',
                'The converter processes files instantly in your browser',
                'Download your JPG images compatible with any software'
            ]
        },
        benefits: [
            'Universal compatibility - JPG opens everywhere',
            'Easy sharing - no more "unsupported format" errors',
            'Privacy-first - local processing',
            'Fast and free - no waiting, no costs'
        ]
    },

    '/webp-to-png': {
        title: 'Convert WebP to PNG Online – Free WebP to PNG Converter',
        description: 'Easily convert WebP to PNG online with our free WebP to PNG converter. Perfect for lossless quality and compatibility. Works in your browser with no upload required.',
        features: [
            'Convert WebP to lossless PNG',
            'Batch processing - convert multiple files at once',
            'High-quality output',
            '100% client-side processing - files never leave your device',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert WebP to PNG',
            steps: [
                'Drag and drop your WebP images',
                'The converter processes files instantly in your browser',
                'Download your PNG images individually or as a ZIP'
            ]
        },
        benefits: [
            'Lossless quality - keep every detail',
            'Transparency support - perfect for graphics',
            'Privacy-first - local processing',
            'Fast and free - instant conversion'
        ]
    },

    '/png-to-pdf': {
        title: 'Convert PNG to PDF Online – Free PNG to PDF Converter',
        description: 'Easily convert PNG images to PDF online with our free PNG to PDF converter. Merge multiple PNGs into a single professional document. Works in your browser with no upload required.',
        features: [
            'Merge multiple PNGs into one PDF',
            'Adjust page size (A4, Letter, Auto)',
            'Reorder pages easily - drag and drop',
            '100% client-side processing - files never leave your device',
            'High-quality PDF output',
            'Free and unlimited'
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

    '/jpg-to-pdf': {
        title: 'Convert JPG to PDF Online – Free JPG to PDF Converter',
        description: 'Easily convert JPG images to PDF online with our free JPG to PDF converter. Merge multiple JPGs into a single professional document. Works in your browser with no upload required.',
        features: [
            'Merge multiple JPGs into one PDF',
            'Adjust page size (A4, Letter, Auto)',
            'Reorder pages easily - drag and drop',
            '100% client-side processing - files never leave your device',
            'High-quality PDF output',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert JPG to PDF',
            steps: [
                'Select or drag multiple JPG images to upload',
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

    '/heic-to-pdf': {
        title: 'Convert HEIC to PDF Online – Free HEIC to PDF Converter',
        description: 'Easily convert HEIC to PDF online with our free HEIC converter. Perfect for iPhone photos. Works in your browser with no upload required—secure, private, and fast.',
        features: [
            '100% client-side processing - HEIC photos never leave your device',
            'High-quality PDF output - preserves image resolution',
            'Batch conversion - convert multiple HEIC files at once',
            'A4 page fitting - images are automatically scaled to fit',
            'Works offline - no internet required after page load',
            'Free forever - no watermarks, no accounts, no hidden fees'
        ],
        howItWorks: {
            title: 'How to Convert HEIC to PDF',
            steps: [
                'Drag and drop your HEIC files from iPhone or iPad',
                'HEIC is decoded locally, then converted to a PDF page',
                'Images are automatically scaled to fit an A4 page',
                'Download your PDF document instantly'
            ]
        },
        benefits: [
            'Professional documents - turn iPhone photos into shareable PDFs',
            'Easy archiving - combine photos into organized documents',
            'Privacy-first - no cloud uploads, no tracking, no data collection',
            'Lightning fast - powered by local browser processing',
            'Universal format - PDF works on every device and platform'
        ]
    },

    '/jpg-to-webp': {
        title: 'Convert JPG to WebP Online – Free JPG to WebP Converter',
        description: 'Easily convert JPG to WebP online with our free JPG to WebP converter. Reduce file size by up to 80% while preserving quality. Works in your browser with no upload required—secure, private, and fast.',
        features: [
            'Significant file size reduction',
            'High-quality WebP output',
            'Batch processing - convert multiple files at once',
            '100% client-side processing - files never leave your device',
            'Adjustable quality settings',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert JPG to WebP',
            steps: [
                'Drag and drop your JPG images',
                'Adjust quality settings if needed',
                'The converter processes files instantly in your browser',
                'Download your optimized WebP images'
            ]
        },
        benefits: [
            'Smaller file sizes - faster website loading',
            'Better SEO - improved Core Web Vitals',
            'Modern format - supported by all modern browsers',
            'Privacy-first - all processing is local',
            'Free forever - no limits'
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
                'Upload multiple PDF files',
                'Arrange them in your preferred order',
                'Download your merged PDF instantly'
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
                'Upload your PDF file',
                'The converter extracts pages as high-quality JPGs',
                'Download your images instantly'
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
                'The converter extracts pages as high-quality PNGs',
                'Download your images instantly'
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
        title: 'Convert PNG to JPG Online – Free PNG to JPG Converter',
        description: 'Easily convert PNG to JPG online with our free PNG to JPG converter. Reduce file size while maintaining great quality. Works in your browser with no upload required—secure, private, and fast.',
        features: [
            'Significant file size reduction',
            'Flatten transparent images to white background',
            'Batch processing - convert multiple files at once',
            'High-quality JPG output',
            '100% client-side processing - files never leave your device',
            'Free and unlimited'
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

    '/png-to-webp': {
        title: 'Convert PNG to WebP Online – Free PNG to WebP Converter',
        description: 'Easily convert PNG to WebP online with our free PNG to WebP converter. Reduce file size by up to 80% while preserving transparency. Works in your browser with no upload required—secure, private, and fast.',
        features: [
            'Significant file size reduction',
            'Preserve transparency (alpha channel)',
            'Batch processing - convert multiple files at once',
            'High-quality WebP output',
            '100% client-side processing - files never leave your device',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert PNG to WebP',
            steps: [
                'Drag and drop your PNG files',
                'The converter processes files instantly in your browser',
                'Download your WebP images individually or as a ZIP'
            ]
        },
        benefits: [
            'Smaller file sizes - faster website loading',
            'Transparency support - perfect for web graphics',
            'Modern format - supported by all modern browsers',
            'Privacy-first - all processing is local',
            'Free forever - no limits'
        ]
    },

    '/jpg-to-png': {
        title: 'Convert JPG to PNG Online – Free JPG to PNG Converter',
        description: 'Easily convert JPG to PNG online with our free JPG to PNG converter. Lossless quality and transparency support. Works in your browser with no upload required—secure, private, and fast.',
        features: [
            'Lossless conversion - no quality degradation',
            'Transparency support - PNG alpha channel',
            'High-resolution output',
            '100% client-side processing - files never leave your device',
            'Batch conversion support',
            'Free and unlimited'
        ],
        howItWorks: {
            title: 'How to Convert JPG to PNG',
            steps: [
                'Drag and drop your JPG images',
                'The converter processes files instantly in your browser',
                'Download your high-quality PNG images'
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
        title: 'Convert SVG to PNG Online – Free SVG to PNG Converter',
        description: 'Easily convert SVG to PNG high resolution with our free SVG to PNG converter. Rasterize your vector graphics for web and apps. Works in your browser with no upload required.',
        features: [
            'High-resolution rasterization',
            'Preserve transparency',
            'Batch processing - convert multiple files at once',
            '100% client-side processing - files never leave your device',
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
        title: 'Convert SVG to JPG Online – Free SVG to JPG Converter',
        description: 'Easily convert SVG to JPG online with our free SVG to JPG converter. Perfect for converting vectors to images for compatibility. Works in your browser with no upload required.',
        features: [
            'High-quality SVG to JPG conversion',
            'Batch processing - convert multiple files at once',
            'Custom background color (white by default)',
            '100% client-side processing - files never leave your device',
            'Free and unlimited'
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
            'Universal compatibility - JPG works everywhere',
            'Smaller file sizes - efficient compression',
            'Easy sharing - standard photo format',
            'Private - client-side only',
            'Free forever'
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
    },
    '/split-pdf': {
        title: 'Split PDF Files Online – Free & Secure PDF Splitter',
        description: 'Easily split PDF online with our free PDF splitter. Extract PDF pages instantly with no upload required—100% secure client-side processing ensures your documents never leave your device.',
        features: [
            'Extract specific pages - choose ranges or single pages',
            'Burst mode - split every page into a separate file',
            'Secure processing - files never leave your device',
            'Fast and reliable - split large PDFs locally',
            'Free forever - no limits or fees'
        ],
        howItWorks: {
            title: 'How to Split PDF Files',
            steps: [
                'Upload your PDF file',
                'Select pages to extract or split',
                'Download your new PDF files'
            ]
        },
        benefits: [
            'Extract exactly what you need - save only relevant pages',
            'Easy organization - separate large documents',
            'Privacy-first - no cloud uploads',
            'Instant results - no waiting for processing',
            'Free to use - unlimited splits'
        ]
    },
    '/json-to-csv': {
        title: 'Convert JSON to CSV Online – Free JSON to CSV Converter for Excel',
        description: 'Easily convert JSON arrays to CSV with our free JSON to CSV converter. Works in your browser with no upload required—securely process your data locally.',
        features: [
            'Convert formatted JSON to CSV instantly',
            'Flattens nested objects automatically',
            'Works with Excel, Sheets, and other tools',
            '100% private - data never leaves your browser',
            'Handle large JSON files with ease'
        ],
        howItWorks: {
            title: 'How to Convert JSON to CSV',
            steps: [
                'Paste or upload your JSON code',
                'The converter automatically flattens arrays to CSV',
                'Copy or download your CSV file'
            ]
        },
        benefits: [
            'Convert complex JSON to Excel-ready CSV',
            '100% private - runs in browser',
            'Fast handling of large datasets',
            'No file size limits'
        ]
    },
    '/data-tools': {
        title: 'Online Data Format Converter – JSON, YAML, XML & Base64 Tools',
        description: 'Easily convert JSON to YAML, JSON to XML, or perform XML to JSON conversions online. Includes a Base64 encoder and decoder. This browser-based tool ensures no upload required—securely process your data locally.',
        features: [
            'JSON ↔ YAML Conversion',
            'JSON ↔ XML Conversion',
            'Base64 Encode / Decode',
            'Live Preview',
            'Syntax Highlighting'
        ],
        howItWorks: {
            title: 'How It Works',
            steps: [
                'Paste or upload your data',
                'Select input and output formats',
                'Copy or download resulted data'
            ]
        },
        benefits: [
            'Browser-based tool - no installation',
            'No upload required - private & secure',
            'Instant conversion - real-time results',
            'Supports multiple formats - JSON, YAML, XML, Base64',
            'Developer friendly - clean output'
        ]
    }
}

