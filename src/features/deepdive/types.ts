export interface MajorWork {
  title: string;
  year?: number;
  description: string;
}

export interface ThoughtExperiment {
  title: string;
  description: string;
  takeaway: string;
}

export interface PhilosopherDeepDive {
  philosopherId: string;
  historicalContext: string;
  majorWorks: MajorWork[];
  thoughtExperiments?: ThoughtExperiment[];
  receptionAndCritique: string;
}
