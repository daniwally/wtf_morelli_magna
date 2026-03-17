import { motion } from 'framer-motion';

const ManifestoSection = ({ t }) => {
  const manifestoContent = t('manifesto.content');

  return (
    <section
      id="manifesto"
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden"
      data-testid="manifesto-section"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-playfair italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-[#F5F5F5] leading-tight mb-16 md:mb-24 whitespace-nowrap"
          data-testid="manifesto-title"
        >
          {t('manifesto.title')}
        </motion.h2>

        {/* Manifesto Content */}
        <div className="space-y-4 md:space-y-6">
          {manifestoContent.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="font-manrope text-base sm:text-lg md:text-xl text-[#E5E5E5]/80 leading-snug text-center font-extralight"
              data-testid={`manifesto-paragraph-${index}`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="w-16 h-px bg-white/30 mx-auto mb-6" />
          <p
            className="font-italiana text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase text-[#E5E5E5]/60"
            data-testid="manifesto-tagline"
          >
            {t('manifesto.tagline')}
          </p>
        </motion.div>
      </div>

      {/* Side Decorations */}
      <div className="hidden md:block absolute top-1/2 left-8 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="hidden md:block absolute top-1/2 right-8 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default ManifestoSection;
