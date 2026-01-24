export const initNavigationMenu = (): void => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn') as HTMLButtonElement | null;
  const closeMenuBtn = document.getElementById('close-menu-btn') as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !closeMenuBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  };

  mobileMenuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
};
