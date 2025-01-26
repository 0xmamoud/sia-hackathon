"use client"

import { useState } from "react"
import { Download, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AllCreationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredCreations = allCreations.filter((creation) => {
    const nameMatch = creation.name.toLowerCase().includes(searchTerm.toLowerCase())
    const dateMatch = dateFilter === "all" || creation.date.includes(dateFilter)
    return nameMatch && dateMatch
  })

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Creations</h1>
        <p className="text-lg text-gray-600">Explore and manage your documents</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <Input
              id="search"
              placeholder="Search by name or type..."
              className="pl-10 text-base h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-52">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-base">All Dates</SelectItem>
              <SelectItem value="2024" className="text-base">2024</SelectItem>
              <SelectItem value="2023" className="text-base">2023</SelectItem>
              <SelectItem value="2022" className="text-base">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-base font-semibold text-gray-700">Name</TableHead>
              <TableHead className="text-base font-semibold text-gray-700">Type</TableHead>
              <TableHead className="text-base font-semibold text-gray-700">Date</TableHead>
              <TableHead className="text-base font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCreations.map((creation) => (
              <TableRow key={creation.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="text-base">{creation.name}</TableCell>
                <TableCell className="text-base">{creation.type}</TableCell>
                <TableCell className="text-base">{creation.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-base">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="text-base">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const allCreations = [
  { id: 1, name: "Commercial Lease #1234", type: "Lease Analysis", date: "2024-01-25" },
  { id: 2, name: "Retail Audit Template", type: "Audit Template", date: "2024-01-24" },
  { id: 3, name: "Q4 Synthesis Report", type: "Excel Synthesis", date: "2024-01-23" },
  { id: 4, name: "Office Lease #5678", type: "Lease Analysis", date: "2024-01-22" },
  { id: 5, name: "Industrial Audit Template", type: "Audit Template", date: "2024-01-21" },
  { id: 6, name: "Commercial Lease #9101", type: "Lease Analysis", date: "2024-01-20" },
  { id: 7, name: "Q3 Synthesis Report", type: "Excel Synthesis", date: "2024-01-19" },
  { id: 8, name: "Residential Lease #1121", type: "Lease Analysis", date: "2024-01-18" },
  { id: 9, name: "Annual Report 2023", type: "Excel Synthesis", date: "2023-12-31" },
  { id: 10, name: "Office Lease #2468", type: "Lease Analysis", date: "2023-12-15" },
]
