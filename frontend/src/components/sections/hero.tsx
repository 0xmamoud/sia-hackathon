import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BoxReveal } from '@/components/ui/box-reveal'

export function Hero() {
  return (
    <section
      className="padding-x margin-top font-inter flex 
        justify-between items-stretch gap-8"
    >
      <BoxReveal boxColor='primary'>

        <div className="flex-1 flex flex-col justify-between gap-8 lg:py-8">
          <h1 className="font-lora font-medium text-4xl max-md:text-2xl leading-snug">
            LEAZ, <br />
            Transform your commercial lease audits with the power of intelligent AI insights.
          </h1>
          <div className="flex justify-center items-center gap-4 font-inter ">
            <Link href="/dashboard">
              <ShimmerButton >
                Get Started
              </ShimmerButton>
            </Link>
            <Button
              variant="secondary"
              className="bg-light rounded-3xl px-8 py-6 text-sm font-medium border border-primary/20 group"
            >
              <Link
                href="/#how-it-works"
                className="flex items-center transition-all duration-300"
              >
                <span>Learn More</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-all duration-300 group-hover:ml-4 
                  group-active:ml-6 ml-2"
                >
                  →
                </span>
              </Link>
            </Button>
          </div>
          <Separator />
          <p className="text-slate-500  text-xs md:text-lg">
            An AI-powered platform designed to simplify and optimize commercial
            lease audits with precision and efficiency.
          </p>
        </div>
      </BoxReveal>
      <BoxReveal boxColor='primary/10'>
        <div className="max-lg:hidden">
          <Image
            src="/hero_image.png"
            alt="Hero"
            width={500}
            height={500}
            className="rounded-3xl object-cover h-full w-full"
          />
        </div>
      </BoxReveal>

    </section>
  )
}
