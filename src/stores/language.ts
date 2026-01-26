import { persistentAtom } from '@nanostores/persistent';
import { computed } from 'nanostores';

// Tipos - Idiomas soportados
export type Lang = 'es' | 'en' | 'pt' | 'zh' | 'ar';

// Lista de idiomas con metadata
export const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'zh', label: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' }
] as const;

// Traducciones
const translations: Record<Lang, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre nosotros',
    'nav.contact': 'Contacto',
    'skip': 'Omitir Intro',
    'menu.open': 'Abrir menú',
    'menu.close': 'Cerrar menú',
    'lang.select': 'Idioma',
    // Features
    'features.chat.title': 'Chat',
    'features.chat.description': 'Comunicación segura, instantánea e inteligente.',
    'features.streaming.title': 'Streaming',
    'features.streaming.description': 'Contenido en vivo de alta calidad sin interrupciones.',
    'features.gaming.title': 'Gaming',
    'features.gaming.description': 'Experiencias inmersivas y juegos colaborativos.'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.contact': 'Contact',
    'skip': 'Skip Intro',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'lang.select': 'Language',
    // Features
    'features.chat.title': 'Chat',
    'features.chat.description': 'Secure, instant, and intelligent communication.',
    'features.streaming.title': 'Streaming',
    'features.streaming.description': 'High-quality live content without interruptions.',
    'features.gaming.title': 'Gaming',
    'features.gaming.description': 'Immersive experiences and collaborative games.'
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre nós',
    'nav.contact': 'Contato',
    'skip': 'Pular Intro',
    'menu.open': 'Abrir menu',
    'menu.close': 'Fechar menu',
    'lang.select': 'Idioma',
    // Features
    'features.chat.title': 'Chat',
    'features.chat.description': 'Comunicação segura, instantânea e inteligente.',
    'features.streaming.title': 'Streaming',
    'features.streaming.description': 'Conteúdo ao vivo de alta qualidade sem interrupções.',
    'features.gaming.title': 'Gaming',
    'features.gaming.description': 'Experiências imersivas e jogos colaborativos.'
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'skip': '跳过介绍',
    'menu.open': '打开菜单',
    'menu.close': '关闭菜单',
    'lang.select': '语言',
    // Features
    'features.chat.title': '聊天',
    'features.chat.description': '安全、即时、智能的通讯。',
    'features.streaming.title': '流媒体',
    'features.streaming.description': '高质量无中断的直播内容。',
    'features.gaming.title': '游戏',
    'features.gaming.description': '沉浸式体验和协作游戏。'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'skip': 'تخطي المقدمة',
    'menu.open': 'فتح القائمة',
    'menu.close': 'إغلاق القائمة',
    'lang.select': 'اللغة',
    // Features
    'features.chat.title': 'الدردشة',
    'features.chat.description': 'تواصل آمن وفوري وذكي.',
    'features.streaming.title': 'البث المباشر',
    'features.streaming.description': 'محتوى مباشر عالي الجودة بدون انقطاع.',
    'features.gaming.title': 'الألعاب',
    'features.gaming.description': 'تجارب غامرة وألعاب تعاونية.'
  }
};

type TranslationKey = keyof typeof translations.es;

// Validar si es un idioma soportado
const isValidLang = (lang: string): lang is Lang => {
  return ['es', 'en', 'pt', 'zh', 'ar'].includes(lang);
};

// Detectar idioma del navegador
const detectBrowserLang = (): Lang => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.languages?.[0] || navigator.language || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  if (langCode === 'es') return 'es';
  if (langCode === 'pt') return 'pt';
  if (langCode === 'zh') return 'zh';
  if (langCode === 'ar') return 'ar';
  return 'en';
};

// Store persistente para el idioma
export const $lang = persistentAtom<Lang>('lang', detectBrowserLang(), {
  encode: (value) => value,
  decode: (value) => (isValidLang(value) ? value : 'en')
});

// Función para obtener traducción
export const t = (key: string): string => {
  const lang = $lang.get();
  return translations[lang][key] || translations.en[key] || key;
};

// Computed store para las traducciones actuales
export const $translations = computed($lang, (lang) => translations[lang]);

// Obtener info del idioma actual
export const getCurrentLanguage = () => {
  const lang = $lang.get();
  return languages.find(l => l.code === lang) || languages[0];
};

// Acciones
export const setLanguage = (lang: Lang): void => {
  if (isValidLang(lang)) {
    $lang.set(lang);
    // Actualizar atributo lang del documento
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      // Actualizar dirección del texto para árabe
      const langInfo = languages.find(l => l.code === lang);
      document.documentElement.dir = langInfo?.dir || 'ltr';
    }
  }
};

// Inicialización (actualiza el DOM cuando el store cambia)
if (typeof window !== 'undefined') {
  // Suscribirse a cambios del idioma
  $lang.subscribe((lang) => {
    // Actualizar lang y dir del documento
    document.documentElement.lang = lang;
    const langInfo = languages.find(l => l.code === lang);
    document.documentElement.dir = langInfo?.dir || 'ltr';
    
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Actualizar opciones de idioma seleccionadas
    document.querySelectorAll<HTMLElement>('[data-lang]').forEach((el) => {
      const elLang = el.getAttribute('data-lang');
      const isActive = elLang === lang;
      el.setAttribute('aria-selected', String(isActive));
    });

    // Emitir evento personalizado
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  });
}
