export interface TenseDetail {
  id: string;
  name: string;
  englishName: string;
  timeCategory: 'present' | 'past' | 'future';
  description: string;
  formulaVerbal: {
    positive: string;
    negative: string;
    interrogative: string;
  };
  formulaNominal: {
    positive: string;
    negative: string;
    interrogative: string;
  };
  timeSignals: string[];
  toeflTips: string;
  sampleToeflQuestion: {
    prompt: string;
    options: { key: 'a' | 'b' | 'c' | 'd'; text: string }[];
    correctAnswer: 'a' | 'b' | 'c' | 'd';
    explanation: string;
  };
}

export interface TransformSentence {
  id: string;
  subject: string;
  topic: string;
  baseVerb: string;
  translations: Record<string, {
    positive: string;
    negative: string;
    interrogative: string;
    passive?: string;
    verbHighlight: string;
  }>;
}

export const TENSES_LIST: TenseDetail[] = [
  // 1. SIMPLE PRESENT
  {
    id: 'present_simple',
    name: 'Simple Present Tense',
    englishName: 'Simple Present Tense',
    timeCategory: 'present',
    description: 'Menyatakan fakta ilmiah universal, kebiasaan rutin (habitual action), atau kondisi umum yang selalu berlaku.',
    formulaVerbal: {
      positive: 'S + V1 (-s/-es untuk he/she/it) + O / Complement',
      negative: 'S + do / does not + V1 (murni) + O',
      interrogative: 'Do / Does + S + V1 (murni) + O?'
    },
    formulaNominal: {
      positive: 'S + is / am / are + Adjective / Noun / Adverb',
      negative: 'S + is / am / are + not + Adj / Noun / Adv',
      interrogative: 'Is / Am / Are + S + Adj / Noun / Adv?'
    },
    timeSignals: ['always', 'usually', 'often', 'sometimes', 'rarely', 'every day/week/year', 'general truths', 'as a rule'],
    toeflTips: 'Kerap keluar pada teks ilmiah Reading dan Structure. Hati-hati kesesuaian Subject-Verb Agreement: jika subjek singular (he, she, it, the scientist, water), kata kerja wajib berakhiran -s/-es!',
    sampleToeflQuestion: {
      prompt: "Under atmospheric pressure, fresh water ________ at 100 degrees Celsius.",
      options: [
        { key: 'a', text: 'boil' },
        { key: 'b', text: 'boils' },
        { key: 'c', text: 'is boiling' },
        { key: 'd', text: 'has boiled' }
      ],
      correctAnswer: 'b',
      explanation: "Fakta ilmiah universal wajib menggunakan Simple Present. Subjek 'fresh water' bersifat tunggal (uncountable), sehingga kata kerja membutuhkan akhiran -s -> 'boils'."
    }
  },

  // 2. PRESENT CONTINUOUS
  {
    id: 'present_continuous',
    name: 'Present Continuous Tense',
    englishName: 'Present Continuous Tense',
    timeCategory: 'present',
    description: 'Menyatakan peristiwa yang sedang berlangsung saat ini atau tren sementara yang sedang terjadi.',
    formulaVerbal: {
      positive: 'S + is / am / are + V-ing + O',
      negative: 'S + is / am / are + not + V-ing + O',
      interrogative: 'Is / Am / Are + S + V-ing + O?'
    },
    formulaNominal: {
      positive: 'S + is / am / are + being + Adjective / Noun',
      negative: 'S + is / am / are + not + being + Adj / Noun',
      interrogative: 'Is / Am / Are + S + being + Adj / Noun?'
    },
    timeSignals: ['now', 'right now', 'at present', 'at the moment', 'currently', 'Look!', 'Listen!'],
    toeflTips: 'Hati-hati dengan "Stative Verbs" (kata kerja keadaan/emosi seperti know, believe, understand, love, belong, contain). Kata-kata ini TIDAK BOLEH dibuat bentuk -ing di TOEFL (misal: bukan "is knowing", tapi "knows").',
    sampleToeflQuestion: {
      prompt: "Listen! The Dean of the Faculty ________ the new graduation policy in the auditorium.",
      options: [
        { key: 'a', text: 'announces' },
        { key: 'b', text: 'is announcing' },
        { key: 'c', text: 'announced' },
        { key: 'd', text: 'has announced' }
      ],
      correctAnswer: 'b',
      explanation: "Kata seru 'Listen!' menandakan peristiwa sedang berlangsung saat ini, maka wajib menggunakan Present Continuous -> 'is announcing'."
    }
  },

  // 3. PRESENT PERFECT
  {
    id: 'present_perfect',
    name: 'Present Perfect Tense',
    englishName: 'Present Perfect Tense',
    timeCategory: 'present',
    description: 'Menyatakan tindakan yang telah selesai atau telah terjadi di masa lalu, namun akibat atau relevansinya masih terasa/berlaku sampai sekarang.',
    formulaVerbal: {
      positive: 'S + have / has + V3 (Past Participle) + O',
      negative: 'S + have / has + not + V3 + O',
      interrogative: 'Have / Has + S + V3 + O?'
    },
    formulaNominal: {
      positive: 'S + have / has + been + Adjective / Noun / Adverb',
      negative: 'S + have / has + not + been + Adj / Noun / Adv',
      interrogative: 'Have / Has + S + been + Adj / Noun / Adv?'
    },
    timeSignals: ['since (sejak)', 'for (selama)', 'already', 'yet', 'just', 'ever', 'never', 'so far', 'up to now', 'recently'],
    toeflTips: 'KUNCI EMAS TOEFL: Jika ada kata "since + waktu lampau" (misal: since 2018, since graduating), kalimat UTAMA wajib memakai Present Perfect (have/has + V3), BUKAN Past Tense!',
    sampleToeflQuestion: {
      prompt: "The research committee ________ four major academic papers since the beginning of this semester.",
      options: [
        { key: 'a', text: 'publishes' },
        { key: 'b', text: 'published' },
        { key: 'c', text: 'has published' },
        { key: 'd', text: 'is publishing' }
      ],
      correctAnswer: 'c',
      explanation: "Penanda waktu 'since the beginning...' mewajibkan Present Perfect. Karena 'The research committee' adalah entitas tunggal, gunakan 'has published'."
    }
  },

  // 4. PRESENT PERFECT CONTINUOUS
  {
    id: 'present_perfect_continuous',
    name: 'Present Perfect Continuous',
    englishName: 'Present Perfect Continuous',
    timeCategory: 'present',
    description: 'Menyatakan peristiwa yang dimulai di masa lampau, terus berlangsung tanpa henti hingga saat ini, dan mungkin masih berlanjut di masa depan.',
    formulaVerbal: {
      positive: 'S + have / has + been + V-ing + O',
      negative: 'S + have / has + not + been + V-ing + O',
      interrogative: 'Have / Has + S + been + V-ing + O?'
    },
    formulaNominal: {
      positive: 'S + have / has + been + being + Adj (jarang digunakan)',
      negative: 'S + have / has + not + been + being + Adj',
      interrogative: 'Have / Has + S + been + being + Adj?'
    },
    timeSignals: ['these days', 'lately', 'all day', 'for the past five hours', 'since morning', 'how long'],
    toeflTips: 'Biasa muncul dengan frasa "these days" atau "lately" yang menekankan durasi kegiatan yang sedang giat-giatnya dilakukan.',
    sampleToeflQuestion: {
      prompt: "What have you ________ these days to prepare for your thesis defense?",
      options: [
        { key: 'a', text: 'do' },
        { key: 'b', text: 'did' },
        { key: 'c', text: 'been doing' },
        { key: 'd', text: 'done' }
      ],
      correctAnswer: 'c',
      explanation: "Frasa 'have you ... these days' menunjukkan aktivitas berkesinambungan yang ditekankan, polanya adalah Present Perfect Continuous: 'been doing'."
    }
  },

  // 5. SIMPLE PAST
  {
    id: 'past_simple',
    name: 'Simple Past Tense',
    englishName: 'Simple Past Tense',
    timeCategory: 'past',
    description: 'Menyatakan peristiwa yang terjadi dan SUDAH TUNTAS/SELESAI di masa lampau pada titik waktu yang jelas.',
    formulaVerbal: {
      positive: 'S + V2 (Past Simple) + O',
      negative: 'S + did not + V1 (kembali ke bentuk murni) + O',
      interrogative: 'Did + S + V1 (murni) + O?'
    },
    formulaNominal: {
      positive: 'S + was / were + Adjective / Noun / Adverb',
      negative: 'S + was / were + not + Adj / Noun / Adv',
      interrogative: 'Was / Were + S + Adj / Noun / Adv?'
    },
    timeSignals: ['yesterday', 'last night/week/month', 'two days ago', 'in 1995', 'formerly', 'originally', 'in ancient times'],
    toeflTips: 'JEBAKAN SOAL ERROR IDENTIFICATION: Setelah kata bantu "did / did not", kata kerja HARUS kembali ke bentuk V1 (base verb), tidak boleh V2! Contoh: "did not went" adalah SALAH, harus "did not go".',
    sampleToeflQuestion: {
      prompt: "Thomas Edison ________ the incandescent light bulb after countless laboratory trials in 1879.",
      options: [
        { key: 'a', text: 'perfects' },
        { key: 'b', text: 'perfected' },
        { key: 'c', text: 'has perfected' },
        { key: 'd', text: 'is perfecting' }
      ],
      correctAnswer: 'b',
      explanation: "Keterangan waktu lampau spesifik 'in 1879' memastikan peristiwa tuntas di masa lalu, maka menggunakan Simple Past V2 -> 'perfected'."
    }
  },

  // 6. PAST CONTINUOUS
  {
    id: 'past_continuous',
    name: 'Past Continuous Tense',
    englishName: 'Past Continuous Tense',
    timeCategory: 'past',
    description: 'Menyatakan kegiatan yang sedang berlangsung di masa lampau ketika peristiwa lain menyela/terjadi.',
    formulaVerbal: {
      positive: 'S + was / were + V-ing + O',
      negative: 'S + was / were + not + V-ing + O',
      interrogative: 'Was / Were + S + V-ing + O?'
    },
    formulaNominal: {
      positive: 'S + was / were + being + Adjective / Noun',
      negative: 'S + was / were + not + being + Adj / Noun',
      interrogative: 'Was / Were + S + being + Adj / Noun?'
    },
    timeSignals: ['when + Simple Past', 'while + Past Continuous', 'at 7 PM yesterday', 'all night long'],
    toeflTips: 'Pola baku TOEFL: While + Past Continuous (was/were + V-ing), Simple Past (V2). Contoh: "While she was conducting the survey, the supervisor arrived."',
    sampleToeflQuestion: {
      prompt: "Maria ________ her research notes when her laptop battery abruptly died.",
      options: [
        { key: 'a', text: 'reviews' },
        { key: 'b', text: 'was reviewing' },
        { key: 'c', text: 'has reviewed' },
        { key: 'd', text: 'is reviewing' }
      ],
      correctAnswer: 'b',
      explanation: "Aktivitas sedang berlangsung di masa lalu yang disela peristiwa lampau lain ('when her laptop battery died') wajib menggunakan Past Continuous: 'was reviewing'."
    }
  },

  // 7. PAST PERFECT
  {
    id: 'past_perfect',
    name: 'Past Perfect Tense',
    englishName: 'Past Perfect Tense',
    timeCategory: 'past',
    description: 'Menyatakan peristiwa yang terjadi dan SELESAI LEBIH DULU daripada peristiwa lampau lainnya (Peristiwa Paling Lampau).',
    formulaVerbal: {
      positive: 'S + had + V3 + O',
      negative: 'S + had + not + V3 + O',
      interrogative: 'Had + S + V3 + O?'
    },
    formulaNominal: {
      positive: 'S + had + been + Adjective / Noun / Adverb',
      negative: 'S + had + not + been + Adj / Noun / Adv',
      interrogative: 'Had + S + been + Adj / Noun / Adv?'
    },
    timeSignals: ['before + Past', 'after + Past Perfect', 'by the time + Past', 'as soon as', 'until', 'If only / I wish (penyesalan)'],
    toeflTips: 'KUNCI POLA: "Past Perfect (had + V3) terjadi duluan, baru disusul Simple Past (V2)". Contoh: "By the time the professor arrived, the students had submitted their assignments."',
    sampleToeflQuestion: {
      prompt: "By the time the academic advisor arrived, the students ________ their registration documents.",
      options: [
        { key: 'a', text: 'already submitted' },
        { key: 'b', text: 'had already submitted' },
        { key: 'c', text: 'have already submitted' },
        { key: 'd', text: 'will submit' }
      ],
      correctAnswer: 'b',
      explanation: "Konektor 'By the time + S + V2 (arrived)' mengharuskan klausa utama memakai Past Perfect ('had already submitted') karena penyerahan berkas selesai lebih dulu."
    }
  },

  // 8. PAST PERFECT CONTINUOUS
  {
    id: 'past_perfect_continuous',
    name: 'Past Perfect Continuous',
    englishName: 'Past Perfect Continuous',
    timeCategory: 'past',
    description: 'Menyatakan tindakan yang berlangsung terus-menerus selama beberapa waktu di masa lalu sebelum peristiwa lampau lainnya terjadi.',
    formulaVerbal: {
      positive: 'S + had + been + V-ing + O',
      negative: 'S + had + not + been + V-ing + O',
      interrogative: 'Had + S + been + V-ing + O?'
    },
    formulaNominal: {
      positive: 'S + had + been + being + Adj (jarang)',
      negative: 'S + had + not + been + being + Adj',
      interrogative: 'Had + S + been + being + Adj?'
    },
    timeSignals: ['for two hours before...', 'since morning until...', 'how long had S been...'],
    toeflTips: 'Menekankan durasi proses yang telah berlangsung lama sebelum titik potong di masa lalu.',
    sampleToeflQuestion: {
      prompt: "The engineering students ________ on their capstone prototype for five hours before the lab closed.",
      options: [
        { key: 'a', text: 'had been working' },
        { key: 'b', text: 'have worked' },
        { key: 'c', text: 'are working' },
        { key: 'd', text: 'work' }
      ],
      correctAnswer: 'a',
      explanation: "Ada durasi berkelanjutan ('for five hours') sebelum peristiwa masa lalu lain ('before the lab closed'), rumus: Past Perfect Continuous -> 'had been working'."
    }
  },

  // 9. SIMPLE FUTURE
  {
    id: 'future_simple',
    name: 'Simple Future Tense',
    englishName: 'Simple Future Tense',
    timeCategory: 'future',
    description: 'Menyatakan kegiatan atau peristiwa yang akan terjadi di masa yang akan datang.',
    formulaVerbal: {
      positive: 'S + will + V1 (murni) / S + is/am/are going to + V1',
      negative: 'S + will not (won\'t) + V1 / S + is/am/are not going to + V1',
      interrogative: 'Will + S + V1? / Is/Am/Are + S + going to + V1?'
    },
    formulaNominal: {
      positive: 'S + will + be + Adjective / Noun',
      negative: 'S + will + not + be + Adj / Noun',
      interrogative: 'Will + S + be + Adj / Noun?'
    },
    timeSignals: ['tomorrow', 'next week/month/year', 'tonight', 'soon', 'in the future', 'later'],
    toeflTips: 'BEDAKAN: Gunakan "be going to" jika ada bukti visual nyata di depan mata (misal: "Look at the dark clouds! It is going to rain"). Gunakan "will" untuk keputusan spontan atau janji sukarela.',
    sampleToeflQuestion: {
      prompt: "Look at the sky! Those heavy dark clouds indicate that it ________ heavily soon.",
      options: [
        { key: 'a', text: 'will rain' },
        { key: 'b', text: 'is going to rain' },
        { key: 'c', text: 'rained' },
        { key: 'd', text: 'rains' }
      ],
      correctAnswer: 'b',
      explanation: "Terdapat bukti visual nyata di depan mata ('heavy dark clouds'), maka prediksi masa depan menggunakan 'is going to rain', bukan 'will'."
    }
  },

  // 10. FUTURE CONTINUOUS
  {
    id: 'future_continuous',
    name: 'Future Continuous Tense',
    englishName: 'Future Continuous Tense',
    timeCategory: 'future',
    description: 'Menyatakan tindakan yang sedang berlangsung pada titik waktu tertentu di masa depan.',
    formulaVerbal: {
      positive: 'S + will + be + V-ing + O',
      negative: 'S + will + not + be + V-ing + O',
      interrogative: 'Will + S + be + V-ing + O?'
    },
    formulaNominal: {
      positive: 'S + will + be + being + Adj (sangat jarang)',
      negative: 'S + will not be being + Adj',
      interrogative: 'Will S be being + Adj?'
    },
    timeSignals: ['at this time tomorrow', 'at 8 AM next Monday', 'when S + V1 (future time clause)'],
    toeflTips: 'Ingat aturan Time Clause: Dalam klausa waktu (when, while, as soon as), gunakan Simple Present, sedangkan klausa utama menggunakan Future Continuous ("When you arrive tomorrow, I will be attending the lecture").',
    sampleToeflQuestion: {
      prompt: "At this exact time tomorrow, the candidates ________ their final graduation defense.",
      options: [
        { key: 'a', text: 'conduct' },
        { key: 'b', text: 'will be conducting' },
        { key: 'c', text: 'conducted' },
        { key: 'd', text: 'have conducted' }
      ],
      correctAnswer: 'b',
      explanation: "Keterangan titik waktu spesifik di masa depan ('At this exact time tomorrow') memerlukan Future Continuous -> 'will be conducting'."
    }
  },

  // 11. FUTURE PERFECT
  {
    id: 'future_perfect',
    name: 'Future Perfect Tense',
    englishName: 'Future Perfect Tense',
    timeCategory: 'future',
    description: 'Menyatakan peristiwa yang diprediksi SUDAH SELESAI sebelum suatu titik waktu tertentu di masa depan.',
    formulaVerbal: {
      positive: 'S + will + have + V3 + O',
      negative: 'S + will + not + have + V3 + O',
      interrogative: 'Will + S + have + V3 + O?'
    },
    formulaNominal: {
      positive: 'S + will + have + been + Adjective / Noun',
      negative: 'S + will + not + have + been + Adj / Noun',
      interrogative: 'Will + S + have + been + Adj / Noun?'
    },
    timeSignals: ['by next week/month/year', 'by the end of this year', 'by the time S + V1', 'in ten years\' time'],
    toeflTips: 'TANDA WAJIB TOEFL: Ada kata "By + waktu masa depan" (misal: "by next December", "by next year")? Jawabannya hampir pasti Future Perfect (will have + V3)!',
    sampleToeflQuestion: {
      prompt: "By next September, the university ________ the construction of the new campus library.",
      options: [
        { key: 'a', text: 'completes' },
        { key: 'b', text: 'will complete' },
        { key: 'c', text: 'will have completed' },
        { key: 'd', text: 'has completed' }
      ],
      correctAnswer: 'c',
      explanation: "Konektor batas waktu 'By next September' mewajibkan Future Perfect: 'will have completed' (sudah akan selesai pada saat itu)."
    }
  },

  // 12. FUTURE PERFECT CONTINUOUS
  {
    id: 'future_perfect_continuous',
    name: 'Future Perfect Continuous',
    englishName: 'Future Perfect Continuous',
    timeCategory: 'future',
    description: 'Menyatakan tindakan yang akan terus berlangsung dan ditekankan durasinya hingga suatu batas waktu di masa mendatang.',
    formulaVerbal: {
      positive: 'S + will + have + been + V-ing + O',
      negative: 'S + will + not + have + been + V-ing + O',
      interrogative: 'Will + S + have + been + V-ing + O?'
    },
    formulaNominal: {
      positive: 'S + will + have + been + being + Adj (jarang)',
      negative: 'S + will not have been being + Adj',
      interrogative: 'Will S have been being + Adj?'
    },
    timeSignals: ['by next year for 5 years', 'by next month for two decades'],
    toeflTips: 'Menggabungkan batas waktu "by..." dengan durasi "for... years".',
    sampleToeflQuestion: {
      prompt: "By the time he retires next December, Professor Adams ________ in the linguistics department for forty years.",
      options: [
        { key: 'a', text: 'will have been teaching' },
        { key: 'b', text: 'teaches' },
        { key: 'c', text: 'has taught' },
        { key: 'd', text: 'is teaching' }
      ],
      correctAnswer: 'a',
      explanation: "Ada titik batas waktu masa depan ('By the time he retires next December') dan durasi akumulasi ('for forty years') -> Future Perfect Continuous: 'will have been teaching'."
    }
  }
];

