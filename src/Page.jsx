import useTheme from './useTheme.js';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

// Shared shell for every page except home (which composes many sections itself).
// min-h-screen + flex keeps the footer at the bottom on short pages.
export default function Page({ children }) {
  const [dark, toggleTheme] = useTheme();

  return (
    <div className="font-body min-h-screen flex flex-col">
      <NavBar dark={dark} onThemeToggle={toggleTheme} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
