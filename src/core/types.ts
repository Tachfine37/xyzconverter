export type ConversionFormat = 'jpg' | 'png' | 'pdf' | 'webp' | 'svg' | 'jfif'

export interface ConversionRequest {
    id: string
    file: File
    toFormat: ConversionFormat
    quality?: number // 0-1 for lossy formats (jpg, webp), undefined for lossless (png)
    scale?: number // For SVG rendering: 1, 2, or 3 (default: 1)
}

export interface ConversionResponse {
    id: string
    status: 'pending' | 'processing' | 'completed' | 'error'
    progress: number
    result?: Blob
    error?: string
}

export type WorkerMessage =
    | { type: 'CONVERT'; payload: ConversionRequest }
    | { type: 'PING' }

export type WorkerResponse =
    | { type: 'STATUS'; payload: ConversionResponse }
    | { type: 'PONG' }
