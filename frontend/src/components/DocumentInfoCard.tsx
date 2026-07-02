import {
  FileText,
  HardDrive,
  Calendar,
  FileIcon,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import type { DocumentInfo } from '../types';

interface DocumentInfoCardProps {
  documentInfo: DocumentInfo;
}

const statusConfig = {
  uploaded: { icon: Clock, label: 'Uploaded', color: 'text-warning bg-warning-50' },
  processing: { icon: Clock, label: 'Processing', color: 'text-primary bg-primary-50' },
  analyzed: { icon: CheckCircle, label: 'Analyzed', color: 'text-success bg-success-50' },
  error: { icon: AlertCircle, label: 'Error', color: 'text-danger bg-danger-50' },
};

function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return 'N/A';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDateTime(dateString: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function DocumentInfoCard({ documentInfo }: DocumentInfoCardProps) {
  const status = statusConfig[documentInfo.status] || statusConfig.uploaded;
  const StatusIcon = status.icon;

  const items = [
    {
      icon: FileIcon,
      label: 'File Type',
      value: documentInfo.fileType?.toUpperCase() || 'N/A',
    },
    {
      icon: HardDrive,
      label: 'File Size',
      value: formatFileSize(documentInfo.fileSize),
    },
    ...(documentInfo.pageCount !== null && documentInfo.pageCount > 0
      ? [{ icon: FileText, label: 'Pages', value: `${documentInfo.pageCount}` }]
      : []),
    {
      icon: Calendar,
      label: 'Upload Time',
      value: formatDateTime(documentInfo.uploadTime),
    },
  ];

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-heading" />
          <h2 className="text-lg font-semibold text-heading">Document Information</h2>
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {status.label}
        </div>
      </div>

      <div className="border-b border-border pb-4 mb-4">
        <p className="text-sm text-heading font-medium truncate" title={documentInfo.filename || ''}>
          {documentInfo.filename || 'No file selected'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-body" />
                <span className="text-xs text-body">{item.label}</span>
              </div>
              <p className="text-sm font-medium text-heading">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
