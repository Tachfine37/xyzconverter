#!/usr/bin/env node

/**
 * Post-build verification script for Vercel deployment
 * Ensures critical files exist and are properly generated
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '../dist');
const errors = [];
const warnings = [];

console.log('🔍 Running post-build verification...\n');

// Check critical files
const criticalFiles = [
    'index.html',
    'sitemap.xml',
    'robots.txt',
    'og-image.png'
];

criticalFiles.forEach(file => {
    const filePath = join(distPath, file);
    if (!existsSync(filePath)) {
        errors.push(`❌ Missing critical file: ${file}`);
    } else {
        console.log(`✅ ${file} exists`);
    }
});

// Check for JavaScript bundles
const assetsPath = join(distPath, 'assets');
if (!existsSync(assetsPath)) {
    errors.push('❌ Missing assets directory');
} else {
    console.log('✅ Assets directory exists');
}

// Summary
console.log('\n📊 Build Verification Summary:');
console.log(`   Files checked: ${criticalFiles.length}`);
console.log(`   Errors: ${errors.length}`);
console.log(`   Warnings: ${warnings.length}`);

if (errors.length > 0) {
    console.log('\n🚨 Errors found:');
    errors.forEach(err => console.log(`   ${err}`));
    process.exit(1);
}

if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warn => console.log(`   ${warn}`));
}

console.log('\n✨ Build verification complete!\n');
process.exit(0);
