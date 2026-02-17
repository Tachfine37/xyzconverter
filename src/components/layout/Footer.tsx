import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">XYZCONVERTER</span>
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
                            <li><Link to="/qr-generator" className="hover:text-primary transition-colors">QR Generator</Link></li>
                            <li><Link to="/qr-scanner" className="hover:text-primary transition-colors">QR Scanner</Link></li>
                            <li><Link to="/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
                            <li><Link to="/character-counter" className="hover:text-primary transition-colors">Character Counter</Link></li>
                            <li><Link to="/case-converter" className="hover:text-primary transition-colors">Case Converter</Link></li>
                            <li><Link to="/remove-extra-spaces" className="hover:text-primary transition-colors">Remove Extra Spaces</Link></li>
                            <li><Link to="/slug-generator" className="hover:text-primary transition-colors">Slug Generator</Link></li>
                            <li><Link to="/password-generator" className="hover:text-primary transition-colors">Password Generator</Link></li>
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
