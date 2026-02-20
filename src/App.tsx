import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LoadingSpinner } from './components/ui/loading-spinner'

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })))
const Converter = lazy(() => import('./pages/Converter').then(module => ({ default: module.Converter })))
const Merge = lazy(() => import('./pages/Merge').then(module => ({ default: module.Merge })))
const JsonConverter = lazy(() => import('./pages/JsonConverter').then(module => ({ default: module.JsonConverter })))
const HowItWorks = lazy(() => import('./pages/HowItWorks').then(module => ({ default: module.HowItWorks })))
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })))
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })))
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })))
const DataConverter = lazy(() => import('./pages/DataConverter').then(module => ({ default: module.DataConverter })))
const ImageResizer = lazy(() => import('./pages/ImageResizer').then(module => ({ default: module.ImageResizer })))
const ImageCompressor = lazy(() => import('./pages/ImageCompressor').then(module => ({ default: module.ImageCompressor })))
const PdfSplitter = lazy(() => import('./pages/PdfSplitter').then(module => ({ default: module.PdfSplitter })))
const CompressPdf = lazy(() => import('./pages/CompressPdf').then(module => ({ default: module.CompressPdf })))
const PdfToText = lazy(() => import('./pages/PdfToText').then(module => ({ default: module.PdfToText })))
const RotatePdf = lazy(() => import('./pages/RotatePdf').then(module => ({ default: module.RotatePdf })))
const ImagesToPdf = lazy(() => import('./pages/ImagesToPdf').then(module => ({ default: module.ImagesToPdf })))
const WatermarkPdf = lazy(() => import('./pages/WatermarkPdf').then(module => ({ default: module.WatermarkPdf })))
const PdfToWord = lazy(() => import('./pages/PdfToWord').then(module => ({ default: module.PdfToWord })))
const PdfToExcel = lazy(() => import('./pages/PdfToExcel').then(module => ({ default: module.PdfToExcel })))
const PdfToPowerPoint = lazy(() => import('./pages/PdfToPowerPoint').then(module => ({ default: module.PdfToPowerPoint })))
const WordToPdf = lazy(() => import('./pages/WordToPdf').then(module => ({ default: module.WordToPdf })))
const ExcelToPdf = lazy(() => import('./pages/ExcelToPdf').then(module => ({ default: module.ExcelToPdf })))
const AllTools = lazy(() => import('./pages/AllTools').then(module => ({ default: module.AllTools })))
const TextToSpeech = lazy(() => import('./pages/TextToSpeech').then(module => ({ default: module.TextToSpeech })))
const RemoveLineBreaks = lazy(() => import('./pages/RemoveLineBreaks').then(module => ({ default: module.RemoveLineBreaks })))
const ReverseText = lazy(() => import('./pages/ReverseText').then(module => ({ default: module.ReverseText })))
const LoremIpsumGenerator = lazy(() => import('./pages/LoremIpsumGenerator').then(module => ({ default: module.LoremIpsumGenerator })))
const RandomTextGenerator = lazy(() => import('./pages/RandomTextGenerator').then(module => ({ default: module.RandomTextGenerator })))

// ... existing lazy imports


const QrGenerator = lazy(() => import('./pages/QrGenerator').then(module => ({ default: module.QrGenerator })))
const QrScanner = lazy(() => import('./pages/QrScanner').then(module => ({ default: module.QrScanner })))
const WordCounter = lazy(() => import('./pages/WordCounter').then(module => ({ default: module.WordCounter })))
const CharacterCounter = lazy(() => import('./pages/CharacterCounter').then(module => ({ default: module.CharacterCounter })))
const CaseConverter = lazy(() => import('./pages/CaseConverter').then(module => ({ default: module.CaseConverter })))
const RemoveExtraSpaces = lazy(() => import('./pages/RemoveExtraSpaces').then(module => ({ default: module.RemoveExtraSpaces })))
const SlugGenerator = lazy(() => import('./pages/SlugGenerator').then(module => ({ default: module.SlugGenerator })))
const PasswordGenerator = lazy(() => import('./pages/PasswordGenerator').then(module => ({ default: module.PasswordGenerator })))
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })))
const BlogHeicToJpgWindows = lazy(() => import('./pages/blog/BlogHeicToJpgWindows').then(module => ({ default: module.BlogHeicToJpgWindows })))
const BlogCompressPdf = lazy(() => import('./pages/blog/BlogCompressPdf').then(module => ({ default: module.BlogCompressPdf })))
const BlogCategory = lazy(() => import('./pages/BlogCategory').then(module => ({ default: module.BlogCategory })))
const CropImage = lazy(() => import('./pages/CropImage').then(module => ({ default: module.CropImage })))

// Image Category Pages
const HeicCategory = lazy(() => import('./pages/categories/HeicCategory').then(module => ({ default: module.HeicCategory })))
const PngCategory = lazy(() => import('./pages/categories/PngCategory').then(module => ({ default: module.PngCategory })))
const JpgCategory = lazy(() => import('./pages/categories/JpgCategory').then(module => ({ default: module.JpgCategory })))
const WebpCategory = lazy(() => import('./pages/categories/WebpCategory').then(module => ({ default: module.WebpCategory })))
const SvgCategory = lazy(() => import('./pages/categories/SvgCategory').then(module => ({ default: module.SvgCategory })))

