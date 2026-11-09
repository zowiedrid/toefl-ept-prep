export interface EptTip {
  category: 'overview' | 'structure' | 'listening' | 'reading';
  title: string;
  badge: string;
  description: string;
  keyPoints: string[];
  examples?: {
    pattern?: string;
    incorrect?: string;
    correct?: string;
    explanation?: string;
  }[];
}

export const TARGET_450_STRATEGY = {
  targetScore: 450,
  minPassingCorrect: {
    listening: "18 - 20 dari 40 soal (~45-50%)",
    structure: "18 - 20 dari 40 soal (~45-50%)",
    reading: "18 - 20 dari 40 soal (~45-50%)"
  },
  goldenRules: [
    "TIDAK ADA PENGURANGAN NILAI (No Penalty): Jangan pernah mengosongkan lembar jawaban! Jika waktu tinggal 1 menit, tebak semua soal tersisa dengan satu huruf yang sama (misal 'B' atau 'C'). Peluang benarnya 25%.",
    "FOKUS TERTINGGI ADA DI STRUCTURE (Part 2): Part 2 adalah bagian yang paling cepat dan mudah dipelajari karena rumusnya berpola pasti (10 rumus inti berulang terus).",
    "TARGET HANYA 50% BENAR: Anda TIDAK perlu menjadi penutur asli atau menjawab benar semua soal. Cukup benar 20 soal per bagian, Anda SUDAH LULUS 450+!"
  ]
};

