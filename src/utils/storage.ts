import { TestResult } from '../data/types';
import { getInitialPracticeHistories } from '../data/initialHistories';

const STORAGE_KEY = 'toefl_ept_test_results_v1';

export function saveTestResult(result: TestResult): void {
  try {
    const existing = getTestResults();
    const updated = [result, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save test result to localStorage:', err);
  }
}

export function getTestResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialPracticeHistories();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      } catch {
        // ignore if storage is quota exceeded or disabled
      }
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = getInitialPracticeHistories();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      } catch {
        // ignore
      }
      return initial;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read test results from localStorage:', err);
    return getInitialPracticeHistories();
  }
}

export function getResultById(id: string): TestResult | undefined {
  const results = getTestResults();
  return results.find(r => r.id === id);
}

export function getBestScoreForTest(testId: string): number | null {
  const results = getTestResults().filter(r => r.testId === testId);
  if (results.length === 0) return null;
  return Math.max(...results.map(r => r.totalScore));
}

export function clearAllTestResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear test results:', err);
  }
}
