import React from 'react'
import Image from 'next/image'
import * as motion from 'motion/react-client'


const data = [
  {
    title: 'Upload your files',
    description: `Upload your lease, audit templates, synthese excel 
                  and other relevant documents to the platform.`,
    video: '/upload.mp4'
  },
  {
    title: 'AI analysis',
    description: `Our AI engine will analyze and automatically detect your requirements,
                  and generate a detailed report.`,
    image: '/auto_detection.jpg'
  },
  {
    title: 'Download your report',
    description: `And that's it! Download your report and start auditing your lease. Quite simple, right?`,
    video: '/download.mp4'
  },
]

export function HowItWorks() {
  return (
    <section
      className='container margin-y padding bg-gradient-to-b 
        from-transparent to-light overflow-hidden rounded-3xl max-xl:w-[95%] mx-auto'
    >
      <h2 className='text-4xl font-medium text-center font-lora margin-bottom'>How it works</h2>
      <div className='grid grid-cols-1 gap-8'>
        {data.map((card) => (
          <div key={card.title} className='flex justify-between items-center gap-8 max-md:flex-col'>
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
          </div>
        ))}
      </div>
    </section>
  )
}

