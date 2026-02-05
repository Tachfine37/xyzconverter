# SEO Implementation Guide

This document explains how to use the SEO components and utilities in the New Hope project.

## 📁 Files Created

### Core SEO Utilities
- **`src/utils/seo.ts`** - Enhanced SEO hook with meta tags, Open Graph, and Twitter Cards
- **`src/utils/structured-data.ts`** - Schema.org JSON-LD generators
- **`src/utils/seo-content.ts`** - Pre-written SEO content for conversion pages

### SEO Components
- **`src/components/seo/SEOContentBlock.tsx`** - Content block for conversion pages
- **`src/components/seo/FAQSection.tsx`** - FAQ component with schema markup
- **`src/components/seo/Breadcrumbs.tsx`** - Breadcrumb navigation with schema
- **`src/components/seo/RelatedTools.tsx`** - Internal linking component

### Static Files
- **`public/robots.txt`** - Search engine crawling rules
- **`public/sitemap.xml`** - Auto-generated sitemap
- **`public/scripts/generate-sitemap.js`** - Sitemap generator script

### Documentation
- **`SEO-OPTIMIZATION-PLAN.md`** - Comprehensive SEO strategy document

---

## 🚀 Quick Start

### 1. Add SEO to Existing Conversion Page

```tsx
import { usePageSEO } from '@/utils/seo'
import { SEOContentBlock } from '@/components/seo/SEOContentBlock'
import { FAQSection } from '@/components/seo/FAQSection'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { RelatedTools, RELATED_TOOLS_MAP } from '@/components/seo/RelatedTools'
import { CONVERSION_CONTENT } from '@/utils/seo-content'
import { HEIC_FAQ } from '@/utils/structured-data'
import { useLocation } from 'react-router-dom'

export function MyConverterPage() {
    const location = useLocation()
    
    // Initialize SEO
    usePageSEO()
    
    // Get content for this page
    const content = CONVERSION_CONTENT[location.pathname]
    const relatedTools = RELATED_TOOLS_MAP[location.pathname] || []

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs />
            
            {/* Your existing conversion tool UI */}
            <YourConverterComponent />
            
            {/* SEO Content Block */}
            {content && <SEOContentBlock {...content} />}
            
            {/* Related Tools */}
            <RelatedTools tools={relatedTools} />
            
            {/* FAQ Section */}
            <FAQSection faqs={HEIC_FAQ} />
        </div>
    )
}
```

### 2. Add Custom SEO Meta Tags

```tsx
import { usePageSEO } from '@/utils/seo'

export function CustomPage() {
    usePageSEO({
        title: 'Custom Page Title - xyzconverter',
        description: 'Custom description for this page',
        keywords: 'custom, keywords, here',
        ogImage: 'https://xyzconverter.com/custom-og-image.png'
    })
    
    return <div>Your content</div>
}
```

### 3. Add Structured Data

```tsx
import { useEffect } from 'react'
import { 
    injectStructuredData, 
    generateSoftwareApplicationSchema,
    generateHowToSchema 
} from '@/utils/structured-data'

export function HomePage() {
    useEffect(() => {
        // Add SoftwareApplication schema
        const appSchema = generateSoftwareApplicationSchema()
        
        // Add HowTo schema
        const howToSchema = generateHowToSchema(
            'How to Convert HEIC to JPG',
            [
                { name: 'Upload HEIC file', text: 'Drag and drop or click to browse' },
                { name: 'Convert', text: 'Files are converted in your browser' },
                { name: 'Download', text: 'Download your JPG file' }
            ],
            'Quick guide to converting HEIC images to JPG format'
        )
        
        // Inject both schemas
        injectStructuredData([appSchema, howToSchema])
    }, [])
    
    return <div>Homepage content</div>
}
```

---

## 🎨 Component Examples

### SEO Content Block

```tsx
<SEOContentBlock
    title="What is HEIC to JPG Conversion?"
    description="HEIC is Apple's image format. Converting to JPG ensures universal compatibility..."
    features={[
        '100% privacy - files never leave your device',
        'Batch conversion supported',
        'No file size limits'
    ]}
    howItWorks={{
        title: 'How to Convert',
        steps: [
            'Upload your HEIC files',
            'Conversion happens instantly',
            'Download your JPG files'
        ]
    }}
    benefits={[
        'Universal compatibility',
        'Lightning fast',
        'Completely free'
    ]}
/>
```

### FAQ Section with Schema

```tsx
import { FAQSection } from '@/components/seo/FAQSection'

const myFAQs = [
    {
        question: 'Is this converter safe?',
        answer: 'Yes! All conversion happens in your browser. Files never leave your device.'
    },
    {
        question: 'Does it work offline?',
        answer: 'Yes, after the initial page load, the converter works entirely offline.'
    }
]

<FAQSection faqs={myFAQs} title="Common Questions" />
```

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

