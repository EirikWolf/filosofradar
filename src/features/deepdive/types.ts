export interface MajorWork {
  title: string;
  year?: number;
  description: string;
  url?: string;
  urlLabel?: string;
}

export interface ThoughtExperiment {
  title: string;
  /**
   * Nøkkelen til den kuraterte fortellingen i BESPOKE_STORIES (storyData.ts), f.eks.
   * 'platon:hulelignelsen'. Uten nøkkel får tankeeksperimentet en generert fortelling.
   * Koblingen er eksplisitt (ARK-02): før ble den gjettet ut fra tittelen, og en
   * omskrevet tittel brøt den uten at noe ble rødt.
   */
  storyKey?: string;
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
