import { DataCategoryPage } from '../DataCategoryPage'

export function Base64Category() {
    return (
        <DataCategoryPage
            formatName="Base64"
            formatIcon="🔐"
            title="Base64 Encoder & Decoder"
            description="Encode and decode Base64 data securely in your browser."
            longDescription="Base64 is an encoding scheme that converts binary data into ASCII text format. It's commonly used to encode images, files, or text for transmission over text-based protocols like email or JSON APIs. While not encryption, Base64 makes binary data safe for text-only channels. Our tools let you encode text to Base64, decode Base64 to readable text, or convert between Base64 and other formats — all processed locally in your browser for complete privacy."
            metaTitle="Base64 Encoder & Decoder | xyzconverter"
            slug="base64"
            conversions={[
                {
                    path: '/data-tools',
                    label: 'Text to Base64',
                    description: 'Encode text or data to Base64 format'
                },
                {
                    path: '/data-tools',
                    label: 'Base64 to Text',
                    description: 'Decode Base64 back to readable text'
                },
                {
                    path: '/data-tools',
                    label: 'Base64 Validator',
                    description: 'Validate Base64 encoded strings'
                },
            ]}
            useCases={[
                'Encode images for embedding in HTML/CSS',
                'Encode credentials for HTTP Basic Auth',
                'Decode Base64-encoded API responses',
                'Convert binary data for JSON transmission',
                'Encode/decode email attachments'
            ]}
        />
    )
}
