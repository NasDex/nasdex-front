/** @format */

import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import cn from './locales/zh-CN.json'
import en from './locales/en.json'
const resources = {
  en: {
    // translation: 'http://localhost:3000/locales/en-us.json',
    translation: en,
  },
  'en-US': {
    // translation: 'http://localhost:3000/locales/en-us.json',
    translation: en,
  },
  'zh-CN': {
    // translation: 'http://localhost:3000/locales/zh-cn.json',
    translation: cn,
  },
  zh: {
    translation: cn,
  },
}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      // caches: ['localStorage', 'sessionStorage', 'cookie'],
      caches: ['localStorage'],
    },
  })

export default i18n
