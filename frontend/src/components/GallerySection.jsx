import { motion } from 'framer-motion';

const GallerySection = ({ t }) => {
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1724232550308-ce862f34a5bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwY2hlZiUyMGNvb2tpbmclMjBnYXMlMjBzdG92ZSUyMGZpcmUlMjBjaW5lbWF0aWN8ZW58MHx8fHwxNzczMzIxNzU0fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Chef cooking on MAGNA',
      className: 'md:col-span-2 md:row-span-2',
    },
    {
      src: 'https://images.unsplash.com/photo-1771627278637-10eb2e9857b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBkYXJrJTIwa2l0Y2hlbiUyMGNpbmVtYXRpYyUyMGxpZ2h0aW5nfGVufDB8fHx8MTc3MzMyMTc0MXww&ixlib=rb-4.1.0&q=85',
      alt: 'Luxury dark kitchen',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1658825959612-8f4bce484393?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxzdGFpbmxlc3MlMjBzdGVlbCUyMGtpdGNoZW4lMjB0ZXh0dXJlJTIwY2xvc2UlMjB1cHxlbnwwfHx8fDE3NzMzMjE3NTR8MA&ixlib=rb-4.1.0&q=85',
      alt: 'Stainless steel detail',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      alt: 'Professional cooking',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      alt: 'Modern kitchen interior',
      className: 'md:col-span-2',
    },
  ];

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 bg-[#0A0A0A]"
      data-testid="gallery-section"
    >
      {/* Section Header */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2
            className="font-italiana text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] text-[#F5F5F5] mb-2"
            data-testid="gallery-title"
          >
            {t('gallery.title')}
          </h2>
          <span className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-[#E5E5E5]/80 block">
            {t('gallery.subtitle')}
          </span>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden group ${image.className}`}
              data-testid={`gallery-image-${index}`}
            >
              <div className="aspect-[4/3] w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              {/* Border on hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default GallerySection;
