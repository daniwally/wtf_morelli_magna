import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const SpecsSection = ({ t }) => {
  const specData = {
    magna1200: {
      dimensions: [
        { label: t('specs.items.width'), value: '120 cm' },
        { label: t('specs.items.depth'), value: '65 cm' },
        { label: t('specs.items.height'), value: '85 cm' },
      ],
      power: [
        { label: 'Triple Llama', value: '2.86 kW' },
        { label: 'Doble Llama', value: '4.07 kW' },
        { label: 'Horno Gas', value: '3.81 kW' },
        { label: 'Horno Eléctrico', value: '2850 W' },
        { label: 'Grill', value: '1500 W' },
      ],
      materials: [
        { label: t('specs.items.material'), value: 'Quirúrgico 304' },
        { label: t('specs.items.burnerType'), value: 'Profesional' },
        { label: t('specs.items.grates'), value: 'Trempes' },
        { label: t('specs.items.coating'), value: 'Azul' },
      ],
      features: [
        { label: t('specs.items.ovenCapacity'), value: '62L + 54L' },
        { label: t('specs.items.maxTemp'), value: '350°C' },
        { label: t('specs.items.ignition'), value: 'Sí' },
        { label: t('specs.items.safetyValve'), value: 'Sí' },
        { label: t('specs.items.gasType'), value: 'Sí' },
      ],
    },
    magna900: {
      dimensions: [
        { label: t('specs.items.width'), value: '87 cm' },
        { label: t('specs.items.depth'), value: '65 cm' },
        { label: t('specs.items.height'), value: '85 cm' },
      ],
      power: [
        { label: 'Triple Llama', value: '2.86 kW' },
        { label: 'Doble Llama', value: '4.07 kW' },
        { label: 'Horno Gas', value: '3.81 kW' },
        { label: 'Grill', value: '1500 W' },
      ],
      materials: [
        { label: t('specs.items.material'), value: 'Quirúrgico 304' },
        { label: t('specs.items.burnerType'), value: 'Profesional' },
        { label: t('specs.items.grates'), value: 'Trempes' },
        { label: t('specs.items.coating'), value: 'Azul' },
      ],
      features: [
        { label: t('specs.items.ovenCapacity'), value: '97 L' },
        { label: t('specs.items.maxTemp'), value: '350°C' },
        { label: t('specs.items.ignition'), value: 'Sí' },
        { label: t('specs.items.safetyValve'), value: 'Sí' },
        { label: t('specs.items.gasType'), value: 'Sí' },
      ],
    },
  };

  const categories = [
    { key: 'dimensions', label: t('specs.categories.dimensions') },
    { key: 'power', label: t('specs.categories.power') },
    { key: 'materials', label: t('specs.categories.materials') },
    { key: 'features', label: t('specs.categories.features') },
  ];

  return (
    <section
      id="specs"
      className="relative py-24 md:py-32 bg-[#050505]"
      data-testid="specs-section"
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
          <span className="text-xs uppercase tracking-[0.4em] text-[#E5E5E5]/50 mb-4 block">
            {t('specs.subtitle')}
          </span>
          <h2
            className="font-italiana text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] text-[#F5F5F5]"
            data-testid="specs-title"
          >
            {t('specs.title')}
          </h2>
        </motion.div>
      </div>

      {/* Specs Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Tabs defaultValue="magna1200" className="w-full">
          <TabsList className="w-full bg-transparent border border-white/10 p-1 mb-12 grid grid-cols-2 h-auto">
            <TabsTrigger
              value="magna1200"
              className="py-4 text-xs uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-black rounded-none transition-all"
              data-testid="specs-tab-magna1200"
            >
              MAGNA 1200
            </TabsTrigger>
            <TabsTrigger
              value="magna900"
              className="py-4 text-xs uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-black rounded-none transition-all"
              data-testid="specs-tab-magna900"
            >
              MAGNA 900
            </TabsTrigger>
          </TabsList>

          {Object.entries(specData).map(([product, specs]) => (
            <TabsContent key={product} value={product} className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {categories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="bg-[#0A0A0A] border border-white/5 p-6 md:p-8 hover:border-white/20 transition-colors"
                    data-testid={`specs-${product}-${category.key}`}
                  >
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#E5E5E5]/50 mb-6 pb-4 border-b border-white/10">
                      {category.label}
                    </h3>
                    <div className="space-y-4">
                      {specs[category.key].map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex justify-between items-center"
                        >
                          <span className="font-manrope text-sm text-[#E5E5E5]/70">
                            {item.label}
                          </span>
                          <span className="font-mono text-sm text-[#F5F5F5]">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default SpecsSection;