export const EPT_TIPS: EptTip[] = [
  {
    category: 'overview',
    title: 'Strategi Hitungan Skor 450 Syarat Skripsi / Tugas Akhir',
    badge: 'Kunci Kelulusan',
    description: 'Banyak mahasiswa merasa TOEFL EPT itu momok yang menakutkan karena mengira harus bisa menjawab semua soal. Faktanya, untuk mendapatkan skor 450, Anda hanya butuh benar sekitar 18 - 20 soal saja per bagian!',
    keyPoints: [
      'Listening: Benar 19 soal -> Scaled Score ~44',
      'Structure: Benar 20 soal -> Scaled Score ~45',
      'Reading: Benar 20 soal -> Scaled Score ~45',
      'Total Perhitungan: ((44 + 45 + 45) x 10) / 3 = 446.6 -> dibulatkan menjadi 450 (LULUS SYARAT SKRIPSI!)'
    ]
  },
  {
    category: 'structure',
    title: '1. Subject - Verb Agreement (Pola S-V)',
    badge: 'Rumus Paling Sering Keluar (30%)',
    description: 'Setiap kalimat dalam bahasa Inggris WAJIB memiliki minimal 1 Subjek dan 1 Kata Kerja (Verb). Hati-hati dengan frasa penyela (prepositional phrase, appositive) yang menipu mata!',
    keyPoints: [
      'Subjek tunggal (singular) wajib berpasangan dengan kata kerja tunggal (is, was, has, Verb+s/es).',
      'Frasa penyela seperti "along with", "as well as", "together with", "in addition to" TIDAK mengubah subjek utama.',
      'Contoh: The professor, along with three assistants, IS conducting the experiment (BUKAN are).'
    ],
    examples: [
      {
        pattern: "Subject + [prepositional phrase / appositive] + Verb",
        incorrect: "The development of modern renewable technologies have reduced emissions.",
        correct: "The development of modern renewable technologies has reduced emissions.",
        explanation: "Subjek utama adalah 'The development' (tunggal), bukan 'technologies'. Maka kata kerja harus 'has reduced'."
      }
    ]
  },
  {
    category: 'structure',
    title: '2. Conjunction vs Preposition (Because vs Because of / Although vs Despite)',
    badge: 'Sering Menjebak di EPT',
    description: 'Perbedaan utama antara konjungsi (Conjunction) dan preposisi (Preposition) terletak pada apa yang mengikutinya.',
    keyPoints: [
      'Konjungsi (Because, Although, Even though, Since) WAJIB diikuti Klausa lengkap (Subjek + Verb).',
      'Preposisi (Because of, Due to, Despite, In spite of) WAJIB diikuti Frasa Kata Benda (Noun / Noun Phrase / V-ing), TANPA kata kerja utama.'
    ],
    examples: [
      {
        pattern: "Although + S + V  VS  Despite + Noun Phrase",
        incorrect: "Despite she was exhausted, she finished the paper.",
        correct: "Although she was exhausted, she finished the paper.",
        explanation: "Karena 'she was exhausted' adalah klausa lengkap (ada Subjek 'she' dan Verb 'was'), gunakan 'Although', bukan 'Despite'."
      },
      {
        pattern: "Because + S + V  VS  Because of + Noun",
        incorrect: "Because of the library was closed, we studied at home.",
        correct: "Because the library was closed, we studied at home.",
        explanation: "Gunakan 'Because' jika ada kata kerja 'was closed'."
      }
    ]
  },
  {
    category: 'structure',
    title: '3. Parallel Structure (Kesejajaran Kata)',
    badge: 'Rumus Mudah Mendulang Poin',
    description: 'Kata yang dihubungkan oleh kata hubung setara (and, but, or, as well as) harus memiliki bentuk gramatikal yang setara (Noun dengan Noun, Adjective dengan Adjective, V-ing dengan V-ing, To-V dengan To-V).',
    keyPoints: [
      'Korelatif berpasangan: Both ... and ..., Either ... or ..., Neither ... nor ..., Not only ... but also ...',
      'Jika sebelum "and" ada V-ing, maka setelah "and" juga wajib V-ing.'
    ],
    examples: [
      {
        pattern: "V-ing, V-ing, and V-ing",
        incorrect: "The researcher was responsible for collecting data, analyzing samples, and to write reports.",
        correct: "The researcher was responsible for collecting data, analyzing samples, and writing reports.",
        explanation: "Semua kata kerja harus sejajar dalam bentuk gerund (-ing)."
      }
    ]
  },
  {
    category: 'structure',
    title: '4. Inversion (Pembalikan Kalimat setelah Kata Negatif)',
    badge: 'Soal Level Sedang-Tinggi',
    description: 'Ketika kata negatif atau pembatas diletakkan di awal kalimat untuk penegasan, susunan kalimat dibalik menjadi: Kata Negatif + Auxiliary/To Be + Subjek + Verb.',
    keyPoints: [
      'Kata pemicu Inversion: Rarely, Seldom, Never, Hardly, Scarcely, Not only, Under no circumstances, Little.',
      'Contoh: Rarely DO WE SEE such dedication (bukan: Rarely we see).'
    ],
    examples: [
      {
        pattern: "Negative Word + Auxiliary + Subject + Verb",
        incorrect: "Seldom the university allows late registration.",
        correct: "Seldom does the university allow late registration.",
        explanation: "Kata kerja bantu 'does' ditarik ke depan subjek 'the university'."
      }
    ]
  },
  {
    category: 'listening',
    title: 'Trik Sakti Listening Part A: Fokus Speaker Kedua!',
    badge: 'Trik Kilat Part 1',
    description: 'Pada percakapan pendek Part A (soal 1 - 30), kunci jawaban hampir 80% berada di kalimat yang diucapkan oleh PEMBICARA KEDUA (Second Speaker).',
    keyPoints: [
      'Dengarkan baik-baik intonasi dan kata kunci pembicara kedua.',
      'Waspadai Jebakan Bunyi Mirip (Similar Sound Trap): Pilihan ganda yang menggunakan kata-kata berbunyi mirip persis dengan di audio hampir selalu SALAH!',
      'Cari opsi yang merupakan PARAFRASE (makna sama dengan kata-kata berbeda) dari kalimat pembicara kedua.'
    ]
  },
  {
    category: 'reading',
    title: 'Trik Cepat Reading: Skimming & Scanning',
    badge: 'Hemat Waktu Part 3',
    description: 'Waktu Reading TOEFL EPT sangat terbatas (sekitar 55 menit untuk 40-50 soal). JANGAN pernah membaca seluruh teks kata demi kata seperti membaca novel!',
    keyPoints: [
      'Soal Main Idea / Topic: Baca hanya kalimat pertama dan kedua di paragraf 1, serta kalimat pertama di paragraf terakhir. 90% ide utama berada di sana.',
      'Soal Vocabulary in Context: Baca kalimat tempat kata tersebut berada, cari kata penghubung seperti "which means", "such as", "or", atau tanda koma ganda yang memberikan petunjuk definisi.',
      'Soal Detail Khusus: Tandai kata kunci unik di pertanyaan (nama orang, tahun, angka, istilah ilmiah dengan huruf kapital), lalu gerakkan mata cepat (scan) mencari kata kunci tersebut di teks.'
    ]
  }
];

