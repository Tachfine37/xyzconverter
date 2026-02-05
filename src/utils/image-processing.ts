/**
 * Utility functions for image processing
 */

export interface ImageProcessOptions {
    width?: number
    height?: number
    maintainAspectRatio?: boolean
    quality?: number
    format?: 'image/jpeg' | 'image/png' | 'image/webp'
    rotation?: number // in degrees
    flip?: { horizontal: boolean, vertical: boolean }
    crop?: { x: number, y: number, width: number, height: number } // Pixel coordinates
}

// Get dimensions of a File object
export const getImageDimensions = (file: File): Promise<{ width: number, height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight })
            URL.revokeObjectURL(img.src)
        }
        img.onerror = reject
        img.src = URL.createObjectURL(file)
    })
}

// Helper to create an image element from a URL
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

// Core function to process image: Crop -> Rotate/Flip -> Resize -> Export
export const processImage = async (
    file: File | string, // Can be File or blob URL
    options: ImageProcessOptions
): Promise<Blob> => {
    const {
        width,
        height,
        quality = 0.9,
        format = 'image/jpeg',
        rotation = 0,
        flip = { horizontal: false, vertical: false },
        crop
    } = options

    const imageSrc = file instanceof File ? URL.createObjectURL(file) : file
    const image = await createImage(imageSrc)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('No 2d context')

    // 1. Determine dimensions required for the rotated image
    const rotRad = (rotation * Math.PI) / 180

    // Calculate bounding box of the rotated image
    const sin = Math.abs(Math.sin(rotRad))
    const cos = Math.abs(Math.cos(rotRad))
    const rotatedWidth = image.naturalWidth * cos + image.naturalHeight * sin
    const rotatedHeight = image.naturalWidth * sin + image.naturalHeight * cos

    canvas.width = rotatedWidth
    canvas.height = rotatedHeight

    // 2. Apply Rotation & Flip
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2)

    // Draw original image
    ctx.drawImage(image, 0, 0)

    // 3. Handle Cropping (If provided)
    // If we have crop coordinates, we need to extract that region from the *current* canvas state
    // Actually, cropping usually happens *after* rotation visually for the user, OR *before*.
    // react-easy-crop returns crop data relative to the *displayed* image (which might be rotated).
    // Standard approach: Get the pixel data of the rotated result, then crop.

    let resultCanvas = canvas

    if (crop) {
        const croppedCanvas = document.createElement('canvas')
        croppedCanvas.width = crop.width
        croppedCanvas.height = crop.height
        const croppedCtx = croppedCanvas.getContext('2d')
        if (!croppedCtx) throw new Error('No crop context')

        // Draw from the rotated canvas to the cropped canvas
        croppedCtx.drawImage(
            canvas,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
        )
        resultCanvas = croppedCanvas
    }

    // 4. Handle Resizing (Final Output Size)
    // If width/height are specified and different from current resultCanvas
    if (width && height && (width !== resultCanvas.width || height !== resultCanvas.height)) {
        const resizedCanvas = document.createElement('canvas')
        resizedCanvas.width = width
        resizedCanvas.height = height
        const resizedCtx = resizedCanvas.getContext('2d')
        if (!resizedCtx) throw new Error('No resize context')

        // High quality scaling
        resizedCtx.imageSmoothingEnabled = true
        resizedCtx.imageSmoothingQuality = 'high'

        resizedCtx.drawImage(resultCanvas, 0, 0, width, height)
        resultCanvas = resizedCanvas
    }

    // 5. Export
    return new Promise((resolve, reject) => {
        resultCanvas.toBlob(
            (blob) => {
                if (file instanceof File) URL.revokeObjectURL(imageSrc)
                if (blob) resolve(blob)
                else reject(new Error('Canvas is empty'))
            },
            format,
            quality
        )
    })
}

// Deprecated wrapper for backward compatibility if needed, but we should update usage
export const resizeImage = async (file: File, options: ImageProcessOptions) => {
    return processImage(file, options)
}
