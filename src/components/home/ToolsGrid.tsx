/**
 * ToolsGrid component — showcases popular tools on the homepage
 * with category grouping and direct navigation links for SEO & UX.
 */

import { Link } from 'react-router-dom'
import { ArrowRight, Image, FileText, Database, Type, Zap } from 'lucide-react'

interface Tool {
    name: string
    path: string
    description: string
    badge?: string
}

interface ToolCategory {
    label: string
    icon: React.ElementType
    color: string
    bg: string
    tools: Tool[]
}

const TOOL_CATEGORIES: ToolCategory[] = [
    {
        label: 'Image Tools',
        icon: Image,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-500/10',
        tools: [
            { name: 'HEIC to JPG', path: '/heic-to-jpg', description: 'Convert iPhone photos instantly', badge: 'Popular' },
            { name: 'WebP to JPG', path: '/webp-to-jpg', description: 'Maximum compatibility format' },
            { name: 'PNG to WebP', path: '/png-to-webp', description: 'Optimise images for the web' },
            { name: 'Compress Image', path: '/compress-image', description: 'Reduce size without quality loss', badge: 'Popular' },
            { name: 'Resize Image', path: '/resize-image', description: 'Set exact pixel dimensions' },
            { name: 'SVG to PNG', path: '/svg-to-png', description: 'Rasterise vector graphics' },
        ]
    },
    {
        label: 'PDF Tools',
        icon: FileText,
        color: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-500/10',
        tools: [
            { name: 'Merge PDF', path: '/merge-pdf', description: 'Combine multiple PDFs into one', badge: 'Popular' },
            { name: 'Compress PDF', path: '/compress-pdf', description: 'Shrink PDF file size' },
            { name: 'PDF to Word', path: '/pdf-to-word', description: 'Convert to editable DOCX' },
            { name: 'PDF to JPG', path: '/pdf-to-jpg', description: 'Extract pages as images' },
            { name: 'Split PDF', path: '/split-pdf', description: 'Extract specific pages' },
            { name: 'Watermark PDF', path: '/watermark-pdf', description: 'Add text watermarks' },
        ]
    },
    {
        label: 'Text Tools',
        icon: Type,
        color: 'text-violet-600 dark:text-violet-400',
        bg: 'bg-violet-500/10',
        tools: [
            { name: 'Word Counter', path: '/word-counter', description: 'Count words and characters', badge: 'Popular' },
            { name: 'Case Converter', path: '/case-converter', description: 'UPPER, lower, Title Case' },
            { name: 'Password Generator', path: '/password-generator', description: 'Generate secure passwords' },
            { name: 'Lorem Ipsum', path: '/lorem-ipsum-generator', description: 'Placeholder text generator' },
            { name: 'Slug Generator', path: '/slug-generator', description: 'Create URL-friendly slugs' },
            { name: 'Remove Extra Spaces', path: '/remove-extra-spaces', description: 'Clean whitespace from text' },
        ]
    },
    {
        label: 'Data Tools',
        icon: Database,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/10',
        tools: [
            { name: 'JSON to CSV', path: '/json-to-csv', description: 'Convert JSON for spreadsheets', badge: 'Popular' },
            { name: 'CSV to JSON', path: '/csv-to-json', description: 'Reverse CSV to JSON' },
            { name: 'Data Tools', path: '/data-tools', description: 'JSON, YAML, XML, Base64' },
            { name: 'QR Generator', path: '/qr-generator', description: 'Create QR codes from any URL' },
            { name: 'QR Scanner', path: '/qr-scanner', description: 'Decode QR codes instantly' },
            { name: 'PDF to Excel', path: '/pdf-to-excel', description: 'Extract tables from PDFs' },
        ]
    }
]

export function ToolsGrid() {
    return (
        <section className="w-full bg-muted/30 border-t border-border py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Section header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Zap className="w-3.5 h-3.5" />
                        All tools run in your browser — zero uploads
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Popular Tools</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Free, instant, and completely private. Every conversion happens locally — nothing leaves your device.
                    </p>
                </div>

                {/* Category grids */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {TOOL_CATEGORIES.map((category) => {
                        const Icon = category.icon
                        return (
                            <div key={category.label} className="space-y-3">
                                {/* Category header */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg ${category.bg} flex items-center justify-center`}>
                                        <Icon className={`w-4 h-4 ${category.color}`} />
                                    </div>
                                    <h3 className="font-semibold text-foreground">{category.label}</h3>
                                </div>

                                {/* Tool cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {category.tools.map((tool) => (
                                        <Link
                                            key={tool.path}
                                            to={tool.path}
                                            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 hover:border-primary/40 hover:shadow-sm transition-all hover:-translate-y-0.5"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                        {tool.name}
                                                    </span>
                                                    {tool.badge && (
                                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                                                            {tool.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5 truncate">{tool.description}</p>
                                            </div>
                                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/tools"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                    >
                        View all tools <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
