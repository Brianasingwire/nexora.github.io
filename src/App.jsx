import useTheme from './useTheme.js';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import Process from './components/Process.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [dark, toggleTheme] = useTheme();

  return (
    <div className="font-body">
      <NavBar dark={dark} onThemeToggle={toggleTheme} />
      <Hero />
      <Problem />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
