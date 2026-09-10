// Injected verbatim into the <head> of every page by the inject-theme-script
// plugin in vite.config.js. Runs before first paint so the correct theme is
// applied with no flash; src/useTheme.js seeds its state from the class it sets.
// Cannot be bundled — a module script would run too late.
try {
  var savedTheme = localStorage.getItem('nexora-theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (_) {}
