export type ConversionFormat = 'jpg' | 'png' | 'pdf' | 'webp'

export interface ConversionRequest {
    id: string
    file: File
    toFormat: ConversionFormat
    quality?: number
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
