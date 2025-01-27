
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, BarChart, FileText, X } from "lucide-react"
import { FileUploader } from "@/components/forms/fileUpload"
import { PDFViewer } from "@/components/sections/pdfViewer"

const initialAudits = [
  { id: 1, name: "Office Lease 2023", date: "2023-06-15", summary: "Annual office lease review for headquarters.", pdfUrl: "/sample.pdf" },
  {
    id: 2,
    name: "Retail Space Agreement",
    date: "2023-07-22",
    summary: "New retail space lease in downtown location.",
    pdfUrl: "/sample.pdf"
  },
  {
    id: 3,
    name: "Warehouse Lease Renewal",
    date: "2023-08-05",
    summary: "Renewal of existing warehouse lease with updated terms.",
    pdfUrl: "/sample.pdf"
  },
  {
    id: 4,
    name: "Co-working Space Contract",
    date: "2023-09-10",
    summary: "Short-term lease for co-working space in tech hub.",
    pdfUrl: "/sample.pdf"
  },
  {
    id: 5,
    name: "Restaurant Lease Agreement",
    date: "2023-10-18",
    summary: "New lease for restaurant space in shopping mall.",
    pdfUrl: "/sample.pdf"
  },
]



export default function DashboardPage() {
  const [audits, setAudits] = useState(initialAudits)
  const [isPDFOpen, setIsPDFOpen] = useState(false)
  const [selectedAudit, setSelectedAudit] = useState(null)

  const handleViewAudit = (audit) => {
    setSelectedAudit(audit)
    setIsPDFOpen(true)
  }

  const handleClosePDF = () => {
    setIsPDFOpen(false)
  }

  const handleDownloadAudit = (audit) => {
    alert(`Downloading audit for ${audit.name}`)
  }

  return (
    <div className="container mx-auto p-6 space-y-8 md:text-lg">
      {/* Keep all your existing JSX code exactly as is */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">Total Audits</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className=" font-medium">Audits This Month</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">Audits This Year</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="flex max-md:flex-col justify-evenly gap-2 mx-auto w-full">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Upload New Lease</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>

          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Upload Excel Synthesis File</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>

          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Upload New Lease</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-4 w-fit bg-foreground md:text-lg"
            type="submit"
            form="file-upload-form"
          >
            Launch Analysis
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="md:text-lg">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audits.slice(0, 5).map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.name}</TableCell>
                  <TableCell>{new Date(audit.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button className="bg-foreground" size="sm" onClick={() => handleViewAudit(audit)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button className="bg-foreground" size="sm" onClick={() => handleDownloadAudit(audit)}>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add the PDF Viewer component at the end */}
      <PDFViewer
        isOpen={isPDFOpen}
        onClose={handleClosePDF}
        pdfUrl={selectedAudit?.pdfUrl}
        documentName={selectedAudit?.name}
      />
    </div>
  )
}
