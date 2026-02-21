import { Link } from 'react-router-dom'
import { ArrowRight, FileImage, FileType, FileText, Database, Type, QrCode, Lock, Music, Hash, LayoutTemplate, Replace, RotateCw, FileArchive, Scissors, Settings2, Cpu } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

const categories = [
    {
        title: "HEIC Conversions",
        icon: "📱",
        categoryLink: "/images/heic",
        description: "Convert iPhone photos to other formats.",
        items: [
            { path: '/heic-to-jpg', icon: FileImage, label: 'HEIC to JPG' },
            { path: '/heic-to-png', icon: FileImage, label: 'HEIC to PNG' },
            { path: '/heic-to-pdf', icon: FileText, label: 'HEIC to PDF' },
        ]
    },
    {
        title: "PNG Conversions",
        icon: "🟦",
        categoryLink: "/images/png",
        description: "Convert PNG images to other formats.",
        items: [
            { path: '/png-to-jpg', icon: FileImage, label: 'PNG to JPG' },
            { path: '/png-to-webp', icon: FileType, label: 'PNG to WebP' },
            { path: '/png-to-pdf', icon: FileText, label: 'PNG to PDF' },
        ]
    },
    {
        title: "JPG / JPEG Conversions",
        icon: "🟥",
        categoryLink: "/images/jpg",
        description: "Convert JPG images to other formats.",
        items: [
            { path: '/jpg-to-png', icon: FileImage, label: 'JPG to PNG' },
            { path: '/jpg-to-webp', icon: FileType, label: 'JPG to WebP' },
            { path: '/jpg-to-pdf', icon: FileText, label: 'JPG to PDF' },
        ]
    },
    {
        title: "WebP Conversions",
        icon: "🌐",
        categoryLink: "/images/webp",
        description: "Convert WebP images to compatible formats.",
        items: [
            { path: '/webp-to-jpg', icon: FileImage, label: 'WebP to JPG' },
            { path: '/webp-to-png', icon: FileImage, label: 'WebP to PNG' },
        ]
    },
    {
        title: "SVG Conversions",
        icon: "🧾",
        categoryLink: "/images/svg",
        description: "Convert vector graphics to raster formats.",
        items: [
            { path: '/svg-to-png', icon: FileImage, label: 'SVG to PNG' },
            { path: '/svg-to-jpg', icon: FileImage, label: 'SVG to JPG' },
        ]
    },
    {
        title: "Image Tools",
        icon: "🛠️",
        description: "Edit and optimize your images.",
        items: [
            { path: '/resize-image', icon: FileImage, label: 'Image Resizer' },
            { path: '/compress-image', icon: FileArchive, label: 'Image Compressor' },
            { path: '/crop-image', icon: Scissors, label: 'Crop Image' },
        ]
    },
    {
        title: "QR Tools",
        icon: "📱",
        description: "Generate and scan QR codes.",
        items: [
            { path: '/qr-generator', icon: QrCode, label: 'QR Generator' },
            { path: '/qr-scanner', icon: QrCode, label: 'QR Scanner' },
        ]
    },
    {
        title: "Text & Utilities",
        icon: "📝",
        description: "Essential text processing and generation tools.",
        items: [
            { path: '/word-counter', icon: Hash, label: 'Word Counter' },
            { path: '/character-counter', icon: Hash, label: 'Character Counter' },
            { path: '/case-converter', icon: Type, label: 'Case Converter' },
            { path: '/remove-extra-spaces', icon: Settings2, label: 'Remove Extra Spaces' },
            { path: '/slug-generator', icon: LayoutTemplate, label: 'Slug Generator' },
            { path: '/text-to-speech', icon: Music, label: 'Text to Speech' },
            { path: '/remove-line-breaks', icon: Replace, label: 'Remove Line Breaks' },
            { path: '/reverse-text', icon: RotateCw, label: 'Reverse Text' },
            { path: '/lorem-ipsum-generator', icon: Type, label: 'Lorem Ipsum Generator' },
            { path: '/random-text-generator', icon: Cpu, label: 'Random Text Generator' },
            { path: '/password-generator', icon: Lock, label: 'Password Generator' },
        ]
    },
    {
        title: "PDF & Document Tools",
        icon: "📄",
        description: "Manage documents safely.",
        items: [
            { path: '/merge-pdf', icon: FileText, label: 'Merge PDFs' },
            { path: '/split-pdf', icon: Scissors, label: 'Split PDF' },
            { path: '/compress-pdf', icon: FileArchive, label: 'Compress PDF' },
            { path: '/rotate-pdf', icon: RotateCw, label: 'Rotate PDF' },
            { path: '/watermark-pdf', icon: FileText, label: 'Watermark PDF' },
            { path: '/pdf-to-jpg', icon: FileImage, label: 'PDF to JPG' },
            { path: '/pdf-to-png', icon: FileImage, label: 'PDF to PNG' },
            { path: '/pdf-to-word', icon: FileText, label: 'PDF to Word' },
            { path: '/pdf-to-excel', icon: FileText, label: 'PDF to Excel' },
            { path: '/pdf-to-powerpoint', icon: FileText, label: 'PDF to PowerPoint' },
            { path: '/pdf-to-text', icon: Type, label: 'PDF to Text' },
            { path: '/word-to-pdf', icon: FileText, label: 'Word to PDF' },
            { path: '/images-to-pdf', icon: FileText, label: 'Images to PDF' },
        ]
    },
    {
        title: "JSON Tools",
        icon: "📋",
        categoryLink: "/data/json",
        description: "Convert and work with JSON data.",
        items: [
            { path: '/json-to-csv', icon: Database, label: 'JSON to CSV' },
            { path: '/data-tools', icon: Database, label: 'JSON Formatter' },
        ]
    },
    {
        title: "CSV Tools",
        icon: "📊",
        categoryLink: "/data/csv",
        description: "Convert and validate CSV files.",
        items: [
            { path: '/csv-to-json', icon: Database, label: 'CSV to JSON' },
            { path: '/data-tools', icon: Database, label: 'CSV Validator' },
        ]
    },
    {
        title: "YAML Tools",
        icon: "📄",
        categoryLink: "/data/yaml",
        description: "Convert and validate YAML configuration files.",
        items: [
            { path: '/data-tools', icon: Database, label: 'YAML to JSON' },
            { path: '/data-tools', icon: Database, label: 'YAML to XML' },
        ]
    },
    {
        title: "XML Tools",
        icon: "🏷️",
        categoryLink: "/data/xml",
        description: "Convert and validate XML data.",
        items: [
            { path: '/data-tools', icon: Database, label: 'XML to JSON' },
            { path: '/data-tools', icon: Database, label: 'XML to YAML' },
        ]
    },
    {
        title: "Base64 Tools",
        icon: "🔐",
        categoryLink: "/data/base64",
        description: "Encode and decode Base64 data.",
        items: [
            { path: '/data-tools', icon: Database, label: 'Text to Base64' },
            { path: '/data-tools', icon: Database, label: 'Base64 to Text' },
        ]
    }
]

export function AllTools() {
    useEffect(() => {
        document.title = 'All Tools - xyzconverter'
        analytics.pageView('all-tools')
    }, [])

    return (
        <div className="flex flex-col items-center justify-start p-4 md:py-12 space-y-12 max-w-5xl mx-auto w-full min-h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Tools</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to convert and manage your files.
                </p>
            </div>

            <div className="space-y-16 w-full">
                {categories.map((category) => (
                    <div key={category.title} className="space-y-6">
                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3">
                                {category.icon && <span className="text-2xl">{category.icon}</span>}
                                {category.categoryLink ? (
                                    <Link to={category.categoryLink} className="text-2xl font-semibold tracking-tight hover:text-primary transition-colors">
                                        {category.title}
                                    </Link>
                                ) : (
                                    <h2 className="text-2xl font-semibold tracking-tight">{category.title}</h2>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.items.map((conv) => {
                                const Icon = conv.icon
                                return (
                                    <Link key={conv.path} to={conv.path}>
                                        <Card className="p-6 hover:bg-muted/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                                    <Icon className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                        {conv.label}
                                                    </h3>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
