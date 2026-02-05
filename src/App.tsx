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
import { PdfSplitter } from './pages/PdfSplitter'
import { Layout } from './components/layout/Layout'
import { AllTools } from './pages/AllTools'

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

          {/* SEO Routes */}
          <Route path="/heic-to-jpg" element={<Converter />} />
          <Route path="/heic-to-png" element={<Converter />} />
          <Route path="/heic-to-pdf" element={<Converter />} />
          <Route path="/webp-to-jpg" element={<Converter />} />
          <Route path="/png-to-pdf" element={<Converter />} />
          <Route path="/image-to-pdf" element={<Converter />} />

          {/* WebP Tools */}
          <Route path="/jpg-to-webp" element={<Converter />} />
          <Route path="/png-to-webp" element={<Converter />} />

          {/* PDF Tools */}
          <Route path="/merge-pdf" element={<Merge />} />
          <Route path="/split-pdf" element={<PdfSplitter />} />



          {/* Data Tools */}
          <Route path="/json-to-csv" element={<JsonConverter />} />
          <Route path="/csv-to-json" element={<JsonConverter />} />
          <Route path="/data-tools" element={<DataConverter />} />

          {/* Image Tools */}
          <Route path="/resize-image" element={<ImageResizer />} />

          {/* Fallback/Legacy Route */}
          <Route path="/convert/:conversion" element={<Converter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
