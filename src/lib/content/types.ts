// Content type definitions for the Numerical Methods course

export interface Module {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  order: number;
  lessons: Lesson[];
  icon?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  titleEn: string;
  order: number;
  objectives: string[];
  content: string;
  pseudoCode?: string;  // Pseudo code algoritma sebelum implementasi Python
  examples: InteractiveExample[];
  visualization?: VisualizationConfig;
}

export interface InteractiveExample {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  initialCode: string;
  expectedOutput?: string;
  hints?: string[];
}

export interface VisualizationConfig {
  type: 'line' | 'scatter' | 'bar' | 'animation';
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface PlotData {
  id: string;
  imageData: string;
}

export interface ExecutionResult {
  output: string;
  error?: string;
  plots: PlotData[];
  success: boolean;
}

export interface ProgressState {
  completedLessons: Set<string>;
  completedModules: Set<string>;
  totalProgress: number;
}