// Auto-generate from pathname
<Breadcrumbs />

// Or provide custom breadcrumbs
<Breadcrumbs 
    items={[
        { name: 'Home', url: '/' },
        { name: 'Image Tools', url: '/tools' },
        { name: 'HEIC to JPG' } // Last item has no URL
    ]}
/>
```

### Related Tools

```tsx
import { RelatedTools } from '@/components/seo/RelatedTools'

const relatedTools = [
    {
        name: 'HEIC to PNG',
        path: '/heic-to-png',
        description: 'Convert to PNG with transparency',
        category: 'image'
    },
    {
        name: 'Merge PDF',
        path: '/merge-pdf',
        description: 'Combine PDFs into one',
        category: 'pdf'
    }
]

<RelatedTools tools={relatedTools} />
```

---

## 📊 Pre-configured Content

### Available SEO Content

Pre-written content is available in `src/utils/seo-content.ts` for:
- `/heic-to-jpg`
- `/webp-to-jpg`
- `/png-to-pdf`
- `/heic-to-png`
- `/jpg-to-webp`
- `/merge-pdf`

**Usage:**
```tsx
import { CONVERSION_CONTENT } from '@/utils/seo-content'
const content = CONVERSION_CONTENT['/heic-to-jpg']
```

### Pre-defined FAQs

Available in `src/utils/structured-data.ts`:
- `HEIC_FAQ` - Questions about HEIC conversion
- `WEBP_FAQ` - Questions about WEBP conversion
- `PDF_FAQ` - Questions about PDF conversion

**Usage:**
```tsx
import { HEIC_FAQ } from '@/utils/structured-data'
<FAQSection faqs={HEIC_FAQ} />
```

### Pre-configured Related Tools

Available in `src/components/seo/RelatedTools.tsx`:
```tsx
import { RELATED_TOOLS_MAP } from '@/components/seo/RelatedTools'
const tools = RELATED_TOOLS_MAP['/heic-to-jpg']
```

---

## 🛠️ Build Commands

### Generate Sitemap
```bash
npm run generate:sitemap
```

### Build (includes sitemap generation)
```bash
npm run build
```

---

## ✅ SEO Checklist for New Pages

When creating a new conversion page:

1. **Add route to `src/utils/seo.ts`** in `ROUTE_SEO` object
2. **Add route to `public/scripts/generate-sitemap.js`** in routes array
3. **Create SEO content** in `src/utils/seo-content.ts` (optional but recommended)
4. **Add related tools** in `src/components/seo/RelatedTools.tsx` (optional)
5. **Use `usePageSEO()` hook** in the component
6. **Add breadcrumbs** with `<Breadcrumbs />`
7. **Add SEO content block** with pre-written content
8. **Add FAQ section** with relevant questions
9. **Add related tools** for internal linking
10. **Regenerate sitemap** with `npm run generate:sitemap`

---

## 🔍 Testing SEO

### Local Testing

1. **Meta Tags**: View page source and check `<head>` section
2. **Structured Data**: Check for `<script type="application/ld+json">` tags
3. **Internal Links**: Navigate through related tools and breadcrumbs

### Online Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
- [Meta Tags Inspector](https://metatags.io/) - Preview social sharing
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) - Overall SEO audit
- [Schema Markup Validator](https://validator.schema.org/) - Validate JSON-LD

---

## 📈 Expected Results

After implementing SEO:
- **Improved Search Rankings** for target keywords
- **Rich Results** in Google Search (FAQ snippets, breadcrumbs)
- **Better Social Sharing** with Open Graph and Twitter Cards
- **Increased Organic Traffic** through better discoverability
- **Lower Bounce Rate** through related tools and internal linking

---

## 🎯 Next Steps

1. **Submit sitemap** to Google Search Console: `https://xyzconverter.com/sitemap.xml`
2. **Monitor rankings** for target keywords (HEIC to JPG, WEBP to JPG, etc.)
3. **Track performance** with Google Analytics and Search Console
4. **Create category pages** (Image Tools, PDF Tools, Data Tools)
5. **Add blog content** for long-tail keywords (optional)
6. **Optimize Core Web Vitals** for better rankings

---

## 🤝 Contributing

When adding new conversion pages:
1. Follow the SEO checklist above
2. Use pre-built components for consistency
3. Write unique, valuable content
4. Add to sitemap generator
5. Test with online SEO tools

---

**Questions?** Check the full SEO strategy in `SEO-OPTIMIZATION-PLAN.md`
