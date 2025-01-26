"use client"
import { Sidebar } from "@/components/sections/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex min-h-screen container ">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}


