import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-50 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-heading">
              Sensitive Data Detection & Compliance Assistant
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-body">
            <span>Built using</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-heading">
                React
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-heading">
                FastAPI
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-heading">
                Python
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-heading">
                Gemini AI
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center text-xs text-body">
            &copy; {new Date().getFullYear()} Sensitive Data Detection & Compliance Assistant.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
