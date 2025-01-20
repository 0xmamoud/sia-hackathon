import { Hero } from '@/components/sections/hero'
import { Header } from '@/components/sections/header'

export default function Home() {
  return (
    <section className='container'>
      <div
        className="bg-gradient-to-b from-light to-background 
           rounded-3xl md:rounded-[40px] h-full max-xl:w-[95%] mx-auto">
        <Header />
        <Hero />
      </div>
    </section>
  );
}
