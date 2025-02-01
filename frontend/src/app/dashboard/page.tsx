"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, BarChart, FileText, Sheet } from "lucide-react";
import { FileUploader } from "@/components/forms/fileUpload";
import { PDFViewer } from "@/components/sections/pdfViewer";
import { API_URL } from "@/lib/constants";

export default function DashboardPage() {
  const [audits, setAudits] = useState([]);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);

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

  const updateAudits = (data) => {
    setAudits((prevAudits) => [...prevAudits, ...data]);
  };

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await fetch(`${API_URL}/leases`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setAudits(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAudits();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8 md:text-lg">
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
            <CardTitle className="font-medium">Audits This Month</CardTitle>
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

      <div className="flex max-md:flex-col justify-evenly gap-2 mx-auto w-full">
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Upload New Lease</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader updateAudits={updateAudits} />
          </CardContent>
        </Card>
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Upload Audit Template</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader updateAudits={updateAudits} />
          </CardContent>
        </Card>
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Upload Excel Template</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader updateAudits={updateAudits} />
          </CardContent>
        </Card>
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
              {audits.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              ).slice(0, 5).map((audit, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{audit.name}</TableCell>
                  <TableCell>{new Date(audit.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        className="bg-foreground"
                        size="sm"
                        onClick={() => handleViewAudit(audit)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Audit
                      </Button>
                      <Button
                        className="bg-foreground"
                        size="sm"
                        onClick={() => handleDownloadAudit(audit)}
                      >
                        <Sheet className="w-4 h-4 mr-1" />
                        Excel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
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
        leaseId={selectedAudit?.id}
      />
    </div>
  );
}
