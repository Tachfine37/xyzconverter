import { ImageCategoryPage } from '../ImageCategoryPage'

export function JpgCategory() {
    return (
        <ImageCategoryPage
            formatName="JPG / JPEG"
            formatIcon="🟥"
            title="JPG / JPEG Converter"
            description="Convert JPG images to other formats or optimize them for different uses."
            longDescription="JPG (or JPEG) is the most widely used image format, known for its efficient lossy compression. It's perfect for photos but doesn't support transparency. Convert to PNG for lossless quality and transparency, to WebP for modern web optimization, or to PDF for document creation — all processed locally in your browser with complete privacy."
            metaTitle="JPG Converter - Convert JPEG Images | xyzconverter"
            slug="jpg"
            conversions={[
                {
                    path: '/jpg-to-png',
                    label: 'JPG to PNG',
                    description: 'Convert to lossless format with transparency'
                },
                {
                    path: '/jpg-to-webp',
                    label: 'JPG to WebP',
                    description: 'Modern format with better compression'
                },
                {
                    path: '/jpg-to-pdf',
                    label: 'JPG to PDF',
                    description: 'Create PDF documents from JPG images'
                },
                {
                    path: '/compress-image',
                    label: 'Compress JPG',
                    description: 'Reduce file size while maintaining quality'
                },
            ]}
        />
    )
}
