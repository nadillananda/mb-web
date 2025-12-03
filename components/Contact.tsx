'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Error sending email:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Google Maps embed URL for IZAURA KAB BEKASI, Cikarang, Indonesia

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 relative z-10 grain-texture grain-dark-brown"
      style={{
        background: 'linear-gradient(180deg, #3D2817 0%, #2F1B12 20%, #3D2817 50%, #2F1B12 80%, #2F1B12 100%)',
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
            {t('contact.title')}
          </h2>
          <p className="text-xl text-[#F5F5DC] max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF8F3] p-8 rounded-xl shadow-lg grain-texture grain-beige-card relative"
          >
            <h3 className="text-2xl font-bold text-[#3D2817] mb-6 relative z-10">
              {t('contact.formTitle')}
            </h3>
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg relative z-10">
                <p className="font-medium">{t('contact.success')}</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg relative z-10">
                <p className="font-medium">{t('contact.error')}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#3D2817] mb-2"
                >
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#5C4033] rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:border-transparent outline-none transition-all bg-[#FAF8F3] text-[#3D2817]"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#3D2817] mb-2"
                >
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#5C4033] rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:border-transparent outline-none transition-all bg-[#FAF8F3] text-[#3D2817]"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#3D2817] mb-2"
                >
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#5C4033] rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:border-transparent outline-none transition-all resize-none bg-[#FAF8F3] text-[#3D2817]"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                className="w-full px-8 py-4 bg-[#5C4033] text-[#F5F5DC] rounded-lg font-semibold text-lg shadow-lg hover:bg-[#3D2817] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.submitting') : t('contact.submit')}
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
            <div className="bg-[#FAF8F3] p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#3D2817] mb-6 relative z-10">
                {t('contact.visitUsTitle')}
              </h3>
              <div className="space-y-4 text-[#3D2817] relative z-10">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <p className="font-semibold">{t('contact.locationLabel')}</p>
                    <p>{t('contact.locationName')}</p>
                    <p>{t('contact.locationAddress')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <p className="font-semibold">{t('contact.emailLabelStatic')}</p>
                    <p>support@mitrabisnis.net</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <p className="font-semibold">{t('contact.phoneLabel')}</p>
                    <p>+62 819-0680-4988</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps?q=IZAURA+KAB+BEKASI+Cikarang+Indonesia&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mitra Bisnis Location - IZAURA KAB BEKASI, Cikarang, Indonesia"
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

