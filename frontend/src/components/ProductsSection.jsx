import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ProductsSection = ({ t }) => {
  const products = [
    {
      id: 'magna1200',
      image: 'https://images.unsplash.com/photo-1574801439983-71705fb11bc9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBzdGFpbmxlc3MlMjBzdGVlbCUyMGdhcyUyMHJhbmdlJTIwb3ZlbiUyMGRldGFpbHxlbnwwfHx8fDE3NzMzMjE3NDJ8MA&ixlib=rb-4.1.0&q=85',
      specs: {
        width: '120 cm',
        burners: '6',
        ovens: '2',
      },
    },
    {
      id: 'magna900',
      image: 'https://images.unsplash.com/photo-1597221829180-416a158a205b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdGFpbmxlc3MlMjBzdGVlbCUyMGdhcyUyMHJhbmdlJTIwb3ZlbiUyMGRldGFpbHxlbnwwfHx8fDE3NzMzMjE3NDJ8MA&ixlib=rb-4.1.0&q=85',
      specs: {
        width: '87 cm',
        burners: '6',
        ovens: '1',
      },
    },
  ];

  const scrollToSpecs = () => {
    const element = document.querySelector('#specs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="products"
      className="relative py-24 md:py-32 bg-[#0A0A0A]"
      data-testid="products-section"
    >
      {/* Section Header */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-[#E5E5E5]/50 mb-4 block">
            {t('products.title')}
          </span>
          <h2
            className="font-italiana text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] text-[#F5F5F5]"
            data-testid="products-title"
          >
            {t('products.subtitle')}
          </h2>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {products.map((product, index) => {
            const productData = t(`products.${product.id}`);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
                data-testid={`product-${product.id}`}
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#121212] border border-white/5 mb-8">
                  <img
                    src={product.image}
                    alt={productData.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Quick Specs */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                    <div className="flex gap-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-white/50 block">Ancho</span>
                        <span className="font-mono text-sm text-white">{product.specs.width}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-white/50 block">Quemadores</span>
                        <span className="font-mono text-sm text-white">{product.specs.burners}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-white/50 block">Hornos</span>
                        <span className="font-mono text-sm text-white">{product.specs.ovens}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <h3
                    className="font-italiana text-3xl md:text-4xl tracking-[0.2em] text-[#F5F5F5]"
                    data-testid={`product-name-${product.id}`}
                  >
                    {productData.name}
                  </h3>
                  <p className="font-manrope text-[#E5E5E5]/70 text-base md:text-lg leading-relaxed font-light">
                    {productData.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 pt-4">
                    {productData.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-[#E5E5E5]/80"
                      >
                        <Check className="w-4 h-4 mt-1 text-[#E5E5E5]/50 flex-shrink-0" />
                        <span className="font-manrope text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={scrollToSpecs}
                    className="mt-6 border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#E5E5E5] hover:border-white hover:bg-white/5 transition-all duration-300"
                    data-testid={`product-cta-${product.id}`}
                  >
                    {t('products.cta')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default ProductsSection;
