// Pyodide initialization and management

export async function initializePyodide(packages: string[] = ['numpy', 'matplotlib', 'scipy', 'pandas']) {
  const pyodide = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
  });

  // Load required packages
  await pyodide.loadPackage(packages);

  // Configure matplotlib for browser
  await pyodide.runPythonAsync(`
    import matplotlib
    matplotlib.use('Agg')  # Non-interactive backend
    import matplotlib.pyplot as plt
    import io
    import base64

    def get_plot_as_base64():
        """Get current matplotlib figure as base64 encoded PNG"""
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close('all')  # Close all figures to free memory
        return img_base64

    def has_plots():
        """Check if there are any plots"""
        return len(plt.get_fignums()) > 0

    # Set default figure size
    plt.rcParams['figure.figsize'] = [10, 6]
  `);

  return pyodide;
}
