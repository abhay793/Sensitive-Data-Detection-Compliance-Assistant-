import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, FileIcon, AlertCircle } from 'lucide-react';

interface UploadedFile {
  file: File;
  size: number;
  type: string;
}

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const ACCEPTED_TYPES = ['application/pdf', 'text/plain', 'text/csv'];
const MAX_SIZE_MB = 10;

export default function UploadCard({ onFileSelect, isAnalyzing }: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Unsupported file type. Please upload a PDF, TXT, or CSV file.';
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File size exceeds ${MAX_SIZE_MB}MB limit.`;
    }
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile({
        file,
        size: file.size,
        type: file.type,
      });
    },
    []
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile.file);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-heading" />
        <h2 className="text-lg font-semibold text-heading">Upload Document</h2>
      </div>

      {!selectedFile ? (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              isDragOver
                ? 'border-primary bg-primary-50'
                : 'border-border hover:border-primary-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDragOver ? 'bg-primary-100' : 'bg-gray-100'
                }`}
              >
                <Upload
                  className={`w-8 h-8 ${isDragOver ? 'text-primary' : 'text-gray-400'}`}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-heading mb-1">
                  Drag and drop your document here
                </p>
                <p className="text-sm text-body">or</p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary"
              >
                Browse Files
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.csv"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                { icon: FileText, label: 'PDF' },
                { icon: FileText, label: 'TXT' },
                { icon: FileText, label: 'CSV' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">{label}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-body">
              Maximum file size: {MAX_SIZE_MB}MB
            </p>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-danger-50 border border-danger-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}
        </>
      ) : (
        <div className="border border-border rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileIcon className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-heading truncate">
                {selectedFile.file.name}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-body">
                  {formatFileSize(selectedFile.size)}
                </span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs text-body">
                  {selectedFile.type.split('/')[1].toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              disabled={isAnalyzing}
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full btn-primary"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.121 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze Document'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
