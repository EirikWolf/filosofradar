export interface MajorWork {
  title: string;
  year?: number;
  description: string;
  url?: string;
  urlLabel?: string;
}

export interface ThoughtExperiment {
  title: string;
  description: string;
  takeaway: string;
  image?: string;
  icon?: string;
}

export interface PhilosopherDeepDive {
  philosopherId: string;
  historicalContext: string;
  majorWorks: MajorWork[];
  thoughtExperiments?: ThoughtExperiment[];
  receptionAndCritique: string;
}
