export const initHeroEffects = (): void => {
  const heroElements = document.querySelectorAll<HTMLElement>('.hero-element');
  if (heroElements.length > 0) {
    heroElements.forEach((el, index) => {
      window.setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('animate-fade-in-up');
      }, 200 + index * 150);
    });
  }

  const skipBtn = document.getElementById('skip-intro');
  skipBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
};
