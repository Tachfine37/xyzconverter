import { Link } from 'react-router-dom'
import { PrivacyBadge } from '@/components/feature/privacy-badge'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { MegaDropdownMenu } from '@/components/ui/mega-dropdown-menu'
import type { MenuGroup } from '@/components/ui/mega-dropdown-menu'


export function Header() {
    // Image conversions grouped by INPUT format
    const imageGroups: MenuGroup[] = [
        {
            title: 'HEIC',
            icon: '📱',
            href: '/images/heic',
            items: [
                { label: 'HEIC → JPG', href: '/heic-to-jpg' },
                { label: 'HEIC → PNG', href: '/heic-to-png' },
                { label: 'HEIC → PDF', href: '/heic-to-pdf' },
            ]
        },
        {
            title: 'PNG',
            icon: '🟦',
            href: '/images/png',
            items: [
                { label: 'PNG → JPG', href: '/png-to-jpg' },
                { label: 'PNG → WebP', href: '/png-to-webp' },
                { label: 'PNG → PDF', href: '/png-to-pdf' },
            ]
        },
        {
            title: 'JPG / JPEG',
            icon: '🟥',
            href: '/images/jpg',
            items: [
                { label: 'JPG → PNG', href: '/jpg-to-png' },
                { label: 'JPG → WebP', href: '/jpg-to-webp' },
                { label: 'JPG → PDF', href: '/jpg-to-pdf' },
            ]
        },
        {
            title: 'WebP',
            icon: '🌐',
            href: '/images/webp',
            items: [
                { label: 'WebP → JPG', href: '/webp-to-jpg' },
                { label: 'WebP → PNG', href: '/webp-to-png' },
            ]
        },
        {
            title: 'SVG',
            icon: '🧾',
            href: '/images/svg',
            items: [
                { label: 'SVG → PNG', href: '/svg-to-png' },
                { label: 'SVG → JPG', href: '/svg-to-jpg' },
            ]
        },
        {
            title: 'Image Tools',
            icon: '🛠️',
            items: [
                { label: 'Resize Image', href: '/resize-image' },
                { label: 'Compress Image', href: '/compress-image' },
            ]
        },
    ]

    const pdfToolsItems = [
        { label: 'Merge PDFs', href: '/merge-pdf' },
        { label: 'Split PDF', href: '/split-pdf' },
        { label: 'PDF to JPG', href: '/pdf-to-jpg' },
        { label: 'PDF to PNG', href: '/pdf-to-png' },
    ]

    const dataToolsItems = [
        { label: 'JSON to CSV', href: '/json-to-csv' },
        { label: 'CSV to JSON', href: '/csv-to-json' },
        { label: 'All Data Tools', href: '/data-tools' },
    ]

    return (
        <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                        X
                    </div>
                    <span className="font-bold text-xl tracking-tight">xyzconverter</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                        Tools
                    </Link>

                    <MegaDropdownMenu trigger="Images" groups={imageGroups} />

                    <DropdownMenu trigger="PDF Tools" items={pdfToolsItems} />

                    <DropdownMenu trigger="Data Tools" items={dataToolsItems} />

                    <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                        How it Works
                    </Link>

                    <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                        Privacy
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <PrivacyBadge />
                </div>
            </div>
        </header>
    )
}
