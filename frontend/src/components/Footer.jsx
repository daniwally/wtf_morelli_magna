import { motion } from 'framer-motion';

const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 md:py-24 bg-[#050505] border-t border-white/5"
      data-testid="footer"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="font-italiana text-4xl md:text-5xl tracking-[0.3em] text-[#F5F5F5] mb-4"
              data-testid="footer-logo"
            >
              MAGNA
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] text-[#E5E5E5]/40 mb-8">
              by Morelli
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair italic text-lg md:text-xl text-[#E5E5E5]/60 mb-12 max-w-md"
            data-testid="footer-tagline"
          >
            {t('footer.tagline')}
          </motion.p>

          {/* Divider */}
          <div className="w-24 h-px bg-white/20 mb-12" />

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-8 mb-12"
          >
            <a
              href="#privacy"
              className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 hover:text-white transition-colors"
              data-testid="footer-privacy"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#terms"
              className="text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 hover:text-white transition-colors"
              data-testid="footer-terms"
            >
              {t('footer.terms')}
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs text-[#E5E5E5]/30"
            data-testid="footer-copyright"
          >
            © {currentYear} Morelli. {t('footer.rights')}
          </motion.p>
        </div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </footer>
  );
};

export default Footer;
