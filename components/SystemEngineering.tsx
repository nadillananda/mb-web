'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from './LanguageProvider';

const SystemEngineering = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, dictionary } = useLanguage();

  const services = dictionary?.systemEngineering?.cards ?? [];

  return (
    <section
      id="system-engineering"
      ref={ref}
      className="min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 relative z-10 grain-texture grain-warm-brown"
      style={{
        background: 'linear-gradient(180deg, #4A3428 0%, #5C4033 20%, #3D2817 50%, #5C4033 80%, #3D2817 100%)',
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
            {t('systemEngineering.title')}
          </h2>
          <p className="text-xl text-[#F5F5DC] max-w-3xl mx-auto">
            {t('systemEngineering.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#FAF8F3] via-[#E8E0D0] to-[#FAF8F3] text-[#3D2817] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#5C4033]/20 grain-texture grain-beige-card relative"
            >
              <h3 className="text-2xl font-bold mb-3 text-[#3D2817] relative z-10">{service.title}</h3>
              <p className="text-[#5C4033] mb-6 leading-relaxed relative z-10">
                {service.description}
              </p>
              <ul className="space-y-2 relative z-10">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-[#5C4033]"
                  >
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemEngineering;

