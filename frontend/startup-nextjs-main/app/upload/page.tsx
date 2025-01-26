'use client';

import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [auditFile, setAuditFile] = useState<File | null>(null);
  const [infoFile, setInfoFile] = useState<File | null>(null);
  const [leaseFiles, setLeaseFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!auditFile && !infoFile && !leaseFiles) {
      setMessage('Please upload at least one file.');
      return;
    }

    const formData = new FormData();

    // Append the files to FormData
    if (auditFile) formData.append('auditPdf', auditFile);
    if (infoFile) formData.append('excelFile', infoFile);
    if (leaseFiles) {
      Array.from(leaseFiles).forEach((file) => {
        formData.append('leasesPdfs', file);
      });
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`Upload Successful: ${JSON.stringify(response.data.files, null, 2)}`);
    } catch (error: any) {
      setMessage(`Upload Failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden pb-16 pt-32 md:pb-24 md:pt-36 xl:pb-28 xl:pt-40 2xl:pb-32 2xl:pt-48"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full text-center">
            
            <p className="mb-10 text-lg leading-relaxed text-gray-900 dark:text-gray-900 sm:text-xl md:text-2xl">
              Please upload the required files for analysis.
            </p>
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Upload Button for Audit File */}
              <div className="w-full max-w-md">
                <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-600">
                  Fiche d'audit (PDF):
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setAuditFile(e.target.files?.[0] || null)}
                  className="block w-full text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-none file:bg-blue-600 file:px-4 file:py-2 file:text-white file:shadow-sm file:hover:bg-blue-700"
                />
              </div>

              {/* Upload Button for Information File */}
              <div className="w-full max-w-md">
                <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-600">
                  Fiche d'information (Excel):
                </label>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={(e) => setInfoFile(e.target.files?.[0] || null)}
                  className="block w-full text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-none file:bg-blue-600 file:px-4 file:py-2 file:text-white file:shadow-sm file:hover:bg-blue-700"
                />
              </div>

              {/* Upload Button for Lease Files */}
              <div className="w-full max-w-md">
                <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
                  Ba (Multiple PDFs):
                </label>
                <input
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={(e) => setLeaseFiles(e.target.files || null)}
                  className="block w-full text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-none file:bg-blue-600 file:px-4 file:py-2 file:text-white file:shadow-sm file:hover:bg-blue-700"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUpload}
                className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload Files'}
              </button>

              {/* Feedback Message */}
              {message && (
                <div className="w-full max-w-3xl rounded-lg bg-gray-100 p-4 shadow-lg dark:bg-gray-800">
                  <pre className="text-left text-sm text-gray-700 dark:text-gray-300">
                    {message}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadPage;
