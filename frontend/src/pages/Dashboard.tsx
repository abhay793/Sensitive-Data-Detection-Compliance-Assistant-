import { useAnalysis } from '../context/AnalysisContext';
import { Upload, RotateCcw } from 'lucide-react';
import UploadCard from '../components/UploadCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import DocumentInfoCard from '../components/DocumentInfoCard';
import RiskCard from '../components/RiskCard';
import SensitiveDataGrid from '../components/SensitiveDataGrid';
import DetectionTable from '../components/DetectionTable';
import AISummary from '../components/AISummary';
import ComplianceChecklist from '../components/ComplianceChecklist';
import ChatAssistant from '../components/ChatAssistant';
import DownloadSection from '../components/DownloadSection';
import type { SensitiveDataType } from '../types';

export default function Dashboard() {
  const {
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
} = useAnalysis();



  if (loadingStage === 'uploading') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingState />
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UploadCard onFileSelect={handleFileUpload} isAnalyzing={false} />
        <EmptyState />
      </div>
    );
  }

  const handleAnalyzeAnother = () => {
  resetAnalysis();
};

  const handleDataCardClick = (type: SensitiveDataType) => {
    setSelectedFilter(selectedFilter === type ? null : type);

    const tableElement = document.getElementById('detection-table');
    tableElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredItems = selectedFilter
    ? analysisResult.detectedItems.filter((item) => item.type === selectedFilter)
    : analysisResult.detectedItems;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-border rounded-xl p-4 shadow-sm">
  <div>
    <h2 className="text-lg font-semibold text-heading">
      Document Analysis Complete
    </h2>
    <p className="text-sm text-body">
      Upload another document or reset the current analysis.
    </p>
  </div>

  <div className="flex gap-3">
    <button
      onClick={handleAnalyzeAnother}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-gray-100 transition-colors"
    >
      <RotateCcw className="w-4 h-4" />
      New Analysis
    </button>

    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white cursor-pointer hover:opacity-90 transition-opacity">
      <Upload className="w-4 h-4" />
      Upload Another

      <input
        type="file"
        className="hidden"
        accept=".pdf,.docx,.txt,.doc"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            resetAnalysis();
            handleFileUpload(file);
          }
        }}
      />
    </label>
  </div>
</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DocumentInfoCard documentInfo={analysisResult.documentInfo} />

          <RiskCard riskAssessment={analysisResult.riskAssessment} />

          <SensitiveDataGrid
            summary={analysisResult.sensitiveDataSummary}
            onCardClick={handleDataCardClick}
          />

          <div id="detection-table">
            <DetectionTable items={filteredItems} />
          </div>

          <AISummary summary={analysisResult.aiSummary} />

          <ComplianceChecklist items={analysisResult.complianceChecklist} />

          <DownloadSection
            onDownloadPDF={handleDownloadPDF}
            onDownloadJSON={handleDownloadJSON}
            onDownloadTXT={handleDownloadTXT}
          />
        </div>

        <div className="space-y-6">
          <div className="lg:sticky lg:top-24">
            <ChatAssistant
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
