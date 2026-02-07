import { ImageCategoryPage } from '../ImageCategoryPage'

export function WebpCategory() {
    return (
        <ImageCategoryPage
            formatName="WebP"
            formatIcon="🌐"
            title="WebP Converter"
            description="Convert WebP images to more compatible formats."
            longDescription="WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. While it offers excellent file size reduction, WebP isn't always supported by older software or devices. Convert to JPG or PNG for universal compatibility — all processed locally in your browser."
            metaTitle="WebP Converter - Convert WebP Images | xyzconverter"
            slug="webp"
            conversions={[
                {
                    path: '/webp-to-jpg',
                    label: 'WebP to JPG',
                    description: 'Convert to the most compatible format'
                },
                {
                    path: '/webp-to-png',
                    label: 'WebP to PNG',
                    description: 'Convert to lossless PNG with transparency'
                },
            ]}
        />
    )
}
