import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = ({ t, lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product_interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value) => {
    setFormData((prev) => ({ ...prev, product_interest: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, {
        ...formData,
        language: lang,
      });

      toast.success(t('contact.form.success'), {
        description: t('contact.form.successMessage'),
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        product_interest: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(t('contact.form.error'), {
        description: t('contact.form.errorMessage'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const productOptions = [
    { value: 'MAGNA 1200', label: t('contact.products.magna1200') },
    { value: 'MAGNA 900', label: t('contact.products.magna900') },
    { value: 'Ambos', label: t('contact.products.both') },
    { value: 'No decidido', label: t('contact.products.undecided') },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#0A0A0A]"
      data-testid="contact-section"
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
            {t('contact.subtitle')}
          </span>
          <h2
            className="font-italiana text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] text-[#F5F5F5]"
            data-testid="contact-title"
          >
            {t('contact.title')}
          </h2>
        </motion.div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="space-y-8"
          data-testid="contact-form"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 block">
              {t('contact.form.name')}
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-white placeholder:text-white/30 focus:border-white focus:ring-0 transition-all"
              data-testid="contact-name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 block">
              {t('contact.form.email')}
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-white placeholder:text-white/30 focus:border-white focus:ring-0 transition-all"
              data-testid="contact-email"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 block">
              {t('contact.form.phone')}
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-white placeholder:text-white/30 focus:border-white focus:ring-0 transition-all"
              data-testid="contact-phone"
            />
          </div>

          {/* Product Interest */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 block">
              {t('contact.form.product')}
            </label>
            <Select value={formData.product_interest} onValueChange={handleProductChange}>
              <SelectTrigger 
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-white focus:ring-0 h-auto"
                data-testid="contact-product-select"
              >
                <SelectValue placeholder={t('contact.form.selectProduct')} />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/10">
                {productOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                    data-testid={`contact-product-${option.value}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 block">
              {t('contact.form.message')}
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.form.messagePlaceholder')}
              rows={4}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-white placeholder:text-white/30 focus:border-white focus:ring-0 transition-all resize-none"
              data-testid="contact-message"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-[#E5E5E5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-12"
            data-testid="contact-submit"
          >
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </motion.button>
        </motion.form>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default ContactSection;
