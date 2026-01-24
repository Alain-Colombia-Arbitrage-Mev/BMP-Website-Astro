export const initHomeMenu = (): void => {
  const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !mobileMenu) return;

  const setExpanded = (expanded: boolean) => {
    menuButton.setAttribute('aria-expanded', String(expanded));
    mobileMenu.classList.toggle('hidden', !expanded);
  };

  menuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    setExpanded(isHidden);
  });

  mobileMenu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => setExpanded(false));
  });
};
