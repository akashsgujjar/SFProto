'use client';

import React, { useState } from 'react';
import { FactoryApi } from '../../services/factoryApi';

interface DataUploadProps {
  onDataUploaded: () => void;
  isDarkMode: boolean;
}

export default function DataUpload({ onDataUploaded, isDarkMode }: DataUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTemplate, setShowTemplate] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const api = FactoryApi.getInstance();
      await api.uploadData(file);
      onDataUploaded();
    } catch (err) {
      setError('Error uploading file. Please check the format and try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const api = FactoryApi.getInstance();
    const template = api.getCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factory_data_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const bgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';

  return (
    <div className={`p-4 ${bgColor} rounded-lg border ${borderColor}`}>
      <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Upload Factory Data</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'
            } hover:opacity-90 transition-opacity`}
          >
            {isUploading ? 'Uploading...' : 'Choose CSV File'}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          
          <button
            onClick={handleDownloadTemplate}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
            } hover:opacity-90 transition-opacity`}
          >
            Download Template
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Upload a CSV file with your factory data. The file should follow the template format.</p>
          <p className="mt-1">Supported data types: Production, Defects, Quality, and Maintenance.</p>
        </div>
      </div>
    </div>
  );
} 