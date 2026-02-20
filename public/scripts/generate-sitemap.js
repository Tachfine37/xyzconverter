#!/usr/bin/env node

/**
 * Sitemap Generator for xyzconverter
 * Generates sitemap.xml for all routes in the application
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://xyzconverter.com';
const OUTPUT_PATH = path.join(__dirname, '../sitemap.xml');

// Define all routes with their metadata
const routes = [
    // Homepage
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/tools', priority: '0.9', changefreq: 'weekly' },

    // Category Pages
    { path: '/images/heic', priority: '0.8', changefreq: 'monthly' },
    { path: '/images/png', priority: '0.8', changefreq: 'monthly' },
    { path: '/images/jpg', priority: '0.8', changefreq: 'monthly' },
    { path: '/images/webp', priority: '0.8', changefreq: 'monthly' },
    { path: '/images/svg', priority: '0.8', changefreq: 'monthly' },

    { path: '/data/json', priority: '0.8', changefreq: 'monthly' },
    { path: '/data/csv', priority: '0.8', changefreq: 'monthly' },
    { path: '/data/yaml', priority: '0.8', changefreq: 'monthly' },
    { path: '/data/xml', priority: '0.8', changefreq: 'monthly' },
    { path: '/data/base64', priority: '0.8', changefreq: 'monthly' },

    // Image Conversions
    { path: '/heic-to-jpg', priority: '0.9', changefreq: 'monthly' },
    { path: '/heic-to-png', priority: '0.9', changefreq: 'monthly' },
    { path: '/heic-to-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/webp-to-jpg', priority: '0.9', changefreq: 'monthly' },
    { path: '/webp-to-png', priority: '0.8', changefreq: 'monthly' },
    { path: '/jpg-to-webp', priority: '0.8', changefreq: 'monthly' },
    { path: '/png-to-webp', priority: '0.8', changefreq: 'monthly' },
    { path: '/png-to-jpg', priority: '0.8', changefreq: 'monthly' },
    { path: '/jpg-to-png', priority: '0.8', changefreq: 'monthly' },
    { path: '/png-to-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/jpg-to-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/image-to-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/images-to-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/jfif-to-jpg', priority: '0.8', changefreq: 'monthly' },
    { path: '/jfif-to-png', priority: '0.8', changefreq: 'monthly' },
    { path: '/svg-to-png', priority: '0.8', changefreq: 'monthly' },
    { path: '/svg-to-jpg', priority: '0.8', changefreq: 'monthly' },

    // PDF Tools
    { path: '/merge-pdf', priority: '0.9', changefreq: 'monthly' },
    { path: '/split-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/compress-pdf', priority: '0.9', changefreq: 'monthly' },
    { path: '/pdf-to-text', priority: '0.8', changefreq: 'monthly' },
    { path: '/rotate-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/watermark-pdf', priority: '0.8', changefreq: 'monthly' },
    { path: '/pdf-to-word', priority: '0.9', changefreq: 'monthly' },
    { path: '/pdf-to-excel', priority: '0.8', changefreq: 'monthly' },
    { path: '/pdf-to-powerpoint', priority: '0.8', changefreq: 'monthly' },
    { path: '/word-to-pdf', priority: '0.9', changefreq: 'monthly' },
    { path: '/pdf-to-powerpoint', priority: '0.8', changefreq: 'monthly' },
    { path: '/pdf-to-jpg', priority: '0.8', changefreq: 'monthly' },
    { path: '/pdf-to-png', priority: '0.8', changefreq: 'monthly' },
    { path: '/pdf-to-webp', priority: '0.8', changefreq: 'monthly' },

    // Data Tools
    { path: '/json-to-csv', priority: '0.8', changefreq: 'monthly' },
    { path: '/csv-to-json', priority: '0.8', changefreq: 'monthly' },
    { path: '/data-tools', priority: '0.7', changefreq: 'monthly' },

    // QR Tools
    { path: '/qr-generator', priority: '0.7', changefreq: 'monthly' },
    { path: '/qr-scanner', priority: '0.7', changefreq: 'monthly' },

    // Text Tools
    { path: '/word-counter', priority: '0.8', changefreq: 'monthly' },
    { path: '/character-counter', priority: '0.7', changefreq: 'monthly' },
    { path: '/case-converter', priority: '0.7', changefreq: 'monthly' },
    { path: '/remove-extra-spaces', priority: '0.7', changefreq: 'monthly' },
    { path: '/slug-generator', priority: '0.7', changefreq: 'monthly' },
    { path: '/password-generator', priority: '0.8', changefreq: 'monthly' },
    { path: '/text-to-speech', priority: '0.7', changefreq: 'monthly' },
    { path: '/remove-line-breaks', priority: '0.7', changefreq: 'monthly' },
    { path: '/reverse-text', priority: '0.7', changefreq: 'monthly' },
    { path: '/lorem-ipsum-generator', priority: '0.7', changefreq: 'monthly' },
    { path: '/random-text-generator', priority: '0.7', changefreq: 'monthly' },

    // Image Tools
    { path: '/resize-image', priority: '0.7', changefreq: 'monthly' },
    { path: '/compress-image', priority: '0.8', changefreq: 'monthly' },
    { path: '/crop-image', priority: '0.8', changefreq: 'monthly' },

    // Informational Pages
    { path: '/how-it-works', priority: '0.6', changefreq: 'monthly' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { path: '/terms', priority: '0.5', changefreq: 'yearly' },

    // Blog
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/blog/category/guides', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog/category/pdf-tips', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog/category/image-tips', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog/heic-to-jpg-windows', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/how-to-compress-pdf', priority: '0.8', changefreq: 'monthly' },
];

// Generate sitemap XML
function generateSitemap() {
    const currentDate = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    routes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
}

// Write sitemap to file
try {
    const sitemap = generateSitemap();
    fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${OUTPUT_PATH}`);
    console.log(`📊 Total URLs: ${routes.length}`);
} catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
}
