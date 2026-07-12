# Kostify - Smart Boarding House Management & Finder Ecosystem

Kostify adalah platform ekosistem digital terintegrasi untuk pencarian dan pengelolaan kost. Proyek ini mempermudah pemilik kost dalam mengelola unit kamar, penyewa, dan keuangan, serta membantu calon penyewa mencari kost terbaik langsung dari smartphone mereka.

## 🚀 Fitur Utama

- **Pencarian Kost Interaktif (Mobile)**: Peta interaktif, filter kost, detail fasilitas, dan *booking* langsung.
- **Dashboard Manajemen Kost (Web)**: Mengelola data kost & kamar, manajemen penyewa, riwayat tagihan, dan grafik laporan keuangan.
- **Otomatisasi & Tagihan**: Sistem komplain terintegrasi (*maintenance ticket*), tagihan otomatis bulanan, dan pembayaran aman via **Payment Gateway (Midtrans)**.

---

## 📂 Struktur Repositori

Proyek ini dibangun menggunakan struktur monorepo/multi-repo sederhana:

- **[backend/](file:///d:/Projek/kostify/backend)**: Rest API yang dibangun dengan **NestJS**, **Prisma ORM**, dan **PostgreSQL**.
- **[web-dashboard/](file:///d:/Projek/kostify/web-dashboard)**: Aplikasi web untuk Owner dan Admin menggunakan **Next.js** dan **TailwindCSS**.
- **[mobile-app/](file:///d:/Projek/kostify/mobile-app)**: Aplikasi mobile cross-platform untuk Penyewa berbasis **React Native (Expo)**.

---

## 📊 Arsitektur & Perancangan Sistem

Dokumentasi detail mengenai perancangan sistem, termasuk diagram ERD (tabel relasi database), alur sequence diagram, dan API endpoint selengkapnya dapat diakses di:
👉 **[Dokumentasi Arsitektur Sistem (docs/architecture.md)](file:///d:/Projek/kostify/docs/architecture.md)**

---

## ⚙️ Cara Menjalankan Proyek Secara Lokal

### 1. Database & Backend (NestJS)
Buka terminal baru di folder `backend`, isi file `.env`, lalu jalankan:
```bash
npm install
npx prisma db push
npx prisma generate
npm run start:dev
```

### 2. Web Dashboard (Next.js)
Buka terminal baru di folder `web-dashboard`, lalu jalankan:
```bash
npm install
npx next dev -p 3001
```

### 3. Mobile App (React Native Expo)
Buka terminal baru di folder `mobile-app`, lalu jalankan:
```bash
npm install
npm run android # atau ios / web
```
