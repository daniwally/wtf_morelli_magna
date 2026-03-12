import { useState, useCallback } from 'react';
import { Toaster } from './components/ui/sonner';
import { translations } from './translations';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ManifestoSection from './components/ManifestoSection';
import ProductsSection from './components/ProductsSection';
import SpecsSection from './components/SpecsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [lang, setLang] = useState('es');

  // Translation helper
  const t = useCallback((path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      result = result?.[key];
    }
    return result || path;
  }, [lang]);

  return (
    <div className="App bg-[#050505] min-h-screen" data-testid="app-container">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation lang={lang} setLang={setLang} t={t} />

      {/* Main Content */}
      <main>
        <HeroSection t={t} />
        <ManifestoSection t={t} />
        <ProductsSection t={t} />
        <SpecsSection t={t} />
        <GallerySection t={t} />
        <ContactSection t={t} lang={lang} />
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#121212',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F5F5F5',
          },
        }}
      />
    </div>
  );
}

export default App;
