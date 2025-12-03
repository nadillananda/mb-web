'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import en from '../i18n/en.json';
import id from '../i18n/id.json';

type LanguageCode = 'en' | 'id';

type Translations = typeof en;

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  toggleLanguage: () => void;
  t: (path: string) => string;
  dictionary: Translations;
};

const translations: Record<LanguageCode, Translations> = {
  en,
  id,
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'mb-language';

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return 'en';
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored === 'en' || stored === 'id') {
      return stored;
    }
  } catch {
    // ignore
  }

  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const t = useMemo(
    () =>
      (path: string): string => {
        const parts = path.split('.');
        let current: any = translations[language];

        for (const part of parts) {
          if (current && typeof current === 'object' && part in current) {
            current = current[part];
          } else {
            return path;
          }
        }

        return typeof current === 'string' ? current : path;
      },
    [language]
  );

  const currentDictionary = translations[language] ?? translations.en;

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    dictionary: currentDictionary,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};


