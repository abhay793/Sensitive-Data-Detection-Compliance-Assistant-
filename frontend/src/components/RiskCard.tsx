import { AlertTriangle, AlertCircle, Shield, AlertOctagon, Minus } from 'lucide-react';
import type { RiskLevel, RiskAssessment } from '../types';

interface RiskCardProps {
  riskAssessment: RiskAssessment;
}

const riskConfig: Record<RiskLevel, { label: string; color: string; bgColor: string; icon: typeof Shield }> = {
  low: {
    label: 'Low Risk',
    color: 'text-success',
    bgColor: 'bg-success-50',
    icon: Shield,
  },
  medium: {
    label: 'Medium Risk',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
    icon: AlertTriangle,
  },
  high: {
    label: 'High Risk',
    color: 'text-danger',
    bgColor: 'bg-danger-50',
    icon: AlertCircle,
  },
  critical: {
    label: 'Critical Risk',
    color: 'text-danger',
    bgColor: 'bg-danger-50',
    icon: AlertOctagon,
  },
};

export default function RiskCard({ riskAssessment }: RiskCardProps) {
  const riskLevel = riskAssessment.overallRisk || 'low';
  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  const riskScore = riskAssessment.riskScore ?? 0;
  const findings = riskAssessment.findings ?? 0;
  const criticalFindings = riskAssessment.criticalFindings ?? 0;

  const progressColor =
    riskLevel === 'low'
      ? 'bg-success'
      : riskLevel === 'medium'
        ? 'bg-warning'
        : 'bg-danger';

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-heading" />
        <h2 className="text-lg font-semibold text-heading">Risk Overview</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl">
          <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center mb-4`}>
            <Icon className={`w-8 h-8 ${config.color}`} />
          </div>
          <p className="text-sm text-body mb-1">Overall Risk</p>
          <p className={`text-xl font-bold ${config.color}`}>{config.label}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl">
          <div className="w-full max-w-[120px] mb-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-heading">
                  {riskScore}
                </span>
                <span className="text-lg text-body ml-1">/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressColor} rounded-full transition-all duration-500`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-body">Risk Score</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-2xl font-bold text-heading mb-1">
              {findings}
            </p>
            <p className="text-xs text-body">Total Findings</p>
          </div>
          <div className="p-4 bg-danger-50 rounded-xl text-center">
            <p className="text-2xl font-bold text-danger mb-1">
              {criticalFindings}
            </p>
            <p className="text-xs text-danger">Critical</p>
          </div>
        </div>
      </div>
    </div>
  );
}
