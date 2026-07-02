import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const stages = [
  { message: 'Uploading document...', duration: 1500 },
  { message: 'Extracting text...', duration: 2000 },
  { message: 'Scanning sensitive information...', duration: 2500 },
  { message: 'Generating AI summary...', duration: 2000 },
  { message: 'Almost done...', duration: 1000 },
];

interface LoadingStateProps {
  onComplete?: () => void;
}

export default function LoadingState({ onComplete }: LoadingStateProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stageIndex = 0;
    let progressValue = 0;
    const totalDuration = stages.reduce((sum, s) => sum + s.duration, 0);
    const progressStep = 100 / (totalDuration / 100);

    const progressInterval = setInterval(() => {
      progressValue = Math.min(progressValue + progressStep, 100);
      setProgress(Math.round(progressValue));
    }, 100);

    const runStages = () => {
      if (stageIndex < stages.length) {
        setCurrentStage(stageIndex);
        setTimeout(() => {
          stageIndex++;
          if (stageIndex < stages.length) {
            runStages();
          } else {
            clearInterval(progressInterval);
            setProgress(100);
            setTimeout(() => {
              onComplete?.();
            }, 500);
          }
        }, stages[stageIndex].duration);
      }
    };

    runStages();

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-20 h-20 bg-primary-100 rounded-full animate-pulse opacity-50" />
          <div className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-heading mb-2">
          Analyzing Document
        </h3>

        <p className="text-sm text-body mb-8 transition-all duration-300">
          {stages[currentStage]?.message || 'Processing...'}
        </p>

        <div className="w-full max-w-xs mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-body">{progress}% complete</p>
        </div>
      </div>
    </div>
  );
}
