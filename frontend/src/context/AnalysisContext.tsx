import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { AnalysisResult, ChatMessage, DetectedItem } from '../types';
import { uploadDocument } from "../services/uploadService";
import { askQuestion } from "../services/chatService";
import { downloadReport } from "../services/reportService";
import { useToast } from './ToastContext';

type LoadingStage = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

interface AnalysisContextType {
  analysisResult: AnalysisResult | null;
  chatMessages: ChatMessage[];
  loadingStage: LoadingStage;
  isChatLoading: boolean;
  selectedFilter: DetectedItem['type'] | null;
  handleFileUpload: (file: File) => Promise<void>;
  handleSendMessage: (message: string) => Promise<void>;
  handleDownloadPDF: () => Promise<void>;
  handleDownloadJSON: () => void;
  handleDownloadTXT: () => void;
  setSelectedFilter: (filter: DetectedItem['type'] | null) => void;
  resetAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<DetectedItem['type'] | null>(null);
  const { addToast } = useToast();

  const handleFileUpload = useCallback(
    async (file: File) => {
      setLoadingStage('uploading');

      try {
        const result = await uploadDocument(file);
        setAnalysisResult(result);
        setLoadingStage('complete');
        setChatMessages([]);
        addToast('success', 'Document uploaded successfully');
      } catch (error) {
        setLoadingStage('error');
        addToast('error', error instanceof Error ? error.message : 'Failed to upload document');
      }
    },
    [addToast]
  );

  const handleSendMessage = useCallback(
    async (message: string) => {
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}-user`,
        role: 'user',
        content: message,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, userMessage]);
      setIsChatLoading(true);

      try {
        const analysisId = analysisResult?.analysisId || '';
        const response = await askQuestion(analysisId, message);

        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };

        setChatMessages((prev) => [...prev, assistantMessage]);
      } catch {
        addToast('error', 'Failed to get response');
      } finally {
        setIsChatLoading(false);
      }
    },
    [analysisResult, addToast]
  );

  const handleDownloadPDF = useCallback(async () => {
    if (!analysisResult) return;
    addToast('info', 'Generating PDF report...');
    try {
      const documentId = analysisResult.documentInfo.filename || 'default';
      const blob = await generateReport(documentId);

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compliance-report.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addToast('success', 'Report downloaded successfully');
    } catch {
      addToast('error', 'Failed to generate report');
    }
  }, [analysisResult, addToast]);

  const handleDownloadJSON = useCallback(() => {
    if (!analysisResult) return;

    const json = JSON.stringify(analysisResult, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analysis-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast('success', 'JSON report downloaded');
  }, [analysisResult, addToast]);

  const handleDownloadTXT = useCallback(() => {
    if (!analysisResult) return;

    const content = `
Sensitive Data Detection Report
Generated: ${new Date().toLocaleString()}
Document: ${analysisResult.documentInfo.filename || 'Unknown'}

=== DOCUMENT INFORMATION ===
File Type: ${analysisResult.documentInfo.fileType || 'N/A'}
File Size: ${analysisResult.documentInfo.fileSize ? `${analysisResult.documentInfo.fileSize} bytes` : 'N/A'}
Pages: ${analysisResult.documentInfo.pageCount || 'N/A'}
Status: ${analysisResult.documentInfo.status || 'N/A'}

=== RISK ASSESSMENT ===
Overall Risk: ${analysisResult.riskAssessment.overallRisk?.toUpperCase() || 'N/A'}
Risk Score: ${analysisResult.riskAssessment.riskScore ?? 'N/A'}/100
Total Findings: ${analysisResult.riskAssessment.findings ?? 0}
Critical Findings: ${analysisResult.riskAssessment.criticalFindings ?? 0}

=== DETECTED ITEMS ===
${analysisResult.detectedItems.length > 0
  ? analysisResult.detectedItems.map((item, idx) => `${idx + 1}. ${item.type?.toUpperCase() || 'Unknown'}: ${item.maskedValue || 'N/A'} (${item.risk || 'N/A'} risk)`).join('\n')
  : 'No items detected'}

=== COMPLIANCE CHECKLIST ===
${analysisResult.complianceChecklist.length > 0
  ? analysisResult.complianceChecklist.map((item) => `- [${item.status?.toUpperCase() || 'N/A'}] ${item.label || 'Unknown'}`).join('\n')
  : 'No compliance data available'}

=== RECOMMENDATIONS ===
${analysisResult.aiSummary.recommendations.length > 0
  ? analysisResult.aiSummary.recommendations.map((rec) => `- ${rec}`).join('\n')
  : 'No recommendations available'}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compliance-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast('success', 'TXT report downloaded');
  }, [analysisResult, addToast]);

  const resetAnalysis = useCallback(() => {
    setAnalysisResult(null);
    setChatMessages([]);
    setLoadingStage('idle');
    setSelectedFilter(null);
  }, []);

  return (
    <AnalysisContext.Provider
      value={{
        analysisResult,
        chatMessages,
        loadingStage,
        isChatLoading,
        selectedFilter,
        handleFileUpload,
        handleSendMessage,
        handleDownloadPDF,
        handleDownloadJSON,
        handleDownloadTXT,
        setSelectedFilter,
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
