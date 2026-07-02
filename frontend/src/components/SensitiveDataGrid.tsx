import { Shield, FileQuestion } from 'lucide-react';
import SensitiveDataCard from './SensitiveDataCard';
import type { SensitiveDataSummary, SensitiveDataType } from '../types';

interface SensitiveDataGridProps {
  summary: SensitiveDataSummary[];
  onCardClick?: (type: SensitiveDataType) => void;
}

const defaultOrder: SensitiveDataType[] = [
  'email',
  'phone',
  'pan',
  'aadhaar',
  'credit_card',
  'bank_details',
  'password',
  'api_key',
  'employee_id',
  'confidential',
];

const defaultLabels: Record<SensitiveDataType, string> = {
  email: 'Email Addresses',
  phone: 'Phone Numbers',
  pan: 'PAN Numbers',
  aadhaar: 'Aadhaar Numbers',
  credit_card: 'Credit Cards',
  bank_details: 'Bank Details',
  password: 'Passwords',
  api_key: 'API Keys',
  employee_id: 'Employee IDs',
  confidential: 'Confidential Information',
};

export default function SensitiveDataGrid({ summary, onCardClick }: SensitiveDataGridProps) {
  const summaryMap = summary.reduce(
    (acc, item) => {
      if (item.type && item.count !== undefined) {
        acc[item.type] = item.count;
      }
      return acc;
    },
    {} as Record<SensitiveDataType, number>
  );

  const totalFindings = summary.reduce((sum, item) => sum + (item.count || 0), 0);

  const hasData = summary && summary.length > 0 && totalFindings > 0;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-heading" />
          <h2 className="text-lg font-semibold text-heading">Sensitive Data Overview</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-body">Total:</span>
          <span className="px-2.5 py-1 bg-primary-50 text-primary rounded-full text-sm font-medium">
            {totalFindings} items
          </span>
        </div>
      </div>

      {hasData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {defaultOrder.map((type) => (
            <SensitiveDataCard
              key={type}
              type={type}
              label={defaultLabels[type]}
              count={summaryMap[type] || 0}
              onClick={() => onCardClick?.(type)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileQuestion className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-body">No sensitive data detected</p>
        </div>
      )}
    </div>
  );
}
