'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface CodeEditorProps {
  initialCode: string;
  onExecute: (code: string) => Promise<void>;
  executionResult?: { output: string; error?: string; plots: any[]; success: boolean };
  isExecuting?: boolean;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  initialCode,
  onExecute,
  executionResult,
  isExecuting = false,
  readOnly = false,
  height = '400px',
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
  };

  const handleExecute = async () => {
    await onExecute(code);
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);

      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Python Code Editor</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={readOnly}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Tersalin
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Salin
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={readOnly || isExecuting}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleExecute}
            disabled={isExecuting || readOnly}
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            {isExecuting ? 'Menjalankan...' : 'Jalankan'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Code Editor */}
          <div className="border-r">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleTab}
              readOnly={readOnly}
              disabled={isExecuting}
              className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-700"
              style={{ height }}
              spellCheck={false}
              placeholder="# Ketik kode Python di sini..."
            />
          </div>

          {/* Output Panel */}
          <div className="flex flex-col">
            <div className="border-b px-4 py-2 bg-slate-100 dark:bg-slate-900">
              <h3 className="text-sm font-semibold">Output</h3>
            </div>
            <ScrollArea className="flex-1 min-h-[400px]" style={{ height }}>
              <div className="p-4 font-mono text-sm space-y-2">
                {executionResult?.plots && executionResult.plots.length > 0 && (
                  <div className="space-y-4">
                    {executionResult.plots.map((plot: any) => (
                      <div key={plot.id} className="space-y-2">
                        <img
                          src={plot.imageData}
                          alt="Plot"
                          className="w-full border rounded"
                        />
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4" />
                  </div>
                )}

                {executionResult?.output && (
                  <pre className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                    {executionResult.output}
                  </pre>
                )}

                {executionResult?.error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-red-700 dark:text-red-400 font-semibold">Error:</p>
                    <pre className="whitespace-pre-wrap text-red-600 dark:text-red-300 mt-1">
                      {executionResult.error}
                    </pre>
                  </div>
                )}

                {!executionResult && !isExecuting && (
                  <p className="text-slate-500 dark:text-slate-400 italic">
                    Klik "Jalankan" untuk melihat hasil output
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
