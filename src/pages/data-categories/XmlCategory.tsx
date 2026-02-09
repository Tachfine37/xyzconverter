import { DataCategoryPage } from '../DataCategoryPage'

export function XmlCategory() {
    return (
        <DataCategoryPage
            formatName="XML"
            formatIcon="🏷️"
            title="XML Converter & Tools"
            description="Convert XML to other formats or work with XML data."
            longDescription="XML (eXtensible Markup Language) is a markup language widely used for data exchange, configuration files, and document storage. While verbose, XML is highly structured and supports complex hierarchies with attributes. It's commonly used in enterprise systems, SOAP APIs, and legacy applications. Our tools let you convert XML to JSON for modern APIs, to YAML for configuration, or validate XML structure — all processed locally in your browser."
            metaTitle="XML Converter & Tools | xyzconverter"
            slug="xml"
            conversions={[
                {
                    path: '/data-tools',
                    label: 'XML to JSON',
                    description: 'Convert XML data to JSON format'
                },
                {
                    path: '/data-tools',
                    label: 'XML to YAML',
                    description: 'Transform XML to YAML structure'
                },
                {
                    path: '/data-tools',
                    label: 'XML Validator',
                    description: 'Validate and format XML syntax'
                },
            ]}
            useCases={[
                'Convert SOAP API responses to JSON',
                'Transform legacy XML data for modern applications',
                'Parse XML configuration files',
                'Convert RSS/Atom feeds to JSON',
                'Validate XML structure before processing'
            ]}
        />
    )
}
