import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

// Shared shell for every page except home (which composes many sections itself).
// min-h-screen + flex keeps the footer at the bottom on short pages.
export default function Page({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink font-body text-white antialiased">
      <NavBar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
