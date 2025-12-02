'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Development = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const technologies = [
    {
      name: 'Web Development',
      description:
        'Modern, responsive web applications built with the latest technologies.',
      stack: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    },
    {
      name: 'Mobile Development',
      description:
        'Native and cross-platform mobile applications for iOS and Android.',
      stack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    },
    {
      name: 'API Development',
      description:
        'RESTful and GraphQL APIs designed for scalability and performance.',
      stack: ['REST API', 'GraphQL', 'Microservices', 'Docker'],
    },
    {
      name: 'Database Solutions',
      description:
        'Efficient database design and optimization for your applications.',
      stack: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    },
  ];

  return (
    <section
      id="development"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2F1B12] to-[#2F1B12]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8dcc8] mb-4">
            Development
          </h2>
          <p className="text-xl text-[#e8dcc8] max-w-3xl mx-auto">
            Custom software development solutions that drive innovation and
            efficiency.
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
              className="bg-[#fffaf3] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#e3d5bd]"
            >
              <h3 className="text-2xl font-bold text-[#4a3b2a] mb-3">
                {tech.name}
              </h3>
              <p className="text-[#5c4a32] mb-6 leading-relaxed">
                {tech.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tech.stack.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-4 py-2 bg-[#7a5230] text-white rounded-full text-sm font-medium"
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

