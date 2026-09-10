import { useEffect, useState } from 'react';

// Shared by every page entry. Seeded from the class the pre-paint script in each
// HTML shell already set, so step 1 stays the source of truth on load.
export default function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('nexora-theme', dark ? 'dark' : 'light');
    } catch (_) {}
  }, [dark]);

  return [dark, () => setDark(d => !d)];
}
