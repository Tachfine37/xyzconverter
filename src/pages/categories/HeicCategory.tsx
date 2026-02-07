import { ImageCategoryPage } from '../ImageCategoryPage'

export function HeicCategory() {
    return (
        <ImageCategoryPage
            formatName="HEIC"
            formatIcon="📱"
            title="HEIC Converter - Convert iPhone Photos"
            description="Convert HEIC images from your iPhone to universally compatible formats."
            longDescription="HEIC (High Efficiency Image Container) is Apple's default image format for iPhone photos since iOS 11. While it offers excellent compression and quality, HEIC files aren't always compatible with non-Apple devices and software. Our converter lets you transform your iPhone photos into widely-supported formats like JPG, PNG, or PDF — all processed locally in your browser for maximum privacy."
            metaTitle="HEIC Converter - Convert iPhone Photos | xyzconverter"
            slug="heic"
            conversions={[
                {
                    path: '/heic-to-jpg',
                    label: 'HEIC to JPG',
                    description: 'Convert to the most widely supported image format'
                },
                {
                    path: '/heic-to-png',
                    label: 'HEIC to PNG',
                    description: 'Convert with lossless quality and transparency support'
                },
                {
                    path: '/heic-to-pdf',
                    label: 'HEIC to PDF',
                    description: 'Create PDF documents from your iPhone photos'
                },
            ]}
        />
    )
}
