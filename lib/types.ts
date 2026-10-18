export interface StartupInput {
  idea: string;
  budget: string;
  audience: string;
}

export interface AnalysisResponse {
  score: number;
  summary: string;
  tagline: string;
  pitch: string;
  strategy: string;
  source?: string;
  isFallback?: boolean;
}

export interface AgentTelemetryStep {
  message: string;
  status: 'pending' | 'in-progress' | 'completed';
}
