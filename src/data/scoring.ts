// Standard TOEFL ITP / EPT Conversion Tables
// Scaled scores for Section 1 (Listening: 24 - 68), Section 2 (Structure: 20 - 68), Section 3 (Reading: 21 - 67)

export const LISTENING_CONVERSION_TABLE: Record<number, number> = {
  0: 24, 1: 25, 2: 26, 3: 27, 4: 28, 5: 29, 6: 30, 7: 31, 8: 32, 9: 32,
  10: 33, 11: 35, 12: 37, 13: 38, 14: 39, 15: 41, 16: 41, 17: 42, 18: 43, 19: 44,
  20: 45, 21: 45, 22: 46, 23: 47, 24: 47, 25: 48, 26: 48, 27: 49, 28: 49, 29: 50,
  30: 51, 31: 51, 32: 52, 33: 52, 34: 53, 35: 54, 36: 54, 37: 55, 38: 56, 39: 57,
  40: 57, 41: 58, 42: 59, 43: 60, 44: 61, 45: 62, 46: 63, 47: 65, 48: 66, 49: 67,
  50: 68
};

export const STRUCTURE_CONVERSION_TABLE: Record<number, number> = {
  0: 20, 1: 20, 2: 21, 3: 22, 4: 23, 5: 25, 6: 26, 7: 27, 8: 29, 9: 31,
  10: 33, 11: 35, 12: 36, 13: 37, 14: 38, 15: 40, 16: 40, 17: 41, 18: 42, 19: 43,
  20: 44, 21: 45, 22: 46, 23: 47, 24: 48, 25: 49, 26: 50, 27: 51, 28: 52, 29: 53,
  30: 54, 31: 55, 32: 56, 33: 57, 34: 58, 35: 60, 36: 61, 37: 63, 38: 65, 39: 67,
  40: 68
};

export const READING_CONVERSION_TABLE: Record<number, number> = {
  0: 21, 1: 22, 2: 23, 3: 23, 4: 24, 5: 25, 6: 26, 7: 27, 8: 28, 9: 28,
  10: 29, 11: 30, 12: 31, 13: 32, 14: 34, 15: 35, 16: 36, 17: 37, 18: 38, 19: 39,
  20: 40, 21: 41, 22: 42, 23: 43, 24: 43, 25: 44, 26: 45, 27: 46, 28: 46, 29: 47,
  30: 48, 31: 48, 32: 49, 33: 50, 34: 51, 35: 52, 36: 52, 37: 53, 38: 54, 39: 54,
  40: 55, 41: 56, 42: 57, 43: 58, 44: 59, 45: 60, 46: 61, 47: 63, 48: 65, 49: 66,
  50: 67
};

export function calculateScaledListening(raw: number, total: number): number {
  if (total <= 0) return 24;
  // Normalize to 50 scale
  const normalizedRaw = Math.min(50, Math.max(0, Math.round((raw / total) * 50)));
  return LISTENING_CONVERSION_TABLE[normalizedRaw] || 24;
}

export function calculateScaledStructure(raw: number, total: number): number {
  if (total <= 0) return 20;
  // Normalize to 40 scale
  const normalizedRaw = Math.min(40, Math.max(0, Math.round((raw / total) * 40)));
  return STRUCTURE_CONVERSION_TABLE[normalizedRaw] || 20;
}

export function calculateScaledReading(raw: number, total: number): number {
  if (total <= 0) return 21;
  // Normalize to 50 scale
  const normalizedRaw = Math.min(50, Math.max(0, Math.round((raw / total) * 50)));
  return READING_CONVERSION_TABLE[normalizedRaw] || 21;
}

export function calculateToeflScore(lScaled: number, sScaled: number, rScaled: number): number {
  const score = Math.round(((lScaled + sScaled + rScaled) * 10) / 3);
  return Math.min(677, Math.max(310, score));
}

export interface ScoreRecommendation {
  status: 'passed' | 'failed';
  scoreDifference: number;
  message: string;
  advice: string[];
}

export function getScoreRecommendation(
  totalScore: number,
  lRaw: number,
  lTotal: number,
  sRaw: number,
  sTotal: number,
  rRaw: number,
  rTotal: number
): ScoreRecommendation {
  const target = 450;
  const isPassed = totalScore >= target;
  const diff = totalScore - target;

  if (isPassed) {
    return {
      status: 'passed',
      scoreDifference: diff,
      message: `🎉 Selamat! Skor Anda ${totalScore} telah melampaui batas minimal 450 untuk persyaratan Tugas Akhir / Skripsi di kampus!`,
      advice: [
        'Pertahankan konsistensi latihan 1-2 hari sebelum ujian sesungguhnya di kampus.',
        'Pastikan kondisi fisik prima saat tes asli, jangan begadang malam sebelumnya.',
        'Pada tes resmi, tetap gunakan strategi alokasi waktu: selesaikan Structure dalam 25 menit dan sisakan 5 menit untuk mengecek soal ragu-ragu.'
      ]
    };
  }

  const sPct = (sRaw / sTotal) * 100;
  const lPct = (lRaw / lTotal) * 100;
  const rPct = (rRaw / rTotal) * 100;

  const pointsNeeded = Math.abs(diff);
  const advice: string[] = [];

  advice.push(`Anda hanya butuh +${pointsNeeded} poin lagi untuk mencapai 450. Ini sangat bisa dicapai dalam beberapa hari latihan!`);

  // Section with highest leverage
  if (sPct < 55) {
    advice.push(`⚡ FOKUS UTAMA (Part 2 - Structure): Tingkatkan 3 - 5 jawaban benar di Structure! Ini adalah bagian paling mudah dan cepat dinaikkan karena pola soalnya selalu berulang (Subject-Verb agreement, Conjunctions, Parallel structure).`);
  }
  if (rPct < 55) {
    advice.push(`📖 STRATEGI READING (Part 3): Gunakan teknik Skimming (baca kalimat 1 & 2 tiap paragraf) untuk soal Main Idea, dan teknik Scanning kata kunci untuk soal detail tanpa membaca seluruh teks dari awal.`);
  }
  if (lPct < 55) {
    advice.push(`🎧 STRATEGI LISTENING (Part 1): Fokuskan perhatian penuh pada kalimat penutur KEDUA (Second Speaker), karena 80% jawaban ada di kalimat kedua.`);
  }

  advice.push(`⚠️ ATURAN EMAS: Di TOEFL EPT tidak ada sistem nilai minus (-). Jangan biarkan ada satupun soal kosong saat waktu hampir habis, tebak semua dengan konsisten (misal pilih B atau C untuk semua soal yang belum terjawab)!`);

  return {
    status: 'failed',
    scoreDifference: diff,
    message: `⚠️ Skor Anda saat ini ${totalScore} (Kurang ${pointsNeeded} poin untuk mencapai syarat minimal 450 Tugas Akhir).`,
    advice
  };
}

