import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ t }) => {
  const scrollToManifesto = () => {
    const element = document.querySelector('#manifesto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
      data-testid="hero-section"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="https://customer-assets.emergentagent.com/job_magna-premium/artifacts/p0o9wuia_Product_Photography_Argentina_z0NP2wLb.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-32 md:pt-40 px-6">
        {/* Morelli Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-[#E5E5E5]/60 font-manrope">
            Morelli
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-italiana text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] tracking-[0.2em] text-[#F5F5F5] mb-6 text-center"
          data-testid="hero-title"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-xl md:text-2xl uppercase tracking-[0.5em] text-[#E5E5E5]/90 mb-12 text-center font-light"
          data-testid="hero-subtitle"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToManifesto}
          className="absolute bottom-24 border border-white/70 bg-transparent text-white px-10 py-4 text-xs uppercase tracking-[0.3em] font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          data-testid="hero-cta"
        >
          {t('hero.cta')}
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToManifesto}
        data-testid="scroll-indicator"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5E5E5]/50">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#E5E5E5]/50" />
        </motion.div>
      </motion.div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent to-white/10" />
    </section>
  );
};

export default HeroSection;
