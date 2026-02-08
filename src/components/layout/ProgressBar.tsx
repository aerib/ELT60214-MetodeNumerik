'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
}

export function ProgressBar({ completed, total, showLabel = true }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {completed === total ? (
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          ) : (
            <Circle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          {showLabel && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Progres Pembelajaran
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {completed} / {total} ({percentage}%)
              </span>
            </div>
          )}
          <Progress value={percentage} className="h-3" />
        </div>
      </div>
    </Card>
  );
}
