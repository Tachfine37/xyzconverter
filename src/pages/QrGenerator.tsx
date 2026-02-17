import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Download, Settings2, ShieldCheck, Zap, Shield, Image as ImageIcon, CheckCircle, Wifi, Mail, Link as LinkIcon, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Helmet } from 'react-helmet-async'

type QrType = 'url' | 'text' | 'email' | 'wifi'

export function QrGenerator() {
    const [qrType, setQrType] = useState<QrType>('url')
    const [qrValue, setQrValue] = useState('')
    const [qrImage, setQrImage] = useState<string | null>(null)

    // Input states
    const [url, setUrl] = useState('')
    const [text, setText] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [ssid, setSsid] = useState('')
    const [password, setPassword] = useState('')
    const [encryption, setEncryption] = useState('WPA')

    // Customization
    const [foreground, setForeground] = useState('#000000')
    const [background, setBackground] = useState('#ffffff')
    const [showOptions, setShowOptions] = useState(false)

    // Generate QR Code
    useEffect(() => {
        let content = ''
        switch (qrType) {
            case 'url':
                content = url
                break
            case 'text':
                content = text
                break
            case 'email':
                content = `mailto:${email}?subject=${encodeURIComponent(subject)}`
                break
            case 'wifi':
                content = `WIFI:S:${ssid};T:${encryption};P:${password};;`
                break
        }
        setQrValue(content)

        if (content) {
            generateQr(content)
        } else {
            setQrImage(null)
        }
    }, [qrType, url, text, email, subject, ssid, password, encryption, foreground, background])

    const generateQr = async (content: string) => {
        try {
            const dataUrl = await QRCode.toDataURL(content, {
                width: 1000,
                margin: 1,
                color: {
                    dark: foreground,
                    light: background
                }
            })
            setQrImage(dataUrl)
        } catch (err) {
            console.error(err)
        }
    }

    const downloadQr = (format: 'png' | 'svg') => {
        if (!qrValue) return

        if (format === 'png' && qrImage) {
            const link = document.createElement('a')
            link.download = 'qrcode.png'
            link.href = qrImage
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else if (format === 'svg') {
            // For SVG we need to regenerate as string
            QRCode.toString(qrValue, {
                type: 'svg',
                color: {
                    dark: foreground,
                    light: background
                }
            }, (err, string) => {
                if (err) throw err
                const blob = new Blob([string], { type: 'image/svg+xml' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.download = 'qrcode.svg'
                link.href = url
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            })
        }
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
            <Helmet>
                <title>Free QR Code Generator - URL, Text, Email, WiFi | XYZCONVERTER</title>
                <meta name="description" content="Generate free QR codes instantly for URLs, WiFi, Text & Email. No sign-up required. High-quality PNG/SVG download. 100% private & client-side." />
            </Helmet>

            <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Free QR Code Generator Online - URL, Text, Email, WiFi</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Generate high-quality QR codes for URLs, text, email, and WiFi instantly.
                    Running entirely in your browser for maximum privacy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Configuration Panel */}
                <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6 order-2 md:order-1">

                    {/* Type Selection */}
                    <div className="space-y-2">
                        <Label>QR Type</Label>
                        <div className="grid grid-cols-4 gap-2">
                            <Button
                                variant={qrType === 'url' ? 'default' : 'outline'}
                                onClick={() => setQrType('url')}
                                className="h-auto py-2 flex flex-col gap-1"
                            >
                                <LinkIcon className="h-4 w-4" />
                                <span className="text-xs">URL</span>
                            </Button>
                            <Button
                                variant={qrType === 'text' ? 'default' : 'outline'}
                                onClick={() => setQrType('text')}
                                className="h-auto py-2 flex flex-col gap-1"
                            >
                                <Type className="h-4 w-4" />
                                <span className="text-xs">Text</span>
                            </Button>
                            <Button
                                variant={qrType === 'email' ? 'default' : 'outline'}
                                onClick={() => setQrType('email')}
                                className="h-auto py-2 flex flex-col gap-1"
                            >
                                <Mail className="h-4 w-4" />
                                <span className="text-xs">Email</span>
                            </Button>
                            <Button
                                variant={qrType === 'wifi' ? 'default' : 'outline'}
                                onClick={() => setQrType('wifi')}
                                className="h-auto py-2 flex flex-col gap-1"
                            >
                                <Wifi className="h-4 w-4" />
                                <span className="text-xs">WiFi</span>
                            </Button>
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        {qrType === 'url' && (
                            <div className="space-y-2">
                                <Label htmlFor="url">Website URL</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        )}

                        {qrType === 'text' && (
                            <div className="space-y-2">
                                <Label htmlFor="text">Content Text</Label>
                                <Textarea
                                    id="text"
                                    placeholder="Enter your text here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="min-h-[80px]"
                                />
                            </div>
                        )}

                        {qrType === 'email' && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="recipient@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        placeholder="Hello there"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {qrType === 'wifi' && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label htmlFor="ssid">Network Name (SSID)</Label>
                                    <Input
                                        id="ssid"
                                        type="text"
                                        placeholder="MyWiFi"
                                        value={ssid}
                                        onChange={(e) => setSsid(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="text"
                                        placeholder="Password123"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="encryption">Encryption</Label>
                                    <Select value={encryption} onValueChange={setEncryption}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="WPA">WPA/WPA2</SelectItem>
                                            <SelectItem value="WEP">WEP</SelectItem>
                                            <SelectItem value="nopass">None</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Customization */}
                    <div className="pt-4 border-t">
                        <Button
                            variant="ghost"
                            onClick={() => setShowOptions(!showOptions)}
                            className="flex items-center gap-2 text-muted-foreground w-full justify-start p-0 h-auto hover:bg-transparent hover:text-foreground"
                        >
                            <Settings2 className="w-4 h-4" />
                            <span>Color Options</span>
                        </Button>

                        {showOptions && (
                            <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
                                <div>
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Foreground</Label>
                                    <div className="flex gap-2 mt-1.5">
                                        <input
                                            type="color"
                                            value={foreground}
                                            onChange={(e) => setForeground(e.target.value)}
                                            className="h-10 w-full cursor-pointer rounded border border-input p-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Background</Label>
                                    <div className="flex gap-2 mt-1.5">
                                        <input
                                            type="color"
                                            value={background}
                                            onChange={(e) => setBackground(e.target.value)}
                                            className="h-10 w-full cursor-pointer rounded border border-input p-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            No signup required – 100% free & private
                        </p>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="sticky top-24 order-1 md:order-2">
                    <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                        {!qrImage ? (
                            <div className="text-center text-muted-foreground animate-pulse">
                                <div className="w-12 h-12 mx-auto mb-4 opacity-50 border-2 border-current border-dashed rounded flex items-center justify-center">
                                    <span className="text-2xl font-bold">QR</span>
                                </div>
                                <p>Enter content to generate</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
                                <div className="p-4 bg-white rounded-lg shadow-sm border border-border mb-6">
                                    <img src={qrImage} alt="QR Code" className="w-64 h-64 object-contain" />
                                </div>

                                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                    <Button onClick={() => downloadQr('png')} variant="outline" className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        PNG
                                    </Button>
                                    <Button onClick={() => downloadQr('svg')} variant="outline" className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        SVG
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <section className="mt-20 mb-20">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">How to Create a Free QR Code</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { step: 1, title: 'Choose Type', desc: 'Select from URL, Text, Email, or WiFi options.' },
                        { step: 2, title: 'Enter Content', desc: 'Paste your link or type the text you want to encode.' },
                        { step: 3, title: 'Customize', desc: 'Change foreground and background colors to match your brand.' },
                        { step: 4, title: 'Download', desc: 'Get your high-quality QR code in PNG or SVG format instantly.' }
                    ].map((item) => (
                        <div key={item.step} className="text-center space-y-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <span className="font-bold text-lg">{item.step}</span>
                            </div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features & Benefits */}
            <section className="mb-20 bg-muted/30 -mx-4 px-4 py-16 md:rounded-3xl">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">Why Use Our QR Code Generator?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {[
                            { icon: Zap, title: 'Instant & Fast', desc: 'No waiting times. Your QR code is generated in milliseconds directly in your browser.' },
                            { icon: Shield, title: '100% Private', desc: 'Your data never leaves your device. We don\'t store or track your information.' },
                            { icon: ImageIcon, title: 'Vector SVG Support', desc: 'Need to print? Download in SVG format for infinite scalability without quality loss.' },
                            { icon: CheckCircle, title: 'Forever Free', desc: 'Generate as many codes as you need. No sign-up, no credit card, and the codes never expire.' }
                        ].map((Feature, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1 bg-white p-2 rounded-lg shadow-sm h-fit">
                                    <Feature.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{Feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{Feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
