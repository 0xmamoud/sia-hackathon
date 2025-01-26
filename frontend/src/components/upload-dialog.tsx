"use client"

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'completed';
}

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  uploadType: "lease" | "audit" | "excel" | null
}

export function UploadDialog({ open, onOpenChange, uploadType }: UploadDialogProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const getUploadDetails = () => {
    switch (uploadType) {
      case "lease":
        return {
          title: "Upload Lease Document",
          description: "Upload a commercial lease document for AI analysis.",
          accept: ".pdf,.doc,.docx",
        }
      case "audit":
        return {
          title: "Upload Audit Template",
          description: "Upload a custom audit template for lease analysis.",
          accept: ".pdf,.doc,.docx",
        }
      case "excel":
        return {
          title: "Upload Excel Synthesis",
          description: "Upload an Excel synthesis template for reporting.",
          accept: ".xlsx,.xls,.csv",
        }
      default:
        return {
          title: "Upload Document",
          description: "Upload a document for processing.",
          accept: "*",
        }
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (newFiles: FileList): void => {
    const fileList = Array.from(newFiles);
    const { accept } = getUploadDetails();
    const allowedExtensions = accept.split(',').map(ext => ext.trim());

    const validFiles = fileList.filter(file =>
      allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext.toLowerCase()))
    );

    const uniqueFiles = validFiles.filter(
      newFile => !files.some(existingFile => existingFile.file.name === newFile.name)
    );

    const filesWithProgress: FileWithProgress[] = uniqueFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending'
    }));

    setFiles(prevFiles => [...prevFiles, ...filesWithProgress]);
    simulateUploads(filesWithProgress);
  };

  const simulateUploads = (filesToUpload: FileWithProgress[]): void => {
    filesToUpload.forEach((fileObj) => {
      const uploadInterval = setInterval(() => {
        setFiles(prevFiles => prevFiles.map((f) => {
          if (f.file.name === fileObj.file.name) {
            const newProgress = Math.min(f.progress + Math.floor(Math.random() * 40), 100);
            if (newProgress >= 100) {
              clearInterval(uploadInterval);
              return { ...f, progress: 100, status: 'completed' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });
  };

  const removeFile = (fileName: string): void => {
    setFiles(prevFiles => prevFiles.filter(f => f.file.name !== fileName));
  };

  const downloadFile = (fileObj: FileWithProgress): void => {
    const url = URL.createObjectURL(fileObj.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileObj.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (files.length > 0 && files.every(f => f.status === 'completed')) {
      console.log('Files uploaded:', files);
      onOpenChange(false);
    }
  };

  const { title, description, accept } = getUploadDetails();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div
            onDragEnter={handleDrag}
            className={`relative transition-all p-4 border-2 border-dashed rounded-lg 
              duration-300 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleChange}
              accept={accept}
            />
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <Upload className="text-gray-400" size={48} />
              </div>
              <p className="text-gray-600 mb-4">
                Drag and drop your files here or
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="ml-2 text-blue-600 hover:underline"
                >
                  Browse
                </button>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: {accept.replace(/\./g, '').toUpperCase()}
              </p>
            </div>
            {dragActive && (
              <div
                className="absolute inset-0 z-10"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              ></div>
            )}
          </div>

          {files.length > 0 && (
            <div className="space-y-4 mt-6">
              {files.map((fileObj) => (
                <div key={fileObj.file.name} className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <File className="text-blue-500 mr-2" size={24} />
                      <span className="font-medium">{fileObj.file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(fileObj.file.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${fileObj.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between w-full text-sm text-gray-600">
                    <span>{`${fileObj.progress}% Uploaded`}</span>
                    {fileObj.progress === 100 && (
                      <button
                        type="button"
                        onClick={() => downloadFile(fileObj)}
                        className="text-green-600 hover:underline"
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={files.length === 0 || !files.every(f => f.status === 'completed')}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload & Process
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
