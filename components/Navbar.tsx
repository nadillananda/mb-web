'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
      setShowNavbar(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.infrastructure'), href: '#infrastructure' },
    { name: t('nav.development'), href: '#development' },
    { name: t('nav.systemEngineering'), href: '#system-engineering' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#3D2817]/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      } ${showNavbar ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}
      aria-hidden={!showNavbar}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 flex items-center"
          >
            <Image
              src="/mb-logo-transparent.png"
              alt="Mitra Bisnis logo"
              width={40}
              height={40}
              priority
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            />
            <span className="sr-only">Mitra Bisnis</span>
          </motion.div>

          {/* Desktop Centered Menu */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 justify-center">
            <div className="flex items-center space-x-8 px-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-[#F5F5DC] font-medium hover:text-[#D4C5A9] transition-colors duration-200 px-1 whitespace-nowrap"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Desktop Language Toggle (kept on the right) */}
          <div className="hidden md:flex items-center space-x-2 ml-4">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
              className={`w-8 h-8 flex items-center justify-center rounded-full border text-lg transition-colors duration-200 ${
                language === 'en'
                  ? 'bg-[#F5F5DC] text-[#3D2817] border-[#F5F5DC]'
                  : 'bg-transparent text-[#F5F5DC] border-[#F5F5DC]/60 hover:bg-[#F5F5DC]/10'
              }`}
            >
              🇺🇸
            </button>
            <button
              type="button"
              onClick={() => setLanguage('id')}
              aria-label="Switch to Bahasa Indonesia"
              className={`w-8 h-8 flex items-center justify-center rounded-full border text-lg transition-colors duration-200 ${
                language === 'id'
                  ? 'bg-[#F5F5DC] text-[#3D2817] border-[#F5F5DC]'
                  : 'bg-transparent text-[#F5F5DC] border-[#F5F5DC]/60 hover:bg-[#F5F5DC]/10'
              }`}
            >
              🇮🇩
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F5F5DC] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#3D2817]/95 backdrop-blur-md border-t border-[#5C4033]"
          >
            <div className="px-4 pt-3 pb-4 space-y-2">
              {/* Mobile language toggle */}
              <div className="flex justify-end mb-2 space-x-2">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                  className={`w-8 h-8 flex items-center justify-center rounded-full border text-lg transition-colors duration-200 ${
                    language === 'en'
                      ? 'bg-[#F5F5DC] text-[#3D2817] border-[#F5F5DC]'
                      : 'bg-transparent text-[#F5F5DC] border-[#F5F5DC]/60 hover:bg-[#F5F5DC]/10'
                  }`}
                >
                  🇺🇸
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('id')}
                  aria-label="Switch to Bahasa Indonesia"
                  className={`w-8 h-8 flex items-center justify-center rounded-full border text-lg transition-colors duration-200 ${
                    language === 'id'
                      ? 'bg-[#F5F5DC] text-[#3D2817] border-[#F5F5DC]'
                      : 'bg-transparent text-[#F5F5DC] border-[#F5F5DC]/60 hover:bg-[#F5F5DC]/10'
                  }`}
                >
                  🇮🇩
                </button>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-[#F5F5DC] font-medium hover:bg-[#5C4033]/30 rounded-md transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

