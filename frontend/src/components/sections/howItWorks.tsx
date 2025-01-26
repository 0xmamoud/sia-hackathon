import React from 'react'
import Image from 'next/image'
import { processData } from '@/lib/constants'
import * as motion from 'motion/react-client'
import { TextAnimate } from '@/components/ui/text-animate'

export function HowItWorks() {
  return (
    <section
      className='container mx-auto margin-y padding  
         overflow-hidden rounded-3xl max-xl:w-[95%] '
      id='how-it-works'
    >
      <TextAnimate
        animation="blurInUp"
        by="character"
        className='text-4xl font-medium text-center font-lora margin-bottom'>
        How it works
      </TextAnimate>
      <motion.div

        className='grid grid-cols-1 gap-8'>
        {processData.map((card) => (
          <motion.div
            whileInView={{ scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            key={card.title} className='flex justify-between items-center gap-8 max-md:flex-col'
          >

            <div className='flex flex-col gap-4'>
              <h2 className='text-2xl font-medium'>{card.title}</h2>
              <p className='text-lg'>{card.description}</p>
            </div>
            {card.video && (
              <video
                src={card.video}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-3xl object-cover max-w-[500px] w-full max-h-[300px]"
              />
            )}
            {card.image && (
              <Image
                src={card.image}
                alt={card.title}
                width={500}
                height={500}
                className="rounded-3xl object-cover max-w-[500px] w-full max-h-[300px]"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

