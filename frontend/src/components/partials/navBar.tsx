import Link from "next/link"
import { navLinks } from "@/lib/constants"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { AlignJustify } from "lucide-react"

export function NavBar() {
  return (
    <div className="md:hidden font-inter">
      <Sheet>
        <SheetTrigger>
          <AlignJustify size={24} />
        </SheetTrigger>
        <SheetContent >
          <SheetHeader>
            <SheetTitle className="font-lora">LEAZ</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col justify-between ">
            <nav className="flex flex-col gap-4 mt-4 font-medium">
              {navLinks.map((link) =>
                <SheetClose key={link.href} asChild>
                  <Link href={link.href}
                    className="active:scale-125 transition-all duration-500">
                    {link.title}
                  </Link>
                </SheetClose>
              )}
            </nav>
            <SheetFooter className="mb-4">
              <SheetClose asChild>
                <Button>
                  <Link href="/dashboard" className="font-inter ">
                    Dashboard
                  </Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

