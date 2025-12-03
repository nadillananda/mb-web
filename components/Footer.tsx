'use client';

import { useLanguage } from './LanguageProvider';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const text = t('footer.powered').replace('{{year}}', String(year));

  return (
    <footer className="relative z-10 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-[#F5F5DC] text-xs opacity-75">{text}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

