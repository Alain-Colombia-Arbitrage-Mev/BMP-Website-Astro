import { atom } from 'nanostores';
import { t, $lang } from './language';

// Estado menú móvil
export const $menuOpen = atom<boolean>(false);

// Acciones del store
export const openMenu = (): void => {
  $menuOpen.set(true);
};

export const closeMenu = (): void => {
  $menuOpen.set(false);
};

export const toggleMenu = (): void => {
  $menuOpen.set(!$menuOpen.get());
};

// Actualiza aria-label del hamburger
const updateHamburgerAriaLabel = (): void => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (hamburgerBtn) {
    const isOpen = $menuOpen.get();
    const label = isOpen ? t('menu.close') : t('menu.open');
    hamburgerBtn.setAttribute('aria-label', label);
  }
};

// Sincronizar con el DOM cuando cambia el estado
if (typeof window !== 'undefined') {
  $menuOpen.subscribe((isOpen) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');

    if (mobileMenu) {
      mobileMenu.setAttribute('data-open', String(isOpen));
    }

    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      updateHamburgerAriaLabel();
    }
  });

  // Actualizar aria-label cuando cambia el idioma
  $lang.subscribe(() => {
    updateHamburgerAriaLabel();
  });
}
