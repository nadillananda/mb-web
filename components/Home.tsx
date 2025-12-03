'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from './LanguageProvider';

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  const heroBackground =
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80';

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 grain-texture grain-warm-brown"
      style={{
        backgroundImage: `linear-gradient(rgba(47, 27, 18, 0.65), rgba(61, 40, 23, 0.60), rgba(47, 27, 18, 0.65)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F1B12]/60 via-[#3D2817]/50 to-[#2F1B12]/55 pointer-events-none z-0" />
      <div className="relative max-w-5xl mx-auto text-center text-white px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F5F5DC] mb-6 sm:mb-8 drop-shadow-2xl tracking-tight leading-tight"
            style={{
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('home.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-[#F5F5DC] mb-4 sm:mb-6 max-w-3xl mx-auto px-2 sm:px-4 font-semibold leading-relaxed"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.4)',
            }}
          >
            {t('home.headline')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base lg:text-lg text-[#E8E0D0] mb-8 sm:mb-10 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {t('home.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .querySelector('#infrastructure')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-[#F5F5DC] border-2 border-[#F5F5DC] rounded-lg font-bold text-base sm:text-lg hover:bg-[#F5F5DC]/15 hover:border-[#E8E0D0] transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {t('home.learnMore')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;

