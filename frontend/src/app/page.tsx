import { Hero } from '@/components/sections/hero'
import { Header } from '@/components/sections/header'
import { HowItWorks } from '@/components/sections/howItWorks';
import { Contact } from '@/components/sections/contact'

export default function Home() {
  return (
    <section>
      <div
        className="container bg-gradient-to-b from-light to-background 
           rounded-3xl md:rounded-[40px] h-full max-xl:w-[95%] mx-auto mt-4 ">
        <Header />
        <Hero />
      </div>
      <HowItWorks />
      <Contact />
    </section>
  );
}
