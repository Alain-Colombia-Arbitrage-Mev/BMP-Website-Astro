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
    'menu.selectLanguage': 'Seleccionar idioma',
    'lang.select': 'Idioma',
    // Features
    'features.community.title': 'Comunidad',
    'features.community.description': 'Conecta con personas afines a ti.',
    'features.community.cta': 'Únete a la\ncomunidad',
    'features.mentalHealth.title': 'Salud Mental',
    'features.mentalHealth.description': 'Bienestar emocional con apoyo inteligente.',
    'features.mentalHealth.cta': 'Cuida tu\nsalud mental',
    'features.finance.title': 'A.I. Finanzas',
    'features.finance.description': 'Gestión financiera inteligente y personalizada.',
    'features.finance.cta': 'Gestiona tus\nfinanzas',
    'features.wallet.title': 'Wallet',
    'features.wallet.description': 'Tu billetera digital segura y conectada.',
    'features.wallet.cta': 'Descubre tu\nnueva wallet',
    'features.chat.title': 'Chat',
    'features.chat.description': 'Comunicación segura, instantánea e inteligente.',
    'features.chat.cta': 'Conoce el\nnuevo chat',
    'features.streaming.title': 'Streaming',
    'features.streaming.description': 'Contenido en vivo de alta calidad sin interrupciones.',
    'features.streaming.cta': 'Descubre el\nnuevo streaming',
    'features.gaming.title': 'Gaming',
    'features.gaming.description': 'Experiencias inmersivas y juegos colaborativos.',
    'features.gaming.cta': 'Explora el\nnuevo gaming',
    'features.education.title': 'Educación',
    'features.education.description': 'Aprende y crece con contenido personalizado.',
    'features.education.cta': 'Aprende\ncon nosotros',
    'features.marketplace.title': 'Marketplace',
    'features.marketplace.description': 'Compra y vende de forma segura.',
    'features.marketplace.cta': 'Explora el\nmarketplace'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.contact': 'Contact',
    'skip': 'Skip Intro',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'menu.selectLanguage': 'Select language',
    'lang.select': 'Language',
    // Features
    'features.community.title': 'Community',
    'features.community.description': 'Connect with like-minded people.',
    'features.community.cta': 'Join the\ncommunity',
    'features.mentalHealth.title': 'Mental Health',
    'features.mentalHealth.description': 'Emotional wellbeing with intelligent support.',
    'features.mentalHealth.cta': 'Care for your\nmental health',
    'features.finance.title': 'A.I. Finance',
    'features.finance.description': 'Smart and personalized financial management.',
    'features.finance.cta': 'Manage your\nfinances',
    'features.wallet.title': 'Wallet',
    'features.wallet.description': 'Your secure and connected digital wallet.',
    'features.wallet.cta': 'Discover your\nnew wallet',
    'features.chat.title': 'Chat',
    'features.chat.description': 'Secure, instant, and intelligent communication.',
    'features.chat.cta': 'Discover the\nnew chat',
    'features.streaming.title': 'Streaming',
    'features.streaming.description': 'High-quality live content without interruptions.',
    'features.streaming.cta': 'Discover the\nnew streaming',
    'features.gaming.title': 'Gaming',
    'features.gaming.description': 'Immersive experiences and collaborative games.',
    'features.gaming.cta': 'Explore the\nnew gaming',
    'features.education.title': 'Education',
    'features.education.description': 'Learn and grow with personalized content.',
    'features.education.cta': 'Learn\nwith us',
    'features.marketplace.title': 'Marketplace',
    'features.marketplace.description': 'Buy and sell securely.',
    'features.marketplace.cta': 'Explore the\nmarketplace'
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre nós',
    'nav.contact': 'Contato',
    'skip': 'Pular Intro',
    'menu.open': 'Abrir menu',
    'menu.close': 'Fechar menu',
    'menu.selectLanguage': 'Selecionar idioma',
    'lang.select': 'Idioma',
    // Features
    'features.community.title': 'Comunidade',
    'features.community.description': 'Conecte-se com pessoas afins.',
    'features.community.cta': 'Junte-se à\ncomunidade',
    'features.mentalHealth.title': 'Saúde Mental',
    'features.mentalHealth.description': 'Bem-estar emocional com apoio inteligente.',
    'features.mentalHealth.cta': 'Cuide da sua\nsaúde mental',
    'features.finance.title': 'A.I. Finanças',
    'features.finance.description': 'Gestão financeira inteligente e personalizada.',
    'features.finance.cta': 'Gerencie suas\nfinanças',
    'features.wallet.title': 'Wallet',
    'features.wallet.description': 'Sua carteira digital segura e conectada.',
    'features.wallet.cta': 'Descubra sua\nnova wallet',
    'features.chat.title': 'Chat',
    'features.chat.description': 'Comunicação segura, instantânea e inteligente.',
    'features.chat.cta': 'Conheça o\nnovo chat',
    'features.streaming.title': 'Streaming',
    'features.streaming.description': 'Conteúdo ao vivo de alta qualidade sem interrupções.',
    'features.streaming.cta': 'Descubra o\nnovo streaming',
    'features.gaming.title': 'Gaming',
    'features.gaming.description': 'Experiências imersivas e jogos colaborativos.',
    'features.gaming.cta': 'Explore o\nnovo gaming',
    'features.education.title': 'Educação',
    'features.education.description': 'Aprenda e cresça com conteúdo personalizado.',
    'features.education.cta': 'Aprenda\nconosco',
    'features.marketplace.title': 'Marketplace',
    'features.marketplace.description': 'Compre e venda com segurança.',
    'features.marketplace.cta': 'Explore o\nmarketplace'
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'skip': '跳过介绍',
    'menu.open': '打开菜单',
    'menu.close': '关闭菜单',
    'menu.selectLanguage': '选择语言',
    'lang.select': '语言',
    // Features
    'features.community.title': '社区',
    'features.community.description': '与志同道合的人联系。',
    'features.community.cta': '加入\n社区',
    'features.mentalHealth.title': '心理健康',
    'features.mentalHealth.description': '智能支持的情感健康。',
    'features.mentalHealth.cta': '关爱你的\n心理健康',
    'features.finance.title': 'A.I. 金融',
    'features.finance.description': '智能化个性化财务管理。',
    'features.finance.cta': '管理你的\n财务',
    'features.wallet.title': '钱包',
    'features.wallet.description': '您的安全数字钱包。',
    'features.wallet.cta': '发现你的\n新钱包',
    'features.chat.title': '聊天',
    'features.chat.description': '安全、即时、智能的通讯。',
    'features.chat.cta': '了解\n新聊天',
    'features.streaming.title': '流媒体',
    'features.streaming.description': '高质量无中断的直播内容。',
    'features.streaming.cta': '发现\n新流媒体',
    'features.gaming.title': '游戏',
    'features.gaming.description': '沉浸式体验和协作游戏。',
    'features.gaming.cta': '探索\n新游戏',
    'features.education.title': '教育',
    'features.education.description': '通过个性化内容学习和成长。',
    'features.education.cta': '与我们\n一起学习',
    'features.marketplace.title': '市场',
    'features.marketplace.description': '安全买卖。',
    'features.marketplace.cta': '探索\n市场'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'skip': 'تخطي المقدمة',
    'menu.open': 'فتح القائمة',
    'menu.close': 'إغلاق القائمة',
    'menu.selectLanguage': 'اختر اللغة',
    'lang.select': 'اللغة',
    // Features
    'features.community.title': 'المجتمع',
    'features.community.description': 'تواصل مع أشخاص متشابهين.',
    'features.community.cta': 'انضم إلى\nالمجتمع',
    'features.mentalHealth.title': 'الصحة النفسية',
    'features.mentalHealth.description': 'رفاهية عاطفية بدعم ذكي.',
    'features.mentalHealth.cta': 'اعتن بـ\nصحتك النفسية',
    'features.finance.title': 'A.I. المالية',
    'features.finance.description': 'إدارة مالية ذكية وشخصية.',
    'features.finance.cta': 'أدر\nأموالك',
    'features.wallet.title': 'المحفظة',
    'features.wallet.description': 'محفظتك الرقمية الآمنة والمتصلة.',
    'features.wallet.cta': 'اكتشف\nمحفظتك الجديدة',
    'features.chat.title': 'الدردشة',
    'features.chat.description': 'تواصل آمن وفوري وذكي.',
    'features.chat.cta': 'اكتشف\nالدردشة الجديدة',
    'features.streaming.title': 'البث المباشر',
    'features.streaming.description': 'محتوى مباشر عالي الجودة بدون انقطاع.',
    'features.streaming.cta': 'اكتشف\nالبث الجديد',
    'features.gaming.title': 'الألعاب',
    'features.gaming.description': 'تجارب غامرة وألعاب تعاونية.',
    'features.gaming.cta': 'استكشف\nالألعاب الجديدة',
    'features.education.title': 'التعليم',
    'features.education.description': 'تعلم وانمو مع محتوى مخصص.',
    'features.education.cta': 'تعلم\nمعنا',
    'features.marketplace.title': 'السوق',
    'features.marketplace.description': 'اشترِ وبِع بأمان.',
    'features.marketplace.cta': 'استكشف\nالسوق'
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
    // Actualizar atributo lang del documento (sin cambiar dirección)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      // Mantener siempre LTR para no romper el diseño
      document.documentElement.dir = 'ltr';
    }
  }
};

// Inicialización (actualiza el DOM cuando el store cambia)
if (typeof window !== 'undefined') {
  // Suscribirse a cambios del idioma
  $lang.subscribe((lang) => {
    // Actualizar lang del documento (mantener siempre LTR)
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
    
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
