import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TestPackage, Question, ReadingPassage } from '../data';
import { AudioPlayer } from './AudioPlayer';
import { 
  Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, 
  HelpCircle, AlertTriangle, ArrowRight, BookOpen, 
  Headphones, PenTool, LayoutGrid, X, Volume2, Sparkles
} from 'lucide-react';

interface TestViewProps {
  test: TestPackage;
  initialPart?: 1 | 2 | 3;
  examMode: 'exam' | 'study';
  onFinishTest: (answers: Record<string, 'a' | 'b' | 'c' | 'd'>, flagged: string[], timeSpentSeconds: number) => void;
  onExitTest: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  test,
  initialPart = 1,
  examMode,
  onFinishTest,
  onExitTest
}) => {
  // If specific part was selected, filter or prioritize
  const [activePart, setActivePart] = useState<1 | 2 | 3>(initialPart);
  
  // Filter questions for the active part
  const partQuestions = useMemo(() => {
    return test.questions.filter(q => q.part === activePart);
  }, [test.questions, activePart]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');
  const [showPaletteMobile, setShowPaletteMobile] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);
  const [showAudioScript, setShowAudioScript] = useState(false);

  // Per-part timers in seconds
  // Standard TOEFL ITP: Part 1 = 35 mins (2100s), Part 2 = 25 mins (1500s), Part 3 = 55 mins (3300s)
  const [partTimesRemaining, setPartTimesRemaining] = useState<Record<1 | 2 | 3, number>>({
    1: 35 * 60,
    2: 25 * 60,
    3: 55 * 60
  });
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [partTimeExpiredModal, setPartTimeExpiredModal] = useState<1 | 2 | 3 | null>(null);
  const [showErrorExplanationModal, setShowErrorExplanationModal] = useState<boolean>(false);

  // Reset index when part changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAudioScript(false);
  }, [activePart]);

  // Active question object
  const currentQuestion: Question | undefined = partQuestions[currentQuestionIndex];

  // Detect Error Identification question format (Part 2 Structure questions with (a), (b), (c), (d))
  const isErrorIdentification = useMemo(() => {
    if (!currentQuestion || currentQuestion.part !== 2) return false;
    return (
      /\([a-dA-D]\)/.test(currentQuestion.prompt) ||
      (currentQuestion.number >= 16 && !currentQuestion.prompt.includes('____'))
    );
  }, [currentQuestion]);

  // Associated Reading Passage if part 3
  const activePassage: ReadingPassage | undefined = useMemo(() => {
    if (!currentQuestion || currentQuestion.part !== 3 || !currentQuestion.passageId) {
      return undefined;
    }
    return test.readingPassages.find(p => p.id === currentQuestion.passageId);
  }, [test.readingPassages, currentQuestion]);

  // Timer interval for current active part
  useEffect(() => {
    if (isTimerPaused || showConfirmFinish || partTimeExpiredModal !== null) return;

    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
      setPartTimesRemaining(prev => {
        const currentRemaining = prev[activePart];
        if (currentRemaining <= 1) {
          if (activePart < 3) {
            setPartTimeExpiredModal(activePart);
            return {
              ...prev,
              [activePart]: 0
            };
          } else {
            clearInterval(timer);
            handleConfirmFinish();
            return {
              ...prev,
              [activePart]: 0
            };
          }
        }
        return {
          ...prev,
          [activePart]: currentRemaining - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerPaused, activePart, showConfirmFinish, partTimeExpiredModal]);

  // Keyboard shortcut listener (A, B, C, D, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showConfirmFinish) return;
      const key = e.key.toLowerCase();
      if (!currentQuestion) return;

      if (['a', 'b', 'c', 'd'].includes(key)) {
        // Check if option exists in question
        const hasOption = currentQuestion.options.some(o => o.key === key);
        if (hasOption) {
          handleSelectAnswer(currentQuestion.id, key as 'a' | 'b' | 'c' | 'd');
        }
      } else if (key === 'arrowright') {
        handleNextQuestion();
      } else if (key === 'arrowleft') {
        handlePrevQuestion();
      } else if (key === 'f') {
        toggleFlag(currentQuestion.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, partQuestions, showConfirmFinish]);

  const handleSelectAnswer = (qId: string, answer: 'a' | 'b' | 'c' | 'd') => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: answer
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < partQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAudioScript(false);
    } else if (activePart < 3) {
      // Transition to next part
      setActivePart((prev => (prev + 1) as 1 | 2 | 3));
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAudioScript(false);
    } else if (activePart > 1) {
      setActivePart((prev => (prev - 1) as 1 | 2 | 3));
    }
  };

  const handleConfirmFinish = () => {
    onFinishTest(userAnswers, Array.from(flaggedIds), timeSpent);
  };

  // Format time remaining MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // Helper to render prompt with highlighted error identification badges (A), (B), (C), (D)
  const renderPromptText = (prompt: string, isErrorId: boolean) => {
    if (!isErrorId) {
      return <span className="whitespace-pre-line">{prompt}</span>;
    }

    // Split by (a), (b), (c), (d) or (A), (B), (C), (D)
    const tokens = prompt.split(/(\([a-dA-D]\))/g);
    return (
      <span className="leading-relaxed">
        {tokens.map((token, idx) => {
          const match = token.match(/^\(([a-dA-D])\)$/);
          if (match) {
            const letter = match[1].toUpperCase();
            return (
              <span
                key={idx}
                className="inline-flex items-center justify-center px-2 py-0.5 mx-1 rounded-md text-xs font-black bg-indigo-600 text-white shadow-xs border border-indigo-700 align-middle select-none"
                title={`Pilihan Opsi (${letter})`}
              >
                ({letter})
              </span>
            );
          }
          return <span key={idx}>{token}</span>;
        })}
      </span>
    );
  };

  // Progress calculations
  const totalTestQuestions = test.questions.length;
  const totalAnsweredCount = Object.keys(userAnswers).length;
  const currentPartAnsweredCount = partQuestions.filter(q => userAnswers[q.id] !== undefined).length;
  const activePartTime = partTimesRemaining[activePart];
  const isTimeCritical = activePartTime < 180; // < 3 mins
  const isTimeWarning = activePartTime < 300 && !isTimeCritical; // < 5 mins

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sticky Exam Top Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Test title & Section Tabs with Per-Part Timers */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onExitTest}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Keluar dari Tes"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-bold text-blue-600 block">{test.title}</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3].map(pNum => {
                    const p = pNum as 1 | 2 | 3;
                    const isActive = activePart === p;
                    const pName = p === 1 ? 'Listening' : p === 2 ? 'Structure' : 'Reading';
                    const remSec = partTimesRemaining[p];
                    const isPartLow = remSec < 180;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setActivePart(p)}
                        className={`text-xs px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={`Pindah ke Part ${p} (${pName}) - Sisa waktu: ${formatTime(remSec)}`}
                      >
                        <span>Part {p}</span>
                        <span className="hidden md:inline font-normal opacity-85">: {pName}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-extrabold ${
                          isActive
                            ? isPartLow ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-800 text-white'
                            : isPartLow ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {formatTime(remSec)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Middle: Active Part Timer Display */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                isTimeCritical
                  ? 'bg-red-50 border-red-300 text-red-700 animate-pulse'
                  : isTimeWarning
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}>
                <Clock className={`w-4 h-4 shrink-0 ${isTimeCritical ? 'text-red-600 animate-bounce' : isTimeWarning ? 'text-amber-600' : 'text-slate-500'}`} />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] uppercase font-sans tracking-wider text-slate-500 mb-0.5">
                    Timer Part {activePart}
                  </span>
                  <span>{formatTime(activePartTime)}</span>
                </div>
              </div>
            </div>

            {/* Right: Progress & Finish Button */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <span className="text-xs text-slate-500 block">Terjawab</span>
                <span className="text-xs font-extrabold text-slate-900">
                  {totalAnsweredCount} / {totalTestQuestions} Soal
                </span>
              </div>

              {/* Palette Toggle on Mobile */}
              <button
                type="button"
                onClick={() => setShowPaletteMobile(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Daftar Nomor Soal"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setShowConfirmFinish(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-2 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai & Nilai</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${(totalAnsweredCount / totalTestQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Testing Workspace */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Column: If Reading passage exists, show split panel */}
        {activePart === 3 && activePassage && (
          <div className="lg:w-1/2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col max-h-[78vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  {activePassage.title}
                </h3>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                Reading Passage
              </span>
            </div>
            <div className="prose prose-slate prose-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line select-text">
              {activePassage.content}
            </div>
          </div>
        )}

        {/* Center / Right Column: Active Question */}
        <div className={`flex-1 flex flex-col justify-between bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs ${
          activePart === 3 && activePassage ? 'lg:w-1/2' : 'max-w-4xl mx-auto w-full'
        }`}>
          {currentQuestion ? (
            <div>
              {/* Question Header */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                    Nomor {currentQuestion.number} dari {partQuestions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    ({currentQuestion.type.toUpperCase()})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Flag button */}
                  <button
                    type="button"
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      flaggedIds.has(currentQuestion.id)
                        ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedIds.has(currentQuestion.id) ? 'fill-current text-amber-600' : ''}`} />
                    <span>{flaggedIds.has(currentQuestion.id) ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
                  </button>
                </div>
              </div>

              {/* Listening Audio Player (if Part 1) */}
              {currentQuestion.part === 1 && currentQuestion.audioScript && (
                <AudioPlayer
                  textToSpeak={currentQuestion.audioScript}
                  speakerLabel={currentQuestion.audioSpeaker || "Dialog Percakapan"}
                  showTranscript={showAudioScript}
                  onTranscriptToggle={() => setShowAudioScript(prev => !prev)}
                />
              )}

              {/* Error Identification Banner (if Part 2 Structure & Written Expression) */}
              {isErrorIdentification && (
                <div className="mb-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-200/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                          Written Expression (Error Identification)
                        </span>
                        <span className="font-bold text-xs bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full border border-red-200">
                          Tugas: Cari Bagian yang SALAH!
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        Kalimat di bawah ini <strong>sudah lengkap dan tidak ada titik-titik kosong</strong>. Ada 4 bagian kata/frasa yang ditandai <strong>(A)</strong>, <strong>(B)</strong>, <strong>(C)</strong>, dan <strong>(D)</strong>. Tugas Anda adalah <strong>memilih SATU bagian yang tata bahasanya SALAH / keliru</strong>!
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowErrorExplanationModal(true)}
                        className="mt-2 text-xs font-bold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span>Bingung kenapa tidak ada titik-titik? Klik untuk penjelasan format soal</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Prompt */}
              <div className="mb-6">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {renderPromptText(currentQuestion.prompt, isErrorIdentification)}
                </h2>

                {isErrorIdentification && (
                  <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      4 Bagian Kata yang Diuji (Pilih 1 Opsi yang Salah Grammar):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentQuestion.options.map(opt => (
                        <div key={opt.key} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                          <span className="font-black text-indigo-700 uppercase mr-1">({opt.key})</span>
                          <span className="font-semibold text-slate-800">"{opt.text}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Options List (A, B, C, D) */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map(option => {
                  const isSelected = userAnswers[currentQuestion.id] === option.key;
                  const isCorrect = currentQuestion.correctAnswer === option.key;
                  
                  // In Study Mode, show feedback immediately after answering
                  const showStudyResult = examMode === 'study' && userAnswers[currentQuestion.id] !== undefined;

                  let borderClass = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 bg-white';
                  if (showStudyResult) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-red-500 bg-red-50 text-red-950 font-semibold';
                    } else {
                      borderClass = 'border-slate-200 opacity-60 bg-white';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-blue-600 bg-blue-50/70 text-blue-950 ring-2 ring-blue-600/20 font-semibold';
                  }

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQuestion.id, option.key)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 group cursor-pointer ${borderClass}`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold uppercase shrink-0 transition-colors ${
                        showStudyResult && isCorrect
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : showStudyResult && isSelected && !isCorrect
                          ? 'bg-red-600 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}>
                        {option.key}
                      </span>
                      <div className="flex-1 pt-0.5">
                        <span className="text-sm font-semibold leading-relaxed block text-slate-900">
                          {option.text}
                        </span>
                        {isErrorIdentification && (
                          <span className="text-[11px] text-amber-800 font-medium block mt-0.5">
                            (Pilih jika kata/frasa "{option.text}" ini yang menurut Anda keliru/salah)
                          </span>
                        )}
                      </div>
                      {showStudyResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 self-center" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Study Mode Instant Explanation Box */}
              {examMode === 'study' && userAnswers[currentQuestion.id] && (
                <div className={`p-5 rounded-2xl border text-sm leading-relaxed mb-6 animate-fadeIn ${
                  userAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50/90 border-amber-300 text-amber-950'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Pembahasan Soal Nomor {currentQuestion.number}:</span>
                    <span className="uppercase text-xs px-2.5 py-0.5 rounded-full bg-white/90 border font-extrabold text-blue-700">
                      {isErrorIdentification ? `Bagian yang SALAH: (${currentQuestion.correctAnswer})` : `Kunci: ${currentQuestion.correctAnswer}`}
                    </span>
                  </div>
                  {isErrorIdentification && (
                    <div className="mb-2 text-xs font-bold text-amber-950 bg-amber-100/80 p-2.5 rounded-xl border border-amber-200">
                      Bagian yang keliru adalah kata/frasa: <span className="underline font-mono text-red-700 font-extrabold text-sm ml-1">"{currentQuestion.options.find(o => o.key === currentQuestion.correctAnswer)?.text}"</span>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">Pilih soal untuk memulai.</div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0 && activePart === 1}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Pintasan: Tekan [A] [B] [C] [D] | [F] Ragu | [Panah] Navigasi
            </span>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>{currentQuestionIndex === partQuestions.length - 1 ? (activePart < 3 ? 'Lanjut ke Part ' + (activePart + 1) : 'Selesai') : 'Berikutnya'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Desktop Palette Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-blue-600" /> Lembar Jawaban
            </h4>
            <span className="text-xs text-slate-500 font-bold">
              {currentPartAnsweredCount} / {partQuestions.length}
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPaletteFilter('all')}
              className={`flex-1 py-1 rounded-lg transition-all ${
                paletteFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setPaletteFilter('unanswered')}
              className={`flex-1 py-1 rounded-lg transition-all ${
                paletteFilter === 'unanswered' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Kosong
            </button>
            <button
              type="button"
              onClick={() => setPaletteFilter('flagged')}
              className={`flex-1 py-1 rounded-lg transition-all ${
                paletteFilter === 'flagged' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Ragu
            </button>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-[50vh] overflow-y-auto pr-1">
            {partQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedIds.has(q.id);
              const isActive = idx === currentQuestionIndex;

              if (paletteFilter === 'unanswered' && isAnswered) return null;
              if (paletteFilter === 'flagged' && !isFlagged) return null;

              let btnBg = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
              if (isFlagged) {
                btnBg = 'bg-amber-400 text-slate-950 font-bold shadow-xs';
              } else if (isAnswered) {
                btnBg = 'bg-blue-600 text-white font-bold shadow-xs';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${btnBg} ${
                    isActive ? 'ring-2 ring-offset-2 ring-blue-600 scale-105' : ''
                  }`}
                >
                  {q.number}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1 text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-blue-600"></span>
              <span>Sudah dijawab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-amber-400"></span>
              <span>Ditandai ragu-ragu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-slate-200"></span>
              <span>Belum dijawab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Finish Test */}
      {showConfirmFinish && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Selesaikan dan Hitung Skor TOEFL?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Anda telah menjawab <strong>{totalAnsweredCount}</strong> dari total <strong>{totalTestQuestions}</strong> soal.
              {totalTestQuestions - totalAnsweredCount > 0 && (
                <span className="block mt-2 text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium text-xs">
                  ⚠️ Masih ada <strong>{totalTestQuestions - totalAnsweredCount} soal kosong</strong>. Di TOEFL tidak ada nilai minus, kami sarankan Anda menebak jawaban soal kosong sebelum submit!
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmFinish(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors"
              >
                Kembali ke Soal
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Ya, Nilai Sekarang!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Palette Drawer */}
      {showPaletteMobile && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h4 className="font-extrabold text-slate-900 text-base">
                  Nomor Soal (Part {activePart})
                </h4>
                <button
                  type="button"
                  onClick={() => setShowPaletteMobile(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 max-h-[65vh] overflow-y-auto pr-1">
                {partQuestions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedIds.has(q.id);
                  const isActive = idx === currentQuestionIndex;

                  let btnBg = 'bg-slate-100 text-slate-600';
                  if (isFlagged) btnBg = 'bg-amber-400 text-slate-950 font-bold';
                  else if (isAnswered) btnBg = 'bg-blue-600 text-white font-bold';

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setShowPaletteMobile(false);
                      }}
                      className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center ${btnBg} ${
                        isActive ? 'ring-2 ring-blue-600' : ''
                      }`}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPaletteMobile(false);
                setShowConfirmFinish(true);
              }}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md"
            >
              Selesai & Nilai Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Modal: Part Timer Expired */}
      {partTimeExpiredModal !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Waktu Part {partTimeExpiredModal} Telah Habis!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Waktu pengerjaan standar untuk <strong>Part {partTimeExpiredModal} ({partTimeExpiredModal === 1 ? 'Listening' : 'Structure'})</strong> telah mencapai 00:00.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Agar simulasi ujian tetap sesuai batas waktu resmi kampus, disarankan untuk segera berpindah ke <strong>Part {partTimeExpiredModal + 1} ({partTimeExpiredModal === 1 ? 'Structure' : 'Reading'})</strong>.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setPartTimesRemaining(prev => ({
                    ...prev,
                    [partTimeExpiredModal]: 5 * 60
                  }));
                  setPartTimeExpiredModal(null);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors"
              >
                Tambah Waktu (+5 Menit)
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextPart = (partTimeExpiredModal + 1) as 1 | 2 | 3;
                  setActivePart(nextPart);
                  setPartTimeExpiredModal(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Lanjut ke Part {partTimeExpiredModal + 1}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Error Identification Guide (Penjelasan Soal Tanpa Titik-titik) */}
      {showErrorExplanationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                  ?
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Panduan Tipe Soal: Written Expression (Error Identification)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowErrorExplanationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <strong className="text-amber-950 block text-sm font-bold mb-1">
                  "Kenapa kalimatnya lengkap dan tidak ada titik-titik kosong?"
                </strong>
                <p className="text-slate-800">
                  Di ujian resmi TOEFL PBT / EPT, <strong>Part 2 (nomor 16 – 40)</strong> menggunakan format <strong>Error Identification</strong>.
                </p>
                <p className="text-slate-800 mt-2">
                  Tugas Anda di bagian ini <strong>BUKAN</strong> melengkapi kalimat, melainkan <strong>MEMILIH SATU DARI 4 OPSI (A, B, C, D) YANG MENGANDUNG KESALAHAN TATA BAHASA (GRAMMAR)</strong>!
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-2">
                  Contoh Soal Nyata yang Membingungkan:
                </span>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold mr-1">(a)</span><u>Despite</u> she was exhausted after <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold mx-1">(b)</span><u>the lengthy</u> examination, Maria <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold mx-1">(c)</span><u>continued</u> working on her <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold mx-1">(d)</span><u>graduation</u> project.
                </div>

                <div className="mt-3.5 space-y-2 text-xs text-slate-700">
                  <div className="p-2 bg-red-50 rounded-lg border border-red-200">
                    • <strong>(A) Despite</strong>: <span className="text-red-700 font-bold">SALAH (Inilah Kunci Jawabannya!)</span>. Kata <em>Despite</em> adalah preposisi (hanya boleh diikuti frasa kata benda). Karena di kalimat ini diikuti subjek + kata kerja (<em>she was exhausted</em>), kata yang benar seharusnya adalah konjungsi <strong>Although</strong>.
                  </div>
                  <div>
                    • <strong>(B) the lengthy</strong>: <span className="text-emerald-700 font-bold">BENAR</span> (kata sifat yang menerangkan kata benda 'examination').
                  </div>
                  <div>
                    • <strong>(C) continued</strong>: <span className="text-emerald-700 font-bold">BENAR</span> (bentuk past tense konsisten dengan 'was').
                  </div>
                  <div>
                    • <strong>(D) graduation</strong>: <span className="text-emerald-700 font-bold">BENAR</span> (noun adjunct yang menerangkan 'project').
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-emerald-50 rounded-xl text-emerald-950 font-bold text-xs flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kesimpulan: Karena bagian (A) yang salah, klik opsi (A) untuk mendapatkan poin!</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowErrorExplanationModal(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Saya Mengerti, Kembali ke Tes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

