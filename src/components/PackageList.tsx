import React from 'react';
import { ALL_TEST_PACKAGES, TestPackage } from '../data';
import { getBestScoreForTest } from '../utils/storage';
import { Play, CheckCircle2, Award, Clock, BookOpen, Headphones, PenTool, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface PackageListProps {
  onStartTest: (test: TestPackage, selectedPart?: 1 | 2 | 3) => void;
  examMode: 'exam' | 'study';
  onToggleExamMode: (mode: 'exam' | 'study') => void;
  onOpenTips: () => void;
  onOpenTenses?: () => void;
}

export const PackageList: React.FC<PackageListProps> = ({
  onStartTest,
  examMode,
  onToggleExamMode,
  onOpenTips,
  onOpenTenses
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Graduation Requirement Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden mb-10">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            <Award className="w-4 h-4 text-amber-300" />
            Persyaratan Kelulusan Skripsi / Tugas Akhir
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Latihan TOEFL EPT Kampus: Target Minimal Skor 450
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
            Website latihan interaktif dengan <strong>5 paket soal lengkap</strong> (3 Part: Listening, Structure, & Reading). Dilengkapi penilaian skor resmi TOEFL ITP/EPT, evaluasi kelulusan syarat tugas akhir, dan pembahasan lengkap berbahasa Indonesia.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold text-sm shadow-md">
                450
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider text-blue-200 font-semibold">Skor Minimal</span>
                <span className="text-xs sm:text-sm font-bold text-white">Syarat Daftar Sidang</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-900 flex items-center justify-center font-extrabold text-sm shadow-md">
                ~50%
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider text-blue-200 font-semibold">Target Benar</span>
                <span className="text-xs sm:text-sm font-bold text-white">Cukup 20 Benar per Part!</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenTips}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Lihat Trik Kilat 450</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selector Pill on Mobile */}
      <div className="md:hidden flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 mb-8 shadow-xs">
        <span className="text-xs font-bold text-slate-700">Mode Belajar:</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onToggleExamMode('exam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              examMode === 'exam' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Simulasi Ujian
          </button>
          <button
            type="button"
            onClick={() => onToggleExamMode('study')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              examMode === 'study' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Bahas Langsung
          </button>
        </div>
      </div>

      {/* Learning Center Highlights Card */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-amber-50/60 rounded-3xl border border-indigo-100 p-5 sm:p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Pusat Modul Belajar & Bedah Trik Soal EPT
              </h3>
              <span className="text-[10px] font-black uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                Wajib Baca
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Pelajari trik kolokasi kaku (<em>aware of, impact on, prefer to</em>), beda konektor klausa vs benda (<em>because vs due to, although vs despite</em>), participle V3 vs V-ing, serta cara menjawab tipe soal mencari yang salah (<em>Error Identification</em>).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenTips}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Buka Modul Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {onOpenTenses && (
            <button
              type="button"
              onClick={onOpenTenses}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-emerald-200" />
              <span>Lab Tenses</span>
            </button>
          )}
        </div>
      </div>

      {/* Test Packages Grid */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Pilihan 5 Paket Tes TOEFL EPT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pilih paket tes di bawah ini untuk memulai latihan penuh atau latihan per bagian (Part 1, 2, atau 3).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_TEST_PACKAGES.map((pkg, idx) => {
          const bestScore = getBestScoreForTest(pkg.id);
          const isTest1 = pkg.id === 'test-1';
          const listeningCount = pkg.questions.filter(q => q.part === 1).length;
          const structureCount = pkg.questions.filter(q => q.part === 2).length;
          const readingCount = pkg.questions.filter(q => q.part === 3).length;

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                isTest1
                  ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="p-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isTest1
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {pkg.badge}
                  </span>

                  {bestScore !== null && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      bestScore >= 450
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Skor Terbaik: {bestScore}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {pkg.shortDescription}
                </p>

                {/* 3 Parts Count Info */}
                <div className="mt-5 grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
                  <div className="bg-slate-50 rounded-xl p-2">
                    <span className="block text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                      <Headphones className="w-3 h-3 text-blue-600" /> Part 1
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">{listeningCount}</span>
                    <span className="block text-[10px] text-slate-400">Listening</span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-2">
                    <span className="block text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                      <PenTool className="w-3 h-3 text-indigo-600" /> Part 2
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">{structureCount}</span>
                    <span className="block text-[10px] text-slate-400">Structure</span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-2">
                    <span className="block text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                      <BookOpen className="w-3 h-3 text-emerald-600" /> Part 3
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">{readingCount}</span>
                    <span className="block text-[10px] text-slate-400">Reading</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Estimasi: ~115 Menit
                  </span>
                  <span className="font-semibold text-slate-700">Total: {pkg.questions.length} Soal</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 bg-slate-50/50 rounded-b-3xl border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onStartTest(pkg)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
                    isTest1
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Mulai Tes Lengkap (3 Part)</span>
                </button>

                {/* Single part selector */}
                <div className="flex items-center justify-between pt-1 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => onStartTest(pkg, 1)}
                    className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-lg border border-slate-200 font-semibold transition-colors text-center"
                    title="Hanya kerjakan Listening"
                  >
                    Part 1 Saja
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartTest(pkg, 2)}
                    className="flex-1 py-1.5 px-2 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-lg border border-slate-200 font-semibold transition-colors text-center"
                    title="Hanya kerjakan Structure (Grammar)"
                  >
                    Part 2 Saja
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartTest(pkg, 3)}
                    className="flex-1 py-1.5 px-2 bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-lg border border-slate-200 font-semibold transition-colors text-center"
                    title="Hanya kerjakan Reading"
                  >
                    Part 3 Saja
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graduation Tip Box */}
      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-sm">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-amber-950">
            Kiat Sukses Mahasiswa: Mengapa Structure (Part 2) Adalah Kunci Tercepat Tembus 450?
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            Dari ketiga bagian TOEFL EPT, <strong>Part 2 (Structure & Written Expression)</strong> adalah yang paling mudah dinaikkan nilainya dalam waktu singkat. Pola soal Structure sangat matematis dan rumusnya selalu sama (Subject-Verb, Conjunctions, Parallelism). Dengan menguasai 10 pola grammar inti, Anda bisa mengamankan 25-30 jawaban benar di Part 2 dan langsung melesatkan skor total Anda melampaui 450!
          </p>
          <div className="mt-3">
            <button
              type="button"
              onClick={onOpenTips}
              className="text-xs font-bold text-amber-950 hover:text-amber-800 underline flex items-center gap-1"
            >
              <span>Pelajari 10 Rumus Wajib Structure EPT Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

