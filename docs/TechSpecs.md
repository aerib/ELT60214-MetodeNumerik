# Technical Specifications
# Interactive Numerical Methods Learning System

## 1. Document Information

| Field | Value |
|-------|-------|
| Product Name | Numerical Methods Interactive Learning System |
| Version | 1.0.0 |
| Course | Metode Numerik (ELT60214) |
| Date | 2025-01-14 |
| Author | Z.ai Development Team |

## 2. Technology Stack

### 2.1 Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.x | React framework with App Router |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **React** | 19.x | UI library |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **shadcn/ui** | Latest | UI component library (New York style) |
| **Pyodide** | Latest | Python runtime in WebAssembly |
| **Lucide React** | Latest | Icon library |

### 2.2 Python Libraries (via Pyodide)

| Library | Version | Purpose |
|---------|---------|---------|
| **NumPy** | Latest | Numerical computations |
| **Matplotlib** | Latest | Plotting and visualization |
| **SciPy** | Latest | Scientific computing |
| **Pandas** | Latest | Data manipulation |

### 2.3 Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting |
| **Prettier** | Code formatting |
| **TypeScript** | Type checking |
| **Bun** | Package manager and runtime |

## 3. System Architecture

### 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │   React UI   │  │  Pyodide     │      │
│  │   App Router │  │  Components  │  │  (WASM)      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                              │                               │
│                        ┌──────▼──────┐                       │
│                        │  Code Editor │                      │
│                        │  + Output    │                      │
│                        └─────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Pyodide CDN    │
                    │  (Python +      │
                    │   NumPy, etc.)  │
                    └─────────────────┘
