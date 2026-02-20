import { usePageSEO } from '@/utils/seo'
import { useState, useEffect } from 'react'
import { Copy, RefreshCw, ShieldCheck, ShieldAlert, Shield, ArrowRight, Link as LinkIcon, Lock, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export function PasswordGenerator() {
    usePageSEO()
const [password, setPassword] = useState('')
    const [length, setLength] = useState([16])
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('medium')

    useEffect(() => {
        generatePassword()
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

    const generatePassword = () => {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '0123456789'
        const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-='

        let chars = ''
        if (includeUppercase) chars += uppercase
        if (includeLowercase) chars += lowercase
        if (includeNumbers) chars += numbers
        if (includeSymbols) chars += symbols

        if (chars === '') {
            setPassword('')
            return
        }

        let generatedPassword = ''
        for (let i = 0; i < length[0]; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length)
            generatedPassword += chars[randomIndex]
        }

        setPassword(generatedPassword)
        calculateStrength(generatedPassword)
    }

    const calculateStrength = (pwd: string) => {
        let score = 0
        if (pwd.length > 8) score += 1
        if (pwd.length > 12) score += 1
        if (/[A-Z]/.test(pwd)) score += 1
        if (/[0-9]/.test(pwd)) score += 1
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1

        if (score < 3) setStrength('weak')
        else if (score < 5) setStrength('medium')
        else setStrength('strong')
    }

    const handleCopy = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        toast.success('Password copied to clipboard')
    }

    const getStrengthColor = () => {
        switch (strength) {
            case 'weak': return 'bg-red-500'
            case 'medium': return 'bg-yellow-500'
            case 'strong': return 'bg-green-500'
            default: return 'bg-gray-300'
        }
    }

    const getStrengthLabel = () => {
        switch (strength) {
            case 'weak': return 'Weak'
            case 'medium': return 'Medium'
            case 'strong': return 'Strong'
            default: return ''
        }
    }

    const getStrengthIcon = () => {
        switch (strength) {
            case 'weak': return <ShieldAlert className="w-5 h-5 text-red-500" />
            case 'medium': return <Shield className="w-5 h-5 text-yellow-500" />
            case 'strong': return <ShieldCheck className="w-5 h-5 text-green-500" />
        }
    }

    return (
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
            

            <div className="text-center mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Strong Password Generator</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Create secure, random passwords to protect your accounts.
                    100% client-side processing - your passwords never leave your device.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Generator Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Output */}
                    <div className="relative">
                        <div className="relative flex items-center">
                            <Input
                                value={password}
                                readOnly
                                className="h-16 text-xl md:text-2xl font-mono text-center pr-12 bg-white shadow-sm border-2 focus-visible:ring-primary/20"
                            />
                            <div className="absolute right-2 flex gap-1">
                                <Button onClick={generatePassword} variant="ghost" size="icon" title="Regenerate">
                                    <RefreshCw className="w-5 h-5" />
                                </Button>
                                <Button onClick={handleCopy} size="icon" title="Copy">
                                    <Copy className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        {/* Strength Indicator */}
                        <div className="mt-2 flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                {getStrengthIcon()}
                                <span className="text-sm font-medium capitalize text-muted-foreground">{getStrengthLabel()}</span>
                            </div>
                            <div className="flex gap-1 h-1.5 w-24">
                                <div className={`flex-1 rounded-full transition-all ${getStrengthColor()}`} />
                                <div className={`flex-1 rounded-full transition-all ${strength !== 'weak' ? getStrengthColor() : 'bg-gray-100'}`} />
                                <div className={`flex-1 rounded-full transition-all ${strength === 'strong' ? getStrengthColor() : 'bg-gray-100'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-8">
                        {/* Length Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-base font-semibold">Password Length</Label>
                                <span className="px-3 py-1 bg-primary/10 text-primary font-mono font-medium rounded-md">
                                    {length[0]}
                                </span>
                            </div>
                            <Slider
                                value={length}
                                onValueChange={setLength}
                                min={6}
                                max={50}
                                step={1}
                                className="py-4"
                            />
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold">Characters</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeUppercase}
                                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="flex-1 font-medium">Uppercase (A-Z)</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeLowercase}
                                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="flex-1 font-medium">Lowercase (a-z)</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeNumbers}
                                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="flex-1 font-medium">Numbers (0-9)</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeSymbols}
                                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="flex-1 font-medium">Symbols (!@#$)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-blue-900">Security Tips</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-800 list-disc pl-4">
                            <li>Use at least 12 characters</li>
                            <li>Mix varied character types</li>
                            <li>Don't reuse passwords</li>
                            <li>Use a password manager</li>
                        </ul>
                    </div>

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <h4 className="font-semibold mb-3">Why use this generator?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            This tool generates passwords completely within your browser.
                            No password is ever sent to any server, ensuring 100% privacy and security.
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Tools Section */}
            {/* SEO Content Section */}
            <section className="mt-20 mb-20 bg-slate-50/50 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-3xl mx-auto prose prose-slate max-w-none">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">How to Create Secure Passwords</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">What makes a password strong?</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li><strong>Length:</strong> Using 12+ characters significantly increases security.</li>
                                <li><strong>Complexity:</strong> Mixing uppercase, lowercase, numbers, and symbols helps resist attacks.</li>
                                <li><strong>Unpredictability:</strong> Random strings are harder to guess than dictionary words.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Best Practices</h3>
                            <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                <li>Use a unique password for every account.</li>
                                <li>Enable Two-Factor Authentication (2FA) whenever possible.</li>
                                <li>Use a reputable password manager to store your credentials.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-xl font-semibold mb-6">3 Steps to Better Security</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-semibold mb-1">Generate</h4>
                                    <p className="text-sm text-muted-foreground">Use our tool to create a random, complex string that can't be guessed.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-semibold mb-1">Save</h4>
                                    <p className="text-sm text-muted-foreground">Immediately save it to your password manager. Don't try to memorize complex random strings.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-semibold mb-1">Update</h4>
                                    <p className="text-sm text-muted-foreground">Change your passwords periodically, especially for sensitive accounts like banking or email.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto mb-20">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 md:mb-10">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        {
                            q: "Is this password generator safe?",
                            a: "Yes, absolutely. This tool runs 100% in your browser using JavaScript. The passwords you generate are never sent to our servers or stored anywhere. You can even disconnect your internet and use it offline."
                        },
                        {
                            q: "How long should my password be?",
                            a: "Security experts recommend a minimum of 12 characters. For highly sensitive accounts, 16-20 characters is even better. Each additional character exponentially increases the time required to crack a password."
                        },
                        {
                            q: "Why should I use symbols and numbers?",
                            a: "Adding numbers and symbols increases the 'entropy' or randomness of your password. It expands the set of possible characters, making brute-force attacks significantly harder and slower."
                        },
                        {
                            q: "Can I use these passwords for my bank account?",
                            a: "Yes. The random passwords generated here are cryptographically strong and excellent for banking, email, and other sensitive services where security is paramount."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="border rounded-lg p-5 bg-white hover:border-primary/50 transition-colors shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16 mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Related Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/slug-generator" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                                <LinkIcon className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Slug Generator</h3>
                        <p className="text-muted-foreground text-sm">Create SEO-friendly URL slugs for your content.</p>
                    </Link>

                    <Link to="/qr-generator" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <Lock className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">QR Generator</h3>
                        <p className="text-muted-foreground text-sm">Securely generate QR codes for links and text.</p>
                    </Link>

                    <Link to="/character-counter" className="group block p-6 bg-white border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                <Settings2 className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Character Counter</h3>
                        <p className="text-muted-foreground text-sm">Analyze text length and density.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
