(() => {
  const storageKey = 'giovani-portfolio-theme';
  const root = document.documentElement;
  let theme = 'dark';
  try {
    if (localStorage.getItem(storageKey) === 'light') theme = 'light';
  } catch { /* Appearance still works without browser storage. */ }
  root.setAttribute('data-theme', theme);

  function initialize() {
    const settings = document.querySelector('.theme-settings');
    if (!settings) return;
    const choices = settings.querySelectorAll('[data-theme-choice]');
    const summary = settings.querySelector('summary');

    function applyTheme(nextTheme) {
      theme = nextTheme;
      root.setAttribute('data-theme', theme);
      choices.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
      });
    }

    choices.forEach(button => button.addEventListener('click', () => {
      applyTheme(button.dataset.themeChoice);
      try { localStorage.setItem(storageKey, theme); } catch { /* Keep the choice for this page. */ }
    }));
    document.addEventListener('click', event => {
      if (!settings.contains(event.target)) settings.open = false;
    });
    settings.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        settings.open = false;
        summary.focus();
      }
    });
    applyTheme(theme);
    settings.hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