// Data Category Pages
const JsonCategory = lazy(() => import('./pages/data-categories/JsonCategory').then(module => ({ default: module.JsonCategory })))
const CsvCategory = lazy(() => import('./pages/data-categories/CsvCategory').then(module => ({ default: module.CsvCategory })))
const YamlCategory = lazy(() => import('./pages/data-categories/YamlCategory').then(module => ({ default: module.YamlCategory })))
const XmlCategory = lazy(() => import('./pages/data-categories/XmlCategory').then(module => ({ default: module.XmlCategory })))
const Base64Category = lazy(() => import('./pages/data-categories/Base64Category').then(module => ({ default: module.Base64Category })))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size={48} />
        </div>
      }>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<AllTools />} />

            {/* Static Pages */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />

            {/* Image Category Pages */}
            <Route path="/images/heic" element={<HeicCategory />} />
            <Route path="/images/png" element={<PngCategory />} />
            <Route path="/images/jpg" element={<JpgCategory />} />
            <Route path="/images/webp" element={<WebpCategory />} />
            <Route path="/images/svg" element={<SvgCategory />} />

            {/* Data Category Pages */}
            <Route path="/data/json" element={<JsonCategory />} />
            <Route path="/data/csv" element={<CsvCategory />} />
            <Route path="/data/yaml" element={<YamlCategory />} />
            <Route path="/data/xml" element={<XmlCategory />} />
            <Route path="/data/base64" element={<Base64Category />} />

            {/* SEO Routes - HEIC */}
            <Route path="/heic-to-jpg" element={<Converter />} />
            <Route path="/heic-to-png" element={<Converter />} />
            <Route path="/heic-to-pdf" element={<Converter />} />

            {/* Image Format Conversions */}
            <Route path="/png-to-jpg" element={<Converter />} />
            <Route path="/jpg-to-png" element={<Converter />} />
            <Route path="/webp-to-jpg" element={<Converter />} />
            <Route path="/webp-to-png" element={<Converter />} />
            <Route path="/png-to-pdf" element={<Converter />} />
            <Route path="/jpg-to-pdf" element={<Converter />} />
            <Route path="/image-to-pdf" element={<Converter />} />

            {/* JFIF Conversions */}
            <Route path="/jfif-to-jpg" element={<Converter />} />
            <Route path="/jfif-to-png" element={<Converter />} />

            {/* SVG Conversions */}
            <Route path="/svg-to-png" element={<Converter />} />
            <Route path="/svg-to-jpg" element={<Converter />} />

            {/* WebP Optimization Tools */}
            <Route path="/jpg-to-webp" element={<Converter />} />
            <Route path="/png-to-webp" element={<Converter />} />

            {/* PDF Tools */}
            <Route path="/merge-pdf" element={<Merge />} />
            <Route path="/split-pdf" element={<PdfSplitter />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/pdf-to-text" element={<PdfToText />} />
            <Route path="/rotate-pdf" element={<RotatePdf />} />
            <Route path="/watermark-pdf" element={<WatermarkPdf />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/pdf-to-excel" element={<PdfToExcel />} />
            <Route path="/pdf-to-powerpoint" element={<PdfToPowerPoint />} />
            <Route path="/images-to-pdf" element={<ImagesToPdf />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/excel-to-pdf" element={<ExcelToPdf />} />

            {/* PDF to Image Conversions */}
            <Route path="/pdf-to-jpg" element={<Converter />} />
            <Route path="/pdf-to-png" element={<Converter />} />
            <Route path="/pdf-to-webp" element={<Converter />} />


            {/* Data Tools */}
            <Route path="/json-to-csv" element={<JsonConverter />} />
            <Route path="/csv-to-json" element={<JsonConverter />} />
            <Route path="/data-tools" element={<DataConverter />} />


            {/* QR Tools */}
            <Route path="/qr-generator" element={<QrGenerator />} />
            <Route path="/qr-scanner" element={<QrScanner />} />

            {/* Text Tools */}
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/character-counter" element={<CharacterCounter />} />
            <Route path="/case-converter" element={<CaseConverter />} />
            <Route path="/remove-extra-spaces" element={<RemoveExtraSpaces />} />
            <Route path="/slug-generator" element={<SlugGenerator />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/remove-line-breaks" element={<RemoveLineBreaks />} />
            <Route path="/reverse-text" element={<ReverseText />} />
            <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
            <Route path="/random-text-generator" element={<RandomTextGenerator />} />

            {/* Image Tools */}
            <Route path="/resize-image" element={<ImageResizer />} />
            <Route path="/compress-image" element={<ImageCompressor />} />
            <Route path="/crop-image" element={<CropImage />} />

            {/* Fallback/Legacy Route */}
            <Route path="/convert/:conversion" element={<Converter />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:slug" element={<BlogCategory />} />
            <Route path="/blog/heic-to-jpg-windows" element={<BlogHeicToJpgWindows />} />
            <Route path="/blog/how-to-compress-pdf" element={<BlogCompressPdf />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