```

### 3.2 Key Architectural Decisions

#### Decision 1: Client-Side Only Architecture
**Rationale**:
- No server costs for Python execution
- Faster development (no backend needed)
- Privacy (code never leaves browser)
- Simplifies deployment

**Trade-offs**:
- Limited by browser resources
- Pyodide initial load time (~5-10s)
- No server-side persistence (MVP uses localStorage)

#### Decision 2: Pyodide for Python Execution
**Rationale**:
- Full Python support in browser
- Mature and well-maintained
- Good performance for numerical computing
- Supports NumPy, Matplotlib, SciPy

**Trade-offs**:
- Large initial download (~10MB)
- Not suitable for very long-running computations
- Requires WebAssembly support

#### Decision 3: Next.js App Router
**Rationale**:
- Modern React framework
- Server components for performance
- Built-in routing and optimization
- Excellent TypeScript support

**Trade-offs**:
- Learning curve for team
- More complex than simple React

## 4. Project Structure

```
my-project/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   └── modules/                    # Module pages
│   │       ├── [moduleId]/
│   │       │   ├── page.tsx            # Module overview
│   │       │   └── lessons/
│   │       │       └── [lessonId]/
│   │       │           └── page.tsx    # Individual lesson
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   ├── code-editor/
│   │   │   ├── CodeEditor.tsx          # Main code editor
│   │   │   ├── OutputPanel.tsx         # Output display
│   │   │   └── PyodideLoader.tsx       # Pyodide initialization
│   │   ├── visualization/
│   │   │   ├── PlotViewer.tsx          # Matplotlib plot viewer
│   │   │   ├── ChartContainer.tsx      # Chart wrapper
│   │   │   └── AnimationPlayer.tsx     # Animation controls
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Top navigation
│   │   │   ├── Sidebar.tsx             # Module navigation
│   │   │   ├── Footer.tsx              # Footer with sticky positioning
│   │   │   └── ProgressBar.tsx         # Progress indicator
│   │   └── lesson/
│   │       ├── LessonContent.tsx       # Lesson content renderer
│   │       ├── MathFormula.tsx         # LaTeX formula renderer
│   │       ├── InteractiveExample.tsx  # Interactive example wrapper
│   │       └── Quiz.tsx                # Quiz component (P1)
│   │
│   ├── lib/
│   │   ├── pyodide/
│   │   │   ├── pyodide.ts              # Pyodide wrapper
│   │   │   ├── executor.ts             # Code execution logic
│   │   │   └── packages.ts             # Python package management
│   │   ├── content/
│   │   │   ├── modules.ts              # Module definitions
│   │   │   ├── lessons.ts              # Lesson content
│   │   │   └── examples.ts             # Code examples
│   │   ├── hooks/
│   │   │   ├── usePyodide.ts           # Pyodide state management
│   │   │   ├── useProgress.ts          # Progress tracking
│   │   │   └── useCodeExecution.ts     # Code execution state
│   │   ├── utils/
│   │   │   ├── formatting.ts           # Text formatting utilities
│   │   │   ├── validation.ts           # Input validation
│   │   │   └── storage.ts              # localStorage wrapper
│   │   └── db.ts                       # Database client (if needed)
│   │
│   └── styles/
│       └── code-editor.css             # Code editor styles
│
├── public/
│   └── images/                         # Static images
│
├── docs/                                # Documentation
│   ├── PRD.md
│   ├── MVP.md
│   └── TechSpecs.md
│
├── prisma/
│   └── schema.prisma                    # Database schema (if needed)
│
├── db/                                  # Database files
│
├── components.json                      # shadcn/ui config
├── next.config.js                       # Next.js config
├── tailwind.config.ts                   # Tailwind config
├── tsconfig.json                        # TypeScript config
└── package.json                         # Dependencies
```

## 5. Component Specifications

### 5.1 Core Components

#### 5.1.1 CodeEditor

**Purpose**: Editable Python code with syntax highlighting

**Props**:
```typescript
interface CodeEditorProps {
  initialCode: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
  language?: 'python';
}
```

**State**:
- `code`: string (current code content)
- `selection`: {start: number, end: number}

**Features**:
- Syntax highlighting (using CodeMirror or similar)
- Line numbers
- Auto-indentation
- Tab key handling (2 spaces)
- Undo/redo (browser native)

**Implementation Notes**:
- Use lightweight editor library (Monaco Editor or CodeMirror)
- Python grammar for syntax highlighting
- Monospaced font required

---

#### 5.1.2 PyodideLoader

**Purpose**: Initialize and manage Pyodide runtime

**Props**:
```typescript
interface PyodideLoaderProps {
  onReady: (pyodide: any) => void;
  onError: (error: Error) => void;
  packages?: string[];  // Python packages to load
}
```

**State**:
- `loading`: boolean
- `ready`: boolean
- `error`: Error | null
- `progress`: number (0-100)

**Features**:
- Load Pyodide from CDN
- Load required Python packages
- Handle loading errors
- Show progress indicator

**Implementation Notes**:
- Load from: `https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js`
- Pre-load: numpy, matplotlib, scipy, pandas
- Cache Pyodide in memory for performance

---

#### 5.1.3 OutputPanel

**Purpose**: Display code execution results

**Props**:
```typescript
interface OutputPanelProps {
  output: string;
  error?: string;
  plots?: PlotData[];
  loading?: boolean;
}
```

**State**:
- `activeTab`: 'output' | 'plots' | 'error'

**Features**:
- Display stdout/stderr
- Display Matplotlib plots
- Syntax highlighting for output
- Copy output to clipboard
- Clear output button
- Tab switching (output/plots/error)

**Implementation Notes**:
- Use pre-formatted text for code output
- Render plots as base64 images from Matplotlib
- Handle large outputs with pagination

---

#### 5.1.4 PlotViewer

**Purpose**: Display Matplotlib plots

**Props**:
```typescript
interface PlotViewerProps {
  imageData: string;  // base64 or blob URL
  title?: string;
  downloadable?: boolean;
}
```

**Features**:
- Display plot image
- Download as PNG
- Zoom in/out
- Responsive sizing

---

#### 5.1.5 ProgressBar

**Purpose**: Show course/module completion progress

**Props**:
```typescript
interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
}
```

**Features**:
- Visual progress bar
- Percentage label
- Animated on change
- Color coding (complete/in-progress)

---

#### 5.1.6 ModuleCard

**Purpose**: Display module information and navigation

**Props**:
```typescript
interface ModuleCardProps {
  module: Module;
  progress: number;
  onClick: () => void;
}
```

**Features**:
- Module title and description
- Lesson count
- Progress indicator
- Expandable lesson list
- Click to navigate

---

### 5.2 Lesson Components

#### 5.2.1 LessonContent

**Purpose**: Render lesson content with structured sections

**Props**:
```typescript
interface LessonContentProps {
  lesson: Lesson;
}
```

**Features**:
- Render Markdown content
- Render LaTeX formulas
- Render code blocks
- Render interactive examples
- Responsive layout

**Implementation Notes**:
- Use react-markdown for Markdown
- Use KaTeX or MathJax for LaTeX
- Custom code block renderer

---

#### 5.2.2 InteractiveExample

**Purpose**: Wrapper for code execution examples

**Props**:
```typescript
interface InteractiveExampleProps {
  title: string;
  description: string;
  initialCode: string;
  expectedOutput?: string;
}
```

**Features**:
- Code editor
- Run button
- Output display
- Reset button
- Copy code button
- Explanation/tips

---

#### 5.2.3 MathFormula

**Purpose**: Render LaTeX mathematical formulas

**Props**:
```typescript
interface MathFormulaProps {
  formula: string;
  display?: boolean;  // block or inline
}
```

**Implementation Notes**:
- Use KaTeX for performance
- Support common LaTeX commands
- Fallback to plain text if error

---

## 6. Data Structures

### 6.1 Content Data Models

#### Module
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}
```

