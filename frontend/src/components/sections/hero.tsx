"use client"

import Link from "next/link"
import * as motion from 'motion/react-client'
import { Button } from "@/components/ui/button"
import { HeroVideoDialogDemo } from "@/components/sections/heroVideoDialog"

export function Hero() {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 items-center">
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 text-center
              leading-loose font-lora
              ">
              Transform your commercial lease audits with the power of
              <span className="text-dark-blue "> Intelligent AI Insights</span>.
            </h1>
            <p className="text-lg mb-8 text-gray-600 text-center">
              Revolutionizing legal document analysis with advanced AI
              technology. Experience faster, more accurate, and
              comprehensive legal auditing solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button size="lg"
                className="bg-dark-blue hover:bg-light-blue text-white w-full sm:w-auto md:text-lg"
                asChild
              >
                <Link href="/dashboard" >Go to Dashboard</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-dark-blue border-dark-blue hover:bg-dark-blue md:text-lg
                  hover:text-white w-full sm:w-auto"
                asChild
              >
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="col-span-1 order-first md:order-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          </motion.div>
          <motion.div
            className="col-span-1 "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HeroVideoDialogDemo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


