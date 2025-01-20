import { Hero } from '@/components/sections/hero'
import { Header } from '@/components/sections/header'

export default function Home() {
  return (
    <section>
      <div
        className="max-container bg-gradient-to-b from-light to-background 
          w-[95%] rounded-3xl md:rounded-[40px] h-full">
        <Header />
        <Hero />
      </div>
    </section>
  );
}
