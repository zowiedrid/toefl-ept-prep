import { TestResult, TestPackage } from './types';
import { test1 } from './test1';
import { test2 } from './test2';
import { 
  calculateScaledListening, 
  calculateScaledStructure, 
  calculateScaledReading, 
  calculateToeflScore 
} from './scoring';

function generateAttempt(
  id: string,
  test: TestPackage,
  date: string,
  targetCorrect: { part1: number; part2: number; part3: number },
  flaggedIds: string[],
  timeSpentSeconds: number
): TestResult {
  const userAnswers: Record<string, 'a' | 'b' | 'c' | 'd'> = {};
  
  const p1Questions = test.questions.filter(q => q.part === 1);
  const p2Questions = test.questions.filter(q => q.part === 2);
  const p3Questions = test.questions.filter(q => q.part === 3);

  let p1Correct = 0;
  let p2Correct = 0;
  let p3Correct = 0;

  const alternateOption = (correct: 'a' | 'b' | 'c' | 'd'): 'a' | 'b' | 'c' | 'd' => {
    const opts: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
    return opts.find(o => o !== correct) || 'a';
  };

  // Part 1 Answers
  p1Questions.forEach((q, idx) => {
    // Distribute correct answers evenly
    const shouldBeCorrect = idx < targetCorrect.part1;
    if (shouldBeCorrect) {
      userAnswers[q.id] = q.correctAnswer;
      p1Correct++;
    } else {
      userAnswers[q.id] = alternateOption(q.correctAnswer);
    }
  });

  // Part 2 Answers
  p2Questions.forEach((q, idx) => {
    const shouldBeCorrect = idx < targetCorrect.part2;
    if (shouldBeCorrect) {
      userAnswers[q.id] = q.correctAnswer;
      p2Correct++;
    } else {
      userAnswers[q.id] = alternateOption(q.correctAnswer);
    }
  });

  // Part 3 Answers
  p3Questions.forEach((q, idx) => {
    const shouldBeCorrect = idx < targetCorrect.part3;
    if (shouldBeCorrect) {
      userAnswers[q.id] = q.correctAnswer;
      p3Correct++;
    } else {
      userAnswers[q.id] = alternateOption(q.correctAnswer);
    }
  });

  const listeningScaled = calculateScaledListening(p1Correct, p1Questions.length);
  const structureScaled = calculateScaledStructure(p2Correct, p2Questions.length);
  const readingScaled = calculateScaledReading(p3Correct, p3Questions.length);
  const totalScore = calculateToeflScore(listeningScaled, structureScaled, readingScaled);

  return {
    id,
    testId: test.id,
    testTitle: test.title,
    date,
    mode: 'exam',
    userAnswers,
    flaggedQuestions: flaggedIds,
    timeSpentSeconds,
    listeningRaw: p1Correct,
    listeningTotal: p1Questions.length,
    listeningScaled,
    structureRaw: p2Correct,
    structureTotal: p2Questions.length,
    structureScaled,
    readingRaw: p3Correct,
    readingTotal: p3Questions.length,
    readingScaled,
    totalScore,
    isPassed: totalScore >= 450,
    scoreGap: totalScore - 450
  };
}

export function getInitialPracticeHistories(): TestResult[] {
  // Percobaan 1: Paket 1 (Skor 430 - Belum Memenuhi 450 karena kelemahan di collocations/connectors Part 2)
  const attempt1 = generateAttempt(
    'history-attempt-1-test-1',
    test1,
    '2026-11-06 14:35',
    { part1: 20, part2: 15, part3: 20 },
    ['t1-p2-q16', 't1-p2-q21', 't1-p3-q10'],
    3250
  );

  // Percobaan 2: Paket 2 (Skor 483 - Lulus Target 450+ setelah mempelajari Modul Tips & Lab Tenses!)
  const attempt2 = generateAttempt(
    'history-attempt-2-test-2',
    test2,
    '2026-11-08 20:20',
    { part1: 26, part2: 25, part3: 25 },
    ['t2-p2-q12', 't2-p3-q18'],
    2890
  );

  // Return with latest attempt first
  return [attempt2, attempt1];
}

