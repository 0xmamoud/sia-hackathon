import Hero from '@/components/sections/hero'
import HowItWorks from '@/components/sections/howItWorks';
import Video from '@/components/sections/video';
import { Contact } from '@/components/sections/contact'
import { Header } from '@/components/sections/header';

export default function Home() {
  return (
    <section className='container'>
      <Header />
      <Hero />
      <HowItWorks />
      <Video />
    </section>
  );
}
