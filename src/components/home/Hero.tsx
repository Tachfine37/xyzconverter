import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, ShieldCheck, Zap, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { isFileSupported } from '@/utils/file-actions'

interface HeroProps {
    onFileUploaded?: (file: File) => void
}

export function Hero({ onFileUploaded }: HeroProps) {
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null)
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]

            if (isFileSupported(file)) {
                onFileUploaded?.(file)
            } else {
                setError(`Unsupported file format: ${file.name}`)
            }
        }
    }, [onFileUploaded])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
    })

    return (
        <section className="relative w-full bg-[#1e1e2e] text-white min-h-[600px] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Background Pattern - subtle grid/dots */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="z-10 text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Headlines */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        File Converter
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light">
                        Convert your files to any format
                    </p>
                </div>

                {/* Main Conversion Block */}
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative group transition-all duration-300 transform",
                        isDragActive ? "scale-105" : ""
                    )}
                >
                    <input {...getInputProps()} />

                    <div className="bg-[#2b2b3b] shadow-2xl rounded-xl p-10 md:p-16 border-2 border-dashed border-gray-600 group-hover:border-primary/50 transition-colors w-full max-w-3xl mx-auto flex flex-col items-center gap-6">

                        {/* Icon */}
                        <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                            <Upload className={cn("w-10 h-10 text-gray-300 group-hover:text-primary transition-colors", isDragActive && "animate-bounce")} />
                        </div>

                        {/* CTA Text */}
                        <div className="space-y-2">
                            <label htmlFor="file-upload-hero" className="cursor-pointer">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-8 rounded-lg h-auto shadow-lg hover:shadow-primary/25 transition-all w-full md:w-auto"
                                    onClick={() => {
                                        // This is a bit of a hack to trigger the dropzone input programmatically if needed, 
                                        // but standard label association usually works better.
                                        // Actually react-dropzone input is hidden.
                                        const input = document.querySelector('input[type="file"]') as HTMLInputElement
                                        if (input) input.click()
                                    }}
                                >
                                    Choose Files
                                </Button>
                            </label>
                            <p className="text-sm text-gray-500 mt-4">
                                Drop files here. 100 MB maximum file size
                            </p>
                            {error && (
                                <p className="text-red-400 font-medium animate-in fade-in slide-in-from-top-2 pt-2">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-gray-400 max-w-3xl mx-auto">
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-green-500" />
                        <span className="font-medium text-white">Privacy First</span>
                        <span className="text-sm">Files never leave your device</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        <span className="font-medium text-white">Instant</span>
                        <span className="text-sm">No server upload wait time</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Code2 className="w-6 h-6 text-blue-500" />
                        <span className="font-medium text-white">Developer Ready</span>
                        <span className="text-sm">JSON, CSV & Data tools</span>
                    </div>
                </div>

            </div>
        </section>
    )
}
