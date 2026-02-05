/**
 * Breadcrumb Navigation Component with Schema.org Structured Data
 * Provides navigation context for users and search engines
 */

import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { injectStructuredData, generateBreadcrumbSchema } from '@/utils/structured-data'

interface BreadcrumbItem {
    name: string
    url?: string
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[]
    autoGenerate?: boolean
}

// Map of paths to readable names
const PATH_NAMES: Record<string, string> = {
    'tools': 'All Tools',
    'heic-to-jpg': 'HEIC to JPG',
    'heic-to-png': 'HEIC to PNG',
    'heic-to-pdf': 'HEIC to PDF',
    'webp-to-jpg': 'WEBP to JPG',
    'jpg-to-webp': 'JPG to WEBP',
    'png-to-webp': 'PNG to WEBP',
    'png-to-pdf': 'PNG to PDF',
    'image-to-pdf': 'Image to PDF',
    'merge-pdf': 'Merge PDF',
    'split-pdf': 'Split PDF',
    'json-to-csv': 'JSON to CSV',
    'csv-to-json': 'CSV to JSON',
    'data-tools': 'Data Tools',
    'resize-image': 'Resize Image',
    'how-it-works': 'How It Works',
    'about': 'About',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service'
}

export function Breadcrumbs({ items, autoGenerate = true }: BreadcrumbsProps) {
    const location = useLocation()

    // Auto-generate breadcrumbs from path if not provided
    const breadcrumbs = items || (autoGenerate ? generateBreadcrumbsFromPath(location.pathname) : [])

    // Inject breadcrumb structured data
    useEffect(() => {
        if (breadcrumbs.length > 1) {
            const schema = generateBreadcrumbSchema(breadcrumbs)
            injectStructuredData(schema)
        }
    }, [breadcrumbs])

    // Don't render if only home breadcrumb
    if (breadcrumbs.length <= 1) {
        return null
    }

    return (
        <nav aria-label="Breadcrumb" className="py-4 px-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground max-w-7xl mx-auto">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                            )}
                            {isLast || !crumb.url ? (
                                <span className="font-medium text-foreground">{crumb.name}</span>
                            ) : (
                                <Link
                                    to={crumb.url}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {crumb.name}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', url: '/' }]

    if (pathname === '/') {
        return breadcrumbs
    }

    const pathParts = pathname.split('/').filter(Boolean)

    pathParts.forEach((part, index) => {
        const urlPath = '/' + pathParts.slice(0, index + 1).join('/')
        const name = PATH_NAMES[part] || part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

        // Don't add URL for the last item (current page)
        breadcrumbs.push({
            name,
            url: index === pathParts.length - 1 ? undefined : urlPath
        })
    })

    return breadcrumbs
}
