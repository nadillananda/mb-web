import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import Infrastructure from '@/components/Infrastructure';
import Development from '@/components/Development';
import SystemEngineering from '@/components/SystemEngineering';
import Contact from '@/components/Contact';

export default function MainPage() {
  return (
    <main className="relative">
      <Navbar />
      <Home />
      <Infrastructure />
      <Development />
      <SystemEngineering />
      <Contact />
    </main>
  );
}
