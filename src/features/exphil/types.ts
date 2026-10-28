export type ExphilPillar = 'etikk' | 'erkjennelse' | 'menneskesyn';

export interface ExphilProfile {
  philosopherId: string;
  pillar: ExphilPillar;
  pillarLabel: string;
  subPillar: string;
  coreTakeaway: string;
  examKeywords: string[];
  commonPitfall: string;
  typicalQuestions: string[];
}

export interface ExphilDuelParty {
  philosopherId: string;
  philosopherName: string;
  positionName: string;
  mainThesis: string;
  keyArguments: string[];
  classicExample: string;
  vulnerabilities: string[];
}

export interface ExphilDuel {
  id: string;
  title: string;
  topic: string;
  pillar: ExphilPillar;
  examPrompt: string;
  clarifications: { term: string; explanation: string }[];
  sideA: ExphilDuelParty;
  sideB: ExphilDuelParty;
  synthesisAndComparison: string;
  gradingAdvice: string;
}

export interface ExphilFlashcard {
  id: string;
  concept: string;
  pillar: ExphilPillar;
  pillarLabel?: string;
  philosopherId?: string;
  philosopherName?: string;
  definition: string;
  explanation: string;
  examTip: string;
  example: string;
}

export interface ExphilQuizQuestion {
  id: string;
  question: string;
  pillar: ExphilPillar;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedPhilosopherId?: string;
}
