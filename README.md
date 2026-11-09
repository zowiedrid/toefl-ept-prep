# 🎓 TOEFL EPT Prep - Latihan & Simulasi Syarat Sidang Skripsi (Target 450+)

Aplikasi web interaktif untuk persiapan dan simulasi ujian **TOEFL EPT (English Proficiency Test)** yang disesuaikan khusus untuk mahasiswa yang ingin mengejar persyaratan kelulusan sidang skripsi / tugas akhir dengan standar nilai minimal **450**.

🌐 **Live Demo (GitHub Pages):** [https://zowiedrid.github.io/toefl-ept-prep/](https://zowiedrid.github.io/toefl-ept-prep/)

---

## ✨ Fitur Utama

### 1. 5 Paket Lengkap Ujian TOEFL EPT
* **Paket 1: Soal Resmi EPT Kampus 2020** (120 soal lengkap Part 1, 2, 3 dengan pembahasan)
* **Paket 2: Fokus Structure & Pola Kunci 450** (Pembahasan mendalam Grammar, Inversion, Parallelism)
* **Paket 3: Listening & Campus Context Mastery** (Dialog kampus, kuliah singkat, transkrip)
* **Paket 4: Reading Speed & Academic Vocabulary** (Latihan skimming/scanning teks akademik)
* **Paket 5: Final Graduation Simulation (Super High-Yield)** (Simulasi menyeluruh penentu kelulusan)

### 2. Tiga Bagian (Part) Sesuai Standar TOEFL ITP / EPT
* **Part 1 - Listening Comprehension** (35 Menit): Dilengkapi pemutar audio simulasi suara manusia (Web Speech API) & transkrip interaktif.
* **Part 2 - Structure & Written Expression** (25 Menit):
  * Meliputi **Sentence Completion** (soal 1-15) dan **Error Identification** (soal 16-40 dengan badge penanda kata bergaris bawah A, B, C, D).
* **Part 3 - Reading Comprehension** (55 Menit): Bacaan akademik dengan nomor baris (*line numbers*) dan penyorot teks.

### 3. Modul Belajar & Trik Rahasia Menjawab Cepat
* **Bedah Tipe Error Identification:** Panduan memahami maksud soal tanpa titik-titik (mencari 1 kata/frasa yang salah secara tata bahasa).
* **Pola Kesalahan Tersering & Kunci Jawaban Kilat:**
  1. *Pasangan Kolokasi Kaku (Prepositional Pairs):* `aware of`, `worried about`, `impact on`, `prefer to`, `the same as`, `so... that`, dll.
  2. *Konektor "Klausa Lengkap" vs "Frasa Benda":* `Although` vs `Despite`, `Because` vs `Due to`.
  3. *Participle & Reduced Clauses:* Kapan memakai V-ing (aktif/akibat) vs V3 (pasif/gabungan).
  4. *Penanda Waktu (Tense Clues):* `since`, `lately`, `these days`, `by the time`, dll.
  5. *Kata Saran / Ajakan:* `How about / What about + V-ing` vs `Shall we / Why don't we / Let's + V1`.
* **Simulator Target Skor 450:** Hitung kombinasi benar di tiap part untuk mencapai 450 secara aman.

### 4. Lab Tenses Interaktif (Tenses Transformer)
* Modul belajar 12 Tenses Bahasa Inggris dengan rumus verbal & nominal, sinyal waktu, dan trik TOEFL.
* **Fitur Transformer Kalimat:** Klik tombol tense apa saja untuk melihat perubahan bentuk kalimat secara instan (+ Positif, - Negatif, ? Tanya, dan Kalimat Pasif).
* Dilengkapi pengucapan audio (TTS) dan latihan soal TOEFL per tenses.

### 5. Riwayat Nilai & Evaluasi (Tersedia 2 Riwayat Latihan Bawaan)
* Menampilkan riwayat hasil tes sebelumnya beserta perbandingan skor, grafik kelulusan syarat sidang skripsi (cutoff 450), dan tombol review pembahasan per butir soal.

---

## 🚀 Menjalankan Secara Lokal

```bash
# Clone repositori
git clone https://github.com/zowiedrid/toefl-ept-prep.git

# Masuk ke direktori project
cd toefl-ept-prep

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Build untuk produksi
npm run build
```

---

## 🛠️ Teknologi yang Digunakan
* **Framework:** React 18 + TypeScript + Vite
* **Styling:** Tailwind CSS + Lucide Icons
* **Audio Engine:** Web Speech API (Native browser Text-To-Speech)
* **Animation & Visuals:** Canvas Confetti
* **Deployment:** GitHub Pages (GitHub Actions / gh-pages)
