import React from 'react'
import { Header } from '@/components/sections/header'
import { FileUploader } from '@/components/forms/fileUpload'

export default function Dashboard() {
  return (
    <section>
      <div
        className="container bg-gradient-to-b from-light to-background 
          rounded-3xl md:rounded-[40px] mt-4 max-xl:w-[95%] mx-auto"
      >
        <Header />
      </div>
      <FileUploader />
    </section>
  )
}

