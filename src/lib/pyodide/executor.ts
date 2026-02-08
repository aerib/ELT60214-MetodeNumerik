// Code execution logic for Pyodide

import type { ExecutionResult, PlotData } from '../content/types';

export async function executeCode(
  pyodide: any,
  code: string,
  timeout: number = 30000
): Promise<ExecutionResult> {
  try {
    // Capture stdout
    await pyodide.runPythonAsync(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
      sys.stderr = StringIO()
    `);

    // Execute user code with timeout
    const execPromise = pyodide.runPythonAsync(code);

    // Add timeout protection
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Waktu eksekusi habis (timeout). Periksa apakah ada loop tak terbatas.')), timeout)
    );

    await Promise.race([execPromise, timeoutPromise]);

    // Get captured output
    const output = pyodide.runPython('sys.stdout.getvalue()') as string;
    const errorOutput = pyodide.runPython('sys.stderr.getvalue()') as string;

    // Check for plots
    const hasPlots = pyodide.runPython('has_plots()') as boolean;
    const plots: PlotData[] = [];

    if (hasPlots) {
      const plotBase64 = pyodide.runPython('get_plot_as_base64()') as string;
      plots.push({
        id: Date.now().toString(),
        imageData: `data:image/png;base64,${plotBase64}`,
      });
    }

    return {
      output: output || '',
      error: errorOutput || undefined,
      plots,
      success: true,
    };
  } catch (error) {
    // Get any error output
    let errorOutput = '';
    try {
      errorOutput = pyodide.runPython('sys.stderr.getvalue()') as string;
    } catch (e) {
      // Ignore if pyodide state is corrupted
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      output: '',
      error: errorOutput || errorMessage,
      plots: [],
      success: false,
    };
  }
}
