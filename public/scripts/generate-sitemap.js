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
    {
        path: '/',
        priority: '1.0',
        changefreq: 'weekly'
    },

    // Main tool pages
    {
        path: '/tools',
        priority: '0.9',
        changefreq: 'weekly'
    },

    // Image Conversions (High Priority)
    {
        path: '/heic-to-jpg',
        priority: '0.9',
        changefreq: 'monthly'
    },
    {
        path: '/heic-to-png',
        priority: '0.9',
        changefreq: 'monthly'
    },
    {
        path: '/heic-to-pdf',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        path: '/webp-to-jpg',
        priority: '0.9',
        changefreq: 'monthly'
    },
    {
        path: '/jpg-to-webp',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        path: '/png-to-webp',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        path: '/png-to-pdf',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        path: '/image-to-pdf',
        priority: '0.8',
        changefreq: 'monthly'
    },

    // PDF Tools
    {
        path: '/merge-pdf',
        priority: '0.8',
        changefreq: 'monthly'
    },
    {
        path: '/split-pdf',
        priority: '0.8',
        changefreq: 'monthly'
    },

    // Data Tools
    {
        path: '/json-to-csv',
        priority: '0.7',
        changefreq: 'monthly'
    },
    {
        path: '/csv-to-json',
        priority: '0.7',
        changefreq: 'monthly'
    },
    {
        path: '/data-tools',
        priority: '0.7',
        changefreq: 'monthly'
    },

    // Image Editor
    {
        path: '/resize-image',
        priority: '0.7',
        changefreq: 'monthly'
    },

    // Informational Pages
    {
        path: '/how-it-works',
        priority: '0.6',
        changefreq: 'monthly'
    },
    {
        path: '/about',
        priority: '0.5',
        changefreq: 'monthly'
    },
    {
        path: '/privacy',
        priority: '0.5',
        changefreq: 'yearly'
    },
    {
        path: '/terms',
        priority: '0.5',
        changefreq: 'yearly'
    }
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
