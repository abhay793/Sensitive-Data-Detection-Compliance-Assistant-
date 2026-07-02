import { Shield } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-12 h-12 text-gray-400" />
        </div>

        <h3 className="text-xl font-semibold text-heading mb-2">
          Upload a document to begin analysis
        </h3>

        <p className="text-sm text-body">
          Analyze PDF, TXT and CSV files for sensitive information and compliance
          risks.
        </p>
      </div>
    </div>
  );
}
