import { Link } from 'react-router-dom'
import { PrivacyBadge } from '@/components/feature/privacy-badge'


export function Header() {
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
                    <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Tools
                    </Link>
                    <Link to="/resize-image" className="text-muted-foreground hover:text-foreground transition-colors">
                        Resizer
                    </Link>

                    <Link to="/merge-pdf" className="text-muted-foreground hover:text-foreground transition-colors">
                        Merge
                    </Link>
                    <Link to="/split-pdf" className="text-muted-foreground hover:text-foreground transition-colors">
                        Split
                    </Link>
                    <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">

                        How it Works
                    </Link>
                    <Link to="/data-tools" className="text-muted-foreground hover:text-foreground transition-colors">
                        Data Tools
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
