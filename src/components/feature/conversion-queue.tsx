import { CheckCircle2, Loader2, AlertCircle, Download, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface QueueItem {
    id: string
    file: File
    status: 'pending' | 'processing' | 'completed' | 'error'
    progress: number
    result?: Blob
    error?: string
}

interface ConversionQueueProps {
    queue: QueueItem[]
    targetFormat: string
    onDownload: (index: number) => void
    onDownloadAll: () => void
    onReset: () => void
}

export function ConversionQueue({ queue, targetFormat, onDownload, onDownloadAll, onReset }: ConversionQueueProps) {
    const completedCount = queue.filter(item => item.status === 'completed').length
    const errorCount = queue.filter(item => item.status === 'error').length
    const processingCount = queue.filter(item => item.status === 'processing').length

    return (
        <div className="w-full space-y-4">
            {/* Queue Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Conversion Queue ({queue.length} files)</h3>
                    <p className="text-xs text-muted-foreground">
                        {completedCount} completed • {processingCount} processing • {errorCount} failed
                    </p>
                </div>
                <div className="flex gap-2">
                    {completedCount > 0 && (
                        <Button onClick={onDownloadAll} variant="default" size="sm">
                            <Download className="w-4 h-4 mr-1.5" />
                            Download All ({completedCount})
                        </Button>
                    )}
                    <Button onClick={onReset} variant="outline" size="sm">
                        Clear Queue
                    </Button>
                </div>
            </div>

            {/* Queue Items */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {queue.map((item, index) => {
                    const status = item.status || 'pending'
                    const isProcessing = status === 'processing'
                    const isCompleted = status === 'completed'
                    const isError = status === 'error'

                    return (
                        <Card key={index} className="p-3 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                            {/* Icon */}
                            <div className="flex-shrink-0" aria-hidden="true">
                                {isProcessing && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                                {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                {isError && <AlertCircle className="w-5 h-5 text-destructive" />}
                                {status === 'pending' && <FileImage className="w-5 h-5 text-muted-foreground" />}
                            </div>

                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{item.file.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{(item.file.size / 1024).toFixed(1)} KB</span>
                                    <span>→</span>
                                    <span className="uppercase font-medium text-primary">{targetFormat}</span>
                                    {isCompleted && item.result && (
                                        <>
                                            <span>•</span>
                                            <span>{(item.result.size / 1024).toFixed(1)} KB</span>
                                        </>
                                    )}
                                </div>
                                {isError && item.error && (
                                    <p className="text-xs text-destructive mt-1">{item.error}</p>
                                )}
                            </div>

                            {/* Actions */}
                            {isCompleted && (
                                <Button onClick={() => onDownload(index)} variant="ghost" size="sm" aria-label={`Download ${item.file.name}`}>
                                    <Download className="w-4 h-4" />
                                </Button>
                            )}
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
