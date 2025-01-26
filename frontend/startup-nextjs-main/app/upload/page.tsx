'use client';

import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setMessage(null); // Clear any previous messages
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      setMessage('Please select files before uploading.');
      return;
    }

    const formData = new FormData();

    // Append files to formData
    Array.from(selectedFiles).forEach((file) => {
      formData.append(file.name.includes('audit') ? 'auditPdf' : 'leasesPdfs', file);
    });

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
            <p className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-700 sm:text-xl md:text-2xl">
              Veuillez sélectionner les fichiers à analyser.
            </p>
            <div className="flex flex-col items-center justify-center space-y-6">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full max-w-md text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-none file:bg-blue-600 file:px-4 file:py-2 file:text-white file:shadow-sm file:hover:bg-blue-700"
              />
              <button
                onClick={handleUpload}
                className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload Files'}
              </button>
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
