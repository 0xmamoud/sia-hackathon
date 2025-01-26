import React from 'react'
import Image from 'next/image'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { CustomSeparator } from '@/components/ui/customSeparator'

export function Footer() {
  return (
    <>
      <div className='container margin-y h-px bg-slate-600 rounded-full '></div>
      <section className='container margin-top padding-x'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={50}
            height={50}
          />
          <h3 className='font-lora text-3xl max-md:text-xl'>LEAZ, Productivity at its best</h3>
          <ShimmerButton> Get Started </ShimmerButton>
        </div>
      </section >
      <div className='margin-top'>
        <CustomSeparator />
        <p className='text-center text-xs md:text-lg opacity-55 mt-4'>© 2025 LEAZ. All rights reserved.</p>
      </div>
    </>
  )

}

