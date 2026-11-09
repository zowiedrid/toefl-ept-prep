import React, { useState } from 'react';
import { 
  PenTool, Headphones, BookOpen, Target, Sparkles, CheckCircle2, 
  XCircle, AlertTriangle, Lightbulb, ArrowRight, HelpCircle, 
  Layers, Clock, ShieldCheck, Bookmark, FileText, Compass
} from 'lucide-react';
import { 
  calculateScaledListening, 
  calculateScaledStructure, 
  calculateScaledReading, 
  calculateToeflScore 
} from '../data';

interface LearningModuleViewProps {
  onStartPractice: () => void;
  initialTab?: 'part2' | 'part1' | 'part3' | 'target450';
}

export const LearningModuleView: React.FC<LearningModuleViewProps> = ({
  onStartPractice,
  initialTab = 'part2'
}) => {
  const [activeTab, setActiveTab] = useState<'part2' | 'part1' | 'part3' | 'target450'>(initialTab);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  
  // State for interactive 450 simulator
  const [simListening, setSimListening] = useState<number>(19);
  const [simStructure, setSimStructure] = useState<number>(20);
  const [simReading, setSimReading] = useState<number>(20);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Pusat Pembelajaran & Trik Soal TOEFL EPT</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Modul Pembelajaran & Cara Menjawab Tiap Part
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
            Berdasarkan analisis kelemahan yang sering terjadi di EPT: kunci kelulusan bukan menghafal ribuan kosakata kamus, melainkan menguasai <strong>pasangan kata kaku (kolokasi)</strong>, <strong>konektor kalimat (klausa vs frasa benda)</strong>, <strong>bentuk kata kerja lanjutan (participle)</strong>, dan memahami <strong>format soal mencari kata yang salah (Error Identification)</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartPractice}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Mulai Latihan Tes Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('part2')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'part2'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Part 2: Structure & Grammar (Kunci 450)</span>
          <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">Wajib</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('part1')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'part1'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Part 1: Listening Comprehension</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('part3')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'part3'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Part 3: Reading Comprehension</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('target450')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'target450'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Target className="w-4 h-4 text-amber-400" />
          <span>Strategi Skor 450 Skripsi</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: PART 2 STRUCTURE & GRAMMAR */}
      {/* ======================================================== */}
      {activeTab === 'part2' && (
        <div className="space-y-8 animate-fadeIn">
          {/* SPECIAL SECTION: Apa Maksud Soal Tanpa Kolom Kosong? */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-black text-xl shadow-xs">
                ❓
              </div>
              <div className="flex-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-1 rounded-full">
                  PENTING: Memahami Format Soal EPT Part 2
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 mt-2">
                  "Kenapa ada soal yang tidak ada kolom kosong / titik-titik, malah ada huruf (a) (b) (c) (d) di dalam kalimat?"
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
                  Dalam ujian resmi TOEFL PBT / EPT, <strong>Part 2 (Structure & Written Expression)</strong> berjumlah 40 soal dan sengaja dibagi menjadi <strong>2 tipe soal berbeda</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Tipe 1 */}
                  <div className="bg-white rounded-2xl p-4 border border-amber-200">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                      Tipe 1: Structure (Soal No. 1 – 15)
                    </span>
                    <strong className="text-sm font-bold text-slate-900 block">
                      Kalimat Rumpang (Ada Titik-titik Kosong)
                    </strong>
                    <p className="text-xs text-slate-600 mt-1">
                      Tugas Anda: Memilih 1 kata/frasa yang <strong>BENAR</strong> untuk mengisi titik-titik tersebut agar kalimat menjadi lengkap.
                    </p>
                    <div className="mt-2 text-xs bg-slate-50 p-2 rounded-lg font-mono text-slate-700">
                      It is surprising that people are not aware _________ the danger.
                    </div>
                  </div>

                  {/* Tipe 2 */}
                  <div className="bg-white rounded-2xl p-4 border-2 border-indigo-300 ring-2 ring-indigo-500/10">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                      Tipe 2: Written Expression (Soal No. 16 – 40)
                    </span>
                    <strong className="text-sm font-bold text-slate-900 block">
                      Error Identification (MENCARI YANG SALAH!)
                    </strong>
                    <p className="text-xs text-slate-600 mt-1">
                      Kalimat sudah lengkap dan <strong>TIDAK ADA titik-titik</strong>. Ada 4 bagian kata yang digarisbawahi atau ditandai (A), (B), (C), (D). Tugas Anda: <strong>Menemukan 1 bagian yang SALAH secara tata bahasa</strong>!
                    </p>
                    <div className="mt-2 text-xs bg-amber-50 p-2.5 rounded-lg text-slate-800 leading-relaxed">
                      <u><strong>Despite (a)</strong></u> she was exhausted after <u><strong>(b) the lengthy</strong></u> examination, Maria <u><strong>(c) continued</strong></u> working on her <u><strong>(d) graduation</strong></u> project.
                    </div>
                  </div>
                </div>

                {/* Bedah Soal Contoh User */}
                <div className="mt-5 bg-white rounded-2xl p-5 border border-amber-200">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Bedah Mengapa Jawabannya adalah Opsi (a) Despite:</span>
                  </h4>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc list-inside">
                    <li>
                      Kata <strong>Despite</strong> adalah <em>preposisi</em>. Preposisi HANYA boleh diikuti kata benda (Noun/Noun Phrase).
                    </li>
                    <li>
                      Namun di kalimat tersebut, setelah <em>Despite</em> terdapat: <strong>she (Subjek) + was (Verb) + exhausted</strong> (ini adalah klausa kalimat utuh!).
                    </li>
                    <li>
                      Karena diikuti kalimat utuh, kata <em>Despite</em> <strong>SALAH</strong>! Seharusnya diganti dengan konjungsi <strong>Although</strong> (<em>Although she was exhausted...</em>).
                    </li>
                    <li>
                      Maka di lembar ujian, jawaban yang Anda pilih adalah <strong>a</strong> (karena bagian (a) itulah yang keliru!).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* MATERI 1: RUMUS PASANGAN WAJIB (COLLOCATION) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Kuasai Rumus Pasangan Wajib (Collocations & Fixed Prepositions)
                </h3>
                <p className="text-xs text-slate-500">
                  Banyak soal Structure yang langsung bisa dijawab dalam 3 detik hanya dengan melihat pasangannya!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolokasi Preposisi */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 block mb-3">
                  📌 Pasangan Preposisi Wajib (Bagian 1):
                </span>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">aware</span>
                    <span className="font-black text-blue-600 font-mono">→ OF</span>
                    <span className="text-slate-400 text-xs italic">aware of the danger</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">worried</span>
                    <span className="font-black text-blue-600 font-mono">→ ABOUT</span>
                    <span className="text-slate-400 text-xs italic">worried about travelling</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">impact / effect</span>
                    <span className="font-black text-blue-600 font-mono">→ ON</span>
                    <span className="text-slate-400 text-xs italic">impact on our life</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">cause</span>
                    <span className="font-black text-blue-600 font-mono">→ FOR / OF</span>
                    <span className="text-slate-400 text-xs italic">cause for the spread</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">interested</span>
                    <span className="font-black text-blue-600 font-mono">→ IN (+ V-ing)</span>
                    <span className="text-slate-400 text-xs italic">interested in playing</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">apologize to [X]</span>
                    <span className="font-black text-blue-600 font-mono">→ FOR (+ V-ing)</span>
                    <span className="text-slate-400 text-xs italic">apologized for breaking</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">increase / decrease</span>
                    <span className="font-black text-blue-600 font-mono">→ BY (selisih)</span>
                    <span className="text-slate-400 text-xs italic">increased by 90%</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">depend / rely</span>
                    <span className="font-black text-blue-600 font-mono">→ ON</span>
                    <span className="text-slate-400 text-xs italic">depend on renewable energy</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">capable</span>
                    <span className="font-black text-blue-600 font-mono">→ OF (+ V-ing)</span>
                    <span className="text-slate-400 text-xs italic">capable of solving problems</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">differ</span>
                    <span className="font-black text-blue-600 font-mono">→ FROM</span>
                    <span className="text-slate-400 text-xs italic">differs from other species</span>
                  </div>
                </div>
              </div>

              {/* Perbandingan & Korelasi Baku */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 block mb-3">
                  📌 Pasangan Perbandingan & Korelasi:
                </span>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">the same</span>
                    <span className="font-black text-indigo-600 font-mono">→ AS</span>
                    <span className="text-red-500 text-xs line-through">bukan as same as</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">different</span>
                    <span className="font-black text-indigo-600 font-mono">→ FROM</span>
                    <span className="text-red-500 text-xs line-through">bukan different than</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">prefer [X]</span>
                    <span className="font-black text-indigo-600 font-mono">→ TO [Y]</span>
                    <span className="text-red-500 text-xs line-through">bukan than</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">would rather [V1]</span>
                    <span className="font-black text-indigo-600 font-mono">→ THAN [V1]</span>
                    <span className="text-slate-400 text-xs italic">would rather study than sleep</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">so + Adjective</span>
                    <span className="font-black text-indigo-600 font-mono">→ THAT + S+V</span>
                    <span className="text-slate-400 text-xs italic">so happy that he bought</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">such + Noun Phrase</span>
                    <span className="font-black text-indigo-600 font-mono">→ THAT + S+V</span>
                    <span className="text-slate-400 text-xs italic">such a difficult exam that...</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">either</span>
                    <span className="font-black text-indigo-600 font-mono">→ OR</span>
                    <span className="text-slate-400 text-xs italic">either coffee or tea</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">neither</span>
                    <span className="font-black text-indigo-600 font-mono">→ NOR</span>
                    <span className="text-slate-400 text-xs italic">neither the Dean nor staff</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">not only</span>
                    <span className="font-black text-indigo-600 font-mono">→ BUT ALSO</span>
                    <span className="text-slate-400 text-xs italic">not only smart but also kind</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">both</span>
                    <span className="font-black text-indigo-600 font-mono">→ AND</span>
                    <span className="text-slate-400 text-xs italic">both theory and practice</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">superior / inferior</span>
                    <span className="font-black text-indigo-600 font-mono">→ TO</span>
                    <span className="text-red-500 text-xs line-through">bukan than</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800">the more [X]</span>
                    <span className="font-black text-indigo-600 font-mono">→ THE MORE [Y]</span>
                    <span className="text-slate-400 text-xs italic">The more you read, the more...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolokasi Preposisi Tambahan (Akademik & Kampus) */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block mb-2">
                📚 12 Pasangan Preposisi Akademik Tambahan (Sering Keluar di EPT):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">familiar</span> <strong className="text-blue-600">WITH</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">familiar with modern methods</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">insist</span> <strong className="text-blue-600">ON (+ V-ing)</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">insisted on checking the draft</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">congratulate [X]</span> <strong className="text-blue-600">ON</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">congratulated on graduating</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">object</span> <strong className="text-blue-600">TO (+ V-ing)</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">objected to postponing the exam</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">succeed</span> <strong className="text-blue-600">IN (+ V-ing)</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">succeeded in passing the test</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">similar</span> <strong className="text-blue-600">TO</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">similar to the previous study</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">look forward</span> <strong className="text-blue-600">TO (+ V-ing)</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">look forward to receiving results</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">prevent [X]</span> <strong className="text-blue-600">FROM (+ V-ing)</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">prevent metals from rusting</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">responsible</span> <strong className="text-blue-600">FOR</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">responsible for the lab equipment</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">comply</span> <strong className="text-blue-600">WITH</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">comply with campus guidelines</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">approve</span> <strong className="text-blue-600">OF</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">approve of the thesis topic</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900">participate</span> <strong className="text-blue-600">IN</strong>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">participate in academic conferences</p>
                </div>
              </div>
            </div>
          </div>

          {/* MATERI 2: KONEKTOR KLAUSA VS FRASA BENDA */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Bedakan Konektor: Butuh Kalimat (S+V) vs Cuma Butuh Kata Benda (Noun)
                </h3>
                <p className="text-xs text-slate-500">
                  Ini adalah jebakan paling sering di EPT. Trik cepatnya: lihat ada KATA KERJA (Verb) atau tidak setelah titik-titik!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Sebab Akibat */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-blue-50/40 to-white">
                <span className="text-xs font-black text-blue-800 uppercase tracking-wider block mb-2">
                  1. Menyatakan SEBAB / KARENA:
                </span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-blue-200">
                    <strong className="text-blue-700 block font-mono text-sm">Because / Since / As</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Subjek + Kata Kerja (Kalimat Utuh)</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: <strong>Because</strong> the weather <strong>was</strong> bad, we stayed home.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <strong className="text-amber-800 block font-mono text-sm">Due to / Because of / Owing to</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Kata Benda (Noun Phrase) / V-ing TANPA kata kerja</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: <strong>Due to</strong> the bad weather, we stayed home.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pertentangan / Meskipun */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-purple-50/40 to-white">
                <span className="text-xs font-black text-purple-800 uppercase tracking-wider block mb-2">
                  2. Menyatakan PERTENTANGAN / MESKIPUN:
                </span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-purple-200">
                    <strong className="text-purple-700 block font-mono text-sm">Although / Even though / Though</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Subjek + Kata Kerja (Kalimat Utuh)</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: <strong>Although</strong> she <strong>studied</strong> hard, she was tired.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-rose-200">
                    <strong className="text-rose-800 block font-mono text-sm">In spite of / Despite</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Kata Benda (Noun Phrase) / V-ing TANPA kata kerja</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: <strong>In spite of</strong> our differences, we stick together.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kontras Antar Dua Klausa */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-emerald-50/40 to-white">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-2">
                  3. Menyatakan KONTRAS (Sementara itu):
                </span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-emerald-200">
                    <strong className="text-emerald-700 block font-mono text-sm">While / Whereas</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Subjek + Kata Kerja (Klausa Lengkap)</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: Maria prefers quantitative research, <strong>whereas</strong> her partner focuses on qualitative methods.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-teal-200">
                    <strong className="text-teal-800 block font-mono text-sm">Unlike / In contrast to</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Kata Benda (Noun Phrase)</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: <strong>Unlike</strong> traditional engines, electric motors produce zero tailpipe emissions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Menyatakan Tujuan (Purpose) */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-amber-50/40 to-white">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider block mb-2">
                  4. Menyatakan TUJUAN (Supaya / Agar):
                </span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <strong className="text-amber-800 block font-mono text-sm">In order to / So as to</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ V1 (Infinitive murni)</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: She studied daily <strong>in order to pass</strong> the campus EPT with a score of 450.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-orange-200">
                    <strong className="text-orange-800 block font-mono text-sm">So that / In order that</strong>
                    <span className="text-slate-600 block mt-0.5 font-bold">+ Subjek + can / could / will + V1</span>
                    <p className="text-xs text-slate-500 italic mt-1">
                      Contoh: She practiced daily <strong>so that she could graduate</strong> on schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabel Matriks Ringkas Konektor vs Preposisi */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase font-extrabold text-[11px]">
                  <tr>
                    <th className="p-3">Fungsi / Makna</th>
                    <th className="p-3 bg-blue-50 text-blue-900 border-x border-slate-200">Konektor (+ Subjek + Kata Kerja)</th>
                    <th className="p-3 bg-amber-50 text-amber-900">Preposisi (+ Kata Benda / V-ing Saja)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Sebab / Alasan</td>
                    <td className="p-3 font-mono text-blue-700 bg-blue-50/20 border-x border-slate-200 font-bold">Because, Since, As</td>
                    <td className="p-3 font-mono text-amber-800 bg-amber-50/20 font-bold">Because of, Due to, Owing to</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Meskipun / Pertentangan</td>
                    <td className="p-3 font-mono text-blue-700 bg-blue-50/20 border-x border-slate-200 font-bold">Although, Even though, Though</td>
                    <td className="p-3 font-mono text-amber-800 bg-amber-50/20 font-bold">Despite, In spite of</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Waktu / Ketika</td>
                    <td className="p-3 font-mono text-blue-700 bg-blue-50/20 border-x border-slate-200 font-bold">While, When, As</td>
                    <td className="p-3 font-mono text-amber-800 bg-amber-50/20 font-bold">During (+ Noun Phrase)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Kontras / Sebaliknya</td>
                    <td className="p-3 font-mono text-blue-700 bg-blue-50/20 border-x border-slate-200 font-bold">Whereas, While</td>
                    <td className="p-3 font-mono text-amber-800 bg-amber-50/20 font-bold">Unlike, In contrast to</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Trik Cepat 3 Detik:</strong> Lihat setelah titik-titik. Jika ada kata kerja seperti <em>is, was, were, has, had, study, go</em> $\rightarrow$ pasti pilih <strong>Because / Although</strong>. Jika tidak ada kata kerja (hanya frasa kata benda seperti <em>global warming, our differences, the heavy rain</em>) $\rightarrow$ pasti pilih <strong>Due to / Despite</strong>.
              </span>
            </div>
          </div>

          {/* MATERI 3: PARTICIPLE & REDUCED CLAUSE */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Participle & Penyederhanaan Klausa (V-ing vs V3)
                </h3>
                <p className="text-xs text-slate-500">
                  Aturan dasar: Kalimat hanya boleh punya 1 Kata Kerja Utama. Jika kata kerja lain disederhanakan, bentuknya berubah menjadi V-ing atau V3!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block mb-2">
                  Bentuk Pasif $\rightarrow$ Gunakan V3 (Past Participle)
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Digunakan jika maknanya <strong>"di-"</strong> atau <strong>"ter-"</strong> (pasif).
                </p>
                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">Contoh Soal Part 2:</div>
                  <div className="font-mono text-blue-700 mt-1">
                    Regular exercise, <strong>combined with</strong> a healthy diet, contributes to longevity.
                  </div>
                  <div className="text-slate-500 italic mt-1">
                    (Asalnya: <em>which is combined with</em> $\rightarrow$ disederhanakan cukup menjadi <strong>combined with</strong>).
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider block mb-2">
                  Bentuk Aktif & Akibat Langsung $\rightarrow$ Gunakan V-ing
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Digunakan jika maknanya <strong>"yang me-"</strong> (aktif) atau menunjukkan <strong>akibat langsung</strong>.
                </p>
                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">Contoh Soal Part 2:</div>
                  <div className="font-mono text-blue-700 mt-1">
                    Children <strong>living</strong> in poverty are prone to disease.
                  </div>
                  <div className="text-slate-500 italic mt-1">
                    (Asalnya: <em>Children who live in poverty</em> $\rightarrow$ disederhanakan menjadi <strong>living</strong>).
                  </div>
                  <div className="font-mono text-blue-700 mt-2">
                    The bomb exploded, <strong>destroying</strong> everything around.
                  </div>
                  <div className="text-slate-500 italic mt-1">
                    (V-ing menunjukkan akibat langsung dari ledakan bom).
                  </div>
                </div>
              </div>
            </div>

            {/* Variasi Participle Lanjutan */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Perfect Participle */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-indigo-700 uppercase tracking-wider block mb-1">
                  Variasi 1: Perfect Participle (Having + V3)
                </span>
                <p className="text-slate-600">
                  Digunakan untuk menyatakan tindakan yang <strong>SELESAI LEBIH DAHULU</strong> sebelum kegiatan utama dimulai.
                </p>
                <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="font-mono text-indigo-900 font-bold">
                    <strong>Having collected</strong> all the empirical data, the researchers began drafting their paper.
                  </div>
                  <div className="text-slate-500 italic mt-1">
                    (Artinya: Setelah selesai mengumpulkan seluruh data, para peneliti mulai menyusun makalah).
                  </div>
                </div>
              </div>

              {/* Konjungsi + Participle */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-teal-700 uppercase tracking-wider block mb-1">
                  Variasi 2: Konjungsi Langsung + Participle
                </span>
                <p className="text-slate-600">
                  Konjungsi seperti <em>While, When, Before, After, Although</em> bisa langsung diikuti V-ing (aktif) atau V3 (pasif) tanpa subjek.
                </p>
                <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="font-mono text-teal-900 font-bold">
                    <strong>When asked</strong> about the statistical anomaly, the student answered confidently.
                  </div>
                  <div className="text-slate-500 italic mt-1">
                    (Asalnya: <em>When he was asked</em> $\rightarrow$ disingkat menjadi <strong>When asked</strong>).
                  </div>
                </div>
              </div>
            </div>

            {/* Dangling Participle Trap */}
            <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Awas Jebakan "Dangling Participle" (Subjek Menggantung):</strong>
                <p className="mt-1 leading-relaxed text-slate-700">
                  Pelaku dari bentuk participle di awal koma <strong>HARUS SAMA PERSIS</strong> dengan subjek setelah koma!
                </p>
                <div className="mt-2 space-y-1">
                  <div className="text-red-700 font-mono">
                    ❌ <em>Walking to the campus library, the clock tower struck nine.</em> (SALAH! Seolah-olah menara jam yang sedang berjalan kaki).
                  </div>
                  <div className="text-emerald-800 font-mono font-bold">
                    ✅ <em>Walking to the campus library, <strong>the student</strong> heard the clock tower strike nine.</em> (BENAR, pelakunya mahasiswa).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MATERI 4: PENANDA WAKTU KUNCI (TENSE CLUES) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Perhatikan Penanda Waktu Kunci (Tense Clues)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Setiap kalimat di TOEFL selalu memberikan "kata kunci waktu" yang membocorkan tenses jawabannya!
                  </p>
                </div>
              </div>

              {/* Shortcut to Tenses Lab */}
              <div className="text-xs bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ada di Menu "Lab Tenses"</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-blue-700 text-sm block">since ...</span>
                <span className="font-extrabold text-slate-900 block mt-1">Present Perfect</span>
                <span className="text-slate-500 block mt-1 font-mono">have/has + V3</span>
                <p className="text-slate-600 mt-2 italic">
                  I <strong>haven't seen</strong> her <em>since</em> I graduated.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-indigo-700 text-sm block">these days / lately</span>
                <span className="font-extrabold text-slate-900 block mt-1">Present Perfect Cont.</span>
                <span className="text-slate-500 block mt-1 font-mono">have/has been + V-ing</span>
                <p className="text-slate-600 mt-2 italic">
                  What <strong>have you been doing</strong> <em>these days</em>?
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-emerald-700 text-sm block">Bukti Nyata Terlihat</span>
                <span className="font-extrabold text-slate-900 block mt-1">be going to</span>
                <span className="text-slate-500 block mt-1 font-mono">is/am/are going to V1</span>
                <p className="text-slate-600 mt-2 italic">
                  She looks very pale. She <strong>is going to faint</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-rose-700 text-sm block">If only / I wish</span>
                <span className="font-extrabold text-slate-900 block mt-1">Past Perfect (Subjunctive)</span>
                <span className="text-slate-500 block mt-1 font-mono">had + V3</span>
                <p className="text-slate-600 mt-2 italic">
                  I failed last week. If only I <strong>had studied</strong>!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-teal-700 text-sm block">By the time + Past</span>
                <span className="font-extrabold text-slate-900 block mt-1">Past Perfect</span>
                <span className="text-slate-500 block mt-1 font-mono">had + V3</span>
                <p className="text-slate-600 mt-2 italic">
                  By the time he came, we <strong>had left</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-purple-700 text-sm block">By next month / year</span>
                <span className="font-extrabold text-slate-900 block mt-1">Future Perfect</span>
                <span className="text-slate-500 block mt-1 font-mono">will have + V3</span>
                <p className="text-slate-600 mt-2 italic">
                  By 2028, I <strong>will have graduated</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-amber-700 text-sm block">must have + V3</span>
                <span className="font-extrabold text-slate-900 block mt-1">Dugaan Masa Lalu</span>
                <span className="text-slate-500 block mt-1 font-mono">Pasti sudah terjadi</span>
                <p className="text-slate-600 mt-2 italic">
                  The grass is wet. It <strong>must have rained</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-blue-700 text-sm block">should have + V3</span>
                <span className="font-extrabold text-slate-900 block mt-1">Penyesalan Kewajiban</span>
                <span className="text-slate-500 block mt-1 font-mono">Seharusnya sudah dilakukan</span>
                <p className="text-slate-600 mt-2 italic">
                  You <strong>should have checked</strong> the draft.
                </p>
              </div>
            </div>
          </div>

          {/* MATERI 5: KALIMAT SARAN & KATA TANYA */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Cek Bentuk Kata Kerja Setelah Kata Saran / Ajakan
                </h3>
                <p className="text-xs text-slate-500">
                  Lihat bentuk kata kerja tepat setelah titik-titik: apakah V-ing atau V1 biasa?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block text-sm">Jika diikuti V-ing (Gerund):</span>
                <div className="mt-1 font-mono font-black text-blue-700 text-base">
                  → How about / What about
                </div>
                <p className="mt-2 text-slate-700">
                  Contoh: <strong>How about hiring</strong> an interior designer? (karena <em>hiring</em> berbentuk V-ing).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm">Jika diikuti V1 murni (Bare Infinitive):</span>
                <div className="mt-1 font-mono font-black text-slate-800 text-base">
                  → Why don't we / Shall we / Let's
                </div>
                <p className="mt-2 text-slate-700">
                  Contoh: <strong>Why don't we hire</strong> an interior designer? (karena <em>hire</em> berbentuk V1).
                </p>
              </div>
            </div>
          </div>

          {/* MATERI 6: 6 POLA JEBAKAN UTAMA ERROR IDENTIFICATION */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  6 Pola Jebakan Paling Sering Muncul di Soal "Mencari yang Salah" (Error Identification)
                </h3>
                <p className="text-xs text-slate-500">
                  Kuasai 6 pola ini, maka 85% soal nomor 16–40 di Part 2 langsung bisa Anda taklukkan!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Jebakan 1: Subject Verb Agreement */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <span className="font-extrabold text-rose-700 uppercase tracking-wider block mb-1">
                  Pola 1: Subjek & Verb Terpisah Frasa Panjang (Prepositional Distractor)
                </span>
                <p className="text-slate-600 mb-2">
                  Soal TOEFL sering menyelipkan frasa panjang (seperti <em>of..., in..., with...</em>) di antara Subjek dan Kata Kerja untuk mengecoh Anda:
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-800">
                    The collection of ancient manuscripts <u>(a) donated</u> by the committee <u>(b) are</u> <u>(c) safely</u> stored in the vault <u>(d)</u>.
                  </div>
                  <div className="text-rose-700 font-bold mt-1.5 font-sans">
                    → Kunci yang SALAH adalah (b) are! Subjek aslinya adalah "The collection" (tunggal), bukan "manuscripts". Seharusnya diganti menjadi "is".
                  </div>
                </div>
              </div>

              {/* Jebakan 2: Word Form */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <span className="font-extrabold text-indigo-700 uppercase tracking-wider block mb-1">
                  Pola 2: Bentuk Kata Keliru (Adjective vs Adverb)
                </span>
                <p className="text-slate-600 mb-2">
                  Kata sifat (*Adjective*) hanya boleh menerangkan benda. Untuk menerangkan kata kerja atau kata sifat lain, WAJIB menggunakan kata keterangan (*Adverb* berakhiran -ly):
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-800">
                    The economy has <u>(a) recovered</u> <u>(b) remarkable</u> fast <u>(c) after</u> the global crisis <u>(d)</u>.
                  </div>
                  <div className="text-indigo-700 font-bold mt-1.5 font-sans">
                    → Kunci yang SALAH adalah (b) remarkable! Menerangkan kata keterangan "fast", sehingga harus berupa adverb "remarkably fast".
                  </div>
                </div>
              </div>

              {/* Jebakan 3: Parallel Structure */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <span className="font-extrabold text-blue-700 uppercase tracking-wider block mb-1">
                  Pola 3: Struktur Kalimat Tidak Sejajar (Parallelism)
                </span>
                <p className="text-slate-600 mb-2">
                  Jika ada kata sambung <em>and, or, but</em>, bentuk kata sebelumnya dan sesudahnya HARUS setara (misal: V-ing, V-ing, and V-ing):
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-800">
                    The candidates must demonstrate <u>(a) diligence</u>, critical <u>(b) thinking</u>, and <u>(c) to write</u> scientific papers <u>(d)</u>.
                  </div>
                  <div className="text-blue-700 font-bold mt-1.5 font-sans">
                    → Kunci yang SALAH adalah (c) to write! Karena kata sebelumnya adalah noun phrase (diligence, thinking), bentuknya harus sejajar: "writing skills" atau "writing".
                  </div>
                </div>
              </div>

              {/* Jebakan 4: Countable vs Uncountable */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <span className="font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
                  Pola 4: Benda Tak Dapat Dihitung Diberi Akhiran -s atau "Many"
                </span>
                <p className="text-slate-600 mb-2">
                  Kata benda seperti <em>information, equipment, advice, research, furniture, homework</em> bersifat TAK DAPAT DIHITUNG (Uncountable). Tidak boleh pakai akhiran -s dan tidak boleh diawali "many" atau "few":
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-800">
                    The supervisor provided <u>(a) many</u> useful <u>(b) advices</u> to improve <u>(c) the methodology</u> chapter <u>(d)</u>.
                  </div>
                  <div className="text-emerald-800 font-bold mt-1.5 font-sans">
                    → Kunci yang SALAH adalah (b) advices! Seharusnya "much useful advice" atau "a lot of advice" (tanpa -s).
                  </div>
                </div>
              </div>

              {/* Jebakan 5: Singular Determiners */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <span className="font-extrabold text-amber-700 uppercase tracking-wider block mb-1">
                  Pola 5: Kata "Each" dan "Every" Diikuti Benda Jamak
                </span>
                <p className="text-slate-600 mb-2">
                  Kata *Each* dan *Every* HANYA boleh diikuti kata benda TUNGGAL (Singular) tanpa akhiran -s:
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-800">
                    <u>(a) Each</u> students <u>(b) in</u> the graduate seminar <u>(c) must submit</u> a research proposal <u>(d)</u>.
                  </div>
                  <div className="text-amber-800 font-bold mt-1.5 font-sans">
                    → Kunci yang SALAH adalah (a) Each students! Seharusnya "Each student" (tanpa -s).
                  </div>
                </div>
              </div>

              {/* Jebakan 6: Double Comparative */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <span className="font-extrabold text-teal-700 uppercase tracking-wider block mb-1">
                  Pola 6: Pemborosan Kata Komparatif (Double Comparative)
                </span>
                <p className="text-slate-600 mb-2">
                  Jika kata sifat sudah berakhiran -er atau memiliki bentuk khusus (*better, worse, faster*), TIDAK BOLEH ditambahi kata "more":
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-800">
                    The updated solar cells are <u>(a) much more higher</u> in energy efficiency <u>(b) than</u> earlier <u>(c) prototypes</u> <u>(d)</u>.
                  </div>
                  <div className="text-teal-800 font-bold mt-1.5 font-sans">
                    → Kunci yang SALAH adalah (a) much more higher! Cukup "much higher" (tanpa more).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE MINI-QUIZ: TEST PEMAHAMAN PART 2 */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-indigo-700/50 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
                  Latihan Cepat 5 Detik
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold mt-2">
                  Uji Pemahaman Materi Part 2 (Klik Opsi untuk Melihat Jawaban Langsung)
                </h3>
              </div>
              <span className="text-xs text-indigo-300 font-mono">5 Soal Kilat</span>
            </div>

            <div className="space-y-6">
              {/* Soal 1: Kolokasi */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15">
                <span className="text-xs font-bold text-amber-300 block mb-1">1. Kolokasi Preposisi Baku:</span>
                <p className="text-sm font-semibold mb-3">
                  Students who are not aware _________ the campus registration deadlines will have to wait until next semester.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'a', text: 'with' },
                    { key: 'b', text: 'of' },
                    { key: 'c', text: 'about' },
                    { key: 'd', text: 'for' }
                  ].map(opt => {
                    const isSelected = quizAnswers[1] === opt.key;
                    const isCorrect = opt.key === 'b';
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, 1: opt.key }))}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                              : 'bg-red-500 text-white ring-2 ring-red-300'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <span>({opt.key}) {opt.text}</span>
                        {isSelected && (isCorrect ? '✅' : '❌')}
                      </button>
                    );
                  })}
                </div>
                {quizAnswers[1] && (
                  <div className={`mt-3 text-xs p-2.5 rounded-xl ${quizAnswers[1] === 'b' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                    <strong>{quizAnswers[1] === 'b' ? 'Benar!' : 'Salah!'}</strong> Pasangan baku untuk kata <em>aware</em> selalu <strong>of</strong> (aware of the deadlines).
                  </div>
                )}
              </div>

              {/* Soal 2: Konektor Sebab */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15">
                <span className="text-xs font-bold text-amber-300 block mb-1">2. Konektor (Klausa vs Frasa Benda):</span>
                <p className="text-sm font-semibold mb-3">
                  The faculty cancelled the outdoor graduation rehearsal _________ the sudden severe storm.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'a', text: 'because' },
                    { key: 'b', text: 'because of' },
                    { key: 'c', text: 'since' },
                    { key: 'd', text: 'although' }
                  ].map(opt => {
                    const isSelected = quizAnswers[2] === opt.key;
                    const isCorrect = opt.key === 'b';
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, 2: opt.key }))}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                              : 'bg-red-500 text-white ring-2 ring-red-300'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <span>({opt.key}) {opt.text}</span>
                        {isSelected && (isCorrect ? '✅' : '❌')}
                      </button>
                    );
                  })}
                </div>
                {quizAnswers[2] && (
                  <div className={`mt-3 text-xs p-2.5 rounded-xl ${quizAnswers[2] === 'b' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                    <strong>{quizAnswers[2] === 'b' ? 'Benar!' : 'Salah!'}</strong> Setelah titik-titik adalah <em>'the sudden severe storm'</em> (frasa kata benda TANPA kata kerja utama), maka wajib memilih <strong>because of</strong>.
                  </div>
                )}
              </div>

              {/* Soal 3: Participle Pasif */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15">
                <span className="text-xs font-bold text-amber-300 block mb-1">3. Participle (Penyederhanaan Kalimat):</span>
                <p className="text-sm font-semibold mb-3">
                  Solar cells, _________ with lithium-ion batteries, can provide electricity even at night.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'a', text: 'combining' },
                    { key: 'b', text: 'combine' },
                    { key: 'c', text: 'combined' },
                    { key: 'd', text: 'are combined' }
                  ].map(opt => {
                    const isSelected = quizAnswers[3] === opt.key;
                    const isCorrect = opt.key === 'c';
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, 3: opt.key }))}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                              : 'bg-red-500 text-white ring-2 ring-red-300'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <span>({opt.key}) {opt.text}</span>
                        {isSelected && (isCorrect ? '✅' : '❌')}
                      </button>
                    );
                  })}
                </div>
                {quizAnswers[3] && (
                  <div className={`mt-3 text-xs p-2.5 rounded-xl ${quizAnswers[3] === 'c' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                    <strong>{quizAnswers[3] === 'c' ? 'Benar!' : 'Salah!'}</strong> Kalimat sudah memiliki kata kerja utama <em>'can provide'</em>. Sel surya 'dikombinasikan' (bermakna pasif), maka bentuk sederhananya adalah V3 yaitu <strong>combined</strong> (asalnya: <em>which are combined with</em>).
                  </div>
                )}
              </div>

              {/* Soal 4: Error Identification */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15">
                <span className="text-xs font-bold text-amber-300 block mb-1">4. Error Identification (CARI YANG SALAH):</span>
                <p className="text-sm font-semibold mb-3 leading-relaxed">
                  <u>Despite (a)</u> the flight was delayed by <u>(b) severe</u> turbulence, the delegates <u>(c) arrived</u> safely at <u>(d) the conference</u>.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'a', text: 'Despite' },
                    { key: 'b', text: 'severe' },
                    { key: 'c', text: 'arrived' },
                    { key: 'd', text: 'the conference' }
                  ].map(opt => {
                    const isSelected = quizAnswers[4] === opt.key;
                    const isCorrect = opt.key === 'a';
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, 4: opt.key }))}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                              : 'bg-red-500 text-white ring-2 ring-red-300'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <span>({opt.key}) {opt.text}</span>
                        {isSelected && (isCorrect ? '✅' : '❌')}
                      </button>
                    );
                  })}
                </div>
                {quizAnswers[4] && (
                  <div className={`mt-3 text-xs p-2.5 rounded-xl ${quizAnswers[4] === 'a' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                    <strong>{quizAnswers[4] === 'a' ? 'Tepat Sekali!' : 'Salah!'}</strong> Bagian <strong>(a) Despite</strong> itulah yang SALAH! Karena setelahnya ada subjek dan kata kerja (<em>the flight was delayed</em>), maka kata sambung yang benar adalah <strong>Although</strong>.
                  </div>
                )}
              </div>

              {/* Soal 5: Tenses Penyesalan */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15">
                <span className="text-xs font-bold text-amber-300 block mb-1">5. Tenses Penyesalan Lampau (If only / Wish):</span>
                <p className="text-sm font-semibold mb-3">
                  I lost all my draft documents yesterday. If only I _________ them to cloud storage!
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'a', text: 'saved' },
                    { key: 'b', text: 'had saved' },
                    { key: 'c', text: 'have saved' },
                    { key: 'd', text: 'would save' }
                  ].map(opt => {
                    const isSelected = quizAnswers[5] === opt.key;
                    const isCorrect = opt.key === 'b';
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, 5: opt.key }))}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                              : 'bg-red-500 text-white ring-2 ring-red-300'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <span>({opt.key}) {opt.text}</span>
                        {isSelected && (isCorrect ? '✅' : '❌')}
                      </button>
                    );
                  })}
                </div>
                {quizAnswers[5] && (
                  <div className={`mt-3 text-xs p-2.5 rounded-xl ${quizAnswers[5] === 'b' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                    <strong>{quizAnswers[5] === 'b' ? 'Benar!' : 'Salah!'}</strong> Kalimat penyesalan terhadap masa lampau (<em>yesterday</em>) menggunakan formula Past Perfect: <strong>had + V3 (had saved)</strong>.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PART 1 LISTENING COMPREHENSION */}
      {/* ======================================================== */}
      {activeTab === 'part1' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Trik Speaker Kedua */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                🎧
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Trik Emas Listening Part A: Fokus 100% pada Pembicara Kedua!
                </h3>
                <p className="text-xs text-slate-500">
                  Pada soal percakapan pendek Part A (soal nomor 1–30), 80% kunci jawaban ada di kalimat pembicara kedua.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                <strong className="text-blue-900 block text-sm mb-1">
                  1. Pembicara Pertama Hanya Memberi Pengantar / Situasi
                </strong>
                <p>
                  Man: <em>"Are you coming to the seminar this afternoon?"</em> (Hanya bertanya).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <strong className="text-emerald-950 block text-sm mb-1">
                  2. Pembicara Kedua Memberikan JAWABAN / FAKTA SEBENARNYA ⭐
                </strong>
                <p>
                  Woman: <em>"I really wish I could, but I have a huge lab report due at four that I haven't started."</em>
                </p>
                <p className="mt-2 text-emerald-900 font-bold">
                  → Jawaban benar di pilihan ganda: <em>She cannot attend because of schoolwork.</em>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                <strong className="text-red-950 block text-sm mb-1">
                  3. Hati-hati Jebakan Bunyi Serupa (Similar Sound Trap)! ⚠️
                </strong>
                <p>
                  Di TOEFL, jika ada pilihan ganda yang menggunakan kata yang <strong>bunyinya mirip persis</strong> dengan yang kamu dengar di audio (misal di audio ada kata <em>report</em>, lalu di opsi ada <em>He will report the seminar</em>), itu <strong>90% JEBAKAN SALAH</strong>! Jawaban yang benar hampir selalu berupa <strong>PARAFRASE (makna sama dengan kata-kata berbeda)</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Tipe Soal Monolog & Kuliah (Part B & C) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Strategi Part B & C (Percakapan Panjang & Kuliah Monolog)</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2.5 list-disc list-inside leading-relaxed">
              <li>
                <strong>Lirik Opsi Jawaban Terlebih Dahulu (Previewing Options):</strong> Saat narator membacakan arahan di awal, segera baca sekilas opsi jawaban A, B, C, D di kertas/layar. Dengan membaca opsi, Anda sudah bisa menebak topik apa yang akan dibahas pembicara!
              </li>
              <li>
                <strong>Perhatikan Kalimat Pembuka:</strong> Dosen biasanya menyebutkan topik utama kuliah di 1-2 kalimat pertama (<em>"Today we will explore..."</em>, <em>"Our discussion today focuses on..."</em>). Soal nomor pertama selalu menanyakan ide utama ini!
              </li>
              <li>
                <strong>Fokus pada Kata Transisi:</strong> Dengarkan kata-kata seperti <em>However, Therefore, The main limitation is, What's interesting is...</em>. Setelah kata transisi tersebut biasanya langsung muncul jawaban soal detail.
              </li>
            </ul>
          </div>

          {/* 10 Idiom Populer di Listening TOEFL */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                🗣️
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  10 Idiom Percakapan Kampus Paling Kerap Muncul di Part A
                </h3>
                <p className="text-xs text-slate-500">
                  Percakapan pendek Part A sering menggunakan ungkapan kiasan sehari-hari yang maknanya berbeda dari arti kata harfiah:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">1. under the weather</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Merasa kurang enak badan / sakit ringan</span>
                <p className="text-xs text-slate-500 italic mt-1">"I'm feeling a bit under the weather today." $\rightarrow$ She is sick.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">2. call it a day</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Menyudahi / berhenti bekerja hari ini</span>
                <p className="text-xs text-slate-500 italic mt-1">"Let's call it a day." $\rightarrow$ They should stop working now.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">3. on the fence</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Belum bisa memutuskan / ragu-ragu</span>
                <p className="text-xs text-slate-500 italic mt-1">"I'm still on the fence about the topic." $\rightarrow$ He is undecided.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">4. hit the books</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Mulai belajar keras untuk ujian</span>
                <p className="text-xs text-slate-500 italic mt-1">"I have to hit the books tonight." $\rightarrow$ She must study.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">5. take a rain check</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Menunda ajakan ke lain waktu</span>
                <p className="text-xs text-slate-500 italic mt-1">"Can I take a rain check?" $\rightarrow$ He wants to postpone the invitation.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">6. out of the question</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Sama sekali tidak mungkin / mustahil</span>
                <p className="text-xs text-slate-500 italic mt-1">"Buying that gear is out of the question." $\rightarrow$ It is impossible.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">7. see eye to eye</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: Sepakat / sependapat</span>
                <p className="text-xs text-slate-500 italic mt-1">"We don't always see eye to eye." $\rightarrow$ They disagree sometimes.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 font-mono block">8. I couldn't agree more ⭐</span>
                <span className="text-slate-800 font-medium block mt-0.5">Artinya: SANGAT SETUJU 100% (Bukan tidak setuju!)</span>
                <p className="text-xs text-slate-500 italic mt-1">"I couldn't agree more with the Dean." $\rightarrow$ She completely agrees.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PART 3 READING COMPREHENSION */}
      {/* ======================================================== */}
      {activeTab === 'part3' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Skimming & Scanning */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                📖
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Trik Cepat Reading: JANGAN BACA SELURUH TEKS DARI AWAL!
                </h3>
                <p className="text-xs text-slate-500">
                  Waktu Reading hanya 55 menit untuk 40–50 soal. Membaca kata demi kata seperti novel dijamin membuat Anda kehabisan waktu!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-blue-700 uppercase tracking-wider block mb-1">
                  1. Soal Main Idea / Topic / Purpose
                </span>
                <strong className="text-slate-900 text-sm block mb-2">
                  Cukup Baca Kalimat 1-2 Tiap Paragraf (Skimming)
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  90% teks akademik TOEFL menaruh ide pokok di <strong>kalimat pertama dan kedua paragraf 1</strong>, serta dipertegas di kalimat awal paragraf terakhir. Jangan buang waktu membaca contoh-contoh detail di tengah paragraf!
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
                  2. Soal Detail / Faktual ("According to the passage...")
                </span>
                <strong className="text-slate-900 text-sm block mb-2">
                  Lacak Kata Kunci Unik (Scanning)
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Tandai kata unik di pertanyaan (huruf kapital seperti nama orang/kota, angka tahun, atau istilah ilmiah). Gerakkan mata cepat mencari kata kunci tersebut di teks, lalu baca 1 kalimat sebelum dan sesudahnya.
                </p>
              </div>
            </div>
          </div>

          {/* Trik Vocabulary in Context */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Trik Menebak Kosakata Sulit (Vocabulary in Context) Tanpa Kamus</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              Anda tidak perlu hafal kamus tebal. Penulis teks akademik selalu memberikan <strong>petunjuk konteks</strong> di kalimat yang sama:
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block font-mono">1. Petunjuk Definisi (which means, is defined as, or):</strong>
                <span className="text-slate-600 italic">
                  "Pollen fertilizes the plant, <strong>which means that</strong> it enables the plant to produce seeds."
                </span>
                <p className="text-emerald-700 font-semibold mt-1">→ Arti kata fertilizes langsung dijelaskan setelahnya!</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block font-mono">2. Petunjuk Tanda Baca Koma Ganda (Appositive):</strong>
                <span className="text-slate-600 italic">
                  "They eat royal jelly, <strong>a substance particularly rich in vitamins and proteins</strong>, to grow."
                </span>
                <p className="text-emerald-700 font-semibold mt-1">→ Keterangan di antara dua tanda koma adalah definisi kata tersebut!</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block font-mono">3. Petunjuk Kontras (unlike, but, however, in contrast):</strong>
                <span className="text-slate-600 italic">
                  "In Jeddah women walk freely, <strong>something they could never do</strong> in Riyadh."
                </span>
                <p className="text-emerald-700 font-semibold mt-1">→ Makna kontras membantu menebak perbedaan aturan kedua kota!</p>
              </div>
            </div>
          </div>

          {/* Variasi Soal Reading Lanjutan */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>Strategi Menjawab 3 Variasi Soal Reading Lainnya</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Soal Pronoun Reference */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-blue-700 uppercase tracking-wider block mb-1">
                  1. Soal Kata Rujukan ("The word 'they' in line 8 refers to...")
                </span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Trik Cepat:</strong> Selalu mundur 1 kalimat ke belakang dari letak kata ganti tersebut.
                </p>
                <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div>• Jika kata gantinya <strong>it / its</strong> $\rightarrow$ cari kata benda tunggal (singular noun) terdekat sebelumnya.</div>
                  <div>• Jika kata gantinya <strong>they / them / their</strong> $\rightarrow$ cari kata benda jamak (plural noun dengan akhiran -s) terdekat sebelumnya.</div>
                </div>
              </div>

              {/* Soal EXCEPT / NOT Mentioned */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-amber-700 uppercase tracking-wider block mb-1">
                  2. Soal Pengecualian ("All of the following are mentioned EXCEPT...")
                </span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Trik Cepat:</strong> Jangan membaca ulang seluruh paragraf dari awal. Ambil 4 opsi jawaban A, B, C, D lalu cari kata kuncinya di teks:
                </p>
                <p className="text-slate-500 italic mt-1 text-xs">
                  $\rightarrow$ Tiga opsi pasti tertulis persis di teks. SATU opsi yang tidak pernah tertulis atau berlawanan makna, itulah jawabannya!
                </p>
              </div>

              {/* Soal Author's Purpose */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
                  3. Soal Tujuan Penulis ("The author's primary purpose is to...")
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Cek kata kerja di awal opsi jawaban:
                </p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <strong>to explain / describe:</strong> Jika teks memberi informasi ilmiah atau sejarah faktual.
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <strong>to compare / contrast:</strong> Jika teks membandingkan dua teori atau dua spesies.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: TARGET 450 SKRIPSI */}
      {/* ======================================================== */}
      {activeTab === 'target450' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Target Math */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Hitungan Matematis Tembus 450: Target Sangat Realistis!</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Banyak mahasiswa menunda ujian EPT karena mengira tes ini sesulit tes masuk luar negeri. Padahal syarat skripsi kampus Anda hanya <strong>minimal 450</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Part 1 (Listening)</span>
                <span className="text-3xl font-black text-slate-900 mt-2 block">19 Benar</span>
                <span className="text-xs text-slate-500 mt-1 block">Scaled Score: ~44</span>
              </div>
              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">Part 2 (Structure)</span>
                <span className="text-3xl font-black text-slate-900 mt-2 block">20 Benar</span>
                <span className="text-xs text-slate-500 mt-1 block">Scaled Score: ~45</span>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Part 3 (Reading)</span>
                <span className="text-3xl font-black text-slate-900 mt-2 block">20 Benar</span>
                <span className="text-xs text-slate-500 mt-1 block">Scaled Score: ~45</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm text-center font-mono">
              Total Skor = ((44 + 45 + 45) × 10) ÷ 3 = <strong>447 → Dibulatkan 450 (LULUS SYARAT SKRIPSI!)</strong>
            </div>
          </div>

          {/* Interactive 450 Simulator Card */}
          {(() => {
            const simLScaled = calculateScaledListening(simListening, 50);
            const simSScaled = calculateScaledStructure(simStructure, 40);
            const simRScaled = calculateScaledReading(simReading, 50);
            const simTotalScore = calculateToeflScore(simLScaled, simSScaled, simRScaled);
            const simPassed = simTotalScore >= 450;
            const simDiff = simTotalScore - 450;

            return (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base shadow-xs">
                    🧮
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Kalkulator Interaktif Simulasi Skor 450
                    </h3>
                    <p className="text-xs text-slate-500">
                      Geser slider di bawah untuk menguji kombinasi jawaban benar dan menghitung skor resmi EPT secara instan:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {/* Slider 1: Listening */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-blue-700">Part 1: Listening</span>
                      <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-lg">{simListening} / 50 Benar</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={simListening}
                      onChange={(e) => setSimListening(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Scaled Score:</span>
                      <span className="font-extrabold text-slate-900 font-mono text-sm">{simLScaled}</span>
                    </div>
                  </div>

                  {/* Slider 2: Structure */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-indigo-700">Part 2: Structure</span>
                      <span className="font-mono text-sm bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-lg">{simStructure} / 40 Benar</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={simStructure}
                      onChange={(e) => setSimStructure(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Scaled Score:</span>
                      <span className="font-extrabold text-slate-900 font-mono text-sm">{simSScaled}</span>
                    </div>
                  </div>

                  {/* Slider 3: Reading */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-emerald-700">Part 3: Reading</span>
                      <span className="font-mono text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg">{simReading} / 50 Benar</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={simReading}
                      onChange={(e) => setSimReading(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Scaled Score:</span>
                      <span className="font-extrabold text-slate-900 font-mono text-sm">{simRScaled}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Total Score Banner */}
                <div className={`p-5 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${
                  simPassed ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700' : 'bg-gradient-to-r from-slate-900 to-indigo-950'
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                        Prediksi Skor TOEFL Resmi
                      </span>
                      {simPassed ? (
                        <span className="text-xs font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                          🎉 LULUS SYARAT SIDANG
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-red-400 text-slate-950 px-2 py-0.5 rounded-full">
                          ⚠️ BELUM MEMENUHI
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs opacity-90 font-mono">
                      Formula: (({simLScaled} + {simSScaled} + {simRScaled}) × 10) ÷ 3
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs opacity-80 block">Total Skor</span>
                      <span className="text-3xl font-black font-mono">{simTotalScore}</span>
                    </div>
                    <div className="pl-4 border-l border-white/20 text-xs">
                      {simPassed ? (
                        <span className="text-amber-300 font-bold block">Melampaui target (+{simDiff} poin)</span>
                      ) : (
                        <span className="text-red-300 font-bold block">Kurang {Math.abs(simDiff)} poin ke 450</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Golden Rules */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
            <h4 className="text-base font-extrabold text-amber-950 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Aturan Paling Krusial: JANGAN KOSONGKAN SATUPUN SOAL!</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-amber-950/90 leading-relaxed">
              <p>
                1. <strong>Tidak ada sistem nilai minus</strong> di TOEFL. Jawaban salah bernilai 0, bukan -1.
              </p>
              <p>
                2. Jika waktu tersisa 1-2 menit dan masih ada 10 soal yang belum sempat Anda baca, <strong>segera hitamkan/pilih SATU huruf yang sama untuk semua soal kosong tersebut (misal pilih 'B' atau 'C' semua)</strong>.
              </p>
              <p>
                3. Secara probabilitas statistik, menebak dengan huruf konsisten akan memberi Anda <strong>tambahan 2-4 jawaban benar gratis</strong>! Tambahan 3 jawaban benar tersebut bisa langsung menaikkan skor Anda sebesar +20 poin, yang menjadi penentu antara skor 430 (gagal) dan skor 450 (lulus)!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onStartPractice}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <span>Paham! Sekarang Coba Kerjakan Soal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

