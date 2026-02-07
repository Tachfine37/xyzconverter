import { ImageCategoryPage } from '../ImageCategoryPage'

export function SvgCategory() {
    return (
        <ImageCategoryPage
            formatName="SVG"
            formatIcon="🧾"
            title="SVG Converter"
            description="Convert SVG vector graphics to raster image formats."
            longDescription="SVG (Scalable Vector Graphics) is a vector image format that scales infinitely without losing quality. It's ideal for logos, icons, and illustrations. However, some applications require raster formats. Convert your SVG files to PNG for web use with transparency, or to JPG for maximum compatibility — all processed locally in your browser."
            metaTitle="SVG Converter - Convert SVG Images | xyzconverter"
            slug="svg"
            conversions={[
                {
                    path: '/svg-to-png',
                    label: 'SVG to PNG',
                    description: 'Convert to raster format with transparency'
                },
                {
                    path: '/svg-to-jpg',
                    label: 'SVG to JPG',
                    description: 'Convert to widely compatible JPG format'
                },
            ]}
        />
    )
}
