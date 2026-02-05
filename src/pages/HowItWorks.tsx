import { WifiOff, Cpu, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function HowItWorks() {
    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-16">
            {/* Hero */}
            <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary-700">
                    Your Files Never Leave Your Device
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We use advanced WebAssembly technology to process everything right here in your browser.
                    No uploads. No cloud storage. No privacy risks.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/">
                        <Button size="lg">Start Converting</Button>
                    </Link>
                </div>
            </div>

            {/* The Process */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="p-6 space-y-4 text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <span className="font-bold text-xl">1</span>
                        </div>
                        <h3 className="font-semibold text-xl">Select File</h3>
                        <p className="text-muted-foreground">
                            When you select a file, the browser reads it into memory. It is NOT sent to any server.
                        </p>
                    </Card>
                    <Card className="p-6 space-y-4 text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-xl">Local Processing</h3>
                        <p className="text-muted-foreground">
                            Our conversion engine (WebAssembly) runs directly on your computer's CPU to transform the data.
                        </p>
                    </Card>
                    <Card className="p-6 space-y-4 text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-xl">Instant Save</h3>
                        <p className="text-muted-foreground">
                            The new file is generated instantly and saved to your device. Zero network latency.
                        </p>
                    </Card>
                </div>
            </div>

            {/* The Verification Challenge */}
            <div className="bg-muted/30 p-8 rounded-2xl border border-dashed border-primary/20 text-center space-y-6">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <WifiOff className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Don't Believe Us? Try the "Offline Test"</h2>
                <p className="max-w-xl mx-auto text-muted-foreground">
                    Load this website, then <strong>turn off your WiFi/Internet</strong>.
                    You will see that the converter still works perfectly.
                    That's because the code is already running on your machine.
                </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">The Technology</h2>
                <p className="text-muted-foreground">
                    We leverage modern browser capabilities including <strong>WebAssembly (WASM)</strong>,
                    <strong>Web Workers</strong>, and <strong>OffscreenCanvas</strong> to bring desktop-class
                    performance to the web. This architecture ensures that sensitive documents like contracts,
                    personal photos, and financial data are completely safe.
                </p>
            </div>
        </div>
    )
}
