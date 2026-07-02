import {
  Mail,
  Phone,
  CreditCard,
  Landmark,
  Key,
  Lock,
  Badge,
  FileWarning,
  Hash,
} from 'lucide-react';
import type { SensitiveDataType } from '../types';

interface SensitiveDataCardProps {
  type: SensitiveDataType;
  label: string;
  count: number;
  onClick?: () => void;
}

const iconMap: Record<SensitiveDataType, typeof Mail> = {
  email: Mail,
  phone: Phone,
  pan: CreditCard,
  aadhaar: Hash,
  credit_card: CreditCard,
  bank_details: Landmark,
  password: Lock,
  api_key: Key,
  employee_id: Badge,
  confidential: FileWarning,
};

const colorMap: Record<SensitiveDataType, { accent: string; bg: string; icon: string }> = {
  email: { accent: 'bg-primary', bg: 'bg-primary-50', icon: 'text-primary' },
  phone: { accent: 'bg-success-500', bg: 'bg-success-50', icon: 'text-success' },
  pan: { accent: 'bg-warning-500', bg: 'bg-warning-50', icon: 'text-warning' },
  aadhaar: { accent: 'bg-danger', bg: 'bg-danger-50', icon: 'text-danger' },
  credit_card: { accent: 'bg-danger', bg: 'bg-danger-50', icon: 'text-danger' },
  bank_details: { accent: 'bg-warning-500', bg: 'bg-warning-50', icon: 'text-warning' },
  password: { accent: 'bg-danger', bg: 'bg-danger-50', icon: 'text-danger' },
  api_key: { accent: 'bg-danger', bg: 'bg-danger-50', icon: 'text-danger' },
  employee_id: { accent: 'bg-primary', bg: 'bg-primary-50', icon: 'text-primary' },
  confidential: { accent: 'bg-danger', bg: 'bg-danger-50', icon: 'text-danger' },
};

export default function SensitiveDataCard({
  type,
  label,
  count,
  onClick,
}: SensitiveDataCardProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <div
      onClick={onClick}
      className={`relative card p-4 cursor-pointer transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 ${
        count > 0 ? 'group' : 'opacity-60'
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${colors.accent}`}
      />
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-body truncate">{label}</p>
          <p className="text-xl font-bold text-heading">{count}</p>
        </div>
      </div>
    </div>
  );
}
