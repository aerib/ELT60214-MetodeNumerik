// Custom hook for progress tracking

'use client';

import { useState, useEffect, useCallback, useTransition, startTransition } from 'react';
import type { ProgressState } from '../content/types';

const STORAGE_KEY = 'numerical-methods-progress';

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [totalProgress, setTotalProgress] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const lessonsSet = new Set(data.completedLessons || []);
        const modulesSet = new Set(data.completedModules || []);
        const progress = data.totalProgress || 0;

        // Batch state updates
        startTransition(() => {
          setCompletedLessons(lessonsSet);
          setCompletedModules(modulesSet);
          setTotalProgress(progress);
        });
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const data = {
      completedLessons: Array.from(completedLessons),
      completedModules: Array.from(completedModules),
      totalProgress,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [completedLessons, completedModules, totalProgress]);

  const markComplete = useCallback((lessonId: string, moduleId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      newSet.add(lessonId);

      // Check if all lessons in the module are complete
      const moduleLessonIds = getAllLessonIdsForModule(moduleId);
      const allComplete = moduleLessonIds.every((id) => newSet.has(id));

      if (allComplete) {
        setCompletedModules((prevModules) => {
          const newModules = new Set(prevModules);
          newModules.add(moduleId);
          return newModules;
        });
      }

      return newSet;
    });
  }, []);

  const markIncomplete = useCallback((lessonId: string, moduleId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      newSet.delete(lessonId);

      // Remove module from completed if any lesson is incomplete
      setCompletedModules((prevModules) => {
        const newModules = new Set(prevModules);
        newModules.delete(moduleId);
        return newModules;
      });

      return newSet;
    });
  }, []);

  const isComplete = useCallback((lessonId: string) => {
    return completedLessons.has(lessonId);
  }, [completedLessons]);

  // This would be updated based on total number of lessons
  const updateTotalProgress = useCallback((totalLessons: number) => {
    const progress = (completedLessons.size / totalLessons) * 100;
    setTotalProgress(Math.round(progress));
  }, [completedLessons.size]);

  return {
    completedLessons,
    completedModules,
    totalProgress,
    markComplete,
    markIncomplete,
    isComplete,
    updateTotalProgress,
  };
}

// Helper function to get all lesson IDs for a module
// This would be imported from content data
function getAllLessonIdsForModule(moduleId: string): string[] {
  // This is a placeholder - in reality, this would query the content data
  return [];
}
