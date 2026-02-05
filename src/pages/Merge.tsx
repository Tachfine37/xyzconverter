import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FileText, Download, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SmartDropzone } from '@/components/feature/smart-dropzone'
import { usePdfMerge } from '@/hooks/use-pdf-merge'

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

                <h1 className="text-4xl font-bold tracking-tight">Merge PDFs</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Combine multiple PDF files into one document. 100% Client-side.
                </p>
            </div>

            {!mergedPdfUrl && !isInitializing ? (
                <div className="space-y-6">
                    {/* Dropzone */}
                    <SmartDropzone
                        onFilesDropped={handleFilesDropped}
                        isConverting={isMerging}
                        accept={{ 'application/pdf': ['.pdf'] }}
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
        </div>
    )
}
