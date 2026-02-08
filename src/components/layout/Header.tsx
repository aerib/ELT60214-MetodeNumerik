'use client';

import Link from 'next/link';
import { BookOpen, GraduationCap, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Metode Numerik
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                Interactive Learning System
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Materi
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
