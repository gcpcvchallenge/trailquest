export interface Puzzle {
  id: number;
  title: string;
  question: {
    fr: string;
    en: string;
  };
  answer: number;
  hint: {
    fr: string;
    en: string;
  };
  image?: string;
}

export interface Chapter {
  id: number;
  title: {
    fr: string;
    en: string;
  };
  puzzles: Puzzle[];
  isUnlocked: boolean;
}

export interface GameState {
  sessionId: string;
  currentChapter: number;
  currentPuzzle: number;
  completedPuzzles: number[];
  hintsUsed: number;
  startTime: number | null;
  puzzleStartTime: number | null;
  score: number;
  unlockedMissions: string[];
}

export type Language = 'fr' | 'en';

export interface Translation {
  fr: string;
  en: string;
}
