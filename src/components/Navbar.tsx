import React from 'react';
import { BookOpen, GraduationCap, Award, HelpCircle, History, Sparkles, Clock, Compass } from 'lucide-react';

interface NavbarProps {
  currentTab: 'tests' | 'tips' | 'tenses' | 'history';
  onSelectTab: (tab: 'tests' | 'tips' | 'tenses' | 'history') => void;
  examMode: 'exam' | 'study';
  onToggleExamMode: (mode: 'exam' | 'study') => void;
  isTesting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  examMode,
  onToggleExamMode,
  isTesting
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Target Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => !isTesting && onSelectTab('tests')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">TOEFL EPT</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-600" />
                  Target: 450+
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                Simulasi Persyaratan Tugas Akhir & Skripsi
              </p>
            </div>
          </div>

          {/* Navigation Tabs (disabled during active test to prevent losing progress) */}
          {!isTesting ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => onSelectTab('tests')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentTab === 'tests'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Paket Tes</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('tips')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentTab === 'tips'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">Modul Belajar & Trik</span>
                <span className="sm:hidden">Modul</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md">
                  450+
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('tenses')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentTab === 'tenses'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="hidden sm:inline">Lab Tenses</span>
                <span className="sm:hidden">Tenses</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md border border-emerald-300">
                  Ubah Kalimat
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('history')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentTab === 'history'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Riwayat Nilai</span>
                <span className="sm:hidden">Nilai</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-800">
              <Clock className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Sesi Tes Sedang Berlangsung</span>
            </div>
          )}

          {/* Mode Switcher */}
          {!isTesting && (
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => onToggleExamMode('exam')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  examMode === 'exam'
                    ? 'bg-white text-blue-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mode Ujian Resmi: Timer berjalan, pembahasan dilihat di akhir tes"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Mode Simulasi Ujian</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleExamMode('study')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  examMode === 'study'
                    ? 'bg-white text-emerald-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mode Belajar Santai: Pembahasan dan kunci jawaban langsung tampil per nomor"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mode Belajar (Bahas Langsung)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

