'use client';

import { GraduationCap, Mail, Github, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Metode Numerik
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Platform pembelajaran interaktif untuk Metode Numerik dengan eksekusi Python langsung di browser.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Materi Pembelajaran
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pendahuluan & Analisis Galat
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Akar Persamaan
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Sistem Persamaan Linear
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Interpolasi & Integrasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Informasi
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>ELT60214 - Teknik Elektro</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Universitas Negeri Yogyakarta</span>
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2025 Interactive Numerical Methods Learning System. Dibuat dengan ❤️ untuk pembelajaran.
          </p>
        </div>
      </div>
    </footer>
  );
}
