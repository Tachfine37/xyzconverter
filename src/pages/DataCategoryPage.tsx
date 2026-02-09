import { Link } from 'react-router-dom'
import { ArrowRight, Database } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { analytics } from '@/lib/analytics'
import { usePageSEO } from '@/utils/seo'
import { useEffect } from 'react'

export interface DataConversionItem {
    path: string
    label: string
    description?: string
}

export interface DataCategoryPageProps {
    formatName: string
    formatIcon: string
    title: string
    description: string
    longDescription: string
    conversions: DataConversionItem[]
    slug: string
    useCases?: string[]
}

export function DataCategoryPage({
    formatName,
    formatIcon,
    title,
    description,
    longDescription,
    conversions,
    slug,
    useCases,
}: DataCategoryPageProps) {
    // Use SEO hook for comprehensive meta tags
    usePageSEO()

    useEffect(() => {
        analytics.pageView(`data-category-${slug}`)
    }, [slug])

    return (
        <div className="flex flex-col items-center justify-start p-4 md:py-12 space-y-12 max-w-4xl mx-auto w-full min-h-screen">
            {/* Header Section */}
            <div className="text-center space-y-4 max-w-2xl">
                <div className="text-5xl mb-4">{formatIcon}</div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
                <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            {/* Conversions Grid */}
            <div className="w-full space-y-6">
                <h2 className="text-xl font-semibold">Available Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conversions.map((conv) => (
                        <Link key={conv.path} to={conv.path}>
                            <Card className="p-6 hover:bg-muted/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                        <Database className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {conv.label}
                                        </h3>
                                        {conv.description && (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {conv.description}
                                            </p>
                                        )}
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* About Section */}
            <div className="w-full space-y-4 bg-muted/30 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold">About {formatName}</h2>
                <p className="text-muted-foreground leading-relaxed">{longDescription}</p>

                {useCases && useCases.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-3">Common Use Cases:</h3>
                        <ul className="space-y-2">
                            {useCases.map((useCase, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{useCase}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Privacy Note */}
            <div className="w-full text-center text-sm text-muted-foreground bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <span className="text-green-600 font-medium">🔒 Privacy First:</span> All conversions happen locally in your browser. Your data never leaves your device.
            </div>
        </div>
    )
}
