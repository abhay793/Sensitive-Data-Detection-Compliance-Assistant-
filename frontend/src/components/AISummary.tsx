import { Sparkles, FileQuestion } from 'lucide-react';
import type { AISummary as AISummaryType } from '../types';

interface AISummaryProps {
  summary: AISummaryType;
}

export default function AISummary({ summary }: AISummaryProps) {
  const hasContent =
    summary &&
    ((summary.executiveSummary && summary.executiveSummary.length > 0) ||
      (summary.complianceObservations && summary.complianceObservations.length > 0) ||
      (summary.securityRisks && summary.securityRisks.length > 0) ||
      (summary.recommendations && summary.recommendations.length > 0) ||
      (summary.overallAssessment && summary.overallAssessment.length > 0));

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-heading">AI Generated Summary</h2>
      </div>

      {!hasContent ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileQuestion className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-body">No AI summary available yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {summary.executiveSummary && summary.executiveSummary.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-base font-semibold text-heading mb-3">
                <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs text-primary font-bold">
                  1
                </span>
                Executive Summary
              </h3>
              <div className="pl-8 text-body leading-relaxed">
                <p>{summary.executiveSummary}</p>
              </div>
            </section>
          )}

          {summary.complianceObservations && summary.complianceObservations.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-base font-semibold text-heading mb-3">
                <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs text-primary font-bold">
                  2
                </span>
                Compliance Observations
              </h3>
              <ul className="pl-8 space-y-2">
                {summary.complianceObservations.map((observation, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-body">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {observation}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {summary.securityRisks && summary.securityRisks.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-base font-semibold text-heading mb-3">
                <span className="w-6 h-6 bg-warning-100 rounded-full flex items-center justify-center text-xs text-warning-600 font-bold">
                  3
                </span>
                Security Risks
              </h3>
              <ul className="pl-8 space-y-2">
                {summary.securityRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-body">
                    <span className="w-1.5 h-1.5 bg-danger rounded-full mt-2 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {summary.recommendations && summary.recommendations.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-base font-semibold text-heading mb-3">
                <span className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center text-xs text-success font-bold">
                  4
                </span>
                Recommendations
              </h3>
              <ul className="pl-8 space-y-2">
                {summary.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-body">
                    <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {summary.overallAssessment && summary.overallAssessment.length > 0 && (
            <section className="pt-4 border-t border-border">
              <h3 className="flex items-center gap-2 text-base font-semibold text-heading mb-3">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs text-heading font-bold">
                  5
                </span>
                Overall Assessment
              </h3>
              <div className="pl-8 text-body leading-relaxed bg-gray-50 p-4 rounded-lg">
                {summary.overallAssessment}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
