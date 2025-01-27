import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/howItWorks';
import { Contact } from '@/components/sections/contact'
import { Header } from '@/components/sections/header';

export default function Home() {
  return (
    <section >
      <Header />
      <Hero />
      <HowItWorks />
      <Contact />
    </section>
  );
}
