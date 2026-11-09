import React, { useState } from 'react';
import { 
  ALL_TEST_PACKAGES, TestPackage, TestResult, 
  calculateScaledListening, calculateScaledStructure, 
  calculateScaledReading, calculateToeflScore, getTestById
} from './data';
import { Navbar } from './components/Navbar';
import { PackageList } from './components/PackageList';
import { TestView } from './components/TestView';
import { ResultView } from './components/ResultView';
import { LearningModuleView } from './components/LearningModuleView';
import { TensesLabView } from './components/TensesLabView';
import { HistoryView } from './components/HistoryView';
import { saveTestResult } from './utils/storage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tests' | 'tips' | 'tenses' | 'history'>('tests');
  const [examMode, setExamMode] = useState<'exam' | 'study'>('exam');
  const [learningTab, setLearningTab] = useState<'part1' | 'part2' | 'part3' | 'target450'>('part2');
  
  // Test execution state
  const [currentTest, setCurrentTest] = useState<TestPackage | null>(null);
  const [initialPart, setInitialPart] = useState<1 | 2 | 3>(1);
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);

  // Start test handler
  const handleStartTest = (test: TestPackage, part?: 1 | 2 | 3) => {
    setCurrentTest(test);
    setInitialPart(part || 1);
    setCurrentResult(null);
  };

  // Exit test without finishing
  const handleExitTest = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari tes ini? Progres sesi saat ini tidak akan disimpan.")) {
      setCurrentTest(null);
    }
  };

  // Finish test handler and calculate official TOEFL scores
  const handleFinishTest = (
    answers: Record<string, 'a' | 'b' | 'c' | 'd'>, 
    flagged: string[], 
    timeSpentSeconds: number
  ) => {
    if (!currentTest) return;

    // Calculate section raw scores
    const listeningQuestions = currentTest.questions.filter(q => q.part === 1);
    const structureQuestions = currentTest.questions.filter(q => q.part === 2);
    const readingQuestions = currentTest.questions.filter(q => q.part === 3);

    const listeningRaw = listeningQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    const structureRaw = structureQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    const readingRaw = readingQuestions.filter(q => answers[q.id] === q.correctAnswer).length;

    // Converted scaled scores
    const listeningScaled = calculateScaledListening(listeningRaw, listeningQuestions.length);
    const structureScaled = calculateScaledStructure(structureRaw, structureQuestions.length);
    const readingScaled = calculateScaledReading(readingRaw, readingQuestions.length);

    // Official composite score
    const totalScore = calculateToeflScore(listeningScaled, structureScaled, readingScaled);
    const isPassed = totalScore >= 450;
    const scoreGap = totalScore - 450;

    const newResult: TestResult = {
      id: `res-${Date.now()}`,
      testId: currentTest.id,
      testTitle: currentTest.title,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mode: examMode,
      userAnswers: answers,
      flaggedQuestions: flagged,
      timeSpentSeconds,
      listeningRaw,
      listeningTotal: listeningQuestions.length,
      listeningScaled,
      structureRaw,
      structureTotal: structureQuestions.length,
      structureScaled,
      readingRaw,
      readingTotal: readingQuestions.length,
      readingScaled,
      totalScore,
      isPassed,
      scoreGap
    };

    // Save to localStorage
    saveTestResult(newResult);
    setCurrentResult(newResult);
    setCurrentTest(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Navigation */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setCurrentResult(null);
        }}
        examMode={examMode}
        onToggleExamMode={setExamMode}
        isTesting={currentTest !== null}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 1. Active Test Screen */}
        {currentTest ? (
          <TestView
            test={currentTest}
            initialPart={initialPart}
            examMode={examMode}
            onFinishTest={handleFinishTest}
            onExitTest={handleExitTest}
          />
        ) : currentResult ? (
          /* 2. Test Result & Evaluation Screen */
          <ResultView
            test={getTestById(currentResult.testId) || ALL_TEST_PACKAGES[0]}
            result={currentResult}
            onRetakeTest={() => {
              const test = getTestById(currentResult.testId);
              if (test) handleStartTest(test);
            }}
            onBackToHome={() => {
              setCurrentResult(null);
              setActiveTab('tests');
            }}
            onOpenTips={() => {
              setCurrentResult(null);
              setLearningTab('part2');
              setActiveTab('tips');
            }}
          />
        ) : activeTab === 'tips' ? (
          /* 3. Dedicated Learning Center & Tips */
          <LearningModuleView 
            initialTab={learningTab}
            onStartPractice={() => setActiveTab('tests')} 
          />
        ) : activeTab === 'tenses' ? (
          /* 4. Interactive Tenses Laboratory */
          <TensesLabView
            onStartPractice={() => setActiveTab('tests')}
            onOpenLearningModule={() => {
              setLearningTab('part2');
              setActiveTab('tips');
            }}
          />
        ) : activeTab === 'history' ? (
          /* 4. Score History */
          <HistoryView
            onSelectResult={(res) => setCurrentResult(res)}
            onStartNewTest={() => setActiveTab('tests')}
          />
        ) : (
          /* 5. Default: Package Selection List */
          <PackageList
            onStartTest={handleStartTest}
            examMode={examMode}
            onToggleExamMode={setExamMode}
            onOpenTips={() => {
              setLearningTab('part2');
              setActiveTab('tips');
            }}
            onOpenTenses={() => setActiveTab('tenses')}
          />
        )}
      </main>

      {/* Footer */}
      {!currentTest && (
        <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              © {new Date().getFullYear()} TOEFL EPT Prep • Simulasi Persyaratan Tugas Akhir & Skripsi Kampus
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Target Minimal: <strong>450 Skor</strong></span>
              <span>•</span>
              <span>Formula: <strong>TOEFL ITP Standard</strong></span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;

