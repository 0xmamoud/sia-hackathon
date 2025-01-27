import Hero from '@/components/sections/hero'
import HowItWorks from '@/components/sections/howItWorks';
import Video from '@/components/sections/video';
import { Contact } from '@/components/sections/contact'
import { Header } from '@/components/sections/header';

export default function Home() {
  return (
    <section className='container'>
<<<<<<< HEAD
      <Header />
      <Hero />
      <HowItWorks />
      <Video />
=======
      <div
        className="bg-gradient-to-b from-light to-background 
           rounded-3xl md:rounded-[40px] h-full max-xl:w-[95%] mx-auto">
        <Header />
        <Hero />
      </div>
>>>>>>> thomas
    </section>
  );
}
