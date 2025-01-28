"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PDFViewer } from "@/components/sections/pdfViewer"

type SynthesisData = {
  totalRent: string
  leaseTerms: string
  renewalOptions: string
  maintenanceResponsibility: string
}

type Audit = {
  id: number
  name: string
  date: string
  pdfUrl: string
  summary: string
  keyFindings: string
  synthesisData: SynthesisData
}

interface AuditRowProps {
  audit: Audit
  isExpanded: boolean
  onToggle: () => void
  onView: (audit: Audit) => void
  onDownload: (audit: Audit) => void
}

const initialAudits: Audit[] = [
  {
    id: 1,
    name: "Office Lease 2023",
    date: "2023-06-15",
    pdfUrl: "/sample.pdf",
    summary: "Annual office lease review for headquarters.",
    keyFindings: "No major issues found. Rent increase within market rates.",
    synthesisData: {
      totalRent: "$500,000/year",
      leaseTerms: "5 years",
      renewalOptions: "2 x 5 years",
      maintenanceResponsibility: "Tenant",
    },
  },
  {
    id: 2,
    name: "Retail Space Agreement",
    date: "2023-07-22",
    pdfUrl: "/sample.pdf",
    summary: "New retail space lease in downtown location.",
    keyFindings: "Potential issues with maintenance clause. Recommend legal review.",
    synthesisData: {
      totalRent: "$250,000/year",
      leaseTerms: "3 years",
      renewalOptions: "1 x 3 years",
      maintenanceResponsibility: "Shared",
    },
  },
  {
    id: 3,
    name: "Warehouse Lease Renewal",
    date: "2023-08-05",
    pdfUrl: "/sample.pdf",
    summary: "Renewal of existing warehouse lease with updated terms.",
    keyFindings: "Favorable terms negotiated. Early termination clause added.",
    synthesisData: {
      totalRent: "$750,000/year",
      leaseTerms: "7 years",
      renewalOptions: "1 x 5 years",
      maintenanceResponsibility: "Landlord",
    },
  },
  {
    id: 4,
    name: "Co-working Space Contract",
    date: "2023-09-10",
    pdfUrl: "/sample.pdf",
    summary: "Short-term lease for co-working space in tech hub.",
    keyFindings: "Flexible terms align with company needs. No significant risks identified.",
    synthesisData: {
      totalRent: "$100,000/year",
      leaseTerms: "1 year",
      renewalOptions: "Monthly",
      maintenanceResponsibility: "Landlord",
    },
  },
  {
    id: 5,
    name: "Restaurant Lease Agreement",
    date: "2023-10-18",
    pdfUrl: "/sample.pdf",
    summary: "New lease for restaurant space in shopping mall.",
    keyFindings: "Complex revenue sharing model. Legal and financial review recommended.",
    synthesisData: {
      totalRent: "$300,000/year + 5% of revenue",
      leaseTerms: "10 years",
      renewalOptions: "2 x 5 years",
      maintenanceResponsibility: "Tenant",
    },
  },
]

const AuditRow = ({ audit, isExpanded, onToggle, onView, onDownload }: AuditRowProps) => {
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight

  return (
    <>
      <TableRow className="cursor-pointer text-lg" onClick={onToggle}>
        <TableCell>
          <ChevronIcon className="w-4 h-4 inline mr-2" />
          {audit.name}
        </TableCell>
        <TableCell>{new Date(audit.date).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onView(audit)
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            <span className="text-lg">View</span>
          </Button>
          <Button
            size="sm"
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation()
              onDownload(audit)
            }}
          >
            <Download className="w-4 h-4 mr-1" />
            <span className="text-lg">Download</span>
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={3}>
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold mb-2 text-lg">Synthesis Data</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-lg text-shade-gray">Total Rent:</dt>
                <dd className="text-lg font-medium">{audit.synthesisData.totalRent}</dd>
                <dt className="text-lg text-shade-gray">Lease Terms:</dt>
                <dd className="text-lg font-medium">{audit.synthesisData.leaseTerms}</dd>
                <dt className="text-lg text-shade-gray">Renewal Options:</dt>
                <dd className="text-lg font-medium">{audit.synthesisData.renewalOptions}</dd>
                <dt className="text-lg text-shade-gray">Maintenance Responsibility:</dt>
                <dd className="text-lg font-medium">{audit.synthesisData.maintenanceResponsibility}</dd>
              </dl>
              <h3 className="font-semibold mt-4 mb-2 text-lg">Key Findings</h3>
              <p className="text-lg">{audit.keyFindings}</p>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default function AuditsPage() {
  const [audits, setAudits] = useState(initialAudits)
  const [nameFilter, setNameFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})
  const [isPDFOpen, setIsPDFOpen] = useState(false)
  const [selectedAudit, setSelectedAudit] = useState(null)

  useEffect(() => {


  }, [])


  const filteredAudits = audits.filter(
    (audit) => audit.name.toLowerCase().includes(nameFilter.toLowerCase()) && audit.date.includes(dateFilter)
  )

  const handleViewAudit = (audit) => {
    setSelectedAudit(audit)
    setIsPDFOpen(true)
  }

  const handleDownloadAudit = (audit: Audit) => {
    alert(`Downloading audit report for ${audit.name}`)
  }

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="container mx-auto p-6 space-y-8 text-lg">
      <h1 className="text-3xl font-bold text-gray-900">Audit History</h1>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name-filter" className="text-lg">Audit Name</Label>
            <Input
              id="name-filter"
              placeholder="Filter by name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="date-filter" className="text-lg">Date</Label>
            <Input
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-lg"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%] text-lg">Audit Name</TableHead>
                <TableHead className="w-[25%] text-lg">Date</TableHead>
                <TableHead className="w-[25%] text-right text-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.map((audit) => (
                <AuditRow
                  key={audit.id}
                  audit={audit}
                  isExpanded={expandedRows[audit.id] || false}
                  onToggle={() => toggleRow(audit.id)}
                  onView={handleViewAudit}
                  onDownload={handleDownloadAudit}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isPDFOpen && (
        <PDFViewer
          isOpen={isPDFOpen}
          onClose={() => setIsPDFOpen(false)}
          pdfUrl="/sample.pdf"
          documentName={selectedAudit?.name}
        />
      )}
    </div>
  )
}
