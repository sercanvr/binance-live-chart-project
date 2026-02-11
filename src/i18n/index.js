/**
 * i18n Yapılandırması
 * ==================
 * Çoklu dil desteği (TR, EN, DE) için i18next yapılandırması.
 * Varsayılan dil: Türkçe (tr)
 * Desteklenen diller: Türkçe, İngilizce, Almanca
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './locales/tr.json';
import en from './locales/en.json';
import de from './locales/de.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      de: { translation: de },
    },
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;