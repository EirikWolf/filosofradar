export interface TourStop {
  philosopherId: string;
  narrativeTitle: string;
  narrativeText: string;
  keyQuestion: string;
}

export interface Tour {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  era: string;
  durationMinutes: number;
  description: string;
  stops: TourStop[];
}
