import { apiClient } from './api';
import type { AnalysisResult, DetectedItem, SensitiveDataSummary, DocumentInfo, RiskAssessment, ComplianceItem, AISummary } from '../types';

export interface UploadResponse {
  success: boolean;
  message: string;
  documentId: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
}

function createEmptyResult(): AnalysisResult {
  return {
    analysisId: '',
    documentInfo: {
      filename: '',
      fileType: '',
      fileSize: 0,
      pageCount: null,
      uploadTime: '',
      status: 'uploaded',
    },
    riskAssessment: {
      overallRisk: 'low',
      riskScore: 0,
      findings: 0,
      criticalFindings: 0,
    },
    sensitiveDataSummary: [],
    detectedItems: [],
    complianceChecklist: [],
    aiSummary: {
      executiveSummary: '',
      complianceObservations: [],
      securityRisks: [],
      recommendations: [],
      overallAssessment: '',
    },
  };
}

export async function uploadDocument(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post<UploadResponse & { result: AnalysisResult }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.result || createEmptyResult();
  } catch {
    const result = createEmptyResult();
    result.documentInfo = {
      filename: file.name,
      fileType: file.type.split('/')[1]?.toUpperCase() || 'unknown',
      fileSize: file.size,
      pageCount: null,
      uploadTime: new Date().toISOString(),
      status: 'uploaded',
    };
    return result;
  }
}

export async function askQuestion(
  analysisId: string,
  question: string
): Promise<string> {
  try {
    const response = await apiClient.post<ChatResponse>('/chat', {
      analysis_id: analysisId,
      question,
    });

    return response.data.response || '';
  } catch (error) {
    console.error(error);
    return 'Unable to get a response. Please ensure the document has been analyzed.';
  }
}

export async function generateReport(documentId: string): Promise<Blob> {
  try {
    const response = await apiClient.get(`/report/${documentId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch {
    const reportContent = `
Sensitive Data Detection & Compliance Assistant
Report Generated: ${new Date().toLocaleString()}
Document ID: ${documentId}
==============================================

No analysis data available. Please analyze a document first.
`;
    return new Blob([reportContent], { type: 'text/plain' });
  }
}
