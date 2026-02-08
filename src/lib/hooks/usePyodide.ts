// Custom hook for Pyodide state management

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { initializePyodide } from '../pyodide/pyodide';
import { executeCode } from '../pyodide/executor';
import type { ExecutionResult } from '../content/types';

export interface PyodideState {
  pyodide: any | null;
  loading: boolean;
  ready: boolean;
  error: string | null;
  progress: number;
  executeCode: (code: string, timeout?: number) => Promise<ExecutionResult>;
}

export function usePyodide(): PyodideState {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Store pyodide reference to avoid re-initialization
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPyodide() {
      try {
        // Check if Pyodide script is loaded
        if (typeof window.loadPyodide === 'undefined') {
          // Load Pyodide script
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.async = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (mounted) {
          setProgress(20);

          // Initialize Pyodide
          const pyodideInstance = await initializePyodide(['numpy', 'matplotlib']);

          if (mounted) {
            pyodideRef.current = pyodideInstance;
            setPyodide(pyodideInstance);
            setProgress(100);
            setReady(true);
            setLoading(false);
          }
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Gagal memuat Pyodide';
          setError(errorMessage);
          setLoading(false);
        }
      }
    }

    loadPyodide();

    return () => {
      mounted = false;
    };
  }, []);

  const execute = useCallback(
    async (code: string, timeout: number = 30000): Promise<ExecutionResult> => {
      if (!pyodideRef.current) {
        return {
          output: '',
          error: 'Pyodide belum siap. Silakan tunggu hingga inisialisasi selesai.',
          plots: [],
          success: false,
        };
      }

      return executeCode(pyodideRef.current, code, timeout);
    },
    []
  );

  return {
    pyodide,
    loading,
    ready,
    error,
    progress,
    executeCode: execute,
  };
}
