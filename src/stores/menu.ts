import { atom } from 'nanostores';

// Store para el estado del menú móvil
export const $menuOpen = atom<boolean>(false);

// Acciones
export const openMenu = (): void => {
  $menuOpen.set(true);
};

export const closeMenu = (): void => {
  $menuOpen.set(false);
};

export const toggleMenu = (): void => {
  $menuOpen.set(!$menuOpen.get());
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
      
      // Actualizar aria-label basado en el idioma actual
      const label = isOpen ? 'Cerrar menú' : 'Abrir menú';
      hamburgerBtn.setAttribute('aria-label', label);
    }
  });
}
