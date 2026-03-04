import Nav from './Nav';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
