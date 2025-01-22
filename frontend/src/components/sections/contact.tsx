import React from 'react'
import Link from 'next/link'
import { contactData } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'
import { HyperText } from '@/components/ui/hyper-text'

export function Contact() {
  return (
    <section className='container margin-y padding' id='contact'>
      <h2 className='text-4xl font-medium text-center font-lora margin-bottom'>Get in touch</h2>
      <div className='flex justify-evenly items-center flex-wrap max-md:flex-col gap-8 w-full' >
        {contactData.map((contact) =>
          <Link href={contact.href} key={contact.title} target='_blank'
            className='relative flex justify-between items-center gap-4 pb-3 
               max-md:w-full'
          >
            <div className='flex gap-4 items-center'>
              <contact.icon className='text-5xl text-primary' />
              <HyperText className='text-sm font-normal' >{contact.title}</HyperText>
            </div>
            <ArrowRight className='text-primary/70' />
            <div className="absolute bottom-0 left-0 w-full h-px bg-slate-600 rounded-full"></div>
          </Link>
        )}
      </div>
    </section>
  )
}

