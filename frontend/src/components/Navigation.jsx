import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = ({ lang, setLang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#manifesto', label: t('nav.manifesto') },
    { href: '#products', label: t('nav.products') },
    { href: '#specs', label: t('nav.specs') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
        data-testid="navigation"
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="font-italiana text-xl md:text-2xl tracking-[0.3em] text-[#E5E5E5] hover:text-white transition-colors"
              data-testid="nav-logo"
            >
              MAGNA
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/70 hover:text-white transition-colors duration-300"
                  data-testid={`nav-${item.href.slice(1)}`}
                >
                  {item.label}
                </a>
              ))}

              {/* Language Selector */}
              <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-6">
                <Globe className="w-4 h-4 text-[#E5E5E5]/50" />
                <button
                  onClick={() => setLang('es')}
                  className={`text-xs uppercase tracking-widest transition-colors ${
                    lang === 'es' ? 'text-white' : 'text-[#E5E5E5]/50 hover:text-[#E5E5E5]'
                  }`}
                  data-testid="lang-es"
                >
                  ES
                </button>
                <span className="text-[#E5E5E5]/30">/</span>
                <button
                  onClick={() => setLang('pt')}
                  className={`text-xs uppercase tracking-widest transition-colors ${
                    lang === 'pt' ? 'text-white' : 'text-[#E5E5E5]/50 hover:text-[#E5E5E5]'
                  }`}
                  data-testid="lang-pt"
                >
                  PT
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#E5E5E5]"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden pt-20"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg uppercase tracking-[0.3em] text-[#E5E5E5] hover:text-white transition-colors"
                  data-testid={`mobile-nav-${item.href.slice(1)}`}
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Mobile Language Selector */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/20">
                <button
                  onClick={() => {
                    setLang('es');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-sm uppercase tracking-widest px-4 py-2 border transition-all ${
                    lang === 'es'
                      ? 'border-white text-white'
                      : 'border-white/30 text-[#E5E5E5]/50'
                  }`}
                  data-testid="mobile-lang-es"
                >
                  Español
                </button>
                <button
                  onClick={() => {
                    setLang('pt');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-sm uppercase tracking-widest px-4 py-2 border transition-all ${
                    lang === 'pt'
                      ? 'border-white text-white'
                      : 'border-white/30 text-[#E5E5E5]/50'
                  }`}
                  data-testid="mobile-lang-pt"
                >
                  Português
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
