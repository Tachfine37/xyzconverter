import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, CameraOff, Image as ImageIcon, UploadCloud, CheckCircle2, Copy, ExternalLink, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

export function QrScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const [scanResult, setScanResult] = useState<string | null>(null)
    const [cameraError, setCameraError] = useState<string | null>(null)
    const scannerRef = useRef<Html5Qrcode | null>(null)


    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (scannerRef.current) {
                if (scannerRef.current.isScanning) {
                    scannerRef.current.stop().catch(console.error)
                }
                scannerRef.current.clear()
            }
        }
    }, [])

    const startScanning = async () => {
        try {
            setCameraError(null)
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode("reader")
            }

            const config = { fps: 10, qrbox: { width: 250, height: 250 } }

            await scannerRef.current.start(
                { facingMode: "environment" },
                config,
                (decodedText) => {
                    handleScanSuccess(decodedText)
                },
                () => {
                    // ignore failures during scanning
                }
            )
            setIsScanning(true)
        } catch (err) {
            console.error(err)
            setCameraError("Could not start camera. Please ensure you have granted camera permissions.")
            setIsScanning(false)
        }
    }

    const stopScanning = async () => {
        if (scannerRef.current && isScanning) {
            try {
                await scannerRef.current.stop()
                setIsScanning(false)
            } catch (err) {
                console.error(err)
            }
        }
    }

    const handleScanSuccess = (decodedText: string) => {
        setScanResult(decodedText)
        stopScanning()
        toast.success("QR Code detected!")
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]


            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode("reader")
            }

            try {
                const result = await scannerRef.current.scanFileV2(file, true)
                handleScanSuccess(result.decodedText)
            } catch (err) {
                console.error(err)
                toast.error("Could not scan QR code from this image. Please try another image.")
            }
        }
    }

    const copyToClipboard = () => {
        if (scanResult) {
            navigator.clipboard.writeText(scanResult)
            toast.success("Copied to clipboard")
        }
    }

    const isUrl = (text: string) => {
        try {
            new URL(text)
            return true
        } catch {
            return false
        }
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
            <Helmet>
                <title>Free QR Code Scanner - Scan Online with Camera or Image | XYZCONVERTER</title>
                <meta name="description" content="Scan QR codes instantly online using your camera or by uploading an image. 100% free, private, and secure. No app installation required." />
            </Helmet>

            <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Free QR Code Scanner Online</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Scan QR codes instantly using your camera or upload an image. Secure, fast, and works on all devices 100% client-side.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">

                {/* Camera Section */}
                <div className="space-y-6">
                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Camera className="w-5 h-5 text-primary" /> Scan with Camera
                        </h2>
                        <div className="relative bg-black rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
                            <div id="reader" className="w-full h-full"></div>

                            {!isScanning && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 p-4 text-center bg-black/80 z-10">
                                    <CameraOff className="w-10 h-10 mb-2" />
                                    <p className="text-sm">{cameraError || "Camera permission required"}</p>
                                    <Button
                                        onClick={startScanning}
                                        className="mt-4 bg-primary text-white hover:bg-primary/90"
                                    >
                                        Start Camera
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upload & Result Section */}
                <div className="space-y-6">

                    {/* Upload */}
                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-primary" /> Scan from Image
                        </h2>
                        <div className="text-center">
                            <label htmlFor="qr-input-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted hover:border-primary/50 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG, GIF</p>
                                </div>
                                <input id="qr-input-file" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                            </label>
                        </div>
                    </div>

                    {/* Result */}
                    {scanResult && (
                        <div className="bg-white border rounded-xl p-6 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-600">
                                <CheckCircle2 className="w-5 h-5" /> QR Code Detected
                            </h2>
                            <div className="space-y-4">
                                <Textarea
                                    readOnly
                                    value={scanResult}
                                    className="min-h-[100px] font-mono bg-muted/30"
                                />
                                <div className="flex gap-3">
                                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                                        <Copy className="w-4 h-4 mr-2" /> Copy Text
                                    </Button>
                                    {isUrl(scanResult) && (
                                        <Button asChild className="flex-1">
                                            <a href={scanResult} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" /> Open Link
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* How it Works */}
            <section className="mt-20 mb-20">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">How to Scan a QR Code</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Camera, title: 'Use Camera', desc: 'Click "Start Camera" and point your device at the QR code.' },
                        { icon: ImageIcon, title: 'Upload Image', desc: 'Have a screenshot? Upload it directly to extract the info.' },
                        { icon: Check, title: 'Get Results', desc: 'Instantly copy the text or open the URL found in the code.' }
                    ].map((item, i) => (
                        <div key={i} className="text-center space-y-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        { q: 'Is it safe to scan QR codes here?', a: 'Yes. All scanning is done locally in your browser using JavaScript. We do not upload your images or camera stream to any server.' },
                        { q: 'Why isn\'t my camera working?', a: 'Please ensure you have granted camera permissions to your browser. If you denied it previously, check your browser settings to reset permissions for this site.' },
                        { q: 'Does it work on iPhone and Android?', a: 'Yes! Our scanner works on all modern mobile devices and desktops with a webcam.' }
                    ].map((faq, i) => (
                        <div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
