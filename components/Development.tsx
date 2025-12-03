'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from './LanguageProvider';

const Development = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, dictionary } = useLanguage();

  const cardsConfig = dictionary?.development?.cards ?? [];

  const technologies = [
    {
      name: cardsConfig[0]?.title || '',
      description: cardsConfig[0]?.description || '',
      stack: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    },
    {
      name: cardsConfig[1]?.title || '',
      description: cardsConfig[1]?.description || '',
      stack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    },
    {
      name: cardsConfig[2]?.title || '',
      description: cardsConfig[2]?.description || '',
      stack: ['REST API', 'GraphQL', 'Microservices', 'Docker'],
    },
    {
      name: cardsConfig[3]?.title || '',
      description: cardsConfig[3]?.description || '',
      stack: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    },
  ];

  return (
    <section
      id="development"
      ref={ref}
      className="min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 relative z-10 grain-texture grain-brown-gradient"
      style={{
        background: 'linear-gradient(180deg, #3D2817 0%, #4A3428 20%, #5C4033 50%, #4A3428 80%, #4A3428 100%)',
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
            {t('development.title')}
          </h2>
          <p className="text-xl text-[#F5F5DC] max-w-3xl mx-auto">
            {t('development.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF8F3] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#5C4033]/20 grain-texture grain-beige-card relative"
            >
              <h3 className="text-2xl font-bold text-[#3D2817] mb-3 relative z-10">
                {tech.name}
              </h3>
              <p className="text-[#5C4033] mb-6 leading-relaxed relative z-10">
                {tech.description}
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {tech.stack.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-4 py-2 bg-[#5C4033] text-[#F5F5DC] rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Development;

