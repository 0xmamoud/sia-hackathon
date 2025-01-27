import Link from "next/link"
import { Home, FileText, Cable } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-dark-blue/90 text-white h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">LEAZ Dashboard</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 p-3 rounded-lg md:text-lg 
                hover:bg-light-blue/70 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/audits"
              className="flex items-center space-x-3 p-3 rounded-lg md:text-lg 
                hover:bg-light-blue/70 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Audits</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button className="p-3 rounded-lg 
            hover:bg-light-blue/70 transition-colors w-full"
        >
          <Link href="/#contact" className="flex items-center space-x-3 md:text-lg" >
            <Cable className="w-5 h-5" />
            <span className="font-medium">Lets Connect</span>
          </Link>
        </button>
      </div>
    </div >
  )
}



