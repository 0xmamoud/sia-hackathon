
"use client"
import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button'

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'completed';
}

export function FileUploader() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
    const uniqueFiles = fileList.filter(
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
            const newProgress = f.progress + Math.floor(Math.random() * 40);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Files uploaded:', files);
  };

  return (
    <section className="max-w-md margin-y mx-auto p-6 bg-white rounded-lg shadow-md">
      <form
        onDragEnter={handleDrag}
        onSubmit={handleSubmit}
      >
        <div
          className={`relative transition-all p-4 border-2 border-dashed rounded-lg 
            duration-300 ${dragActive ? 'border-blue-500 bg-blue-50'
              :
              'border-gray-300 bg-gray-50'
            }`}
        >

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.txt"
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
              Supported formats: PDF, DOC, DOCX, TXT
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
        <Button
          className="mt-4 inline-block w-full"
          disabled={files.length === 0}
          type="submit"

        >Upload</Button>
      </form>

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
    </section>
  );
}

