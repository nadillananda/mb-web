'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from './LanguageProvider';

const Infrastructure = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, dictionary } = useLanguage();

  const services = (dictionary?.infrastructure?.cards ?? []).map((card, index) => {
    const icons = ['☁️', '🌐', '🏢', '🔒'];
    return {
      ...card,
      icon: icons[index] ?? '☁️',
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="infrastructure"
      ref={ref}
      className="min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 relative z-10 grain-texture grain-dark-brown"
      style={{
        background: 'linear-gradient(180deg, #5C4033 0%, #4A3428 20%, #3D2817 50%, #4A3428 80%, #3D2817 100%)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F5F5DC] mb-4">
            {t('infrastructure.title')}
          </h2>
          <p className="text-xl text-[#F5F5DC] max-w-3xl mx-auto">
            {t('infrastructure.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-[#FAF8F3] to-[#E8E0D0] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#5C4033]/20 grain-texture grain-beige-card relative"
            >
              <div className="text-5xl mb-4 relative z-10">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[#3D2817] mb-3 relative z-10">
                {service.title}
              </h3>
              <p className="text-[#5C4033] leading-relaxed relative z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Infrastructure;

