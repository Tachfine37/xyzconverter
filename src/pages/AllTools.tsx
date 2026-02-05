import { Link } from 'react-router-dom'
import { ArrowRight, FileImage, FileType, FileText, Database } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

const categories = [
    {
        title: "Image Tools",
        description: "Optimize and convert images locally.",
        items: [
            { path: '/heic-to-jpg', icon: FileImage, label: 'HEIC to JPG' },
            { path: '/heic-to-png', icon: FileImage, label: 'HEIC to PNG' },
            { path: '/resize-image', icon: FileImage, label: 'Image Resizer' },
            { path: '/jpg-to-webp', icon: FileType, label: 'JPG to WEBP' },
            { from: 'png', to: 'webp', path: '/png-to-webp', icon: FileType, label: 'PNG to WEBP' },
            { from: 'webp', to: 'jpg', path: '/webp-to-jpg', icon: FileType, label: 'WEBP to JPG' },
        ]
    },
    {
        title: "PDF & Document Tools",
        description: "Manage documents safely.",
        items: [
            { from: 'pdf', to: 'pdf', path: '/merge-pdf', icon: FileText, label: 'Merge PDFs' },
            { from: 'pdf', to: 'pdf', path: '/split-pdf', icon: FileText, label: 'Split PDF' },
            { from: 'image', to: 'pdf', path: '/image-to-pdf', icon: FileText, label: 'Image to PDF' },
            { from: 'png', to: 'pdf', path: '/png-to-pdf', icon: FileText, label: 'PNG to PDF' },
            { from: 'heic', to: 'pdf', path: '/heic-to-pdf', icon: FileText, label: 'HEIC to PDF' },
        ]
    },
    {
        title: "Developer & Data Tools",
        description: "Utilities for developers.",
        items: [
            { from: 'json', to: 'csv', path: '/json-to-csv', icon: Database, label: 'JSON to CSV' },
            { path: '/data-tools', icon: Database, label: 'Data Converter' },
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
                            <h2 className="text-2xl font-semibold tracking-tight">{category.title}</h2>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
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
