'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, Lightbulb, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { getLessonById, getModuleById, getAllLessons } from '@/lib/content/modules';
import { useProgress } from '@/lib/hooks/useProgress';
import { usePyodide } from '@/lib/hooks/usePyodide';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { toast } from 'sonner';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const lesson = getLessonById(lessonId);
  const lessonModule = lesson ? getModuleById(lesson.moduleId) : null;
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const { isComplete, markComplete, markIncomplete, updateTotalProgress } = useProgress();
  const { executeCode, ready, loading } = usePyodide();

  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [executionResult, setExecutionResult] = useState<any>(undefined);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    updateTotalProgress(allLessons.length);
  }, [updateTotalProgress, allLessons.length]);

  if (!lesson || !lessonModule) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Materi Tidak Ditemukan</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Materi yang Anda cari tidak tersedia.
            </p>
            <Button asChild>
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleExecute = async (code: string) => {
    if (!ready) {
      toast.error('Python runtime belum siap. Mohon tunggu hingga inisialisasi selesai.');
      return;
    }

    setIsExecuting(true);
    setExecutionResult(undefined);

    try {
      const result = await executeCode(code);
      setExecutionResult(result);

      if (result.success) {
        toast.success('Kode berhasil dijalankan!');
      } else {
        toast.error('Terjadi error saat menjalankan kode.');
      }
    } catch (error) {
      toast.error('Gagal menjalankan kode.');
      setExecutionResult({
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        plots: [],
        success: false,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleMarkComplete = () => {
    if (isComplete(lessonId)) {
      markIncomplete(lessonId, lessonModule.id);
      toast.success('Materi ditandai belum selesai');
    } else {
      markComplete(lessonId, lessonModule.id);
      toast.success('Materi ditandai selesai!');
    }
  };

  const activeExample = lesson.examples[activeExampleIndex];

  // Helper function to convert math notation to HTML
  const renderMathNotation = (text: string): string => {
    if (!text) return text;

    // Convert subscript: x_i → x<sub>i</sub>, x₀ → x<sub>0</sub>, etc.
    let result = text.replace(/([a-zA-Z])_([₀-₉a-zA-Z0-9]+)/g, '$1<sub>$2</sub>');
    // Convert digit subscripts: x_0 → x<sub>0</sub>, etc.
    result = result.replace(/([a-zA-Z])_(\d+)/g, '$1<sub>$2</sub>');
    // Convert superscript: x² → x<sup>2</sup>, x³ → x<sup>3</sup>, etc.
    result = result.replace(/([a-zA-Z\)])([²³⁴⁵⁶⁷⁸⁹⁰]+)/g, '$1<sup>$2</sup>');
    // Convert caret notation: x^2 → x<sup>2</sup> (simple case)
    result = result.replace(/([a-zA-Z\)])\^(\d+)/g, '$1<sup>$2</sup>');
    // Convert function notation: f(x), g(x), etc. to italics
    result = result.replace(/\b([fgFhH])(\([^)]*\))/g, '<em>$1</em>$2');

    return result;
  };

  const thContent = (children: React.ReactNode) => {
    if (typeof children === 'string') {
      return <span dangerouslySetInnerHTML={{ __html: renderMathNotation(children) }} />;
    }
    return children;
  };

  const tdContent = (children: React.ReactNode) => {
    if (typeof children === 'string') {
      return <span dangerouslySetInnerHTML={{ __html: renderMathNotation(children) }} />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 mb-4"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Materi
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-white/20 text-white border-white/30">
              {lessonModule.icon} {lessonModule.title}
            </Badge>
            <Badge variant={isComplete(lessonId) ? "default" : "secondary"}>
              Materi {lesson.order} dari {lessonModule.lessons.length}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {lesson.title}
          </h1>
          <p className="text-blue-100 text-lg">
            {lesson.titleEn}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-white dark:bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Learning Objectives */}
          <Card className="mb-6 border-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Tujuan Pembelajaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content" className="text-base">
                <BookOpen className="w-4 h-4 mr-2" />
                Materi
              </TabsTrigger>
              <TabsTrigger value="examples" className="text-base">
                <Play className="w-4 h-4 mr-2" />
                Contoh Interaktif ({lesson.examples.length})
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6 md:p-8">
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-table:text-sm">
                    <style jsx global>{`
                      /* Light mode table styling */
                      .prose table {
                        background-color: white !important;
                      }
                      .prose thead {
                        background-color: #f8fafc !important;
                      }
                      .prose th {
                        color: #1e293b !important;
                        border-bottom-color: #cbd5e1 !important;
                        font-weight: 600 !important;
                      }
                      .prose thead:hover {
                        background-color: #f8fafc !important;
                      }
                      .prose thead tr:hover {
                        background-color: #f8fafc !important;
                      }
                      .prose th:hover {
                        background-color: #f8fafc !important;
                        color: #1e293b !important;
                      }
                      .prose td {
                        color: #334155 !important;
                        border-bottom-color: #e2e8f0 !important;
                        background-color: white !important;
                      }
                      .prose tr:hover td {
                        background-color: #f1f5f9 !important;
                      }

                      /* Dark mode table styling */
                      [class*="dark"] .prose table,
                      .dark .prose table {
                        background-color: #1e293b !important;
                      }
                      [class*="dark"] .prose thead,
                      .dark .prose thead {
                        background-color: #334155 !important;
                      }
                      [class*="dark"] .prose th,
                      .dark .prose th {
                        color: #f1f5f9 !important;
                        border-bottom-color: #475569 !important;
                        font-weight: 600 !important;
                      }
                      [class*="dark"] .prose thead:hover,
                      .dark .prose thead:hover {
                        background-color: #334155 !important;
                      }
                      [class*="dark"] .prose thead tr:hover,
                      .dark .prose thead tr:hover {
                        background-color: #334155 !important;
                      }
                      [class*="dark"] .prose th:hover,
                      .dark .prose th:hover {
                        background-color: #334155 !important;
                        color: #f1f5f9 !important;
                      }
                      [class*="dark"] .prose td,
                      .dark .prose td {
                        color: #e2e8f0 !important;
                        border-bottom-color: #475569 !important;
                        background-color: #1e293b !important;
                      }
                      [class*="dark"] .prose tr:hover td,
                      .dark .prose tr:hover td {
                        background-color: #334155 !important;
                      }
                    `}</style>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-6">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="ml-2">{children}</li>,
                        code: ({ children }) => (
                          <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-slate-950 dark:bg-slate-950 text-slate-50 dark:text-slate-50 p-4 rounded-lg overflow-x-auto my-4 border border-slate-800 dark:border-slate-800">
                            <code className="font-mono text-sm text-slate-200 dark:text-slate-200">
                              {children}
                            </code>
                          </pre>
                        ),
                        table: ({ children }) => (
                          <div className="my-6 overflow-x-auto rounded-lg border border-slate-300 dark:border-slate-600">
                            <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-600">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead>
                            {children}
                          </thead>
                        ),
                        tbody: ({ children }) => (
                          <tbody>
                            {children}
                          </tbody>
                        ),
                        tr: ({ children }) => (
                          <tr>
                            {children}
                          </tr>
                        ),
                        th: ({ children }) => (
                          <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                            {thContent(children)}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="px-4 py-3 text-sm">
                            {tdContent(children)}
                          </td>
                        ),
                      }}
                    >
                      {lesson.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-6">
              {lesson.examples.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Play className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <h3 className="text-xl font-semibold mb-2">Belum Ada Contoh</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Contoh interaktif untuk materi ini sedang disiapkan.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Example Selector */}
                  {lesson.examples.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {lesson.examples.map((example, index) => (
                        <Button
                          key={example.id}
                          variant={activeExampleIndex === index ? "default" : "outline"}
                          onClick={() => setActiveExampleIndex(index)}
                        >
                          Contoh {index + 1}: {example.title}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Active Example */}
                  {activeExample && (
                    <div className="space-y-4">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>
                              Contoh {activeExampleIndex + 1}: {activeExample.title}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleMarkComplete}
                            >
                              {isComplete(lessonId) ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Selesai
                                </>
                              ) : (
                                <>
                                  <Circle className="w-4 h-4 mr-2" />
                                  Tandai Selesai
                                </>
                              )}
                            </Button>
                          </CardTitle>
                          {activeExample.description && (
                            <CardDescription>{activeExample.description}</CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <CodeEditor
                            initialCode={activeExample.initialCode}
                            onExecute={handleExecute}
                            executionResult={executionResult}
                            isExecuting={isExecuting}
                          />
                        </CardContent>
                      </Card>

                      {/* Hints */}
                      {activeExample.hints && activeExample.hints.length > 0 && (
                        <Card className="border-2 bg-blue-50 dark:bg-blue-950/30">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                              <Lightbulb className="w-5 h-5" />
                              Tips & Petunjuk
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {activeExample.hints.map((hint, index) => (
                                <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    {index + 1}.
                                  </span>
                                  {hint}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {prevLesson ? (
              <Button variant="outline" asChild>
                <Link href={`/lesson/${prevLesson.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {prevLesson.title}
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Button asChild>
                <Link href={`/lesson/${nextLesson.id}`}>
                  {nextLesson.title}
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/">
                  Selesai - Kembali ke Beranda
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
