(() => {
  const storageKey = 'giovani-portfolio-theme';
  const root = document.documentElement;

  // Apply the saved palette before the stylesheet loads to avoid a theme flash.
  try {
    if (localStorage.getItem(storageKey) === 'light') root.dataset.theme = 'light';
  } catch { /* The toggle still works when browser storage is unavailable. */ }

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    function updateToggle() {
      const light = root.dataset.theme === 'light';
      toggle.textContent = light ? 'Dark mode' : 'Light mode';
      toggle.setAttribute('aria-label', 'Switch to ' + (light ? 'dark' : 'light') + ' mode');
    }

    toggle.addEventListener('click', () => {
      const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = theme;
      try { localStorage.setItem(storageKey, theme); } catch { /* Keep the choice for this page. */ }
      updateToggle();
    });
    updateToggle();
    toggle.hidden = false;
  });
})();
