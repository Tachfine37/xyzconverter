/**
 * Related Tools Component
 * Displays related conversion tools for internal linking and SEO
 */

import { Link } from 'react-router-dom'
import { ArrowRight, Image, FileText, Database } from 'lucide-react'

interface RelatedTool {
    name: string
    path: string
    description: string
    category: 'image' | 'pdf' | 'data'
}

interface RelatedToolsProps {
    tools: RelatedTool[]
    title?: string
}

const CATEGORY_ICONS = {
    image: Image,
    pdf: FileText,
    data: Database
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
                    return (
                        <Link
                            key={index}
                            to={tool.path}
                            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Try now</span>
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

/**
 * Pre-defined related tools for popular conversions
 */
export const RELATED_TOOLS_MAP: Record<string, RelatedTool[]> = {
    '/heic-to-jpg': [
        {
            name: 'HEIC to PNG',
            path: '/heic-to-png',
            description: 'Convert HEIC to PNG with transparency support',
            category: 'image'
        },
        {
            name: 'HEIC to PDF',
            path: '/heic-to-pdf',
            description: 'Convert HEIC images to PDF documents',
            category: 'pdf'
        },
        {
            name: 'WEBP to JPG',
            path: '/webp-to-jpg',
            description: 'Convert modern WEBP images to universal JPG format',
            category: 'image'
        }
    ],
    '/webp-to-jpg': [
        {
            name: 'HEIC to JPG',
            path: '/heic-to-jpg',
            description: 'Convert iPhone HEIC photos to JPG',
            category: 'image'
        },
        {
            name: 'PNG to WEBP',
            path: '/png-to-webp',
            description: 'Optimize PNG images by converting to WEBP',
            category: 'image'
        },
        {
            name: 'Image to PDF',
            path: '/image-to-pdf',
            description: 'Convert any image format to PDF',
            category: 'pdf'
        }
    ],
    '/png-to-pdf': [
        {
            name: 'Image to PDF',
            path: '/image-to-pdf',
            description: 'Convert JPG, PNG, HEIC to PDF',
            category: 'pdf'
        },
        {
            name: 'Merge PDF',
            path: '/merge-pdf',
            description: 'Combine multiple PDFs into one',
            category: 'pdf'
        },
        {
            name: 'PNG to WEBP',
            path: '/png-to-webp',
            description: 'Reduce PNG file size with WEBP conversion',
            category: 'image'
        }
    ],
    '/merge-pdf': [
        {
            name: 'Split PDF',
            path: '/split-pdf',
            description: 'Extract pages from PDF documents',
            category: 'pdf'
        },
        {
            name: 'Image to PDF',
            path: '/image-to-pdf',
            description: 'Convert images to PDF format',
            category: 'pdf'
        },
        {
            name: 'PNG to PDF',
            path: '/png-to-pdf',
            description: 'Convert PNG images to PDF',
            category: 'pdf'
        }
    ],
    '/json-to-csv': [
        {
            name: 'CSV to JSON',
            path: '/csv-to-json',
            description: 'Convert CSV files to JSON format',
            category: 'data'
        },
        {
            name: 'Data Tools',
            path: '/data-tools',
            description: 'Explore all data conversion tools',
            category: 'data'
        },
        {
            name: 'All Tools',
            path: '/tools',
            description: 'Browse all available conversion tools',
            category: 'image'
        }
    ]
}
