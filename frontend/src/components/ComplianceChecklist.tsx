import { CheckCircle, XCircle, AlertTriangle, MinusCircle, ClipboardCheck, FileQuestion } from 'lucide-react';
import type { ComplianceItem } from '../types';

interface ComplianceChecklistProps {
  items: ComplianceItem[];
}

const statusConfig = {
  pass: {
    icon: CheckCircle,
    label: 'Pass',
    color: 'text-success',
    bg: 'bg-success-50',
  },
  fail: {
    icon: XCircle,
    label: 'Fail',
    color: 'text-danger',
    bg: 'bg-danger-50',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Warning',
    color: 'text-warning-600',
    bg: 'bg-warning-50',
  },
  na: {
    icon: MinusCircle,
    label: 'N/A',
    color: 'text-gray-400',
    bg: 'bg-gray-50',
  },
};

const categoryOrder = [
  'PII',
  'Financial',
  'Credentials',
  'Business',
  'GDPR',
  'Data Protection',
];

export default function ComplianceChecklist({ items }: ComplianceChecklistProps) {
  const hasItems = items && items.length > 0;

  const groupedItems = items.reduce(
    (acc, item) => {
      if (item.category) {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
      }
      return acc;
    },
    {} as Record<string, ComplianceItem[]>
  );

  const sortedCategories = Object.keys(groupedItems).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  const passCount = items.filter((i) => i.status === 'pass').length;
  const failCount = items.filter((i) => i.status === 'fail').length;
  const warningCount = items.filter((i) => i.status === 'warning').length;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-heading" />
          <h2 className="text-lg font-semibold text-heading">Compliance Checklist</h2>
        </div>
        {hasItems && (
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-success rounded-full" />
              {passCount} Pass
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-warning rounded-full" />
              {warningCount} Warning
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-danger rounded-full" />
              {failCount} Fail
            </span>
          </div>
        )}
      </div>

      {!hasItems ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileQuestion className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-body">No compliance data available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-body mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {category}
              </h3>
              <div className="space-y-2">
                {groupedItems[category].map((item) => {
                  const config = statusConfig[item.status] || statusConfig.na;
                  const Icon = config.icon;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${config.bg}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${config.color}`} />
                        <div>
                          <p className="text-sm font-medium text-heading">{item.label || 'Unknown'}</p>
                          {item.description && (
                            <p className="text-xs text-body mt-0.5">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          config.color
                        }`}
                      >
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
