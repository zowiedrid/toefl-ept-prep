import React, { useState } from 'react';
import { 
  TENSES_LIST, SENTENCE_TEMPLATES, TenseDetail, TransformSentence 
} from '../data/tensesData';
import { speakText } from '../utils/audioSpeech';
import { 
  Clock, Sparkles, Volume2, CheckCircle2, XCircle, 
  HelpCircle, ArrowRight, BookOpen, Layers, Lightbulb, 
  Repeat, Shuffle, Award, Check, ChevronRight
} from 'lucide-react';

interface TensesLabViewProps {
  onStartPractice: () => void;
  onOpenLearningModule: () => void;
}

export const TensesLabView: React.FC<TensesLabViewProps> = ({
  onStartPractice,
  onOpenLearningModule
}) => {
  // State for selected sentence and selected tense
  const [selectedSentenceId, setSelectedSentenceId] = useState<string>('sent_maria_thesis');
  const [selectedTenseId, setSelectedTenseId] = useState<string>('present_simple');
  const [sentenceForm, setSentenceForm] = useState<'positive' | 'negative' | 'interrogative' | 'passive'>('positive');
  const [timeCategoryFilter, setTimeCategoryFilter] = useState<'all' | 'present' | 'past' | 'future'>('all');
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<string, string>>({});
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Selected sentence template
  const currentSentence = SENTENCE_TEMPLATES.find(s => s.id === selectedSentenceId) || SENTENCE_TEMPLATES[0];

  // Selected tense detail
  const currentTense = TENSES_LIST.find(t => t.id === selectedTenseId) || TENSES_LIST[0];

  // Filtered tense buttons
  const filteredTenses = TENSES_LIST.filter(t => {
    if (timeCategoryFilter === 'all') return true;
    return t.timeCategory === timeCategoryFilter;
  });

  // Current translation object
  const translationObj = currentSentence.translations[selectedTenseId] || currentSentence.translations['present_simple'];

  // Current sentence string to display
  let displayedSentence = translationObj.positive;
  if (sentenceForm === 'negative') displayedSentence = translationObj.negative;
  else if (sentenceForm === 'interrogative') displayedSentence = translationObj.interrogative;
  else if (sentenceForm === 'passive' && translationObj.passive) displayedSentence = translationObj.passive;

  // Handle audio speak
  const handleSpeak = () => {
    setIsSpeaking(true);
    speakText(
      displayedSentence,
      1.0,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <Clock className="w-4 h-4 text-emerald-300" />
            <span>Laboratorium Tenses Interaktif (Tense Transformer)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Ubah Kalimat & Pelajari 12 Tenses Secara Real-Time
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
            Pilih kalimat contoh bertema skripsi dan perkuliahan di bawah ini, lalu <strong>klik tombol tense apa saja</strong> untuk melihat perubahan kata kerja, kata bantu (auxiliary), serta rumusnya secara otomatis!
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenLearningModule}
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Modul Belajar & Trik EPT</span>
            </button>
            <button
              type="button"
              onClick={onStartPractice}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Uji Kemampuan di Paket Tes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* STEP 1: Pilih Kalimat Subjek */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
              1
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Pilih Kalimat Subjek untuk Diubah:
              </h3>
              <p className="text-xs text-slate-500">
                Pilih salah satu dari 5 kalimat bertema akademik di bawah ini:
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SENTENCE_TEMPLATES.map(tmpl => {
            const isSelected = tmpl.id === selectedSentenceId;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setSelectedSentenceId(tmpl.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold uppercase text-blue-700">
                    {tmpl.topic}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <strong className="text-xs sm:text-sm text-slate-900 block font-bold">
                  {tmpl.subject}
                </strong>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                  Verb dasar: "{tmpl.baseVerb}"
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Pilih Tense (Filter & Buttons) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
              2
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Klik Tombol Tense di Bawah Ini:
              </h3>
              <p className="text-xs text-slate-500">
                Pilih tense yang ingin Anda terapkan pada kalimat di atas:
              </p>
            </div>
          </div>

          {/* Time Category Filters */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTimeCategoryFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeCategoryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua (12)
            </button>
            <button
              type="button"
              onClick={() => setTimeCategoryFilter('present')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeCategoryFilter === 'present' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Present (4)
            </button>
            <button
              type="button"
              onClick={() => setTimeCategoryFilter('past')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeCategoryFilter === 'past' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past (4)
            </button>
            <button
              type="button"
              onClick={() => setTimeCategoryFilter('future')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeCategoryFilter === 'future' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Future (4)
            </button>
          </div>
        </div>

        {/* 12 Tense Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {filteredTenses.map(tense => {
            const isSelected = tense.id === selectedTenseId;
            let catColor = 'border-blue-200 text-blue-700';
            if (tense.timeCategory === 'past') catColor = 'border-purple-200 text-purple-700';
            else if (tense.timeCategory === 'future') catColor = 'border-emerald-200 text-emerald-700';

            return (
              <button
                key={tense.id}
                type="button"
                onClick={() => setSelectedTenseId(tense.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${
                    isSelected ? 'text-amber-400' : catColor
                  }`}>
                    {tense.timeCategory}
                  </span>
                  <span className="text-xs sm:text-sm font-bold block leading-snug">
                    {tense.name}
                  </span>
                </div>
                <div className="mt-2 text-[10px] opacity-75 font-mono">
                  {tense.englishName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: HASIL TRANSFORMASI REAL-TIME (HERO DISPLAY) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
              ⚡
            </span>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Hasil Transformasi Kalimat
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {currentTense.name} ({currentTense.englishName})
              </h2>
            </div>
          </div>

          {/* Form Switcher (+ / - / ? / Pasif) */}
          <div className="flex flex-wrap items-center bg-white/10 p-1 rounded-2xl border border-white/20 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSentenceForm('positive')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                sentenceForm === 'positive' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              (+) Positif
            </button>
            <button
              type="button"
              onClick={() => setSentenceForm('negative')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                sentenceForm === 'negative' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              (-) Negatif
            </button>
            <button
              type="button"
              onClick={() => setSentenceForm('interrogative')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                sentenceForm === 'interrogative' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              (?) Tanya
            </button>
            {translationObj.passive && (
              <button
                type="button"
                onClick={() => setSentenceForm('passive')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  sentenceForm === 'passive' ? 'bg-indigo-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
                title="Bentuk Kalimat Pasif (Passive Voice)"
              >
                (P) Pasif
              </button>
            )}
          </div>
        </div>

        {/* The Sentence Itself */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/20 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-2">
                Bentuk Kalimat {sentenceForm.toUpperCase()}:
              </span>
              <p className="text-lg sm:text-2xl font-bold leading-relaxed tracking-tight text-white font-serif select-text">
                "{displayedSentence}"
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-white/15 px-3 py-1 rounded-lg font-mono text-emerald-300 border border-white/20">
                  Perubahan Kata Kerja: <strong>{translationObj.verbHighlight}</strong>
                </span>
              </div>
            </div>

            {/* Audio Speech Button */}
            <button
              type="button"
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="p-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md active:scale-95 shrink-0 flex items-center justify-center"
              title="Dengarkan Pengucapan Bahasa Inggris"
            >
              <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-white/70 italic">
          💡 Tips: Klik tombol tense lainnya di atas atau ubah ke bentuk (-) Negatif / (?) Tanya untuk melihat transformasi struktur katanya secara instan.
        </p>
      </div>

      {/* STEP 4: KARTU RUMUS & RAHASIA TOEFL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Kolom 1: Rumus Verbal & Nominal */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              📐
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Rumus Baku {currentTense.name}
              </h3>
              <p className="text-xs text-slate-500">
                Formula tata bahasa resmi untuk kalimat verbal & nominal
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Rumus Verbal */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 block mb-2">
                1. Rumus Kalimat Verbal (Ada Kata Kerja):
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-900">
                  <span className="font-bold text-emerald-600 mr-2">(+)</span> {currentTense.formulaVerbal.positive}
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-900">
                  <span className="font-bold text-red-600 mr-2">(-)</span> {currentTense.formulaVerbal.negative}
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-900">
                  <span className="font-bold text-blue-600 mr-2">(?)</span> {currentTense.formulaVerbal.interrogative}
                </div>
              </div>
            </div>

            {/* Rumus Nominal */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 block mb-2">
                2. Rumus Kalimat Nominal (Tanpa Kata Kerja / Sifat / Benda):
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-900">
                  <span className="font-bold text-emerald-600 mr-2">(+)</span> {currentTense.formulaNominal.positive}
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-900">
                  <span className="font-bold text-red-600 mr-2">(-)</span> {currentTense.formulaNominal.negative}
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-900">
                  <span className="font-bold text-blue-600 mr-2">(?)</span> {currentTense.formulaNominal.interrogative}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 2: Penanda Waktu & Kunci TOEFL EPT */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                🎯
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Kata Kunci & Rahasia TOEFL EPT
                </h3>
                <p className="text-xs text-slate-500">
                  Karakteristik soal yang sering keluar di lembar ujian
                </p>
              </div>
            </div>

            {/* Time signals */}
            <div className="mb-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Penanda Waktu Kunci (Time Signals):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentTense.timeSignals.map((sig, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>

            {/* Rahasia TOEFL */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Kapan Tense Ini Keluar di TOEFL EPT?</span>
              </div>
              <p>
                {currentTense.toeflTips}
              </p>
            </div>
          </div>

          {/* Penggunaan Umum */}
          <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-900 block font-bold mb-1">Penggunaan Utama:</strong>
            {currentTense.description}
          </div>
        </div>
      </div>

      {/* STEP 5: CONTOH SOAL LATIHAN TOEFL KHUSUS TENSE INI */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
              📝
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Simulasi Soal TOEFL Part 2 (Uji Pemahaman Tense Ini)
              </h3>
              <p className="text-xs text-slate-500">
                Pilih jawaban yang benar untuk menguji pemahaman Anda:
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            Target 450+
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {currentTense.sampleToeflQuestion.prompt}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {currentTense.sampleToeflQuestion.options.map(opt => {
            const isUserSelected = userPracticeAnswers[currentTense.id] === opt.key;
            const isCorrect = opt.key === currentTense.sampleToeflQuestion.correctAnswer;
            const hasAnswered = userPracticeAnswers[currentTense.id] !== undefined;

            let optClass = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50';
            if (hasAnswered) {
              if (isCorrect) {
                optClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
              } else if (isUserSelected && !isCorrect) {
                optClass = 'bg-red-50 border-red-500 text-red-950 font-bold';
              } else {
                optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setUserPracticeAnswers(prev => ({ ...prev, [currentTense.id]: opt.key }))}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${optClass}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black uppercase shrink-0 ${
                    hasAnswered && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : hasAnswered && isUserSelected && !isCorrect
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {opt.key}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">{opt.text}</span>
                </div>
                {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {hasAnswered && isUserSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {userPracticeAnswers[currentTense.id] && (
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-fadeIn ${
            userPracticeAnswers[currentTense.id] === currentTense.sampleToeflQuestion.correctAnswer
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="font-extrabold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>
                {userPracticeAnswers[currentTense.id] === currentTense.sampleToeflQuestion.correctAnswer
                  ? 'Jawaban Anda Tepat Sekali! 🎉'
                  : 'Kurang Tepat, Perhatikan Pembahasannya:'}
              </span>
              <span className="uppercase text-xs font-mono font-black ml-auto bg-white/80 px-2 py-0.5 rounded-md border">
                Kunci: {currentTense.sampleToeflQuestion.correctAnswer}
              </span>
            </div>
            <p>{currentTense.sampleToeflQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Quick Summary Grid: Seluruh 12 Rumus Tenses Ringkas */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Rangkuman Rumus 12 Tenses Lengkap
              </h3>
              <p className="text-xs text-slate-400">
                Tabel referensi cepat kata kerja verbal untuk persiapan tes EPT
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Nama Tense</th>
                <th className="py-3 px-4">Bentuk Positif (+)</th>
                <th className="py-3 px-4">Penanda Waktu Kunci</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono">
              {TENSES_LIST.map(t => {
                const isCurrent = t.id === selectedTenseId;
                return (
                  <tr
                    key={t.id}
                    className={`hover:bg-white/5 transition-colors ${isCurrent ? 'bg-white/10 font-bold text-white' : ''}`}
                  >
                    <td className="py-3 px-4 font-sans font-extrabold text-white">
                      {t.name}
                    </td>
                    <td className="py-3 px-4 text-amber-300">
                      {t.formulaVerbal.positive.split('+ O')[0]}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-sans">
                      {t.timeSignals.slice(0, 3).join(', ')}
                    </td>
                    <td className="py-3 px-4 text-right font-sans">
                      <button
                        type="button"
                        onClick={() => setSelectedTenseId(t.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {isCurrent ? 'Aktif' : 'Terapkan'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

