'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, CheckCircle2, ChevronRight, Play, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { modules, getAllLessons } from '@/lib/content/modules';
import { useProgress } from '@/lib/hooks/useProgress';
import { usePyodide } from '@/lib/hooks/usePyodide';

export default function Home() {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1', 'module-2']));
  const { totalProgress, isComplete, completedModules } = useProgress();
  const { loading, ready, error, progress } = usePyodide();
  const totalLessons = getAllLessons().length;

  // Update total progress
  useEffect(() => {
    // Update progress when component mounts
  }, []);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 text-white">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <BookOpen className="w-4 h-4 mr-2" />
              ELT60214 - Teknik Elektro
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Metode Numerik
              <br />
              <span className="text-blue-200 dark:text-blue-300">Interactive Learning System</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Pelajari metode numerik dengan interaktif. Jalankan kode Python langsung di browser tanpa perlu instalasi apa pun.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="#modules">
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Belajar
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
                <a href="#about">
                  Tentang Course
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />
      </section>

      {/* Pyodide Status */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {loading && !ready && (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold">Memuat Python Runtime...</p>
                    <Progress value={progress} className="mt-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {progress}% - Mohon tunggu sebentar
                    </p>
                  </div>
                </>
              )}
              {ready && (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      Python Runtime Siap!
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Anda dapat menjalankan kode Python di setiap contoh interaktif
                    </p>
                  </div>
                </>
              )}
              {error && (
                <>
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      Gagal Memuat Python
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {error}
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Progress Overview */}
      <section className="container mx-auto px-4 py-8">
        <Card className="border-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Progres Pembelajaran Anda
                  </h3>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {totalProgress}%
                  </span>
                </div>
                <Progress value={totalProgress} className="h-3" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {completedModules.size} dari {modules.length} modul selesai • {totalLessons} materi pembelajaran
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Course Modules */}
      <section id="modules" className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Materi Pembelajaran
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Sembilan modul komprehensif mencakup seluruh materi metode numerik untuk teknik elektro
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`border-2 transition-all hover:shadow-lg ${
                  expandedModules.has(module.id) ? 'border-blue-500' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <CardHeader
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{module.icon}</span>
                      <div>
                        <CardTitle className="text-xl">
                          {module.title}
                          <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                            ({module.titleEn})
                          </span>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {module.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {module.lessons.length > 0 && (
                        <Badge variant={completedModules.has(module.id) ? "default" : "secondary"}>
                          {module.lessons.length} Materi
                        </Badge>
                      )}
                      {completedModules.has(module.id) && (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      )}
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          expandedModules.has(module.id) ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>
                </CardHeader>

                {expandedModules.has(module.id) && module.lessons.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="space-y-2 mt-4">
                      {module.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/lesson/${lesson.id}`}
                          className="block"
                        >
                          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <div className="flex items-center gap-3">
                              {isComplete(lesson.id) ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 flex-shrink-0" />
                              )}
                              <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                  {lesson.title}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {lesson.titleEn}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          </div>
                        </Link>
                      ))}
                    </div>

                    {module.lessons.length === 0 && (
                      <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Materi Sedang Disiapkan</AlertTitle>
                        <AlertDescription>
                          Konten untuk modul ini sedang dalam pengembangan.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Tentang Course Ini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300">
                Course ini dirancang untuk mendukung pembelajaran <strong>Metode Numerik (ELT60214)</strong> di
                Program Studi Teknik Elektro, Universitas Negeri Yogyakarta. Platform ini memungkinkan mahasiswa untuk:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Belajar teori dengan contoh interaktif yang dapat dimodifikasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Menjalankan kode Python langsung di browser menggunakan Pyodide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Memvisualisasikan hasil komputasi dengan grafik interaktif</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Memahami aplikasi nyata dalam teknik elektro (rangkaian, sistem daya, dll)</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  Dosen Pengampu: Dr.Eng. Ir. Aji Ery Burhandenny, ST., M.AIT. & Deny Budi Hertanto, M.Kom.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
