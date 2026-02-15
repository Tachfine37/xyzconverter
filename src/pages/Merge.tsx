import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FileText, Download, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { usePdfMerge } from '@/hooks/use-pdf-merge'
import { MERGE_PDF_FAQ } from "@/utils/structured-data"
import { FAQSection } from "@/components/seo/FAQSection"

export function Merge() {
    const location = useLocation()
    const [files, setFiles] = useState<File[]>([])
    const { isMerging, mergedPdfUrl, mergePdfs, reset } = usePdfMerge()

    // Check if we have incoming files from navigation state
    const hasIncomingFiles = !!(location.state as { uploadedFiles?: File[] } | null)?.uploadedFiles
    const [isInitializing, setIsInitializing] = useState(hasIncomingFiles)

    const handleFilesDropped = (newFiles: File[]) => {
        // Filter only PDFs just in case
        const pdfs = newFiles.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
        setFiles(prev => [...prev, ...pdfs])
    }

    // Handle files passed from Hero
    useEffect(() => {
        const state = location.state as { uploadedFiles?: File[] } | null
        if (state?.uploadedFiles && state.uploadedFiles.length > 0 && files.length === 0) {
            handleFilesDropped(state.uploadedFiles)
            window.history.replaceState({}, document.title)
        }
        setIsInitializing(false)
    }, [location.state])

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleMerge = () => {
        mergePdfs(files)
    }

    const handleReset = () => {
        setFiles([])
        reset()
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            {/* Header */}
            <div className="space-y-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-700">Merge PDF Files Online – Free & Secure PDF Combiner</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Easily <strong className="font-medium text-foreground">merge PDF online</strong> with our <strong className="font-medium text-foreground">free PDF merger</strong>. <strong className="font-medium text-foreground">Combine PDF files</strong> instantly with <strong className="font-medium text-foreground">no upload required</strong>—100% <strong className="font-medium text-foreground">secure client-side processing</strong> ensures your documents never leave your device.
                </p>
            </div>

            {!mergedPdfUrl && !isInitializing ? (
                <div className="space-y-6">
                    {/* Dropzone */}
                    <SmartDropzone
                        onFilesDropped={handleFilesDropped}
                        isConverting={isMerging}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        label="Upload your PDFs"
                        formats={['PDF']}
                    />

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selected Files ({files.length})</h2>
                                <Button variant="ghost" size="sm" onClick={() => setFiles([])} disabled={isMerging}>
                                    Clear All
                                </Button>
                            </div>

                            <div className="grid gap-2">
                                {files.map((file, idx) => (
                                    <Card key={`${file.name}-${idx}`} className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded">
                                                <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </div>
                                            <div className="text-sm font-medium truncate max-w-[200px] sm:max-w-md">
                                                {file.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => removeFile(idx)}
                                            disabled={isMerging}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </Card>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className="w-full"
                                onClick={handleMerge}
                                disabled={files.length < 2 || isMerging}
                            >
                                {isMerging ? 'Merging...' : 'Merge PDFs'}
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                /* Success State */
                <Card className="p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">PDF Created!</h2>
                        <p className="text-muted-foreground">
                            Your documents have been successfully merged.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href={mergedPdfUrl || undefined} download="merged-document.pdf" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                        </a>
                        <Button variant="outline" size="lg" onClick={handleReset} className="w-full sm:w-auto">
                            Merge More
                        </Button>
                    </div>
                </Card>
            )}

            {/* How to Merge Section */}
            <div className="py-12 border-t">
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">How to Merge PDF Files</h2>
                        <p className="text-muted-foreground">Simple steps to combine your documents</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors shadow-sm text-center space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto">1</div>
                            <h3 className="font-semibold text-lg">Upload Files</h3>
                            <p className="text-muted-foreground">Select two or more PDF files you want to merge into a single document.</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors shadow-sm text-center space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto">2</div>
                            <h3 className="font-semibold text-lg">Arrange Order</h3>
                            <p className="text-muted-foreground">Drag and drop your files to arrange them in the exact order you prefer.</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors shadow-sm text-center space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto">3</div>
                            <h3 className="font-semibold text-lg">Download PDF</h3>
                            <p className="text-muted-foreground">Click "Merge PDFs" and instantly download your combined document.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <FAQSection faqs={MERGE_PDF_FAQ} />
        </div>
    )
}
