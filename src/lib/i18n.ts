import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import ptTranslations from './locales/pt.json';
import ptBRTranslations from './locales/pt-BR.json';
import jaTranslations from './locales/ja.json';
import zhTranslations from './locales/zh.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import ruTranslations from './locales/ru.json';
import nlTranslations from './locales/nl.json';
import koTranslations from './locales/ko.json';
import arTranslations from './locales/ar.json';
import trTranslations from './locales/tr.json';
import plTranslations from './locales/pl.json';
import svTranslations from './locales/sv.json';
import noTranslations from './locales/no.json';
import fiTranslations from './locales/fi.json';
import csTranslations from './locales/cs.json';
import huTranslations from './locales/hu.json';
import viTranslations from './locales/vi.json';

// Configure i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Available languages (20 total)
    supportedLngs: [
      'en',
      'fr',
      'es',
      'pt',
      'pt-BR',
      'ja',
      'zh',
      'de',
      'it',
      'ru',
      'nl',
      'ko',
      'ar',
      'tr',
      'pl',
      'sv',
      'no',
      'fi',
      'cs',
      'hu',
      'vi',
    ],

    // Default language
    fallbackLng: 'en',

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // Debug mode (disable in production)
    debug: false,

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Translation resources
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      es: {
        translation: esTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
      'pt-BR': {
        translation: ptBRTranslations,
      },
      ja: {
        translation: jaTranslations,
      },
      zh: {
        translation: zhTranslations,
      },
      de: {
        translation: deTranslations,
      },
      it: {
        translation: itTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
      nl: {
        translation: nlTranslations,
      },
      ko: {
        translation: koTranslations,
      },
      ar: {
        translation: arTranslations,
      },
      tr: {
        translation: trTranslations,
      },
      pl: {
        translation: plTranslations,
      },
      sv: {
        translation: svTranslations,
      },
      no: {
        translation: noTranslations,
      },
      fi: {
        translation: fiTranslations,
      },
      cs: {
        translation: csTranslations,
      },
      hu: {
        translation: huTranslations,
      },
      vi: {
        translation: viTranslations,
      },
    },

    // React integration
    react: {
      useSuspense: false, // Disable Suspense for better error handling
    },
  });

export default i18n;
