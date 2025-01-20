import { navLinks } from "@/lib/constants"
import { NavBar } from "@/components/partials/navBar"
import { Button } from "@/components/ui/button"

import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header
      className="font-inter font-medium bg-light mt-4 max-container 
        w-[95%] flex justify-between items-center p-4 max-md:p-2 rounded-3xl md:rounded-full"
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={50}
        height={50}
      />
      <nav className="max-md:hidden ">
        <ul className="flex justify-evenly items-center gap-4 ">
          {navLinks.map((link) => (
            <li key={link.href}
              className="hover:font-semibold hover:bg-background hover:scale-105
                px-2 py-1 rounded-xl transition-all duration-300 ">
              <Link href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button className="max-md:hidden">
        <Link href="/dashboard">
          Dashboard
        </Link>
      </Button>
      <NavBar />
    </header >
  )
}
