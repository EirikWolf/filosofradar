export type EthicalSchool =
  | 'consequentialism' // Utilitarisme / Konsekvensetikk
  | 'deontology'       // Pliktetikk / Deontologi
  | 'virtue'           // Dydsetikk
  | 'care'             // Nærhets- og omsorgsetikk
  | 'existentialism';  // Eksistensialisme / Frihet

export interface PhilosopherReaction {
  philosopherId: string;
  philosopherName: string;
  avatar?: string;
  stance: 'agree' | 'disagree' | 'nuance';
  verdict: string; // Kort oppsummering, f.eks: "Fullstendig uenig!" eller "Riktig valg!"
  comment: string;
  quote?: string;
  exphilConcept: string; // f.eks. "Kategorisk imperativ", "Nytteprinsippet", "Fronesis (Praktisk klokskap)"
}

export interface DilemmaOption {
  id: string;
  title: string;
  actionText: string;
  description: string;
  primarySchool: EthicalSchool;
  scores: Record<EthicalSchool, number>; // 0 til 10 for vekting
  reactions: PhilosopherReaction[];
}

export interface EthicalDilemma {
  id: string;
  title: string;
  subtitle: string;
  category: 'Klassisk dilemma' | 'Medisinsk etikk' | 'Teknologi & AI' | 'Plikt vs. Løgn' | 'Klima & Fremtid';
  icon: string;
  image?: string;
  scenario: string;
  stakeholders: string[];
  options: [DilemmaOption, DilemmaOption] | [DilemmaOption, DilemmaOption, DilemmaOption];
  examContext: string;
}

export interface UserEthicsProfile {
  scores: Record<EthicalSchool, number>;
  totalDecisions: number;
  dominantSchool: EthicalSchool;
  philosopherTwinId: string;
  philosopherTwinName: string;
  twinTitle: string;
  twinDescription: string;
}
