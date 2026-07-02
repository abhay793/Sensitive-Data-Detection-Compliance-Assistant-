import { FileQuestion, Mail, Shield, Key, AlertTriangle } from 'lucide-react';

interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
  compact?: boolean;
}

const questions = [
  {
    icon: FileQuestion,
    question: 'Summarize this document',
  },
  {
    icon: Mail,
    question: 'How many email addresses are present?',
  },
  {
    icon: Shield,
    question: 'What sensitive information exists?',
  },
  {
    icon: AlertTriangle,
    question: 'What compliance risks are identified?',
  },
  {
    icon: Key,
    question: 'Does the document contain API keys?',
  },
];

export function SuggestedQuestions({
  onQuestionSelect,
  compact = false,
}: SuggestedQuestionsProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {questions.slice(0, 3).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.question}
              onClick={() => onQuestionSelect(item.question)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary-50 rounded-full hover:bg-primary-100 transition-colors"
            >
              <Icon className="w-3 h-3" />
              {item.question}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <p className="text-xs text-body mb-3 font-medium">Suggested Questions</p>
      <div className="flex flex-col gap-2">
        {questions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.question}
              onClick={() => onQuestionSelect(item.question)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-left text-body bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-heading transition-colors group"
            >
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              {item.question}
            </button>
          );
        })}
      </div>
    </div>
  );
}
