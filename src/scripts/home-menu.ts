export const initHomeMenu = (): void => {
  const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !mobileMenu) return;

  const openClasses = ['opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto'];
  const closedClasses = ['opacity-0', 'translate-y-2', 'scale-95', 'pointer-events-none'];

  const setExpanded = (expanded: boolean) => {
    menuButton.setAttribute('aria-expanded', String(expanded));
    mobileMenu.setAttribute('data-open', String(expanded));
    openClasses.forEach((className) => mobileMenu.classList.toggle(className, expanded));
    closedClasses.forEach((className) => mobileMenu.classList.toggle(className, !expanded));
  };

  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.getAttribute('data-open') === 'true';
    setExpanded(!isOpen);
  });

  mobileMenu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => setExpanded(false));
  });
};

const start = () => {
  initHomeMenu();
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
