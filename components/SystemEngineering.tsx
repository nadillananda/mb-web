'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SystemEngineering = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      title: 'System Architecture',
      description:
        'Designing scalable and maintainable system architectures that grow with your business.',
      features: [
        'Microservices Architecture',
        'Event-Driven Systems',
        'Distributed Systems',
        'High Availability Design',
      ],
    },
    {
      title: 'DevOps & CI/CD',
      description:
        'Streamlining development workflows with automated pipelines and infrastructure as code.',
      features: [
        'Continuous Integration',
        'Continuous Deployment',
        'Infrastructure as Code',
        'Monitoring & Logging',
      ],
    },
    {
      title: 'Performance Optimization',
      description:
        'Enhancing system performance through optimization and best practices.',
      features: [
        'Load Testing',
        'Performance Tuning',
        'Caching Strategies',
        'Database Optimization',
      ],
    },
    {
      title: 'System Integration',
      description:
        'Seamlessly integrating disparate systems to create unified solutions.',
      features: [
        'API Integration',
        'Legacy System Integration',
        'Third-Party Services',
        'Data Synchronization',
      ],
    },
  ];

  return (
    <section
      id="system-engineering"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#2F1B12]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8dcc8] mb-4">
            System Engineering
          </h2>
          <p className="text-xl text-[#e8dcc8] max-w-3xl mx-auto">
            Comprehensive system engineering services to build, optimize, and
            maintain complex IT systems.
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
              className="bg-gradient-to-br from-[#e8dcc8] via-[#e8dcc8] to-[#e8dcc8] text-[#4a3b2a] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-[#2F1B12] mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-[#fdeedc]"
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

