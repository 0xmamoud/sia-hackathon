"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import * as motion from 'motion/react-client'
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 
         ${isScrolled ? "bg-white shadow-md" : "bg-transparent md:text-lg"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logoGide.png"
            alt="GIDE"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex space-x-8 md:text-lg">
          <Link href="#expertise" className="text-shade-gray hover:text-dark-blue transition-colors">
            Expertise
          </Link>
          <Link href="#services" className="text-shade-gray hover:text-dark-blue transition-colors">
            Services
          </Link>
          <Link href="#contact" className="text-shade-gray hover:text-dark-blue transition-colors">
            Contact
          </Link>
        </nav>
        <Button asChild className="bg-dark-blue hover:bg-light-blue text-white md:text-lg">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </motion.header>
  )
}


