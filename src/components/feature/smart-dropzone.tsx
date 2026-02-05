import { useCallback } from 'react'
import { useDropzone, type FileRejection, type DropzoneOptions } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

interface SmartDropzoneProps {
    onFilesDropped: (files: File[]) => void
    isConverting: boolean
    accept: Record<string, string[]>
}

export function SmartDropzone({ onFilesDropped, isConverting, accept }: SmartDropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length > 0) {
            const error = rejectedFiles[0].errors[0]
            toast.error('Invalid File', {
                description: error.code === 'file-invalid-type'
                    ? 'This file format is not supported'
                    : error.message
            })
        }

        if (acceptedFiles.length > 0) {
            onFilesDropped(acceptedFiles)
        }
    }, [onFilesDropped])

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept,
        disabled: isConverting,
        maxSize: 10 * 1024 * 1024, // 10MB limit
    } as DropzoneOptions)

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Card
                className={cn(
                    "w-full h-64 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group",
                    isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                    isDragReject && "border-destructive bg-destructive/5",
                    isConverting && "opacity-50 cursor-not-allowed group-hover:border-muted-foreground/25 group-hover:bg-background"
                )}
            >
                <div className="p-8 text-center space-y-4">
                    <div className={cn("p-4 rounded-full bg-background shadow-sm ring-1 ring-border mx-auto transition-transform duration-300", isDragActive && "animate-bounce scale-110")}>
                        <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg tracking-tight">
                            {isDragActive ? "Drop it like it's hot!" : "Upload your images"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Drag & drop files or click to browse • Batch supported
                        </p>
                    </div>
                    <div className="flex gap-2 justify-center text-xs text-muted-foreground/75 font-mono">
                        <span className="bg-muted px-1.5 py-0.5 rounded">HEIC</span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="bg-muted px-1.5 py-0.5 rounded">PNG</span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="bg-muted px-1.5 py-0.5 rounded">WEBP</span>
                    </div>
                </div>
            </Card>
        </div>
    )
}
