import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center text-primary font-bold text-xs">
                                X
                            </div>
                            <span className="font-bold text-lg">xyzconverter</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Privacy-first file conversion tools.
                            Built with WebAssembly to ensure your files never leave your device.
                        </p>
                    </div>

                    {/* Tools */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm tracking-wider uppercase text-muted-foreground">Tools</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/heic-to-jpg" className="hover:text-primary transition-colors">HEIC to JPG</Link></li>
                            <li><Link to="/merge-pdf" className="hover:text-primary transition-colors">Merge PDFs</Link></li>
                            <li><Link to="/json-to-csv" className="hover:text-primary transition-colors">JSON to CSV</Link></li>
                            <li><Link to="/image-to-pdf" className="hover:text-primary transition-colors">Image to PDF</Link></li>
                            <li><Link to="/jpg-to-webp" className="hover:text-primary transition-colors">JPG to WebP</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm tracking-wider uppercase text-muted-foreground">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm tracking-wider uppercase text-muted-foreground">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} xyzconverter.com • 100% Client-Side Processing</p>
                </div>
            </div>
        </footer>
    )
}
