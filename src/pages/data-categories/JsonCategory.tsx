import { DataCategoryPage } from '../DataCategoryPage'

export function JsonCategory() {
    return (
        <DataCategoryPage
            formatName="JSON"
            formatIcon="📋"
            title="JSON Converter & Tools"
            description="Convert JSON to other formats or work with JSON data."
            longDescription="JSON (JavaScript Object Notation) is the most popular data interchange format for APIs and web applications. It's human-readable, lightweight, and supported by virtually every programming language. Our tools let you convert JSON to CSV for spreadsheets, validate JSON structure, format/minify JSON, and more — all processed locally in your browser for complete privacy."
            slug="json"
            conversions={[
                {
                    path: '/json-to-csv',
                    label: 'JSON to CSV',
                    description: 'Convert JSON arrays to CSV for Excel/Sheets'
                },
                {
                    path: '/data-tools',
                    label: 'JSON Formatter',
                    description: 'Format, validate, and minify JSON data'
                },
            ]}
            useCases={[
                'Export API responses to Excel or Google Sheets',
                'Convert database exports to spreadsheet format',
                'Transform JSON data for data analysis',
                'Prepare data for import into other systems',
                'Validate and format JSON from various sources'
            ]}
        />
    )
}
