import { useEffect, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // Seeded from the class the pre-paint script in index.html already set.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('nexora-theme', dark ? 'dark' : 'light');
    } catch (_) {}
  }, [dark]);

  return (
    <div className="font-body">
      <NavBar dark={dark} onThemeToggle={() => setDark(!dark)} />
      <Hero />
      <Problem />
      <Services />
      <Process />
      <Work />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
