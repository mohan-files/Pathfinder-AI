export interface RecommendedRole {
  role: string;
  fit_percentage: string;
  justification: string;
}

export interface LearningItem {
  week: string;
  focus: string;
  resources: string;
}

export interface CareerAnalysis {
  recommended_roles: RecommendedRole[];
  current_skills: string[];
  missing_skills: string[];
  learning_roadmap: LearningItem[];
  portfolio_projects: string[];
  resume_improvements: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}