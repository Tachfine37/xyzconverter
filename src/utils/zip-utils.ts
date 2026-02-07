import JSZip from 'jszip'

/**
 * Create a ZIP file from multiple image blobs
 * @param blobs Array of image blobs
 * @param format Image format extension (jpg, png)
 * @returns ZIP file as Blob
 */
export async function createZipFromBlobs(
    blobs: Blob[],
    format: string
): Promise<Blob> {
    const zip = new JSZip()

    blobs.forEach((blob, index) => {
        const pageNum = String(index + 1).padStart(3, '0')
        zip.file(`page-${pageNum}.${format}`, blob)
    })

    return await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
    })
}
