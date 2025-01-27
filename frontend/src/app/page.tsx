import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/howItWorks';
import { Contact } from '@/components/sections/contact'
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <section className="min-h-screen" >
      <Header />
      <Hero />
      <HowItWorks />
      <Contact />
      <Footer />
    </section>
  );
}
