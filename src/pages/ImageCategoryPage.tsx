import { Link } from 'react-router-dom'
import { ArrowRight, FileImage } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export interface ConversionItem {
    path: string
    label: string
    description?: string
}

export interface ImageCategoryPageProps {
    formatName: string
    formatIcon: string
    title: string
    description: string
    longDescription: string
    conversions: ConversionItem[]
    metaTitle: string
    slug: string
}

export function ImageCategoryPage({
    formatName,
    formatIcon,
    title,
    description,
    longDescription,
    conversions,
    metaTitle,
    slug,
}: ImageCategoryPageProps) {
    useEffect(() => {
        document.title = metaTitle
        analytics.pageView(`category-${slug}`)
    }, [metaTitle, slug])

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
                <h2 className="text-xl font-semibold">Available Conversions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conversions.map((conv) => (
                        <Link key={conv.path} to={conv.path}>
                            <Card className="p-6 hover:bg-muted/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                        <FileImage className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors" />
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
            </div>

            {/* Privacy Note */}
            <div className="w-full text-center text-sm text-muted-foreground bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <span className="text-green-600 font-medium">🔒 Privacy First:</span> All conversions happen locally in your browser. Your files never leave your device.
            </div>
        </div>
    )
}
