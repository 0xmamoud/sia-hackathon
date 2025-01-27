
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#F8F8FF] text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src="/logoGide.png"
              alt="GIDE"
              width={120}
              height={40}
              className="h-10 w-auto mb-2"
            />
            <p className="text-shade-gray">Excellence in Legal Technology</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link href="/" className="text-shade-gray hover:text-dark-blue transition-colors">
              About
            </Link>
            <Link href="/#services" className="text-shade-gray hover:text-dark-blue transition-colors">
              Services
            </Link>

            <Link href="/#contact" className="text-shade-gray hover:text-dark-blue transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-shade-gray">
          <p>&copy; {new Date().getFullYear()} LEAZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


