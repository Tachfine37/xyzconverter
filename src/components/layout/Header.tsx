import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { PrivacyBadge } from '@/components/feature/privacy-badge'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { MegaDropdownMenu } from '@/components/ui/mega-dropdown-menu'
import type { MenuGroup } from '@/components/ui/mega-dropdown-menu'
import { Menu, X, ChevronDown } from 'lucide-react'
import * as React from 'react'


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


    const qrToolsItems = [
        { label: 'QR Generator', href: '/qr-generator' },
        { label: 'QR Scanner', href: '/qr-scanner' },
    ]

    const textToolsItems = [
        { label: 'Word Counter', href: '/word-counter' },
        { label: 'Character Counter', href: '/character-counter' },
        { label: 'Case Converter', href: '/case-converter' },
        { label: 'Remove Extra Spaces', href: '/remove-extra-spaces' },
        { label: 'Slug Generator', href: '/slug-generator' },
        { label: 'Password Generator', href: '/password-generator' },
    ]


    // Data tools grouped by format
    const dataGroups: MenuGroup[] = [
        {
            title: 'JSON',
            icon: '📋',
            href: '/data/json',
            items: [
                { label: 'JSON → CSV', href: '/json-to-csv' },
                { label: 'JSON Formatter', href: '/data-tools' },
            ]
        },
        {
            title: 'CSV',
            icon: '📊',
            href: '/data/csv',
            items: [
                { label: 'CSV → JSON', href: '/csv-to-json' },
                { label: 'CSV Validator', href: '/data-tools' },
            ]
        },
        {
            title: 'YAML',
            icon: '📄',
            href: '/data/yaml',
            items: [
                { label: 'YAML → JSON', href: '/data-tools' },
                { label: 'YAML → XML', href: '/data-tools' },
            ]
        },
        {
            title: 'XML',
            icon: '🏷️',
            href: '/data/xml',
            items: [
                { label: 'XML → JSON', href: '/data-tools' },
                { label: 'XML → YAML', href: '/data-tools' },
            ]
        },
        {
            title: 'Base64',
            icon: '🔐',
            href: '/data/base64',
            items: [
                { label: 'Text → Base64', href: '/data-tools' },
                { label: 'Base64 → Text', href: '/data-tools' },
            ]
        },
    ]

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null)

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    const toggleAccordion = (name: string) => {
        setActiveAccordion(prev => prev === name ? null : name)
    }

    const closeMenu = () => {
        setIsMobileMenuOpen(false)
        setActiveAccordion(null)
    }

    return (
        <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container max-w-6xl mx-auto h-20 flex items-center justify-between px-4">
                {/* Logo Area */}
                <Link to="/" className="group transition-all duration-300 hover:brightness-110" onClick={closeMenu}>
                    <span className="text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">XYZCONVERTER</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                        Tools
                    </Link>

                    <MegaDropdownMenu trigger="Images" groups={imageGroups} />

                    <MegaDropdownMenu trigger="PDF Tools" groups={[
                        {
                            title: 'PDF Core Tools',
                            icon: '🛠️',
                            items: [
                                { label: 'Merge PDF', href: '/merge-pdf' },
                                { label: 'Split PDF', href: '/split-pdf' },
                                { label: 'Compress PDF', href: '/compress-pdf' },
                                { label: 'Rotate PDF', href: '/rotate-pdf' },
                                { label: 'Watermark PDF', href: '/watermark-pdf' },
                            ]
                        },
                        {
                            title: 'PDF Conversion',
                            icon: '🔄',
                            items: [
                                { label: 'PDF to JPG', href: '/pdf-to-jpg' },
                                { label: 'PDF to PNG', href: '/pdf-to-png' },
                                { label: 'PDF to Text', href: '/pdf-to-text' },
                                { label: 'PDF to Word', href: '/pdf-to-word' },
                                { label: 'PDF to Excel', href: '/pdf-to-excel' },
                                { label: 'PDF to PowerPoint', href: '/pdf-to-powerpoint' },
                                { label: 'Images to PDF', href: '/images-to-pdf' },
                            ]
                        }
                    ]} />

                    <DropdownMenu trigger="QR Tools" items={qrToolsItems} />

                    <DropdownMenu trigger="Text Tools" items={textToolsItems} />

                    <MegaDropdownMenu trigger="Data Tools" groups={dataGroups} />

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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -mr-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Portaled to body to avoid containing block issues with backdrop-filter */}
            {isMobileMenuOpen && createPortal(
                <div className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col animate-in slide-in-from-right-full duration-300">
                    <div className="container max-w-6xl mx-auto h-20 flex items-center justify-between px-4 border-b">
                        <Link to="/" className="group transition-all duration-300" onClick={closeMenu}>
                            <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">XYZCONVERTER</span>
                        </Link>
                        <button
                            className="p-2 -mr-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4">
                        <nav className="flex flex-col space-y-2">
                            <Link
                                to="/tools"
                                className="flex items-center py-3 text-lg font-medium border-b border-border/50"
                                onClick={closeMenu}
                            >
                                All Tools
                            </Link>

                            {/* Images Accordion */}
                            <div className="border-b border-border/50">
                                <button
                                    className="flex items-center justify-between w-full py-3 text-lg font-medium"
                                    onClick={() => toggleAccordion('images')}
                                >
                                    <span>Images</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === 'images' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeAccordion === 'images' && (
                                    <div className="pb-4 pl-4 space-y-4 animate-in slide-in-from-top-2">
                                        {imageGroups.map((group) => (
                                            <div key={group.title} className="space-y-2">
                                                <div className="flex items-center gap-2 font-medium text-foreground/80">
                                                    <span>{group.icon}</span>
                                                    <span>{group.title}</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 pl-6">
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.label + item.href}
                                                            to={item.href}
                                                            className="text-muted-foreground hover:text-primary block py-1"
                                                            onClick={closeMenu}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* PDF Tools Accordion */}
                            <div className="border-b border-border/50">
                                <button
                                    className="flex items-center justify-between w-full py-3 text-lg font-medium"
                                    onClick={() => toggleAccordion('pdf')}
                                >
                                    <span>PDF Tools</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === 'pdf' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeAccordion === 'pdf' && (
                                    <div className="pb-4 pl-4 space-y-4 animate-in slide-in-from-top-2">
                                        {/* Core Tools */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 font-medium text-foreground/80">
                                                <span>🛠️</span>
                                                <span>PDF Core Tools</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2 pl-6">
                                                <Link to="/merge-pdf" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>Merge PDF</Link>
                                                <Link to="/split-pdf" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>Split PDF</Link>
                                                <Link to="/compress-pdf" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>Compress PDF</Link>
                                                <Link to="/rotate-pdf" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>Rotate PDF</Link>
                                                <Link to="/watermark-pdf" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>Watermark PDF</Link>
                                            </div>
                                        </div>

                                        {/* Conversion Tools */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 font-medium text-foreground/80">
                                                <span>🔄</span>
                                                <span>PDF Conversion</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2 pl-6">
                                                <Link to="/pdf-to-jpg" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>PDF to JPG</Link>
                                                <Link to="/pdf-to-png" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>PDF to PNG</Link>
                                                <Link to="/pdf-to-text" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>PDF to Text</Link>
                                                <Link to="/pdf-to-word" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>PDF to Word</Link>
                                                <Link to="/pdf-to-excel" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>PDF to Excel</Link>
                                                <Link to="/pdf-to-powerpoint" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>PDF to PowerPoint</Link>
                                                <Link to="/images-to-pdf" className="text-muted-foreground hover:text-primary block py-1" onClick={closeMenu}>Images to PDF</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* QR Tools Accordion */}
                            <div className="border-b border-border/50">
                                <button
                                    className="flex items-center justify-between w-full py-3 text-lg font-medium"
                                    onClick={() => toggleAccordion('qr')}
                                >
                                    <span>QR Tools</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === 'qr' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeAccordion === 'qr' && (
                                    <div className="pb-4 pl-4 space-y-2 animate-in slide-in-from-top-2">
                                        {qrToolsItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                className="block py-2 text-muted-foreground hover:text-primary"
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Text Tools Accordion */}
                            <div className="border-b border-border/50">
                                <button
                                    className="flex items-center justify-between w-full py-3 text-lg font-medium"
                                    onClick={() => toggleAccordion('text')}
                                >
                                    <span>Text Tools</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === 'text' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeAccordion === 'text' && (
                                    <div className="pb-4 pl-4 space-y-2 animate-in slide-in-from-top-2">
                                        {textToolsItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                className="block py-2 text-muted-foreground hover:text-primary"
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Data Tools Accordion */}
                            <div className="border-b border-border/50">
                                <button
                                    className="flex items-center justify-between w-full py-3 text-lg font-medium"
                                    onClick={() => toggleAccordion('data')}
                                >
                                    <span>Data Tools</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === 'data' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeAccordion === 'data' && (
                                    <div className="pb-4 pl-4 space-y-4 animate-in slide-in-from-top-2">
                                        {dataGroups.map((group) => (
                                            <div key={group.title} className="space-y-2">
                                                <div className="flex items-center gap-2 font-medium text-foreground/80">
                                                    <span>{group.icon}</span>
                                                    <span>{group.title}</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 pl-6">
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.label + item.href}
                                                            to={item.href}
                                                            className="text-muted-foreground hover:text-primary block py-1"
                                                            onClick={closeMenu}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/how-it-works"
                                className="flex items-center py-3 text-lg font-medium border-b border-border/50"
                                onClick={closeMenu}
                            >
                                How it Works
                            </Link>

                            <Link
                                to="/privacy"
                                className="flex items-center py-3 text-lg font-medium border-b border-border/50"
                                onClick={closeMenu}
                            >
                                PrivacyPolicy
                            </Link>
                        </nav>
                    </div>
                </div>
                , document.body)}
        </header>
    )
}
