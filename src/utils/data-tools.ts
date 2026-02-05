import yaml from 'js-yaml'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

export type DataFormat = 'json' | 'yaml' | 'xml' | 'base64' | 'text'

export interface ConversionResult {
    data: string
    error?: string
}

export const convertData = (input: string, inputFormat: DataFormat, outputFormat: DataFormat): ConversionResult => {
    try {
        let jsonObj: any

        // Step 1: Parse Input to Object (if applicable)
        if (inputFormat === 'json') {
            jsonObj = JSON.parse(input)
        } else if (inputFormat === 'yaml') {
            jsonObj = yaml.load(input)
        } else if (inputFormat === 'xml') {
            const parser = new XMLParser()
            jsonObj = parser.parse(input)
        } else if (inputFormat === 'base64') {
            // Base64 decode to text
            try {
                const decoded = atob(input)
                // If output matches, return raw text
                if (outputFormat === 'text') return { data: decoded }
                // Try parsing as JSON for structure
                try {
                    jsonObj = JSON.parse(decoded)
                } catch {
                    // Not JSON, just text
                    return { data: decoded }
                }
            } catch (e) {
                return { data: '', error: 'Invalid Base64 input' }
            }
        } else if (inputFormat === 'text') {
            // Text input, mostly for Base64 encoding
            if (outputFormat === 'base64') {
                return { data: btoa(input) }
            }
            // Try parsing text as JSON?
            try { jsonObj = JSON.parse(input) } catch { }
        }

        // Handle Base64 output special case (encode text representation)
        if (outputFormat === 'base64') {
            const str = typeof jsonObj === 'string' ? jsonObj : JSON.stringify(jsonObj, null, 2)
            return { data: btoa(str) }
        }

        // Step 2: Convert Object to Output
        if (outputFormat === 'json') {
            return { data: JSON.stringify(jsonObj, null, 2) }
        } else if (outputFormat === 'yaml') {
            return { data: yaml.dump(jsonObj) }
        } else if (outputFormat === 'xml') {
            const builder = new XMLBuilder({ format: true })
            return { data: builder.build(jsonObj) }
        }

        return { data: input } // Fallback

    } catch (e) {
        return { data: '', error: (e as Error).message }
    }
}
