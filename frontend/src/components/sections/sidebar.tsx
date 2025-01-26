"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"



export function Sidebar() {
  const pathname = usePathname()

  return (
    <section className="bg-background hidden w-64 flex-col  border-r lg:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          <Button
            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant={pathname === "/dashboard/all-creations" ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href="/dashboard/creations">
              <List className="mr-2 h-4 w-4" />
              All Creations
            </Link>
          </Button>
        </nav>
      </ScrollArea>
    </section>


  )
}
