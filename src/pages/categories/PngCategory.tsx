import { ImageCategoryPage } from '../ImageCategoryPage'

export function PngCategory() {
    return (
        <ImageCategoryPage
            formatName="PNG"
            formatIcon="🟦"
            title="PNG Converter"
            description="Convert PNG images to other formats or optimize them for the web."
            longDescription="PNG (Portable Network Graphics) is a lossless image format that supports transparency. It's ideal for graphics, logos, and images requiring high quality. However, PNG files can be large. Convert to JPG for smaller file sizes, to WebP for modern web optimization, or to PDF for document sharing — all processed entirely in your browser."
            metaTitle="PNG Converter - Convert PNG Images | xyzconverter"
            slug="png"
            conversions={[
                {
                    path: '/png-to-jpg',
                    label: 'PNG to JPG',
                    description: 'Reduce file size with lossy compression'
                },
                {
                    path: '/png-to-webp',
                    label: 'PNG to WebP',
                    description: 'Modern format with excellent compression'
                },
                {
                    path: '/png-to-pdf',
                    label: 'PNG to PDF',
                    description: 'Create PDF documents from PNG images'
                },
                {
                    path: '/compress-image',
                    label: 'Compress PNG',
                    description: 'Optimize PNG files without format change'
                },
            ]}
        />
    )
}
