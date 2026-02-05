/**
 * Utility functions for converting between JSON and CSV
 */

/**
 * Converts a JSON string or object to CSV format
 * Assumes a flat array of objects structure
 */
export function convertJsonToCsv(jsonInput: string | unknown): string {
    try {
        let data: Record<string, unknown>[];

        if (typeof jsonInput === 'string') {
            try {
                const parsed = JSON.parse(jsonInput);
                if (!Array.isArray(parsed)) {
                    throw new Error("JSON input must be an array of objects.");
                }
                data = parsed;
            } catch (e) {
                throw new Error("Invalid JSON string");
            }
        } else if (Array.isArray(jsonInput)) {
            data = jsonInput;
        } else {
            throw new Error("Input must be an array of objects");
        }

        if (data.length === 0) return "";

        // Get all unique keys from all objects to form headers
        const headers = Array.from(new Set(data.flatMap(Object.keys)));

        const csvRows = [
            headers.join(","), // Header row
            ...data.map(row => {
                return headers.map(header => {
                    const value = row[header];
                    if (value === null || value === undefined) return "";

                    let stringValue = "";
                    if (typeof value === 'object') {
                        stringValue = JSON.stringify(value);
                    } else {
                        stringValue = String(value);
                    }

                    // Escape quotes and wrap in quotes if necessary
                    // CSV rules: if contains comma, quote, or newline, wrap in quotes. 
                    // Quotes inside strings must be doubled.
                    if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n") || stringValue.includes("\r")) {
                        return `"${stringValue.replace(/"/g, '""')}"`;
                    }
                    return stringValue;
                }).join(",");
            })
        ];

        return csvRows.join("\n");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Conversion failed");
    }
}

/**
 * Converts a CSV string to JSON string
 */
export function convertCsvToJson(csvInput: string): string {
    try {
        const text = csvInput.trim();
        if (!text) return "[]";

        // Simple parser handling quoted values
        const lines = [];
        let currentLine = "";
        let inQuote = false;

        // Split by newlines but respect quotes
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') {
                inQuote = !inQuote;
                currentLine += char;
            } else if ((char === '\n' || char === '\r') && !inQuote) {
                if (currentLine.length > 0) lines.push(currentLine);
                currentLine = "";
                // Skip following \n if we hit \r
                if (char === '\r' && text[i + 1] === '\n') i++;
            } else {
                currentLine += char;
            }
        }
        if (currentLine.length > 0) lines.push(currentLine);

        if (lines.length < 2) return "[]"; // Only header or empty

        // Parse Headers
        const parseRow = (row: string): string[] => {
            const values: string[] = [];
            let inQ = false;
            let val = "";

            for (let j = 0; j < row.length; j++) {
                const c = row[j];
                if (c === '"') {
                    if (inQ && row[j + 1] === '"') {
                        val += '"'; // Escaped quote
                        j++;
                    } else {
                        inQ = !inQ;
                    }
                } else if (c === ',' && !inQ) {
                    values.push(val);
                    val = "";
                } else {
                    val += c;
                }
            }
            values.push(val);
            return values;
        };

        const headers = parseRow(lines[0]).map(h => h.trim());

        // Parse Rows
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseRow(lines[i]);
            const obj: Record<string, unknown> = {};

            headers.forEach((header, index) => {
                if (index >= values.length) return;

                let val = values[index];

                // Try to infer types (number, boolean, or keep as string)
                // This makes it more useful for "using in code"
                if (val === "") {
                    // Keep empty string or maybe null? Let's keep empty string.
                    obj[header] = "";
                } else if (!isNaN(Number(val)) && val.trim() !== "") {
                    obj[header] = Number(val);
                } else if (val.toLowerCase() === "true") {
                    obj[header] = true;
                } else if (val.toLowerCase() === "false") {
                    obj[header] = false;
                } else {
                    obj[header] = val;
                }
            });

            if (Object.keys(obj).length > 0) {
                result.push(obj);
            }
        }

        return JSON.stringify(result, null, 2);
    } catch (error) {
        throw new Error("Failed to parse CSV");
    }
}
