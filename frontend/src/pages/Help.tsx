import { HelpCircle, Mail, MessageCircle, Book, Video, Headphones } from 'lucide-react';

const supportOptions = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us an email and we will respond within 24 hours',
    action: 'support@example.com',
    link: 'mailto:support@example.com',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team during business hours',
    action: 'Start Chat',
    link: '#',
  },
  {
    icon: Book,
    title: 'Documentation',
    description: 'Browse our comprehensive guides and tutorials',
    action: 'View Docs',
    link: '/documentation',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    action: 'Watch Now',
    link: '#',
  },
];

const quickTips = [
  'Use the AI Assistant to ask questions about detected sensitive data',
  'Download reports in multiple formats for compliance records',
  'Click on data cards to filter the detection table',
  'Use the search bar to find specific detected values',
  'Review the compliance checklist before sharing documents externally',
];

export default function Help() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-heading mb-2">Help Center</h1>
        <p className="text-body max-w-2xl mx-auto">
          Find answers to your questions or reach out to our support team for
          assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {supportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <a
              key={option.title}
              href={option.link}
              className="card p-6 hover:shadow-elevated transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-heading mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-body mb-3">{option.description}</p>
                  <span className="text-sm text-primary font-medium group-hover:underline">
                    {option.action}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Headphones className="w-5 h-5 text-heading" />
          <h2 className="text-xl font-semibold text-heading">Quick Tips</h2>
        </div>
        <ul className="space-y-3">
          {quickTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center text-xs text-primary font-medium flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm text-body">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-6 bg-primary-50 border-primary-100">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-heading mb-2">
            Need More Help?
          </h3>
          <p className="text-sm text-body mb-4">
            Our team is available Monday through Friday, 9 AM to 6 PM EST.
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-flex items-center justify-center btn-primary"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
