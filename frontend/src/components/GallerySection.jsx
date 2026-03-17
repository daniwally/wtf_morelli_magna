import { motion } from 'framer-motion';

const GallerySection = ({ t }) => {
  const galleryImages = [
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/4q1oztdx_Product_Photography_Argentina_PFZvby25.png',
      alt: 'MAGNA Kitchen',
      className: '',
    },
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/szz6qoe2_Product_Photography_Argentina_6MI5DyGd.png',
      alt: 'MAGNA Detail',
      className: '',
    },
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/fic20law_Product_Photography_Argentina_yGUtxOW0.png',
      alt: 'MAGNA Cooking',
      className: '',
    },
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/ovu3kv81_Product_Photography_Argentina_LULpfrPk.png',
      alt: 'MAGNA Interior',
      className: '',
    },
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/1g15jpn5_Product_Photography_Argentina_I9EV2Ykc.png',
      alt: 'MAGNA Design',
      className: '',
    },
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/i4g5ttso_Product_Photography_Argentina_s3K2u0w5.png',
      alt: 'MAGNA Lifestyle',
      className: '',
    },
    {
      src: 'https://customer-assets.emergentagent.com/job_magna-premium/artifacts/chpjpf5e_Product_Photography_Argentina_7L3du-cG.png',
      alt: 'MAGNA Premium',
      className: 'md:col-start-2',
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
            className="font-playfair italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] mb-6"
            data-testid="gallery-title"
          >
            {t('gallery.subtitle')}
          </h2>
          <span className="text-sm md:text-base uppercase tracking-[0.4em] text-[#E5E5E5]/50 block">
            {t('gallery.title')}
          </span>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
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
