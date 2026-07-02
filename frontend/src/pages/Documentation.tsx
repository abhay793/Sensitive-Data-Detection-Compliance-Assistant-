import { Book, FileText, Shield, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

const topics = [
  {
    icon: FileText,
    title: 'Getting Started',
    description: 'Learn how to upload and analyze your first document',
    link: '#getting-started',
  },
  {
    icon: Shield,
    title: 'Understanding Risk Levels',
    description: 'Learn about low, medium, high, and critical risk classifications',
    link: '#risk-levels',
  },
  {
    icon: AlertTriangle,
    title: 'Types of Sensitive Data',
    description: 'Explore the different categories of sensitive information detected',
    link: '#data-types',
  },
  {
    icon: CheckCircle,
    title: 'Compliance Checklist',
    description: 'Understand GDPR, PCI-DSS, and other compliance requirements',
    link: '#compliance',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Find answers to commonly asked questions',
    link: '#faq',
  },
];

const faqs = [
  {
    question: 'What file formats are supported?',
    answer:
      'The application supports PDF, TXT, and CSV file formats. The maximum file size is 10MB per upload.',
  },
  {
    question: 'Is my data stored securely?',
    answer:
      'Yes, all uploaded documents are processed securely. Data is encrypted in transit and at rest. Documents are automatically deleted after analysis.',
  },
  {
    question: 'How accurate is the detection?',
    answer:
      'Our AI-powered detection achieves 95%+ accuracy for common PII types. Confidence scores are provided for each detected item.',
  },
  {
    question: 'Can I export the results?',
    answer:
      'Yes, you can download the analysis report in PDF, JSON, or TXT format for compliance documentation.',
  },
];

export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Book className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-heading mb-2">Documentation</h1>
        <p className="text-body max-w-2xl mx-auto">
          Learn how to use the Sensitive Data Detection & Compliance Assistant to
          identify and protect sensitive information in your documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <a
              key={topic.title}
              href={topic.link}
              className="card p-6 hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-body">{topic.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <section id="getting-started" className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-heading mb-4">Getting Started</h2>
        <div className="space-y-4 text-body">
          <p>
            The Sensitive Data Detection & Compliance Assistant helps you identify
            potentially sensitive information in your documents before sharing them
            externally.
          </p>
          <h3 className="text-lg font-medium text-heading">How to Upload a Document</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the "Browse Files" button or drag and drop your file</li>
            <li>Supported formats: PDF, TXT, CSV (max 10MB)</li>
            <li>Click "Analyze Document" to start the scan</li>
            <li>Review the results in the dashboard</li>
          </ol>
        </div>
      </section>

      <section id="faq" className="card p-6">
        <h2 className="text-xl font-semibold text-heading mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-6 last:border-0">
              <h3 className="text-base font-medium text-heading mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-body">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
