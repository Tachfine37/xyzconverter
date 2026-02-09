import { DataCategoryPage } from '../DataCategoryPage'

export function YamlCategory() {
    return (
        <DataCategoryPage
            formatName="YAML"
            formatIcon="📄"
            title="YAML Converter & Tools"
            description="Convert YAML to other formats or work with YAML configuration files."
            longDescription="YAML (YAML Ain't Markup Language) is a human-friendly data serialization format commonly used for configuration files, especially in DevOps tools like Kubernetes, Docker Compose, and CI/CD pipelines. It's more readable than JSON or XML and supports complex data structures. Our tools let you convert YAML to JSON for APIs, to XML for legacy systems, or validate YAML syntax — all processed locally in your browser."
            slug="yaml"
            conversions={[
                {
                    path: '/data-tools',
                    label: 'YAML to JSON',
                    description: 'Convert YAML config files to JSON format'
                },
                {
                    path: '/data-tools',
                    label: 'YAML to XML',
                    description: 'Transform YAML to XML structure'
                },
                {
                    path: '/data-tools',
                    label: 'YAML Validator',
                    description: 'Validate and format YAML syntax'
                },
            ]}
            useCases={[
                'Convert Kubernetes manifests to JSON for processing',
                'Transform Docker Compose files for different tools',
                'Validate YAML configuration files before deployment',
                'Convert CI/CD pipeline configs between formats',
                'Parse YAML data for web applications'
            ]}
        />
    )
}
