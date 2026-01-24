export const initHeaderScroll = (): void => {
  const headerBg = document.getElementById('header-bg');
  if (!headerBg) return;

  const updateHeader = () => {
    if (window.scrollY > 50) {
      headerBg.classList.remove('opacity-0');
      headerBg.classList.add('opacity-100');
    } else {
      headerBg.classList.add('opacity-0');
      headerBg.classList.remove('opacity-100');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
};
