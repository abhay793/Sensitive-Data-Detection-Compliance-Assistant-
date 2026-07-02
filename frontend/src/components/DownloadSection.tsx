import { Download, FileText, FileJson, FileCode } from 'lucide-react';

interface DownloadSectionProps {
  onDownloadPDF: () => void;
  onDownloadJSON: () => void;
  onDownloadTXT: () => void;
  isDownloading?: boolean;
}

const downloadOptions = [
  {
    icon: FileText,
    label: 'Download Report PDF',
    format: 'PDF',
    color: 'text-danger bg-danger-50',
  },
  {
    icon: FileJson,
    label: 'Download JSON',
    format: 'JSON',
    color: 'text-primary bg-primary-50',
  },
  {
    icon: FileCode,
    label: 'Download TXT',
    format: 'TXT',
    color: 'text-success bg-success-50',
  },
];

export default function DownloadSection({
  onDownloadPDF,
  onDownloadJSON,
  onDownloadTXT,
  isDownloading = false,
}: DownloadSectionProps) {
  const handlers = {
    PDF: onDownloadPDF,
    JSON: onDownloadJSON,
    TXT: onDownloadTXT,
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-5 h-5 text-heading" />
        <h2 className="text-lg font-semibold text-heading">Download Report</h2>
      </div>

      <p className="text-sm text-body mb-6">
        Export your analysis results in various formats for compliance documentation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {downloadOptions.map((option) => {
          const Icon = option.icon;
          const handler = handlers[option.format as keyof typeof handlers];

          return (
            <button
              key={option.format}
              onClick={handler}
              disabled={isDownloading}
              className="flex flex-col items-center gap-3 p-6 border border-border rounded-xl hover:bg-gray-50 hover:border-primary-200 transition-all group disabled:opacity-50"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${option.color} group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-heading group-hover:text-primary transition-colors">
                  {option.label}
                </p>
                <p className="text-xs text-body mt-0.5">{option.format} format</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
