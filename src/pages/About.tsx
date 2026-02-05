import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function About() {
    return (
        <div className="container max-w-3xl mx-auto py-12 px-4 space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
                <p className="text-xl text-muted-foreground">
                    Building the web's most private file utility.
                </p>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                    <strong>xyzconverter</strong> was born from a frustration with online converters that demand you upload your private files to unknown servers just to change a file format.
                </p>
                <p>
                    We believe you shouldn't have to trade privacy for convenience.
                </p>
                <p>
                    By leveraging cutting-edge browser technologies like WebAssembly, we've built a converter that runs entirely on your device. It's faster, safer, and works offline.
                </p>

                <div className="pt-8">
                    <h2 className="text-foreground font-semibold text-2xl mb-4">Our Mission</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Make client-side processing the standard for web utilities.</li>
                        <li>Eliminate unnecessary data collection.</li>
                        <li>Provide free, accessible tools for everyone.</li>
                    </ul>
                </div>

                <div className="pt-8 flex gap-4">
                    <Link to="/">
                        <Button>Try the Tools</Button>
                    </Link>
                    <Link to="/how-it-works">
                        <Button variant="outline">See How it Works</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
