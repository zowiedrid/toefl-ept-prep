import React, { useState } from 'react';
import { EPT_TIPS, TARGET_450_STRATEGY } from '../data/tipsData';
import { 
  Award, Sparkles, CheckCircle2, AlertTriangle, BookOpen, 
  Headphones, PenTool, ArrowRight, Lightbulb, Compass, Target
} from 'lucide-react';

interface TipsViewProps {
  onStartPractice: () => void;
}

export const TipsView: React.FC<TipsViewProps> = ({ onStartPractice }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'structure' | 'listening' | 'reading'>('all');

  const filteredTips = EPT_TIPS.filter(tip => {
    if (selectedCategory === 'all') return true;
    return tip.category === selectedCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 md:p-10 text-slate-950 shadow-xl relative overflow-hidden mb-10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-slate-950/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-slate-950/10">
            <Target className="w-4 h-4 text-slate-950" />
            <span>Strategi Khusus Mahasiswa Skripsi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
            Panduan & Trik Cepat Tembus Skor TOEFL 450+
          </h1>
          <p className="mt-3 text-sm sm:text-base text-amber-950 font-medium leading-relaxed">
            Anda tidak perlu pintar bahasa Inggris tingkat tinggi untuk memenuhi syarat sidang skripsi. Cukup pahami <strong>rumus matematika EPT</strong> dan pola soal yang berulang!
          </p>
        </div>
      </div>

      {/* Target Breakdown Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Kalkulasi Matematika Target 450: Cukup Benar 50% Soal!
            </h3>
            <p className="text-xs text-slate-500">
              Jangan terbebani harus menjawab semua soal dengan benar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Part 1: Listening
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              18 – 20 Benar
            </span>
            <span className="text-xs text-slate-500">dari 40 soal (~45-50%)</span>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
              Part 2: Structure ⭐
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              18 – 20 Benar
            </span>
            <span className="text-xs text-slate-500">dari 40 soal (Paling mudah dinaikkan!)</span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Part 3: Reading
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              18 – 20 Benar
            </span>
            <span className="text-xs text-slate-500">dari 40 soal (Gunakan skimming)</span>
          </div>
        </div>

        {/* 3 Golden Rules */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
            3 Aturan Emas Ujian TOEFL EPT:
          </span>
          {TARGET_450_STRATEGY.goldenRules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Semua Materi & Trik' },
          { id: 'structure', label: 'Part 2: Pola Structure (Wajib)' },
          { id: 'listening', label: 'Part 1: Trik Listening' },
          { id: 'reading', label: 'Part 3: Trik Reading' }
        ].map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tips Cards */}
      <div className="space-y-6">
        {filteredTips.map((tip, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                {tip.badge}
              </span>
              <span className="text-xs text-slate-400 capitalize font-medium">
                Kategori: {tip.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {tip.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {tip.description}
            </p>

            {/* Key Points */}
            <div className="mt-4 space-y-2">
              {tip.keyPoints.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Examples if present */}
            {tip.examples && tip.examples.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                {tip.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="bg-blue-50/50 border border-blue-200/60 rounded-2xl p-4 text-xs sm:text-sm">
                    {ex.pattern && (
                      <span className="block font-mono font-bold text-blue-900 mb-2">
                        Pola Rumus: {ex.pattern}
                      </span>
                    )}
                    {ex.incorrect && (
                      <div className="text-red-700 line-through mb-1">
                        ❌ Salah: {ex.incorrect}
                      </div>
                    )}
                    {ex.correct && (
                      <div className="text-emerald-800 font-bold mb-2">
                        ✅ Benar: {ex.correct}
                      </div>
                    )}
                    {ex.explanation && (
                      <p className="text-slate-600 italic">
                        💡 Catatan: {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onStartPractice}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <span>Mulai Latihan Ujian Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

