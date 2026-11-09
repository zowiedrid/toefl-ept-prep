import React, { useState, useEffect } from 'react';
import { TestResult } from '../data/types';
import { getTestResults, clearAllTestResults } from '../utils/storage';
import { 
  History, Award, CheckCircle2, XCircle, RotateCcw, 
  Trash2, ArrowRight, TrendingUp, Calendar, Clock
} from 'lucide-react';

interface HistoryViewProps {
  onSelectResult: (result: TestResult) => void;
  onStartNewTest: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onSelectResult,
  onStartNewTest
}) => {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    setResults(getTestResults());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus seluruh riwayat latihan?")) {
      clearAllTestResults();
      setResults([]);
    }
  };

  // Stats
  const totalAttempts = results.length;
  const passedAttempts = results.filter(r => r.isPassed).length;
  const highestScore = totalAttempts > 0 ? Math.max(...results.map(r => r.totalScore)) : 0;
  const averageScore = totalAttempts > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.totalScore, 0) / totalAttempts) 
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Riwayat & Statistik Latihan TOEFL EPT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau perkembangan skor Anda menuju target kelulusan minimal 450.
          </p>
        </div>

        {totalAttempts > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Riwayat</span>
          </button>
        )}
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Sesi Tes
          </span>
          <span className="text-3xl font-black text-slate-900 mt-2 block">
            {totalAttempts}
          </span>
          <span className="text-xs text-slate-500 mt-0.5 block">percobaan</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Skor Tertinggi
          </span>
          <span className="text-3xl font-black text-blue-600 mt-2 block">
            {highestScore || '-'}
          </span>
          <span className="text-xs text-slate-500 mt-0.5 block">skala 310 – 677</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Rata-rata Skor
          </span>
          <span className="text-3xl font-black text-slate-900 mt-2 block">
            {averageScore || '-'}
          </span>
          <span className="text-xs text-slate-500 mt-0.5 block">seluruh paket</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Tingkat Lulus 450
          </span>
          <span className={`text-3xl font-black mt-2 block ${
            passedAttempts > 0 ? 'text-emerald-600' : 'text-slate-900'
          }`}>
            {totalAttempts > 0 ? `${Math.round((passedAttempts / totalAttempts) * 100)}%` : '-'}
          </span>
          <span className="text-xs text-slate-500 mt-0.5 block">
            {passedAttempts} dari {totalAttempts} lulus
          </span>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Belum Ada Riwayat Tes</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Anda belum menyelesaikan simulasi ujian TOEFL EPT. Mulai tes pertama Anda sekarang untuk mengetahui estimasi skor!
            </p>
            <button
              type="button"
              onClick={onStartNewTest}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95"
            >
              Mulai Tes Sekarang
            </button>
          </div>
        ) : (
          results.map(r => (
            <div
              key={r.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold ${
                  r.isPassed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  <span className="text-lg font-black">{r.totalScore}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base">
                      {r.testTitle}
                    </h4>
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      r.isPassed
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {r.isPassed ? 'Lulus 450+' : 'Belum 450'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {r.date}
                    </span>
                    <span>Listening: <strong>{r.listeningScaled}</strong></span>
                    <span>Structure: <strong>{r.structureScaled}</strong></span>
                    <span>Reading: <strong>{r.readingScaled}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onSelectResult(r)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Lihat Pembahasan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

