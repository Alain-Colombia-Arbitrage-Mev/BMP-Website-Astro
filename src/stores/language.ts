import { persistentAtom } from '@nanostores/persistent';
import { atom, computed } from 'nanostores';

// Tipos
export type Lang = 'es' | 'en';

// Traducciones
const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre nosotros',
    'nav.contact': 'Contacto',
    'skip': 'Omitir Intro',
    'menu.open': 'Abrir menú',
    'menu.close': 'Cerrar menú'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.contact': 'Contact',
    'skip': 'Skip Intro',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu'
  }
} as const;

type TranslationKey = keyof typeof translations.es;

// Detectar idioma del navegador
const detectBrowserLang = (): Lang => {
  if (typeof window === 'undefined') return 'es';
  const browserLang = navigator.languages?.[0] || navigator.language || 'es';
  return browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
};

// Store persistente para el idioma
export const $lang = persistentAtom<Lang>('lang', detectBrowserLang(), {
  encode: (value) => value,
  decode: (value) => (value === 'en' || value === 'es' ? value : 'es')
});

// Función para obtener traducción
export const t = (key: TranslationKey): string => {
  const lang = $lang.get();
  return translations[lang][key] || key;
};

// Computed store para las traducciones actuales
export const $translations = computed($lang, (lang) => translations[lang]);

// Acciones
export const setLanguage = (lang: Lang): void => {
  if (lang === 'es' || lang === 'en') {
    $lang.set(lang);
    // Actualizar atributo lang del documento
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }
};

export const toggleLanguage = (): void => {
  const current = $lang.get();
  setLanguage(current === 'es' ? 'en' : 'es');
};

// Inicialización (actualiza el DOM cuando el store cambia)
if (typeof window !== 'undefined') {
  // Suscribirse a cambios del idioma
  $lang.subscribe((lang) => {
    // Actualizar lang del documento
    document.documentElement.lang = lang;
    
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n') as TranslationKey;
      if (key && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Actualizar botones de idioma
    document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('is-active', isActive);
    });

    // Emitir evento personalizado
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  });
}