export const SENTENCE_TEMPLATES: TransformSentence[] = [
  {
    id: 'sent_maria_thesis',
    subject: 'Maria (Singular Third Person)',
    topic: 'Penyusunan Skripsi & Tugas Akhir',
    baseVerb: 'write her thesis draft',
    translations: {
      present_simple: {
        positive: 'Maria writes her thesis draft every morning in the campus library.',
        negative: 'Maria does not write her thesis draft every morning in the campus library.',
        interrogative: 'Does Maria write her thesis draft every morning in the campus library?',
        passive: 'The thesis draft is written by Maria every morning.',
        verbHighlight: 'writes / does not write / Does ... write'
      },
      present_continuous: {
        positive: 'Maria is writing her thesis draft right now with her laptop.',
        negative: 'Maria is not writing her thesis draft right now with her laptop.',
        interrogative: 'Is Maria writing her thesis draft right now with her laptop?',
        passive: 'The thesis draft is being written by Maria right now.',
        verbHighlight: 'is writing / is not writing / Is ... writing'
      },
      present_perfect: {
        positive: 'Maria has written her thesis draft already and submitted it to the advisor.',
        negative: 'Maria has not written her thesis draft yet.',
        interrogative: 'Has Maria written her thesis draft already?',
        passive: 'The thesis draft has been written by Maria already.',
        verbHighlight: 'has written / has not written / Has ... written'
      },
      present_perfect_continuous: {
        positive: 'Maria has been writing her thesis draft for four hours without a break.',
        negative: 'Maria has not been writing her thesis draft for very long.',
        interrogative: 'Has Maria been writing her thesis draft for four hours?',
        verbHighlight: 'has been writing / has not been writing'
      },
      past_simple: {
        positive: 'Maria wrote her thesis draft yesterday after meeting her supervisor.',
        negative: 'Maria did not write her thesis draft yesterday.',
        interrogative: 'Did Maria write her thesis draft yesterday?',
        passive: 'The thesis draft was written by Maria yesterday.',
        verbHighlight: 'wrote / did not write / Did ... write'
      },
      past_continuous: {
        positive: 'Maria was writing her thesis draft when the electricity went out last night.',
        negative: 'Maria was not writing her thesis draft when you called her.',
        interrogative: 'Was Maria writing her thesis draft when the electricity went out?',
        passive: 'The thesis draft was being written by Maria when the power failed.',
        verbHighlight: 'was writing / was not writing / Was ... writing'
      },
      past_perfect: {
        positive: 'Maria had written her thesis draft before her supervisor requested the revision.',
        negative: 'Maria had not written her thesis draft before the initial deadline passed.',
        interrogative: 'Had Maria written her thesis draft before her supervisor requested it?',
        passive: 'The thesis draft had been written by Maria before the deadline.',
        verbHighlight: 'had written / had not written / Had ... written'
      },
      past_perfect_continuous: {
        positive: 'Maria had been writing her thesis draft for months before she finally scheduled her defense.',
        negative: 'Maria had not been writing her thesis draft for long before she took a leave.',
        interrogative: 'Had Maria been writing her thesis draft for months before her defense?',
        verbHighlight: 'had been writing / had not been writing'
      },
      future_simple: {
        positive: 'Maria will write her thesis draft tomorrow after collecting the survey data.',
        negative: 'Maria will not write her thesis draft tomorrow.',
        interrogative: 'Will Maria write her thesis draft tomorrow?',
        passive: 'The thesis draft will be written by Maria tomorrow.',
        verbHighlight: 'will write / will not write / Will ... write'
      },
      future_continuous: {
        positive: 'Maria will be writing her thesis draft at 10 AM tomorrow in the computer lab.',
        negative: 'Maria will not be writing her thesis draft during the graduation ceremony.',
        interrogative: 'Will Maria be writing her thesis draft at 10 AM tomorrow?',
        verbHighlight: 'will be writing / will not be writing'
      },
      future_perfect: {
        positive: 'Maria will have written her thesis draft by next Friday.',
        negative: 'Maria will not have written her thesis draft by next Friday.',
        interrogative: 'Will Maria have written her thesis draft by next Friday?',
        passive: 'The thesis draft will have been written by Maria by next Friday.',
        verbHighlight: 'will have written / will not have written'
      },
      future_perfect_continuous: {
        positive: 'Maria will have been writing her thesis draft for eight months by the time she graduates.',
        negative: 'Maria will not have been writing her thesis draft for long by then.',
        interrogative: 'Will Maria have been writing her thesis draft for eight months by then?',
        verbHighlight: 'will have been writing'
      }
    }
  },
  {
    id: 'sent_researchers_experiment',
    subject: 'The researchers (Plural Noun)',
    topic: 'Penelitian Ilmiah Laboratorium',
    baseVerb: 'conduct a laboratory experiment',
    translations: {
      present_simple: {
        positive: 'The researchers conduct a laboratory experiment every week to test the hypothesis.',
        negative: 'The researchers do not conduct a laboratory experiment on weekends.',
        interrogative: 'Do the researchers conduct a laboratory experiment every week?',
        passive: 'A laboratory experiment is conducted by the researchers every week.',
        verbHighlight: 'conduct / do not conduct / Do ... conduct'
      },
      present_continuous: {
        positive: 'The researchers are conducting a laboratory experiment right now under strict supervision.',
        negative: 'The researchers are not conducting a laboratory experiment today.',
        interrogative: 'Are the researchers conducting a laboratory experiment right now?',
        passive: 'A laboratory experiment is being conducted by the researchers right now.',
        verbHighlight: 'are conducting / are not conducting'
      },
      present_perfect: {
        positive: 'The researchers have conducted a laboratory experiment with promising preliminary results.',
        negative: 'The researchers have not conducted a laboratory experiment yet.',
        interrogative: 'Have the researchers conducted a laboratory experiment yet?',
        passive: 'A laboratory experiment has been conducted by the researchers.',
        verbHighlight: 'have conducted / have not conducted'
      },
      present_perfect_continuous: {
        positive: 'The researchers have been conducting a laboratory experiment since early morning.',
        negative: 'The researchers have not been conducting this experiment for very long.',
        interrogative: 'Have the researchers been conducting the experiment since morning?',
        verbHighlight: 'have been conducting'
      },
      past_simple: {
        positive: 'The researchers conducted a laboratory experiment yesterday afternoon.',
        negative: 'The researchers did not conduct a laboratory experiment yesterday.',
        interrogative: 'Did the researchers conduct a laboratory experiment yesterday?',
        passive: 'A laboratory experiment was conducted by the researchers yesterday.',
        verbHighlight: 'conducted / did not conduct / Did ... conduct'
      },
      past_continuous: {
        positive: 'The researchers were conducting a laboratory experiment when the fire alarm sounded.',
        negative: 'The researchers were not conducting an experiment when the power failure occurred.',
        interrogative: 'Were the researchers conducting an experiment when the alarm sounded?',
        passive: 'An experiment was being conducted by the researchers when the alarm rang.',
        verbHighlight: 'were conducting / were not conducting'
      },
      past_perfect: {
        positive: 'The researchers had conducted a laboratory experiment before publishing their findings.',
        negative: 'The researchers had not conducted the experiment before receiving the grant.',
        interrogative: 'Had the researchers conducted the experiment before publishing their work?',
        passive: 'An experiment had been conducted by the researchers before publication.',
        verbHighlight: 'had conducted / had not conducted'
      },
      past_perfect_continuous: {
        positive: 'The researchers had been conducting the laboratory experiment for months before discovering the anomaly.',
        negative: 'The researchers had not been conducting the trials for long before finding results.',
        interrogative: 'Had the researchers been conducting the experiment for months?',
        verbHighlight: 'had been conducting'
      },
      future_simple: {
        positive: 'The researchers will conduct a laboratory experiment next Monday in the chemical facility.',
        negative: 'The researchers will not conduct an experiment next Monday.',
        interrogative: 'Will the researchers conduct a laboratory experiment next Monday?',
        passive: 'An experiment will be conducted by the researchers next Monday.',
        verbHighlight: 'will conduct / will not conduct'
      },
      future_continuous: {
        positive: 'The researchers will be conducting a laboratory experiment all morning tomorrow.',
        negative: 'The researchers will not be conducting any trials during the symposium.',
        interrogative: 'Will the researchers be conducting the experiment tomorrow morning?',
        verbHighlight: 'will be conducting'
      },
      future_perfect: {
        positive: 'The researchers will have conducted the laboratory experiment by the end of this semester.',
        negative: 'The researchers will not have conducted all tests by next week.',
        interrogative: 'Will the researchers have conducted the experiment by the deadline?',
        passive: 'The experiment will have been conducted by the researchers by next month.',
        verbHighlight: 'will have conducted'
      },
      future_perfect_continuous: {
        positive: 'The researchers will have been conducting this experiment for two continuous years by next December.',
        negative: 'The researchers will not have been conducting this project for that long.',
        interrogative: 'Will the researchers have been conducting the study for two years by then?',
        verbHighlight: 'will have been conducting'
      }
    }
  },
  {
    id: 'sent_students_toefl',
    subject: 'The students (Plural Third Person)',
    topic: 'Persiapan Ujian TOEFL EPT',
    baseVerb: 'prepare for the TOEFL examination',
    translations: {
      present_simple: {
        positive: 'The students prepare for the TOEFL examination diligently to achieve a score of 450+.',
        negative: 'The students do not prepare for the TOEFL examination without authentic practice tests.',
        interrogative: 'Do the students prepare for the TOEFL examination diligently?',
        verbHighlight: 'prepare / do not prepare / Do ... prepare'
      },
      present_continuous: {
        positive: 'The students are preparing for the TOEFL examination at this very moment.',
        negative: 'The students are not preparing for the TOEFL examination right now.',
        interrogative: 'Are the students preparing for the TOEFL examination right now?',
        verbHighlight: 'are preparing / are not preparing'
      },
      present_perfect: {
        positive: 'The students have prepared for the TOEFL examination and feel ready for the test.',
        negative: 'The students have not prepared for the TOEFL examination sufficiently.',
        interrogative: 'Have the students prepared for the TOEFL examination already?',
        verbHighlight: 'have prepared / have not prepared'
      },
      present_perfect_continuous: {
        positive: 'The students have been preparing for the TOEFL examination for three weeks straight.',
        negative: 'The students have not been preparing for the test for very long.',
        interrogative: 'Have the students been preparing for the TOEFL examination since last month?',
        verbHighlight: 'have been preparing'
      },
      past_simple: {
        positive: 'The students prepared for the TOEFL examination last week with their study group.',
        negative: 'The students did not prepare for the TOEFL examination last semester.',
        interrogative: 'Did the students prepare for the TOEFL examination last week?',
        verbHighlight: 'prepared / did not prepare / Did ... prepare'
      },
      past_continuous: {
        positive: 'The students were preparing for the TOEFL examination when the registration opened.',
        negative: 'The students were not preparing for the test when the announcement was made.',
        interrogative: 'Were the students preparing for the TOEFL examination at that time?',
        verbHighlight: 'were preparing / were not preparing'
      },
      past_perfect: {
        positive: 'The students had prepared for the TOEFL examination before the campus mandated the 450 score.',
        negative: 'The students had not prepared for the exam before the announcement was broadcast.',
        interrogative: 'Had the students prepared for the TOEFL examination beforehand?',
        verbHighlight: 'had prepared / had not prepared'
      },
      past_perfect_continuous: {
        positive: 'The students had been preparing for the TOEFL examination for months before they achieved the passing grade.',
        negative: 'The students had not been preparing for long before the test was held.',
        interrogative: 'Had the students been preparing for months before the test?',
        verbHighlight: 'had been preparing'
      },
      future_simple: {
        positive: 'The students will prepare for the TOEFL examination during the upcoming semester break.',
        negative: 'The students will not prepare for the exam without professional guidance.',
        interrogative: 'Will the students prepare for the TOEFL examination next week?',
        verbHighlight: 'will prepare / will not prepare'
      },
      future_continuous: {
        positive: 'The students will be preparing for the TOEFL examination all day next Saturday.',
        negative: 'The students will not be preparing during the public holiday.',
        interrogative: 'Will the students be preparing for the exam this weekend?',
        verbHighlight: 'will be preparing'
      },
      future_perfect: {
        positive: 'The students will have prepared for the TOEFL examination by the time registration commences.',
        negative: 'The students will not have prepared completely by tomorrow.',
        interrogative: 'Will the students have prepared adequately by next month?',
        verbHighlight: 'will have prepared'
      },
      future_perfect_continuous: {
        positive: 'The students will have been preparing for the TOEFL examination for two months by next Friday.',
        negative: 'The students will not have been preparing for that length of time.',
        interrogative: 'Will the students have been preparing for two months by then?',
        verbHighlight: 'will have been preparing'
      }
    }
  },
  {
    id: 'sent_professor_methodology',
    subject: 'The professor (Singular Academic Expert)',
    topic: 'Bimbingan Metodologi Penelitian',
    baseVerb: 'explain the research methodology',
    translations: {
      present_simple: {
        positive: 'The professor explains the research methodology clearly during the thesis seminar.',
        negative: 'The professor does not explain the research methodology in a hurried manner.',
        interrogative: 'Does the professor explain the research methodology clearly?',
        passive: 'The research methodology is explained by the professor during the seminar.',
        verbHighlight: 'explains / does not explain / Does ... explain'
      },
      present_continuous: {
        positive: 'The professor is explaining the research methodology right now on the whiteboard.',
        negative: 'The professor is not explaining the methodology at this moment.',
        interrogative: 'Is the professor explaining the research methodology right now?',
        passive: 'The research methodology is being explained by the professor right now.',
        verbHighlight: 'is explaining / is not explaining'
      },
      present_perfect: {
        positive: 'The professor has explained the research methodology to all graduate candidates.',
        negative: 'The professor has not explained the quantitative methodology yet.',
        interrogative: 'Has the professor explained the research methodology to everyone?',
        passive: 'The research methodology has been explained by the professor.',
        verbHighlight: 'has explained / has not explained'
      },
      present_perfect_continuous: {
        positive: 'The professor has been explaining the research methodology for nearly two hours.',
        negative: 'The professor has not been explaining the topic for very long.',
        interrogative: 'Has the professor been explaining the methodology for that long?',
        verbHighlight: 'has been explaining'
      },
      past_simple: {
        positive: 'The professor explained the research methodology during yesterday\'s consultation session.',
        negative: 'The professor did not explain the qualitative approach yesterday.',
        interrogative: 'Did the professor explain the research methodology yesterday?',
        passive: 'The research methodology was explained by the professor yesterday.',
        verbHighlight: 'explained / did not explain / Did ... explain'
      },
      past_continuous: {
        positive: 'The professor was explaining the research methodology when the projector malfunctioned.',
        negative: 'The professor was not explaining the complex formulas when the bell rang.',
        interrogative: 'Was the professor explaining the methodology when the equipment failed?',
        passive: 'The methodology was being explained by the professor when the projector broke.',
        verbHighlight: 'was explaining / was not explaining'
      },
      past_perfect: {
        positive: 'The professor had explained the research methodology before the students drafted their proposals.',
        negative: 'The professor had not explained the sampling techniques before the exam.',
        interrogative: 'Had the professor explained the methodology prior to the proposal draft?',
        passive: 'The methodology had been explained by the professor before drafting began.',
        verbHighlight: 'had explained / had not explained'
      },
      past_perfect_continuous: {
        positive: 'The professor had been explaining the research methodology for decades before retiring.',
        negative: 'The professor had not been explaining that new theory for long before it was revised.',
        interrogative: 'Had the professor been explaining that theory for a long time?',
        verbHighlight: 'had been explaining'
      },
      future_simple: {
        positive: 'The professor will explain the research methodology in detail next Wednesday.',
        negative: 'The professor will not explain the advanced statistics tomorrow.',
        interrogative: 'Will the professor explain the research methodology next week?',
        passive: 'The research methodology will be explained by the professor next Wednesday.',
        verbHighlight: 'will explain / will not explain'
      },
      future_continuous: {
        positive: 'The professor will be explaining the research methodology throughout tomorrow\'s workshop.',
        negative: 'The professor will not be explaining methodology during the question session.',
        interrogative: 'Will the professor be explaining the methodology during tomorrow\'s session?',
        verbHighlight: 'will be explaining'
      },
      future_perfect: {
        positive: 'The professor will have explained the research methodology by the end of this lecture series.',
        negative: 'The professor will not have explained all frameworks before next term.',
        interrogative: 'Will the professor have explained the entire methodology by next week?',
        passive: 'The methodology will have been explained by the professor by then.',
        verbHighlight: 'will have explained'
      },
      future_perfect_continuous: {
        positive: 'The professor will have been explaining the research methodology for thirty years by next spring.',
        negative: 'The professor will not have been explaining the new protocol for long by then.',
        interrogative: 'Will the professor have been explaining this subject for thirty years?',
        verbHighlight: 'will have been explaining'
      }
    }
  },
  {
    id: 'sent_university_policy',
    subject: 'The university (Institution / Collective Noun)',
    topic: 'Kebijakan Akademik & Syarat Wisuda',
    baseVerb: 'publish the graduation requirements',
    translations: {
      present_simple: {
        positive: 'The university publishes the graduation requirements on its official student portal.',
        negative: 'The university does not publish unverified academic guidelines.',
        interrogative: 'Does the university publish the graduation requirements annually?',
        passive: 'The graduation requirements are published by the university on the student portal.',
        verbHighlight: 'publishes / does not publish / Does ... publish'
      },
      present_continuous: {
        positive: 'The university is publishing the revised graduation requirements today.',
        negative: 'The university is not publishing the new criteria until next month.',
        interrogative: 'Is the university publishing the revised requirements this week?',
        passive: 'The revised requirements are being published by the university today.',
        verbHighlight: 'is publishing / is not publishing'
      },
      present_perfect: {
        positive: 'The university has published the graduation requirements with the 450 EPT threshold.',
        negative: 'The university has not published the new schedule yet.',
        interrogative: 'Has the university published the graduation requirements already?',
        passive: 'The graduation requirements have been published by the university.',
        verbHighlight: 'has published / has not published'
      },
      present_perfect_continuous: {
        positive: 'The university has been publishing regular academic updates throughout the pandemic.',
        negative: 'The university has not been publishing frequent notices lately.',
        interrogative: 'Has the university been publishing updates regularly?',
        verbHighlight: 'has been publishing'
      },
      past_simple: {
        positive: 'The university published the graduation requirements three weeks ago.',
        negative: 'The university did not publish the revised regulations last year.',
        interrogative: 'Did the university publish the graduation requirements last month?',
        passive: 'The graduation requirements were published by the university three weeks ago.',
        verbHighlight: 'published / did not publish / Did ... publish'
      },
      past_continuous: {
        positive: 'The university was publishing the academic calendar when the server crashed.',
        negative: 'The university was not publishing documents during the maintenance window.',
        interrogative: 'Was the university publishing the notice when the outage occurred?',
        passive: 'The calendar was being published by the university when the server broke.',
        verbHighlight: 'was publishing / was not publishing'
      },
      past_perfect: {
        positive: 'The university had published the graduation requirements before the enrollment opened.',
        negative: 'The university had not published the criteria before students registered.',
        interrogative: 'Had the university published the requirements prior to registration?',
        passive: 'The requirements had been published by the university before enrollment.',
        verbHighlight: 'had published / had not published'
      },
      past_perfect_continuous: {
        positive: 'The university had been publishing printed catalogs for decades before switching to digital.',
        negative: 'The university had not been publishing online bulletins for long before it modernized.',
        interrogative: 'Had the university been publishing printed catalogs for decades?',
        verbHighlight: 'had been publishing'
      },
      future_simple: {
        positive: 'The university will publish the graduation requirements next Monday morning.',
        negative: 'The university will not publish the guidelines until the senate approves them.',
        interrogative: 'Will the university publish the graduation requirements next week?',
        passive: 'The graduation requirements will be published by the university next Monday.',
        verbHighlight: 'will publish / will not publish'
      },
      future_continuous: {
        positive: 'The university will be publishing circular announcements throughout the semester.',
        negative: 'The university will not be publishing notices during the holiday break.',
        interrogative: 'Will the university be publishing the notices next month?',
        verbHighlight: 'will be publishing'
      },
      future_perfect: {
        positive: 'The university will have published the graduation requirements by the end of July.',
        negative: 'The university will not have published all handbooks before August.',
        interrogative: 'Will the university have published the guidelines by then?',
        passive: 'The requirements will have been published by the university by July.',
        verbHighlight: 'will have published'
      },
      future_perfect_continuous: {
        positive: 'The university will have been publishing research journals for a century by 2030.',
        negative: 'The university will not have been publishing that magazine for that long.',
        interrogative: 'Will the university have been publishing journals for a century by then?',
        verbHighlight: 'will have been publishing'
      }
    }
  }
];