#### Lesson
```typescript
interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  objectives: string[];  // CPMK
  content: string;  // Markdown
  examples: InteractiveExample[];
  visualization?: VisualizationConfig;
  quiz?: Quiz;  // P1 feature
}
```

#### InteractiveExample
```typescript
interface InteractiveExample {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput?: string;
  hints?: string[];
}
```

#### VisualizationConfig
```typescript
interface VisualizationConfig {
  type: 'line' | 'scatter' | 'bar' | 'animation';
  data?: any;
  options?: any;
}
```

### 6.2 State Management

#### UsePyodide Hook
```typescript
interface PyodideState {
  pyodide: any | null;
  loading: boolean;
  ready: boolean;
  error: Error | null;
  executeCode: (code: string) => Promise<ExecutionResult>;
}

interface ExecutionResult {
  output: string;
  error?: string;
  plots: PlotData[];
  success: boolean;
}
```

#### UseProgress Hook
```typescript
interface ProgressState {
  completedLessons: Set<string>;
  completedModules: Set<string>;
  totalProgress: number;
  markComplete: (lessonId: string) => void;
  markIncomplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
}
```

## 7. Pyodide Integration

### 7.1 Initialization

```typescript
// lib/pyodide/pyodide.ts
import { loadPyodide } from 'pyodide';

export async function initializePyodide(packages: string[] = ['numpy', 'matplotlib', 'scipy', 'pandas']) {
  const pyodide = await loadPyodide({
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
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close()
        return img_base64
  `);

  return pyodide;
}
```

### 7.2 Code Execution

```typescript
// lib/pyodide/executor.ts
export async function executeCode(pyodide: any, code: string, timeout: number = 30000): Promise<ExecutionResult> {
  try {
    // Capture stdout
    await pyodide.runPythonAsync(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
    `);

    // Execute user code
    const execPromise = pyodide.runPythonAsync(code);

    // Add timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Execution timeout')), timeout)
    );

    await Promise.race([execPromise, timeoutPromise]);

    // Get captured output
    const output = pyodide.runPython('sys.stdout.getvalue()') as string;

    // Check for plots
    const hasPlots = pyodide.runPython('plt.get_fignums().length > 0') as boolean;
    const plots: PlotData[] = [];

    if (hasPlots) {
      const plotBase64 = pyodide.runPython('get_plot_as_base64()') as string;
      plots.push({
        id: Date.now().toString(),
        imageData: `data:image/png;base64,${plotBase64}`,
      });
    }

    return {
      output,
      plots,
      success: true,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error',
      plots: [],
      success: false,
    };
  }
}
```

## 8. API Design (Client-Side)

### 8.1 Content API

Since this is client-side only, content is served as static data:

```typescript
// lib/content/modules.ts
export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Pendahuluan & Analisis Galat',
    description: 'Dasar metode numerik dan analisis galat',
    order: 1,
    lessons: [/* ... */],
  },
  // ... more modules
];
```

### 8.2 Storage API

```typescript
// lib/utils/storage.ts
export const storage = {
  getProgress(): ProgressState {
    const data = localStorage.getItem('course-progress');
    return data ? JSON.parse(data) : { completedLessons: new Set(), completedModules: new Set(), totalProgress: 0 };
  },

  saveProgress(state: ProgressState): void {
    localStorage.setItem('course-progress', JSON.stringify(state));
  },

  getCode(lessonId: string, exampleId: string): string {
    return localStorage.getItem(`code-${lessonId}-${exampleId}`) || '';
  },

  saveCode(lessonId: string, exampleId: string, code: string): void {
    localStorage.setItem(`code-${lessonId}-${exampleId}`, code);
  },
};
```

## 9. Performance Optimization

### 9.1 Pyodide Optimization

**Strategy 1: Singleton Pattern**
- Initialize Pyodide once and reuse
- Store in React context or global state

**Strategy 2: Lazy Loading**
- Load Pyodide only when needed
- Show loading indicator during initialization

**Strategy 3: Package Caching**
- Use Pyodide's built-in caching
- Load only required packages

### 9.2 Code Optimization

**Strategy 1: Code Splitting**
- Use Next.js dynamic imports
- Load lesson content on demand

**Strategy 2: Image Optimization**
- Use Next.js Image component
- Optimize plot exports (appropriate DPI)

**Strategy 3: Memoization**
- Use React.memo for expensive components
- Memoize computed values

### 9.3 Bundle Size

**Target Bundle Sizes**:
- Initial JS bundle: < 200 KB (gzipped)
- Pyodide: ~10 MB (loaded from CDN)
- Total initial load: < 1 MB (without Pyodide)

## 10. Security Considerations

### 10.1 Client-Side Execution

**Benefits**:
- Code never leaves browser
- No server-side security risks
- Privacy preserved

**Considerations**:
- Resource limits needed (CPU, memory)
- Timeout for infinite loops
- Error messages should not expose internals

### 10.2 Input Validation

```typescript
// lib/utils/validation.ts
export function validatePythonCode(code: string): { valid: boolean; error?: string } {
  // Check for dangerous operations
  const dangerousPatterns = [
    /import\s+os/,
    /import\s+subprocess/,
    /__import__\s*\(/,
    /eval\s*\(/,
    /exec\s*\(/,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      return {
        valid: false,
        error: 'Operation not supported in this environment',
      };
    }
  }

  return { valid: true };
}
```

## 11. Testing Strategy

### 11.1 Unit Tests

**Tools**: Jest + React Testing Library

**Coverage**:
- Utils and helpers: 100%
- Hooks: 80%+
- Components: 70%+

### 11.2 Integration Tests

**Scenarios**:
- Code execution flow
- Progress tracking
- Module navigation
- Error handling

### 11.3 E2E Tests

**Tool**: Playwright (optional for MVP)

**Critical Paths**:
- Load landing page
- Navigate to lesson
- Execute code
- View plot
- Mark lesson complete

## 12. Deployment

### 12.1 Build Process

```bash
# Development
bun run dev

# Production build
bun run build

# Start production server
bun start
```

### 12.2 Environment Variables

```env
# .env.local
NEXT_PUBLIC_APP_NAME="Numerical Methods Learning System"
NEXT_PUBLIC_PYODIDE_VERSION="0.24.1"
```

### 12.3 Hosting

**Requirements**:
- Node.js 18+
- Static file serving (for Next.js export) or
- Node.js server (for SSR)

**Options**:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting

## 13. Monitoring & Logging

### 13.1 Client-Side Logging

```typescript
// lib/utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
  },
  event: (eventName: string, data?: any) => {
    console.log(`[EVENT] ${eventName}`, data);
  },
};
```

### 13.2 Performance Monitoring

- Track Pyodide load time
- Track code execution time
- Track page load times
- Track error rates

## 14. Accessibility

### 14.1 WCAG 2.1 AA Compliance

**Requirements**:
- Keyboard navigation
- Screen reader support
- Color contrast (4.5:1 minimum)
- Focus indicators
- ARIA labels

### 14.2 Implementation

```tsx
// Example accessible button
<button
  onClick={handleRun}
  aria-label="Jalankan kode"
  disabled={!pyodideReady}
  className="..."
>
  <Play className="w-4 h-4 mr-2" aria-hidden="true" />
  Jalankan
</button>
```

## 15. Browser Compatibility

### 15.1 Target Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Primary target |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |

### 15.2 Feature Detection

```typescript
// lib/utils/browser.ts
export function checkBrowserSupport(): { supported: boolean; reason?: string } {
  // Check WebAssembly
  if (typeof WebAssembly === 'undefined') {
    return { supported: false, reason: 'WebAssembly tidak didukung' };
  }

  // Check SharedArrayBuffer (needed for some Pyodide features)
  if (typeof SharedArrayBuffer === 'undefined') {
    return { supported: false, reason: 'SharedArrayBuffer tidak didukung' };
  }

  return { supported: true };
}
```

## 16. Development Workflow

### 16.1 Git Workflow

```
main (production)
  └── develop (staging)
      └── feature/* (feature branches)
      └── bugfix/* (bug fixes)
```

### 16.2 Code Review Checklist

- [ ] TypeScript types correct
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Accessibility checked
- [ ] Code execution tested
- [ ] Error handling verified
- [ ] Comments added where needed

## 17. Troubleshooting Guide

### 17.1 Common Issues

**Issue 1: Pyodide fails to load**
- Check internet connection
- Verify CDN URL
- Check browser console for CORS errors
- Try different CDN mirror

**Issue 2: Code execution timeout**
- Reduce computation complexity
- Increase timeout if needed
- Check for infinite loops

**Issue 3: Plots not displaying**
- Check matplotlib backend configuration
- Verify plot is being generated
- Check base64 encoding
- Clear figure before generating new plot

**Issue 4: Memory issues**
- Clear Pyodide globals between runs
- Limit array sizes
- Restart Pyodide if needed

## 18. Appendix

### 18.1 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Pyodide Documentation](https://pyodide.org/en/stable/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### 18.2 Glossary

- **Pyodide**: Python runtime compiled to WebAssembly
- **WASM**: WebAssembly - binary instruction format
- **CPMK**: Capaian Pembelajaran Mata Kuliah (Course Learning Outcomes)
- **MPPT**: Maximum Power Point Tracking
- **MVP**: Minimum Viable Product
- **P0/P1**: Priority levels (Must-have / Nice-to-have)

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-01-14 | Z.ai | Initial technical specifications |
