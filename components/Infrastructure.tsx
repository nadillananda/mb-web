'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Infrastructure = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      title: 'Cloud Infrastructure',
      description:
        'Scalable and secure cloud solutions tailored to your business needs.',
      icon: '☁️',
    },
    {
      title: 'Network Solutions',
      description:
        'Robust network architecture design and implementation for optimal performance.',
      icon: '🌐',
    },
    {
      title: 'Data Centers',
      description:
        'Enterprise-grade data center solutions with high availability and redundancy.',
      icon: '🏢',
    },
    {
      title: 'Security Systems',
      description:
        'Comprehensive security infrastructure to protect your digital assets.',
      icon: '🔒',
    },
  ];

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
      className="min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-[#2F1B12]"
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8dcc8] mb-4">
            Infrastructure
          </h2>
          <p className="text-xl text-[#e8dcc8] max-w-3xl mx-auto">
            Building robust and scalable IT infrastructure that forms the
            foundation of your business success.
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
              className="bg-gradient-to-br from-[#fefaf3] to-[#f4ede1] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e3d5bd]"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[#4a3b2a] mb-3">
                {service.title}
              </h3>
              <p className="text-[#5c4a32] leading-relaxed">
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

