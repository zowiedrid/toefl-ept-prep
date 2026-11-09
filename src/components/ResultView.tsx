import React, { useState, useEffect } from 'react';
import { TestPackage, TestResult, Question, getScoreRecommendation } from '../data';
import confetti from 'canvas-confetti';
import { 
  Award, CheckCircle2, XCircle, AlertTriangle, RotateCcw, 
  BookOpen, Headphones, PenTool, Sparkles, Printer, ChevronRight,
  Filter, HelpCircle, ArrowRight, ShieldCheck, Flag
} from 'lucide-react';

interface ResultViewProps {
  test: TestPackage;
  result: TestResult;
  onRetakeTest: () => void;
  onBackToHome: () => void;
  onOpenTips: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  test,
  result,
  onRetakeTest,
  onBackToHome,
  onOpenTips
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'wrong' | 'flagged' | 'correct'>('all');
  const [filterPart, setFilterPart] = useState<'all' | 1 | 2 | 3>('all');

  // Trigger celebration confetti if passed >= 450
  useEffect(() => {
    if (result.isPassed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.isPassed]);

  const recommendation = getScoreRecommendation(
    result.totalScore,
    result.listeningRaw,
    result.listeningTotal,
    result.structureRaw,
    result.structureTotal,
    result.readingRaw,
    result.readingTotal
  );

  // Filtered review questions
  const filteredQuestions = test.questions.filter(q => {
    // Part filter
    if (filterPart !== 'all' && q.part !== filterPart) return false;

    const userAns = result.userAnswers[q.id];
    const isCorrect = userAns === q.correctAnswer;
    const isFlagged = result.flaggedQuestions.includes(q.id);

    if (filterStatus === 'wrong') return !isCorrect;
    if (filterStatus === 'correct') return isCorrect;
    if (filterStatus === 'flagged') return isFlagged;

    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Hero Result Card */}
      <div className={`rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden mb-8 ${
        result.isPassed
          ? 'bg-gradient-to-tr from-emerald-600 via-teal-700 to-emerald-800'
          : 'bg-gradient-to-tr from-blue-700 via-indigo-800 to-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/20">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Hasil Penilaian TOEFL EPT Resmi</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {result.isPassed ? '🎉 LULUS SYARAT SKRIPSI!' : '⚠️ BELUM MEMENUHI SYARAT'}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              {recommendation.message}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 font-medium">
                Paket: <strong>{test.title}</strong>
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 font-medium">
                Target Kampus: <strong>Minimal 450</strong>
              </span>
            </div>
          </div>

          {/* Big Score Circle Badge */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white text-slate-900 shadow-2xl flex flex-col items-center justify-center border-4 border-white/40 ring-8 ring-white/20">
              <span className="text-xs uppercase tracking-widest font-extrabold text-slate-400">
                Skor Total EPT
              </span>
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${
                result.isPassed ? 'text-emerald-600' : 'text-blue-700'
              }`}>
                {result.totalScore}
              </span>
              <span className="text-[11px] font-bold text-slate-400 mt-0.5">
                Skala 310 – 677
              </span>
            </div>

            <div className="mt-3 text-center">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                result.isPassed ? 'bg-emerald-950/40 text-emerald-200' : 'bg-amber-400 text-slate-950'
              }`}>
                {result.isPassed ? `+${result.scoreGap} Poin di atas batas 450` : `Kurang ${Math.abs(result.scoreGap)} Poin ke 450`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Strategy Box (If not passed or passed) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-8">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Analisis Kunci & Rekomendasi Langkah Selanjutnya:</span>
        </h3>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {recommendation.advice.map((adv, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{adv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section Scores Grid (3 Parts) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Part 1 Listening */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" /> Part 1
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                Listening
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">{result.listeningScaled}</span>
              <span className="text-xs text-slate-500 font-medium">
                Benar: <strong>{result.listeningRaw}</strong> / {result.listeningTotal}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Skala Skor: 24 – 68</p>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${(result.listeningRaw / result.listeningTotal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Part 2 Structure */}
        <div className="bg-white rounded-3xl border border-indigo-200 ring-2 ring-indigo-500/10 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5" /> Part 2 ⭐
              </span>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                Structure
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-indigo-950">{result.structureScaled}</span>
              <span className="text-xs text-slate-500 font-medium">
                Benar: <strong>{result.structureRaw}</strong> / {result.structureTotal}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Skala Skor: 20 – 68 (Kunci Utama 450)</p>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full"
              style={{ width: `${(result.structureRaw / result.structureTotal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Part 3 Reading */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Part 3
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                Reading
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">{result.readingScaled}</span>
              <span className="text-xs text-slate-500 font-medium">
                Benar: <strong>{result.readingRaw}</strong> / {result.readingTotal}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Skala Skor: 21 – 67</p>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${(result.readingRaw / result.readingTotal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Official Calculation Formula transparency */}
      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Rumus Resmi Penilaian TOEFL ITP / EPT:</span>
        </div>
        <div className="font-mono bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-bold text-slate-800 text-center">
          (({result.listeningScaled} + {result.structureScaled} + {result.readingScaled}) × 10) ÷ 3 = {result.totalScore}
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetakeTest}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Tes Ini</span>
          </button>
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
          >
            <span>Pilih Paket Tes Lainnya</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenTips}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 font-bold text-xs sm:text-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Kiat Tembus 450</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Cetak Laporan Nilai"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Section (Pembahasan Soal) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Review Pembahasan Soal & Kunci Jawaban
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pelajari alasan setiap jawaban benar untuk memahami pola soal ujian TOEFL EPT berikutnya.
            </p>
          </div>

          {/* Review Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Part filter */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterPart('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterPart === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Semua Part
              </button>
              <button
                type="button"
                onClick={() => setFilterPart(1)}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterPart === 1 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
              >
                Part 1
              </button>
              <button
                type="button"
                onClick={() => setFilterPart(2)}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterPart === 2 ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
              >
                Part 2
              </button>
              <button
                type="button"
                onClick={() => setFilterPart(3)}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterPart === 3 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
              >
                Part 3
              </button>
            </div>

            {/* Status filter */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Semua ({test.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('wrong')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterStatus === 'wrong' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'}`}
              >
                Salah ❌
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('correct')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterStatus === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
              >
                Benar ✅
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('flagged')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterStatus === 'flagged' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'}`}
              >
                Ragu 🏳️
              </button>
            </div>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              Tidak ada soal dengan filter yang dipilih.
            </div>
          ) : (
            filteredQuestions.map(q => {
              const userAns = result.userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const isFlagged = result.flaggedQuestions.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs transition-all ${
                    isCorrect ? 'border-slate-200' : 'border-red-200 bg-red-50/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                        Part {q.part} - No. {q.number}
                      </span>
                      {isCorrect ? (
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Benar
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-red-600" /> {userAns ? 'Salah' : 'Tidak Dijawab'}
                        </span>
                      )}
                      {isFlagged && (
                        <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Flag className="w-3 h-3 text-amber-600 fill-current" /> Ditandai Ragu
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono">
                      Jawaban Anda: <strong className={isCorrect ? 'text-emerald-600 uppercase' : 'text-red-600 uppercase'}>{userAns || '-'}</strong> | Kunci: <strong className="text-emerald-700 uppercase">{q.correctAnswer}</strong>
                    </div>
                  </div>

                  {/* Audio Script snippet if Listening */}
                  {q.part === 1 && q.audioScript && (
                    <div className="mb-3 bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs text-slate-700 font-mono">
                      <span className="block font-bold text-blue-800 mb-1 font-sans">Naskah Percakapan:</span>
                      <p className="whitespace-pre-line font-sans">{q.audioScript}</p>
                    </div>
                  )}

                  {/* Prompt */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3 whitespace-pre-line leading-relaxed">
                    {q.prompt}
                  </h4>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {q.options.map(opt => {
                      const isOptionCorrect = opt.key === q.correctAnswer;
                      const isOptionUser = opt.key === userAns;

                      let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isOptionCorrect) {
                        optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400';
                      } else if (isOptionUser && !isOptionCorrect) {
                        optClass = 'bg-red-50 border-red-300 text-red-950 font-medium line-through';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optClass}`}
                        >
                          <span className="uppercase font-bold shrink-0">{opt.key}.</span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Pembahasan Lengkap:</span>
                    </div>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

