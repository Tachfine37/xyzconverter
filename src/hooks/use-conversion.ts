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

    const convertFiles = useCallback(async (files: File[], toFormat: ConversionFormat = 'jpg') => {
        console.log('[use-conversion] convertFiles called', {
            filesCount: files.length,
            toFormat,
            workerExists: !!workerRef.current
        })

        if (!workerRef.current) {
            console.error('[use-conversion] Worker not initialized!')
            return
        }

        const newItems: QueueItem[] = files.map(file => ({
            id: crypto.randomUUID(),
            file,
            status: 'pending',
            progress: 0
        }))

        console.log('[use-conversion] Setting queue', { newItems })
        setQueue(newItems)

        // Pre-convert HEIC files in main thread (heic2any needs DOM)
        // Pre-convert SVG files in main thread (SVG rendering needs DOM)
        for (const item of newItems) {
            let fileToConvert = item.file

            if (item.file.type === 'image/heic' || item.file.name.toLowerCase().endsWith('.heic')) {
                console.log('[use-conversion] HEIC file detected, pre-converting...')
                try {
                    // Load heic2any library dynamically
                    if (!(window as any).heic2any) {
                        const script = document.createElement('script')
                        script.src = '/scripts/heic2any.js'
                        await new Promise((resolve, reject) => {
                            script.onload = resolve
                            script.onerror = reject
                            document.head.appendChild(script)
                        })
                    }

                    const heic2any = (window as any).heic2any
                    const result = await heic2any({
                        blob: item.file,
                        toType: 'image/jpeg',
                        quality: 0.8
                    })

                    fileToConvert = Array.isArray(result) ? result[0] : result
                    console.log('[use-conversion] HEIC pre-conversion complete')
                } catch (err) {
                    console.error('[use-conversion] HEIC pre-conversion failed', err)
                    // Continue with original file, let worker handle the error
                }
            }

            // Pre-convert SVG to PNG in main thread (workers can't render SVG)
            if (item.file.type === 'image/svg+xml' || item.file.name.toLowerCase().endsWith('.svg')) {
                console.log('[use-conversion] SVG file detected, pre-converting to PNG...')
                try {
                    const svgText = await item.file.text()

                    // Create an image element to load the SVG
                    const img = document.createElement('img')
                    const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
                    const url = URL.createObjectURL(svgBlob)

                    await new Promise((resolve, reject) => {
                        img.onload = resolve
                        img.onerror = reject
                        img.src = url
                    })

                    // Create canvas and draw the SVG
                    const canvas = document.createElement('canvas')
                    canvas.width = img.naturalWidth || 300
                    canvas.height = img.naturalHeight || 150
                    const ctx = canvas.getContext('2d')
                    if (!ctx) throw new Error('Could not get canvas context')

                    ctx.drawImage(img, 0, 0)
                    URL.revokeObjectURL(url)

                    // Convert canvas to PNG blob
                    const pngBlob = await new Promise<Blob>((resolve, reject) => {
                        canvas.toBlob((blob) => {
                            if (blob) resolve(blob)
                            else reject(new Error('Failed to convert canvas to blob'))
                        }, 'image/png')
                    })

                    // Create a File object from the blob
                    fileToConvert = new File([pngBlob], item.file.name.replace(/\.svg$/i, '.png'), { type: 'image/png' })
                    console.log('[use-conversion] SVG pre-conversion to PNG complete')
                } catch (err) {
                    console.error('[use-conversion] SVG pre-conversion failed', err)
                    // Continue with original file, let worker handle the error
                }
            }

            // Send to worker
            console.log('[use-conversion] Sending to worker', {
                id: item.id,
                fileName: fileToConvert.name || item.file.name,
                toFormat,
                fileSize: fileToConvert.size
            })

            workerRef.current?.postMessage({
                type: 'CONVERT',
                payload: {
                    id: item.id,
                    file: fileToConvert,
                    toFormat,
                    quality: 0.8
                }
            } satisfies WorkerMessage)
        }

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
