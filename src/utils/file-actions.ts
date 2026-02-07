import type { ConversionFormat } from '@/core/types'

export type ActionType = 'convert' | 'resize' | 'crop' | 'rotate' | 'compress' | 'merge'

export interface ConversionOption {
    format: ConversionFormat
    label: string
    description?: string
}

export interface FileAction {
    id: string
    type: ActionType
    label: string
    description?: string
    icon?: string
    isPrimary?: boolean
    // For conversion actions
    conversionOptions?: ConversionOption[]
    // For other actions
    targetFormat?: ConversionFormat
}

/**
 * Get all available actions for a given file
 */
export function getActionsForFile(file: File): FileAction[] {
    const type = file.type
    const name = file.name.toLowerCase()
    const actions: FileAction[] = []

    // Image files (including SVG, JFIF, HEIC)
    const isImage = type.startsWith('image/') ||
        name.endsWith('.heic') ||
        name.endsWith('.jfif') ||
        name.endsWith('.svg')

    if (isImage) {
        // Conversion options
        const imageConversions: ConversionOption[] = []

        if (type === 'image/png' || name.endsWith('.png')) {
            imageConversions.push(
                { format: 'jpg', label: 'Convert to JPG', description: 'Best for photos' },
                { format: 'webp', label: 'Convert to WebP', description: 'Smaller file size' },
                { format: 'pdf', label: 'Convert to PDF', description: 'Document format' }
            )
        } else if (type === 'image/jpeg' || type === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
            imageConversions.push(
                { format: 'png', label: 'Convert to PNG', description: 'Lossless quality' },
                { format: 'webp', label: 'Convert to WebP', description: 'Smaller file size' },
                { format: 'pdf', label: 'Convert to PDF', description: 'Document format' }
            )
        } else if (name.endsWith('.heic')) {
            imageConversions.push(
                { format: 'jpg', label: 'Convert to JPG', description: 'Universal format' },
                { format: 'png', label: 'Convert to PNG', description: 'Lossless quality' },
                { format: 'pdf', label: 'Convert to PDF', description: 'Document format' }
            )
        } else if (type === 'image/webp' || name.endsWith('.webp')) {
            imageConversions.push(
                { format: 'jpg', label: 'Convert to JPG', description: 'Universal format' },
                { format: 'png', label: 'Convert to PNG', description: 'Lossless quality' }
            )
        } else if (name.endsWith('.jfif')) {
            // JFIF is essentially JPEG, offer conversion to other formats
            imageConversions.push(
                { format: 'jpg', label: 'Convert to JPG', description: 'Standard JPEG' },
                { format: 'png', label: 'Convert to PNG', description: 'Lossless quality' },
                { format: 'webp', label: 'Convert to WebP', description: 'Smaller file size' }
            )
        } else if (type === 'image/svg+xml' || name.endsWith('.svg')) {
            // SVG can be rasterized to other formats
            imageConversions.push(
                { format: 'png', label: 'Convert to PNG', description: 'Lossless raster' },
                { format: 'jpg', label: 'Convert to JPG', description: 'Best for photos' }
            )
        }

        if (imageConversions.length > 0) {
            actions.push({
                id: 'convert',
                type: 'convert',
                label: 'Convert Format',
                description: 'Change image format',
                isPrimary: true,
                conversionOptions: imageConversions
            })
        }

        // Compress action for all images (except SVG)
        if (!name.endsWith('.svg')) {
            actions.push({
                id: 'compress',
                type: 'compress',
                label: 'Compress',
                description: 'Reduce file size',
                isPrimary: false
            })
        }

        // Other image actions (not applicable to SVG)
        if (!name.endsWith('.svg')) {
            actions.push(
                {
                    id: 'resize',
                    type: 'resize',
                    label: 'Resize',
                    description: 'Change dimensions',
                    isPrimary: false
                },
                {
                    id: 'crop',
                    type: 'crop',
                    label: 'Crop',
                    description: 'Trim image',
                    isPrimary: false
                },
                {
                    id: 'rotate',
                    type: 'rotate',
                    label: 'Rotate & Flip',
                    description: 'Adjust orientation',
                    isPrimary: false
                }
            )
        }
    }

    // PDF files
    if (type === 'application/pdf' || name.endsWith('.pdf')) {
        actions.push(
            {
                id: 'pdf-to-images',
                type: 'convert',
                label: 'Convert to Images',
                description: 'Extract pages as JPG/PNG',
                isPrimary: true,
                conversionOptions: [
                    { format: 'jpg', label: 'Convert to JPG', description: 'One image per page' },
                    { format: 'png', label: 'Convert to PNG', description: 'Lossless quality' }
                ]
            },
            {
                id: 'merge',
                type: 'merge',
                label: 'Merge PDFs',
                description: 'Combine multiple PDFs',
                isPrimary: false
            },
            {
                id: 'compress',
                type: 'compress',
                label: 'Compress',
                description: 'Reduce file size',
                isPrimary: false
            }
        )
    }

    // JSON files
    if (type === 'application/json' || name.endsWith('.json')) {
        actions.push({
            id: 'json-to-csv',
            type: 'convert',
            label: 'Convert to CSV',
            description: 'For Excel/Sheets',
            isPrimary: true,
            targetFormat: 'jpg' // Placeholder, not actually used
        })
    }

    // CSV files
    if (type === 'text/csv' || name.endsWith('.csv')) {
        actions.push({
            id: 'csv-to-json',
            type: 'convert',
            label: 'Convert to JSON',
            description: 'For developers',
            isPrimary: true,
            targetFormat: 'jpg' // Placeholder, not actually used
        })
    }

    return actions
}

/**
 * Check if a file type is supported
 */
export function isFileSupported(file: File): boolean {
    return getActionsForFile(file).length > 0
}
