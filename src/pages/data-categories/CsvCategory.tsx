import { DataCategoryPage } from '../DataCategoryPage'

export function CsvCategory() {
    return (
        <DataCategoryPage
            formatName="CSV"
            formatIcon="📊"
            title="CSV Converter & Tools"
            description="Convert CSV files to other formats or work with tabular data."
            longDescription="CSV (Comma-Separated Values) is a universal format for tabular data, widely used in spreadsheets, databases, and data analysis tools. It's simple, portable, and supported by Excel, Google Sheets, and virtually every data tool. Our converters let you transform CSV to JSON for APIs, validate CSV structure, and manipulate data — all processed locally in your browser."
            slug="csv"
            conversions={[
                {
                    path: '/csv-to-json',
                    label: 'CSV to JSON',
                    description: 'Convert CSV data to structured JSON'
                },
                {
                    path: '/data-tools',
                    label: 'CSV Validator',
                    description: 'Validate and format CSV files'
                },
            ]}
            useCases={[
                'Convert spreadsheet data to JSON for web applications',
                'Transform Excel exports for API consumption',
                'Prepare data for database imports',
                'Validate CSV file structure before processing',
                'Convert tabular data for data science workflows'
            ]}
        />
    )
}
