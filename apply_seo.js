import fs from 'fs';
import path from 'path';

const entries = [
    {
        "routePath": "/word-counter",
        "title": "Free Online Word Counter Tool - Count Words & Characters | XYZCONVERTER",
        "desc": "Count words, characters, sentences, and paragraphs instantly with our free online word counter. Real-time analysis, reading time estimation, and no upload required.",
        "file": "WordCounter.tsx"
    },
    {
        "routePath": "/remove-extra-spaces",
        "title": "Remove Extra Spaces Online - Clean Whitespace | XYZCONVERTER",
        "desc": "Remove extra spaces, trailing whitespace, and empty lines from your text online. Instantly clean and format your text. Free, fast, and secure.",
        "file": "RemoveExtraSpaces.tsx"
    },
    {
        "routePath": "/case-converter",
        "title": "Free Title Case & Text case Converter Tool | XYZCONVERTER",
        "desc": "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more. Free online text case converter. No data storage, 100% private.",
        "file": "CaseConverter.tsx"
    },
    {
        "routePath": "/character-counter",
        "title": "Free Online Character Counter - Without Spaces | XYZCONVERTER",
        "desc": "Count characters (with and without spaces), words, sentences, and paragraphs instantly. Perfect for checking Twitter, SMS, and SEO limits. Free & Secure.",
        "file": "CharacterCounter.tsx"
    },
    {
        "routePath": "/slug-generator",
        "title": "Free URL Slug Generator - SEO Friendly Link Creator | XYZCONVERTER",
        "desc": "Generate pure, SEO-friendly URL slugs from any text. Remove special characters, numbers, and extra spaces instantly. Free online slug creator.",
        "file": "SlugGenerator.tsx"
    },
    {
        "routePath": "/qr-generator",
        "title": "Free QR Code Generator - URL, Text, Email, WiFi | XYZCONVERTER",
        "desc": "Generate free QR codes instantly for URLs, WiFi, Text & Email. No sign-up required. High-quality PNG/SVG download. 100% private & client-side.",
        "file": "QrGenerator.tsx"
    },
    {
        "routePath": "/qr-scanner",
        "title": "Free QR Code Scanner - Scan Online with Camera or Image | XYZCONVERTER",
        "desc": "Scan QR codes instantly online using your camera or by uploading an image. 100% free, private, and secure. No app installation required.",
        "file": "QrScanner.tsx"
    },
    {
        "routePath": "/password-generator",
        "title": "Free Strong Password Generator - Secure & Random | XYZCONVERTER",
        "desc": "Generate strong, secure, and random passwords instantly. Customizable length and character sets. 100% client-side for maximum security.",
        "file": "PasswordGenerator.tsx"
    },
    {
        "routePath": "/rotate-pdf",
        "title": "Rotate PDF Online – Rotate PDF Pages Free | xyzconverter",
        "desc": "Rotate PDF pages online securely. Fix upside down or sideways PDF pages instantly in your browser. No upload required.",
        "file": "RotatePdf.tsx"
    },
    {
        "routePath": "/compress-image",
        "title": "Image Compressor Online – Reduce File Size Free",
        "desc": "Compress JPG, PNG, WEBP, and SVG images online for free. Reduce image file size without losing quality. 100% private and secure client-side compression.",
        "file": "ImageCompressor.tsx"
    },
    {
        "routePath": "/merge-pdf",
        "title": "Merge PDF Files Online – Free & Secure PDF Combiner",
        "desc": "Combine multiple PDF files into one document instantly. Free online PDF merger with no file size limits or watermarks. Secure client-side processing.",
        "file": "Merge.tsx"
    }
];

// 1. Update seo.ts ROUTE_SEO
let seoFileContent = fs.readFileSync('src/utils/seo.ts', 'utf8');
let seoEntriesToAdd = entries.map(e => `
    '${e.routePath}': {
        title: '${e.title}',
        description: '${e.desc}',
    },`).join('');

seoFileContent = seoFileContent.replace(/}\s*$/, `${seoEntriesToAdd}\n}`);
fs.writeFileSync('src/utils/seo.ts', seoFileContent);

// 2. Add usePageSEO to component files
for (const entry of entries) {
    const fullPath = path.join('src', 'pages', entry.file);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove Helmet tags
    content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');

    // Add import
    if (!content.includes('usePageSEO')) {
        content = content.replace(/^.*$/m, match => `import { usePageSEO } from '@/utils/seo'\n${match}`);
    }

    // Add hook call inside component
    const componentRegex = new RegExp(`export function ${entry.file.replace('.tsx', '')}\\s*\\([^)]*\\)\\s*{`, 'g');
    content = content.replace(componentRegex, match => `${match}\n    usePageSEO()`);

    fs.writeFileSync(fullPath, content);
}
