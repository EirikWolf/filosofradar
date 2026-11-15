import type { ThoughtExperiment } from '../deepdive/types';

export type StoryChapter = 'krok' | 'konflikt' | 'fasit' | 'refleksjon';

export interface StorySlide {
  chapter: StoryChapter;
  chapterTitle: string;
  chapterNumber: number; // 1 til 4
  durationSeconds: number; // typisk 9-12s
  badge: string;
  headline: string;
  subheadline?: string;
  body: string;
  highlight?: {
    label: string;
    text: string;
    icon?: string;
  };
  reflectionPrompt?: string;
}

export interface StoryScript {
  experimentTitle: string;
  philosopherName: string;
  philosopherId: string;
  image?: string;
  icon?: string;
  totalDurationSeconds: number;
  slides: StorySlide[];
}

export interface StoryModalProps {
  experiment: ThoughtExperiment;
  philosopherName: string;
  philosopherId: string;
  onClose: () => void;
  onExploreDeepDive?: () => void;
}
