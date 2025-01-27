"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"


export function PDFViewer({ isOpen, onClose, pdfUrl, documentName }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{documentName}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-lg"
            title="PDF Viewer"
          />
        </div>
      </div>
    </div>
  )
}
