"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function DashboardPage() {
  const [uploadedFiles, setUploadedFiles] = useState({
    lease: [],
    audit: [],
    excel: []
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: "lease" | "audit" | "excel") => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (type === "lease") {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: [...prev[type], ...files]
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "lease" | "audit" | "excel") => {
    const files = Array.from(e.target.files || []);
    if (type === "lease") {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: [...prev[type], ...files]
      }));
    }
  };

  const removeFile = (type: "lease" | "audit" | "excel", index: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const runAnalysis = async () => {
    const leaseFiles = uploadedFiles.lease;
    if (leaseFiles.length === 0) {
      alert("Please upload at least one lease file before running the analysis.");
      return;
    }

    const formData = new FormData();
    leaseFiles.forEach((file, index) => {
      formData.append(`leasesPdfs`, file);
    });

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Analysis started successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error running analysis:", error);
      alert("Failed to start the analysis. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">File Manager</h1>
        <p className="text-lg text-gray-600 mt-2">Téléchargez vos corpus ainsi que les templates d'analyse.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Baux commerciaux",
            description: "Documents soumis à analyse",
            type: "lease"
          },
          {
            title: "Template d'audit",
            description: "Document d'analyse d'audit",
            type: "audit"
          },
          {
            title: "Template de synthèse",
            description: "Document de rapport de synthèse",
            type: "excel"
          }
        ].map(({ title, description, type }) => (
          <Card
            key={type}
            className="hover:shadow-lg transition-shadow duration-300"
            onDrop={(e) => handleDrop(e, type as "lease" | "audit" | "excel")}
            onDragOver={handleDragOver}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="text-base">{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 p-4 border-2 border-dashed rounded-md text-center text-gray-500">
                <p>Drag and drop files here</p>
                <p>or</p>
                <label className="cursor-pointer text-blue-500 hover:underline">
                  select from your device
                  <input
                    type="file"
                    multiple={type === "lease"}
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, type as "lease" | "audit" | "excel")}
                  />
                </label>
              </div>
              {type === "lease" && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Uploaded Files:</h4>
                  <ul className="list-disc list-inside mt-2">
                    {uploadedFiles[type].map((file, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="mr-2">{file.name}</span>
                        <button
                          onClick={() => removeFile(type as "lease" | "audit" | "excel", index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={runAnalysis}
          className="px-6 py-3 bg-gray-300 text-black rounded-lg shadow-md hover:bg-dark-700 transition duration-300"
        >
          🔥 Lancer l'analyse
        </button>
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
                  </div>
                  {index < creationHistory.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

const creationHistory = [
  { name: "Commercial Lease #1234", type: "Lease Analysis", date: "2024-01-25" },
  { name: "Retail Audit Template", type: "Audit Template", date: "2024-01-24" },
  { name: "Q4 Synthesis Report", type: "Excel Synthesis", date: "2023-01-23" },
  { name: "Office Lease #5678", type: "Lease Analysis", date: "2023-01-22" },
  { name: "Industrial Audit Template", type: "Audit Template", date: "2023-01-21" },
  { name: "Commercial Lease #9101", type: "Lease Analysis", date: "2023-01-20" },
  { name: "Q3 Synthesis Report", type: "Excel Synthesis", date: "2023-01-19" },
  { name: "Residential Lease #1121", type: "Lease Analysis", date: "2023-01-18" }
];
