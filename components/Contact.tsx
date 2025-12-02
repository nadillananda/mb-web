'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New inquiry from ${formData.name || 'Prospective Client'}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:support@mitrabisnis.net?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Google Maps embed URL for Stadion Wibawa Mukti, Cikarang, Indonesia
  // Coordinates: -6.301944, 107.150833

  return (
    <section
      id="contact"
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
            Contact Us
          </h2>
          <p className="text-xl text-[#e8dcc8] max-w-3xl mx-auto">
            Get in touch with us to discuss how we can help transform your
            business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-[#fffaf3] p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#2F1B12] mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#5c4a32] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#d6c4a6] rounded-lg focus:ring-2 focus:ring-[#7a5230] focus:border-transparent outline-none transition-all bg-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#5c4a32] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#d6c4a6] rounded-lg focus:ring-2 focus:ring-[#7a5230] focus:border-transparent outline-none transition-all bg-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#5c4a32] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#d6c4a6] rounded-lg focus:ring-2 focus:ring-[#7a5230] focus:border-transparent outline-none transition-all resize-none bg-white"
                  placeholder="Your Message"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-[#7a5230] text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-[#8c6139] transition-colors duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-[#fffaf3] p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#4a3b2a] mb-6">
                Visit Us
              </h3>
              <div className="space-y-4 text-[#5c4a32]">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>Mitra Bisnis</p>
                    <p>Cikarang Timur, Kab. Bekasi, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>support@mitrabisnis.net</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+62 819-0680-4988</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-[#fffaf3] p-4 rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.523456789!2d107.150833!3d-6.301944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sStadion%20Wibawa%20Mukti%2C%20Cikarang%20Barat%2C%20Cikarang%2C%20Bekasi%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mitra Bisnis Perkasa Location - Stadion Wibawa Mukti, Cikarang, Indonesia"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

