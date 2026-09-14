import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import Process from './components/Process.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-body text-white antialiased">
      <NavBar />
      <Hero />
      <Problem />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
