"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { isEqual, parseISO, startOfDay } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Sheet, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AuditFilter } from "@/components/forms/auditFilter"
import { PDFViewer } from "@/components/sections/pdfViewer"
import { API_URL } from "@/lib/constants"

type Audit = {
  id: number
  name: string
  date: string
  leasePath: string
  excelPath: string
  summary: string
  synthesisData: {
    key: string
    value: string
  }[]

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
    date: new Date().toISOString(),
    leasePath: "http://localhost:3001/output/99.pdf",
    excelPath: "http://localhost:3001/output/H3RDC0DE.xlsx",
    summary: "Annual office lease review for headquarters.",
    synthesisData: [
      { key: "Total Rent", value: "$1,000,000" },
      { key: "Lease Term", value: "5 years" },
      { key: "Rentable Area", value: "10,000 sq. ft." },
    ],
  }
]

const AuditRow = ({ audit, isExpanded, onToggle, onView, onDownload }: AuditRowProps) => {
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight

  return (
    <>
      <TableRow className="cursor-pointer text-xl" onClick={onToggle}>
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
            <span className="text-lg">Audit</span>
          </Button>
          <Button
            size="sm"
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation()
              onDownload(audit)
            }}
          >
            <Sheet className="w-4 h-4 mr-1" />
            <span className="text-lg">Excel</span>
          </Button>
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow>
          <TableCell colSpan={3}>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Synthesis Data</h3>
              <dl className="divide-y divide-gray-200">
                {audit.synthesise.map((item) => (
                  <div key={item.key} className="flex items-center py-2">
                    <dt className="text-lg text-gray-600 flex-1">{item.key}:</dt>
                    <dd className="text-lg font-medium text-gray-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </TableCell>
        </TableRow>
      )}

    </>
  )
}

export default function AuditsPage() {
  const [audits, setAudits] = useState(initialAudits);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);

  const filteredAudits = audits.filter((audit) => {
    const nameMatch = audit.name.toLowerCase().includes(nameFilter.toLowerCase());

    const dateMatch = !dateFilter || isEqual(
      startOfDay(parseISO(audit.date)),
      startOfDay(dateFilter)
    );

    return nameMatch && dateMatch;
  });

  const handleViewAudit = (audit) => {
    setSelectedAudit(audit);
    setIsPDFOpen(true);
  };

  const handleDownloadAudit = (audit) => {
    const link = document.createElement("a");
    link.href = audit.excelPath;
    link.download = audit.name + ".xlsx";
    link.click();
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await fetch(`${API_URL}/leases`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log(data)
        setAudits(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAudits();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8 text-xl">
      <h1 className="text-3xl font-bold text-gray-900">Audit History</h1>

      <AuditFilter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

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
              {filteredAudits
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((audit) => (
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

      <PDFViewer
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        pdfUrl={selectedAudit?.leasePath}
        documentName={selectedAudit?.name}
      />
    </div>
  );
}
