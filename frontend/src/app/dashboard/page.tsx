import React from 'react'
import { Header } from '@/components/sections/header'
import { FileUploader } from '@/components/forms/fileUpload'
import { RecentUpload } from '@/components/sections/recentUpload'

export default function Dashboard() {
  return (
    <section>
      <div
        className="container bg-gradient-to-b from-light to-background 
          rounded-3xl md:rounded-[40px] mt-4 max-xl:w-[95%] mx-auto"
      >
        <Header />
      </div>
      <div className='container'>
        <h1 className='text-4xl font-medium text-center font-lora margin-top'>
          Welcome back to your dashboard
        </h1>
        <p className='text-center text-lg opacity-55 mt-4'>
          Here you can upload and keep track of your files
        </p>
        <FileUploader />
      </div>
      <RecentUpload />
    </section>
  )
}

