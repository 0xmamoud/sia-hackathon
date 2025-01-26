"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { UploadDialog } from "@/components/upload-dialog"

export default function DashboardPage() {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadType, setUploadType] = useState<"lease" | "audit" | "excel" | null>(null)

  const handleUpload = (type: "lease" | "audit" | "excel") => {
    setUploadType(type)
    setShowUploadDialog(true)
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your lease documents and templates</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Upload Lease",
            description: "Lease documents for in-depth analysis",
            type: "lease"
          },
          {
            title: "Upload Audit Template",
            description: "Customize your audit workflow",
            type: "audit"
          },
          {
            title: "Upload Excel Synthesis",
            description: "Synthesize data from Excel templates",
            type: "excel"
          }
        ].map(({ title, description, type }) => (
          <Card key={type} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="text-base">{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleUpload(type as "lease" | "audit" | "excel")}
                className="w-full text-base"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Upload
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Creation History</CardTitle>
          <CardDescription className="text-base">Recent documents and templates</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full rounded-md border">
            <div className="p-4">
              {creationHistory.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-base text-gray-600">
                        {item.type} • {item.date}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-base">
                      View
                    </Button>
                  </div>
                  {index < creationHistory.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <UploadDialog open={showUploadDialog} onOpenChange={setShowUploadDialog} uploadType={uploadType} />
    </div>
  )
}

const creationHistory = [
  { name: "Commercial Lease #1234", type: "Lease Analysis", date: "2024-01-25" },
  { name: "Retail Audit Template", type: "Audit Template", date: "2024-01-24" },
  { name: "Q4 Synthesis Report", type: "Excel Synthesis", date: "2023-01-23" },
  { name: "Office Lease #5678", type: "Lease Analysis", date: "2023-01-22" },
  { name: "Industrial Audit Template", type: "Audit Template", date: "2023-01-21" },
  { name: "Commercial Lease #9101", type: "Lease Analysis", date: "2023-01-20" },
  { name: "Q3 Synthesis Report", type: "Excel Synthesis", date: "2023-01-19" },
  { name: "Residential Lease #1121", type: "Lease Analysis", date: "2023-01-18" },
]
