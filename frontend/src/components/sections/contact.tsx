"use client"

import Link from "next/link"
import * as motion from 'motion/react-client'
import { Linkedin, Mail, Phone } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-dark-blue/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Transform Your Legal Analysis
          </h2>
          <p className="text-xl mb-12 text-gray-200">
            Experience the power of AI-driven legal document analysis. Let our cutting-edge technology streamline your
            legal processes.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link
              href="https://www.linkedin.com/company/gide-loyrette-nouel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <Linkedin className="w-6 h-6 mr-2" />
              <span className="md:text-lg">LinkedIn</span>
            </Link>
            <Link
              href="mailto:contact@gide.com"
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <Mail className="w-6 h-6 mr-2" />
              <span className="md:text-lg">contact@gide.com</span>
            </Link>
            <Link
              href="tel:+33140756000"
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <Phone className="w-6 h-6 mr-2" />
              <span className="md:text-lg">+33 1 40 75 60 00</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


