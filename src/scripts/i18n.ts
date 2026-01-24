type Lang = 'es' | 'en';

type Resource = {
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  skip: string;
};

const resources: Record<Lang, Resource> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre nosotros',
      contact: 'Contacto'
    },
    skip: 'Omitir Intro'
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About us',
      contact: 'Contact'
    },
    skip: 'Skip Intro'
  }
};

const detectLang = (): Lang => {
  const stored = window.localStorage.getItem('lang');
  if (stored === 'es' || stored === 'en') return stored;
  const browserLang =
    (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
  return browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
};

const translate = (lang: Lang, key: string): string | undefined => {
  const parts = key.split('.');
  let current: unknown = resources[lang];

  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
};

export const initI18n = (): void => {
  const langButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-lang]')
  );
  const i18nTargets = Array.from(
    document.querySelectorAll<HTMLElement>('[data-i18n]')
  );

  if (langButtons.length === 0 && i18nTargets.length === 0) return;

  let currentLang: Lang = detectLang();

  const updateContent = () => {
    i18nTargets.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = translate(currentLang, key);
      if (value) el.textContent = value;
    });
  };

  const setActiveLang = () => {
    langButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-lang') === currentLang;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('font-black', isActive);
      btn.classList.toggle('font-normal', !isActive);
    });
    document.documentElement.lang = currentLang;
  };

  updateContent();
  setActiveLang();

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (!lang || lang === currentLang || (lang !== 'es' && lang !== 'en')) {
        return;
      }
      currentLang = lang;
      window.localStorage.setItem('lang', currentLang);
      updateContent();
      setActiveLang();
    });
  });
};
