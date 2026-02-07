import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Converter } from './pages/Converter'
import { Merge } from './pages/Merge'
import { JsonConverter } from './pages/JsonConverter'
import { HowItWorks } from './pages/HowItWorks'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { About } from './pages/About'
import { DataConverter } from './pages/DataConverter'
import { ImageResizer } from './pages/ImageResizer'
import { ImageCompressor } from './pages/ImageCompressor'
import { PdfSplitter } from './pages/PdfSplitter'
import { Layout } from './components/layout/Layout'
import { AllTools } from './pages/AllTools'
// Image Category Pages
import { HeicCategory } from './pages/categories/HeicCategory'
import { PngCategory } from './pages/categories/PngCategory'
import { JpgCategory } from './pages/categories/JpgCategory'
import { WebpCategory } from './pages/categories/WebpCategory'
import { SvgCategory } from './pages/categories/SvgCategory'

function App() {
  return (
    <BrowserRouter>
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

          {/* PDF to Image Conversions */}
          <Route path="/pdf-to-jpg" element={<Converter />} />
          <Route path="/pdf-to-png" element={<Converter />} />
          <Route path="/pdf-to-webp" element={<Converter />} />


          {/* Data Tools */}
          <Route path="/json-to-csv" element={<JsonConverter />} />
          <Route path="/csv-to-json" element={<JsonConverter />} />
          <Route path="/data-tools" element={<DataConverter />} />

          {/* Image Tools */}
          <Route path="/resize-image" element={<ImageResizer />} />
          <Route path="/compress-image" element={<ImageCompressor />} />

          {/* Fallback/Legacy Route */}
          <Route path="/convert/:conversion" element={<Converter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
