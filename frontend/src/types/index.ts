export type RiskLevel = 'low' | 'medium' | 'high';

export type SensitiveDataType =
  | 'email'
  | 'phone'
  | 'pan'
  | 'aadhaar'
  | 'credit_card'
  | 'bank_details'
  | 'password'
  | 'api_key'
  | 'employee_id'
  | 'confidential';

export interface DetectedItem {
  id?: string;
  type: SensitiveDataType;
  value: string;
  maskedValue: string;
  risk: RiskLevel;

  // Optional fields (for compatibility with existing UI)
  originalValue?: string;
  confidence?: number;
  status?: 'detected' | 'masked' | 'reviewing';
  location?: string;
}

export interface SensitiveDataSummary {
  type: SensitiveDataType;

  // Optional so existing UI doesn't break
  label?: string;
  icon?: string;

  count: number;
}

export interface DocumentInfo {
  filename: string;
  fileType: string;
  fileSize: number;
  pageCount: number | null;
  uploadTime: string;

  // Backend returns a string ("Completed")
  status: string;
}

export interface RiskAssessment {
  overallRisk: RiskLevel;
  riskScore: number;
  findings: number;
  criticalFindings: number;
}

export interface ComplianceItem {
  label: string;
  status: string;

  // Optional for compatibility
  id?: string;
  category?: string;
  description?: string;
}

export interface AISummary {
  executiveSummary: string;
  complianceObservations: string[];
  securityRisks: string[];
  recommendations: string[];
  overallAssessment: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AnalysisResult {
  analysisId: string;

  documentInfo: DocumentInfo;

  riskAssessment: RiskAssessment;

  sensitiveDataSummary: SensitiveDataSummary[];

  detectedItems: DetectedItem[];

  complianceChecklist: ComplianceItem[];

  aiSummary: AISummary;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export type SortDirection = 'asc' | 'desc';

export interface TableSortConfig {
  key: keyof DetectedItem;
  direction: SortDirection;
}

export interface TableFilterConfig {
  type?: SensitiveDataType;
  risk?: RiskLevel;
  status?: DetectedItem['status'];
  search?: string;
}