export type QuestionType = 'listening' | 'structure' | 'reading';

export interface Question {
  id: string;
  number: number;
  part: 1 | 2 | 3;
  type: QuestionType;
  prompt: string;
  options: {
    key: 'a' | 'b' | 'c' | 'd';
    text: string;
  }[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  audioScript?: string;
  audioSpeaker?: string;
  passageId?: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  questionIds: string[];
}

export interface ListeningAudioExtract {
  id: string;
  title: string;
  script: string;
  speakers?: { speaker: string; text: string }[];
  questionIds: string[];
}

export interface TestPackage {
  id: string;
  title: string;
  shortDescription: string;
  badge: string;
  targetFocus: string;
  listeningPassages: ListeningAudioExtract[];
  readingPassages: ReadingPassage[];
  questions: Question[];
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  date: string;
  mode: 'exam' | 'study';
  userAnswers: Record<string, 'a' | 'b' | 'c' | 'd'>;
  flaggedQuestions: string[];
  timeSpentSeconds: number;
  
  // Scores
  listeningRaw: number;
  listeningTotal: number;
  listeningScaled: number;

  structureRaw: number;
  structureTotal: number;
  structureScaled: number;

  readingRaw: number;
  readingTotal: number;
  readingScaled: number;

  totalScore: number;
  isPassed: boolean; // >= 450
  scoreGap: number; // difference from 450
}

