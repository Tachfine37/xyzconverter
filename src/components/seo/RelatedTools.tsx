/**
 * Related Tools Component
 * Displays related conversion tools for internal linking and SEO
 */

import { Link } from 'react-router-dom'
import { ArrowRight, Image, FileText, Database, Type } from 'lucide-react'

export interface RelatedTool {
    name: string
    path: string
    description: string
    category: 'image' | 'pdf' | 'data' | 'text'
}

interface RelatedToolsProps {
    tools: RelatedTool[]
    title?: string
}

const CATEGORY_ICONS = {
    image: Image,
    pdf: FileText,
    data: Database,
    text: Type
}

const CATEGORY_COLORS = {
    image: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
    pdf: 'bg-red-500/10 text-red-600 dark:text-red-400 group-hover:bg-red-500 group-hover:text-white',
    data: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
    text: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white'
}

export function RelatedTools({ tools, title = 'Related Tools' }: RelatedToolsProps) {
    if (tools.length === 0) {
        return null
    }

    return (
        <div className="max-w-4xl mx-auto mt-16 px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool, index) => {
                    const Icon = CATEGORY_ICONS[tool.category]
                    const colorClass = CATEGORY_COLORS[tool.category]
                    return (
                        <Link
                            key={index}
                            to={tool.path}
                            className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${colorClass}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-sm">
                                        {tool.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Try now</span>
                                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

/**
 * Pre-defined related tools map for all routes
 */
export const RELATED_TOOLS_MAP: Record<string, RelatedTool[]> = {
    // ── HEIC ──────────────────────────────────────────────────────────────
    '/heic-to-jpg': [
        { name: 'HEIC to PNG', path: '/heic-to-png', description: 'Convert HEIC to PNG with transparency support', category: 'image' },
        { name: 'HEIC to PDF', path: '/heic-to-pdf', description: 'Convert HEIC images to PDF documents', category: 'pdf' },
        { name: 'WebP to JPG', path: '/webp-to-jpg', description: 'Convert modern WebP images to JPG', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Reduce image file size without quality loss', category: 'image' },
        { name: 'Resize Image', path: '/resize-image', description: 'Resize your converted image to any dimension', category: 'image' },
    ],
    '/heic-to-png': [
        { name: 'HEIC to JPG', path: '/heic-to-jpg', description: 'Convert iPhone photos to universal JPG', category: 'image' },
        { name: 'HEIC to PDF', path: '/heic-to-pdf', description: 'Convert HEIC images to PDF documents', category: 'pdf' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Optimize PNG images for the web', category: 'image' },
        { name: 'PNG to PDF', path: '/png-to-pdf', description: 'Turn PNG images into PDF documents', category: 'pdf' },
    ],
    '/heic-to-pdf': [
        { name: 'HEIC to JPG', path: '/heic-to-jpg', description: 'Convert HEIC photos to JPG format', category: 'image' },
        { name: 'HEIC to PNG', path: '/heic-to-png', description: 'Lossless HEIC to PNG conversion', category: 'image' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs into one document', category: 'pdf' },
        { name: 'Images to PDF', path: '/images-to-pdf', description: 'Convert multiple images into a single PDF', category: 'pdf' },
    ],

    // ── WebP ──────────────────────────────────────────────────────────────
    '/webp-to-jpg': [
        { name: 'HEIC to JPG', path: '/heic-to-jpg', description: 'Convert iPhone HEIC photos to JPG', category: 'image' },
        { name: 'WebP to PNG', path: '/webp-to-png', description: 'Convert WebP to lossless PNG', category: 'image' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Optimize PNG images for the web', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Reduce image file size without quality loss', category: 'image' },
    ],
    '/webp-to-png': [
        { name: 'WebP to JPG', path: '/webp-to-jpg', description: 'Convert WebP to universal JPG format', category: 'image' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Convert back PNG to WebP', category: 'image' },
        { name: 'PNG to JPG', path: '/png-to-jpg', description: 'Convert PNG to JPG for smaller size', category: 'image' },
        { name: 'Resize Image', path: '/resize-image', description: 'Resize images after conversion', category: 'image' },
    ],

    // ── PNG ───────────────────────────────────────────────────────────────
    '/png-to-jpg': [
        { name: 'JPG to PNG', path: '/jpg-to-png', description: 'Convert JPG back to lossless PNG', category: 'image' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Convert PNG to WebP for web', category: 'image' },
        { name: 'PNG to PDF', path: '/png-to-pdf', description: 'Turn PNG into a PDF document', category: 'pdf' },
        { name: 'Compress Image', path: '/compress-image', description: 'Compress the resulting JPG further', category: 'image' },
    ],
    '/png-to-webp': [
        { name: 'PNG to JPG', path: '/png-to-jpg', description: 'Convert PNG to JPG for compatibility', category: 'image' },
        { name: 'WebP to PNG', path: '/webp-to-png', description: 'Convert WebP back to PNG', category: 'image' },
        { name: 'JPG to WebP', path: '/jpg-to-webp', description: 'Optimize JPG images for the web', category: 'image' },
        { name: 'Resize Image', path: '/resize-image', description: 'Resize images to exact dimensions', category: 'image' },
    ],
    '/png-to-pdf': [
        { name: 'Images to PDF', path: '/images-to-pdf', description: 'Convert multiple images into a single PDF', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs into one', category: 'pdf' },
        { name: 'JPG to PDF', path: '/jpg-to-pdf', description: 'Convert JPG images to PDF', category: 'pdf' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Reduce PNG file size with WebP', category: 'image' },
    ],

    // ── JPG ───────────────────────────────────────────────────────────────
    '/jpg-to-png': [
        { name: 'PNG to JPG', path: '/png-to-jpg', description: 'Convert PNG back to JPG', category: 'image' },
        { name: 'JPG to WebP', path: '/jpg-to-webp', description: 'Optimize JPG for web use', category: 'image' },
        { name: 'JPG to PDF', path: '/jpg-to-pdf', description: 'Turn JPG images into a PDF', category: 'pdf' },
        { name: 'Resize Image', path: '/resize-image', description: 'Resize images after conversion', category: 'image' },
    ],
    '/jpg-to-webp': [
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Optimize PNG images for the web', category: 'image' },
        { name: 'WebP to JPG', path: '/webp-to-jpg', description: 'Convert WebP back to JPG', category: 'image' },
        { name: 'JPG to PNG', path: '/jpg-to-png', description: 'Convert JPG to lossless PNG', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Reduce image file size', category: 'image' },
    ],
    '/jpg-to-pdf': [
        { name: 'PNG to PDF', path: '/png-to-pdf', description: 'Convert PNG images to PDF', category: 'pdf' },
        { name: 'Images to PDF', path: '/images-to-pdf', description: 'Combine multiple photos into one PDF', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs into one', category: 'pdf' },
        { name: 'JPG to PNG', path: '/jpg-to-png', description: 'Convert JPG to lossless PNG', category: 'image' },
    ],

    // ── SVG ───────────────────────────────────────────────────────────────
    '/svg-to-png': [
        { name: 'SVG to JPG', path: '/svg-to-jpg', description: 'Convert SVG to compatible JPG', category: 'image' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Optimize the resulting PNG for web', category: 'image' },
        { name: 'Resize Image', path: '/resize-image', description: 'Resize the converted PNG', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Further compress the output image', category: 'image' },
    ],
    '/svg-to-jpg': [
        { name: 'SVG to PNG', path: '/svg-to-png', description: 'Lossless SVG to PNG conversion', category: 'image' },
        { name: 'JPG to PNG', path: '/jpg-to-png', description: 'Go back to PNG format', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Compress the resulting JPG', category: 'image' },
        { name: 'Resize Image', path: '/resize-image', description: 'Resize the converted image', category: 'image' },
    ],

    // ── JFIF ─────────────────────────────────────────────────────────────
    '/jfif-to-jpg': [
        { name: 'JFIF to PNG', path: '/jfif-to-png', description: 'Convert JFIF to lossless PNG', category: 'image' },
        { name: 'JPG to PNG', path: '/jpg-to-png', description: 'Convert JPG to PNG format', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Compress the resulting JPG', category: 'image' },
    ],
    '/jfif-to-png': [
        { name: 'JFIF to JPG', path: '/jfif-to-jpg', description: 'Convert JFIF to JPG format', category: 'image' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Optimize PNG for web', category: 'image' },
        { name: 'Compress Image', path: '/compress-image', description: 'Compress the converted image', category: 'image' },
    ],

    // ── Image Tools ───────────────────────────────────────────────────────
    '/image-to-pdf': [
        { name: 'PNG to PDF', path: '/png-to-pdf', description: 'Convert PNG images to PDF', category: 'pdf' },
        { name: 'JPG to PDF', path: '/jpg-to-pdf', description: 'Convert JPG images to PDF', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs into one', category: 'pdf' },
        { name: 'Images to PDF', path: '/images-to-pdf', description: 'Multi-image to single PDF', category: 'pdf' },
    ],
    '/images-to-pdf': [
        { name: 'Image to PDF', path: '/image-to-pdf', description: 'Universal image to PDF converter', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs together', category: 'pdf' },
        { name: 'PNG to PDF', path: '/png-to-pdf', description: 'Convert PNG images to PDF', category: 'pdf' },
        { name: 'Compress PDF', path: '/compress-pdf', description: 'Reduce PDF file size', category: 'pdf' },
    ],
    '/resize-image': [
        { name: 'Compress Image', path: '/compress-image', description: 'Also reduce image file size', category: 'image' },
        { name: 'HEIC to JPG', path: '/heic-to-jpg', description: 'Convert HEIC before resizing', category: 'image' },
        { name: 'WebP to JPG', path: '/webp-to-jpg', description: 'Convert WebP before editing', category: 'image' },
        { name: 'PNG to JPG', path: '/png-to-jpg', description: 'Switch format when resizing', category: 'image' },
    ],
    '/compress-image': [
        { name: 'Resize Image', path: '/resize-image', description: 'Also resize to reduce dimensions', category: 'image' },
        { name: 'PNG to WebP', path: '/png-to-webp', description: 'Convert to WebP for better compression', category: 'image' },
        { name: 'JPG to WebP', path: '/jpg-to-webp', description: 'Convert JPG to more efficient WebP', category: 'image' },
        { name: 'HEIC to JPG', path: '/heic-to-jpg', description: 'Convert HEIC photos first', category: 'image' },
    ],

    // ── PDF Tools ─────────────────────────────────────────────────────────
    '/merge-pdf': [
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract pages from PDF documents', category: 'pdf' },
        { name: 'Compress PDF', path: '/compress-pdf', description: 'Reduce PDF file size after merging', category: 'pdf' },
        { name: 'Images to PDF', path: '/images-to-pdf', description: 'Convert images to PDF first', category: 'pdf' },
        { name: 'Rotate PDF', path: '/rotate-pdf', description: 'Fix orientation of PDF pages', category: 'pdf' },
    ],
    '/split-pdf': [
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine PDFs back together', category: 'pdf' },
        { name: 'Compress PDF', path: '/compress-pdf', description: 'Reduce PDF file size', category: 'pdf' },
        { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Convert PDF pages to images', category: 'pdf' },
        { name: 'Rotate PDF', path: '/rotate-pdf', description: 'Rotate PDF pages', category: 'pdf' },
    ],
    '/compress-pdf': [
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs into one', category: 'pdf' },
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract specific pages first', category: 'pdf' },
        { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Convert PDF pages to images', category: 'pdf' },
        { name: 'Watermark PDF', path: '/watermark-pdf', description: 'Add a watermark to your PDF', category: 'pdf' },
    ],
    '/rotate-pdf': [
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine rotated PDFs together', category: 'pdf' },
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract pages from PDF', category: 'pdf' },
        { name: 'Compress PDF', path: '/compress-pdf', description: 'Reduce PDF file size', category: 'pdf' },
        { name: 'Watermark PDF', path: '/watermark-pdf', description: 'Add watermarks to PDF', category: 'pdf' },
    ],
    '/watermark-pdf': [
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine PDF documents', category: 'pdf' },
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract PDF pages', category: 'pdf' },
        { name: 'Compress PDF', path: '/compress-pdf', description: 'Reduce file size after watermarking', category: 'pdf' },
        { name: 'Rotate PDF', path: '/rotate-pdf', description: 'Fix PDF orientation', category: 'pdf' },
    ],
    '/pdf-to-text': [
        { name: 'PDF to Word', path: '/pdf-to-word', description: 'Convert PDF to editable Word file', category: 'pdf' },
        { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Convert PDF pages to images', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine PDF documents', category: 'pdf' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count words in extracted text', category: 'text' },
    ],
    '/pdf-to-word': [
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract plain text from PDF', category: 'pdf' },
        { name: 'PDF to Excel', path: '/pdf-to-excel', description: 'Extract PDF tables to Excel', category: 'pdf' },
        { name: 'PDF to PowerPoint', path: '/pdf-to-powerpoint', description: 'Convert PDF to presentations', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Merge PDFs before converting', category: 'pdf' },
    ],
    '/pdf-to-excel': [
        { name: 'PDF to Word', path: '/pdf-to-word', description: 'Convert PDF to editable Word', category: 'pdf' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract raw text from PDF', category: 'pdf' },
        { name: 'JSON to CSV', path: '/json-to-csv', description: 'Convert JSON data to CSV/Excel format', category: 'data' },
        { name: 'CSV to JSON', path: '/csv-to-json', description: 'Reverse CSV to JSON', category: 'data' },
    ],
    '/pdf-to-powerpoint': [
        { name: 'PDF to Word', path: '/pdf-to-word', description: 'Convert PDF to editable Word', category: 'pdf' },
        { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Extract PDF pages as images', category: 'pdf' },
        { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine PDFs before converting', category: 'pdf' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract text from PDF', category: 'pdf' },
    ],
    '/pdf-to-jpg': [
        { name: 'PDF to PNG', path: '/pdf-to-png', description: 'Lossless quality PNG extraction', category: 'pdf' },
        { name: 'PDF to WebP', path: '/pdf-to-webp', description: 'Smaller file size with modern format', category: 'pdf' },
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract specific pages from PDF', category: 'pdf' },
        { name: 'Compress Image', path: '/compress-image', description: 'Compress the extracted images', category: 'image' },
    ],
    '/pdf-to-png': [
        { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Universal JPG format extraction', category: 'pdf' },
        { name: 'PDF to WebP', path: '/pdf-to-webp', description: 'Modern format with better compression', category: 'pdf' },
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract pages before converting', category: 'pdf' },
        { name: 'Compress Image', path: '/compress-image', description: 'Reduce image size after conversion', category: 'image' },
    ],
    '/pdf-to-webp': [
        { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Standard JPG format extraction', category: 'pdf' },
        { name: 'PDF to PNG', path: '/pdf-to-png', description: 'Lossless PNG quality', category: 'pdf' },
        { name: 'Compress Image', path: '/compress-image', description: 'Further compress WebP images', category: 'image' },
        { name: 'Split PDF', path: '/split-pdf', description: 'Extract specific pages', category: 'pdf' },
    ],

    // ── Data Tools ────────────────────────────────────────────────────────
    '/json-to-csv': [
        { name: 'CSV to JSON', path: '/csv-to-json', description: 'Convert CSV files back to JSON', category: 'data' },
        { name: 'Data Tools', path: '/data-tools', description: 'JSON, YAML, XML, Base64 converter', category: 'data' },
        { name: 'PDF to Excel', path: '/pdf-to-excel', description: 'Extract PDF tables to spreadsheet', category: 'pdf' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Generate URL slugs from text', category: 'text' },
    ],
    '/csv-to-json': [
        { name: 'JSON to CSV', path: '/json-to-csv', description: 'Convert JSON to CSV', category: 'data' },
        { name: 'Data Tools', path: '/data-tools', description: 'JSON, YAML, XML, Base64 converter', category: 'data' },
        { name: 'PDF to Excel', path: '/pdf-to-excel', description: 'Extract PDF tables to spreadsheet', category: 'pdf' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract raw text from PDF', category: 'pdf' },
    ],
    '/data-tools': [
        { name: 'JSON to CSV', path: '/json-to-csv', description: 'Convert JSON data to CSV', category: 'data' },
        { name: 'CSV to JSON', path: '/csv-to-json', description: 'Convert CSV data to JSON', category: 'data' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract text from PDF', category: 'pdf' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Generate URL slugs', category: 'text' },
    ],

    // ── QR Tools ──────────────────────────────────────────────────────────
    '/qr-generator': [
        { name: 'QR Scanner', path: '/qr-scanner', description: 'Scan and decode QR codes', category: 'data' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Generate clean URL slugs for QR links', category: 'text' },
        { name: 'Data Tools', path: '/data-tools', description: 'Convert and encode data', category: 'data' },
    ],
    '/qr-scanner': [
        { name: 'QR Generator', path: '/qr-generator', description: 'Create QR codes from any URL or text', category: 'data' },
        { name: 'Data Tools', path: '/data-tools', description: 'Convert and encode data formats', category: 'data' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract text from PDF documents', category: 'pdf' },
    ],

    // ── Text Tools ────────────────────────────────────────────────────────
    '/word-counter': [
        { name: 'Character Counter', path: '/character-counter', description: 'Count characters and words', category: 'text' },
        { name: 'Case Converter', path: '/case-converter', description: 'Change text case (UPPER, lower, Title)', category: 'text' },
        { name: 'Remove Extra Spaces', path: '/remove-extra-spaces', description: 'Clean up whitespace in text', category: 'text' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract text from PDFs to count', category: 'pdf' },
    ],
    '/character-counter': [
        { name: 'Word Counter', path: '/word-counter', description: 'Count words in your text', category: 'text' },
        { name: 'Case Converter', path: '/case-converter', description: 'Change text case quickly', category: 'text' },
        { name: 'Remove Extra Spaces', path: '/remove-extra-spaces', description: 'Clean up text whitespace', category: 'text' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Generate URL-friendly slugs', category: 'text' },
    ],
    '/case-converter': [
        { name: 'Word Counter', path: '/word-counter', description: 'Count words and characters', category: 'text' },
        { name: 'Remove Extra Spaces', path: '/remove-extra-spaces', description: 'Clean whitespace from text', category: 'text' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Generate URL slugs from text', category: 'text' },
        { name: 'Reverse Text', path: '/reverse-text', description: 'Flip or reverse your text', category: 'text' },
    ],
    '/remove-extra-spaces': [
        { name: 'Remove Line Breaks', path: '/remove-line-breaks', description: 'Remove newlines from text', category: 'text' },
        { name: 'Case Converter', path: '/case-converter', description: 'Change text case', category: 'text' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count words and characters', category: 'text' },
        { name: 'Character Counter', path: '/character-counter', description: 'Count characters precisely', category: 'text' },
    ],
    '/remove-line-breaks': [
        { name: 'Remove Extra Spaces', path: '/remove-extra-spaces', description: 'Clean extra whitespace', category: 'text' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count words after cleaning', category: 'text' },
        { name: 'Case Converter', path: '/case-converter', description: 'Change text case', category: 'text' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Create URL slugs from text', category: 'text' },
    ],
    '/slug-generator': [
        { name: 'Case Converter', path: '/case-converter', description: 'Change text case before generating slug', category: 'text' },
        { name: 'Remove Extra Spaces', path: '/remove-extra-spaces', description: 'Clean text before generating slug', category: 'text' },
        { name: 'QR Generator', path: '/qr-generator', description: 'Create a QR code for your URL', category: 'data' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count words in your content', category: 'text' },
    ],
    '/password-generator': [
        { name: 'Random Text Generator', path: '/random-text-generator', description: 'Generate random strings and text', category: 'text' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Generate URL-safe strings', category: 'text' },
        { name: 'QR Generator', path: '/qr-generator', description: 'Create a QR code for your password hint', category: 'data' },
    ],
    '/text-to-speech': [
        { name: 'Word Counter', path: '/word-counter', description: 'Count words before reading aloud', category: 'text' },
        { name: 'Remove Line Breaks', path: '/remove-line-breaks', description: 'Clean text before speaking', category: 'text' },
        { name: 'PDF to Text', path: '/pdf-to-text', description: 'Extract PDF text to read aloud', category: 'pdf' },
        { name: 'Case Converter', path: '/case-converter', description: 'Adjust text case before reading', category: 'text' },
    ],
    '/reverse-text': [
        { name: 'Case Converter', path: '/case-converter', description: 'Also change your text case', category: 'text' },
        { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum-generator', description: 'Generate placeholder text', category: 'text' },
        { name: 'Random Text Generator', path: '/random-text-generator', description: 'Generate random text', category: 'text' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count words in your text', category: 'text' },
    ],
    '/lorem-ipsum-generator': [
        { name: 'Random Text Generator', path: '/random-text-generator', description: 'Generate truly random text strings', category: 'text' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count the generated words', category: 'text' },
        { name: 'Character Counter', path: '/character-counter', description: 'Count characters in generated text', category: 'text' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Create URL slugs', category: 'text' },
    ],
    '/random-text-generator': [
        { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum-generator', description: 'Generate Latin placeholder text', category: 'text' },
        { name: 'Password Generator', path: '/password-generator', description: 'Generate secure passwords', category: 'text' },
        { name: 'Word Counter', path: '/word-counter', description: 'Count words in generated text', category: 'text' },
        { name: 'Slug Generator', path: '/slug-generator', description: 'Create URL slugs from text', category: 'text' },
    ],
}
