import { useEffect, useRef, useState, useCallback } from 'react'
import type { WorkerMessage, WorkerResponse, ConversionFormat } from '../core/types'
import { analytics } from '../lib/analytics'

export interface QueueItem {
    id: string
    file: File
    status: 'pending' | 'processing' | 'completed' | 'error'
    progress: number
    result?: Blob
    error?: string
}

export function useConversion() {
    const workerRef = useRef<Worker | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [queue, setQueue] = useState<QueueItem[]>([])
    const [isConverting, setIsConverting] = useState(false)

    useEffect(() => {
        // Initialize worker
        const worker = new Worker(new URL('../core/engines/worker.ts', import.meta.url), {
            type: 'module',
        })

        worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
            const { type } = e.data

            if (type === 'PONG') {
                setIsReady(true)
                return
            }

            if (type === 'STATUS') {
                const response = e.data.payload
                setQueue(prev => prev.map(item => {
                    if (item.id === response.id) {
                        return {
                            ...item,
                            status: response.status,
                            progress: response.progress,
                            result: displayResult(response.result),
                            error: response.error
                        }
                    }
                    return item
                }))
            }
        }

        workerRef.current = worker
        worker.postMessage({ type: 'PING' } satisfies WorkerMessage)

        return () => {
            worker.terminate()
        }
    }, [])

    // Update isConverting based on queue state
    useEffect(() => {
        const processing = queue.some(item => item.status === 'processing' || item.status === 'pending')
        setIsConverting(processing)
    }, [queue])

    const reset = useCallback(() => {
        setQueue([])
        setIsConverting(false)
    }, [])

    const convertFiles = useCallback((files: File[], toFormat: ConversionFormat = 'jpg') => {
        if (!workerRef.current) return

        const newItems: QueueItem[] = files.map(file => ({
            id: crypto.randomUUID(),
            file,
            status: 'pending',
            progress: 0
        }))

        setQueue(newItems)

        // Send messages to worker
        newItems.forEach(item => {
            workerRef.current?.postMessage({
                type: 'CONVERT',
                payload: {
                    id: item.id,
                    file: item.file,
                    toFormat,
                    quality: 0.8
                }
            } satisfies WorkerMessage)
        })

        analytics.track('convert_batch_start', { count: files.length, format: toFormat })
    }, [])

    return {
        isReady,
        isConverting,
        queue,
        convertFiles,
        reset
    }
}

function displayResult(result?: Blob): Blob | undefined {
    return result
}
