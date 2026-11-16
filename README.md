# EvalOrg — Sistem Raport Evaluasi Fungsionaris Organisasi
> **Tugas 3 Workshop — Frontend Developer**  
> Implementasi logika form, halaman raport, navigasi admin, dan validasi data dummy sesuai kontrak Backend API.

---

## 📌 Daftar Halaman & Rute Aplikasi

| Route | Pengguna / Akses | Deskripsi & Fungsi |
|---|---|---|
| `/` | Public Visitor | Landing page interaktif pengenalan platform dan alur evaluasi |
| `/login` | Public / Mahasiswa | Halaman masuk akun fungsionaris & administrator |
| `/raport` | Fungsionaris (`bph` / `staff`) | Raport pribadi menampilkan nilai per aspek, rata-rata (2 desimal), dan evaluasi naratif |
| `/admin` | Admin | Dashboard ringkasan status evaluasi fungsionaris & metrik organisasi |
| `/admin/aspek` | Admin | Form & daftar manajemen aspek penilaian (CRUD lokal + proteksi aspek terkunci) |
| `/admin/raport` | Admin | Tabel rekap seluruh raport terbit & Modal Panel detail raport fungsionaris |
| `/admin/raport/create` | Admin | Form input raport baru berbasis React Hook Form + Zod dinamis per role |

---

## 👥 Data Akun Dummy & Fixture Pengujian

Seluruh akun dummy pengujian menggunakan password standar: `password123`.

### 1. Akun Pengguna (`data/dummyRaport.ts`)
* **Administrator:** `admin@raport.test` (Role: `admin`)
* **Fungsionaris BPH:** `bph1@raport.test` (Nama: **Bima Arya Pratama** — Ketua BPH)
* **Fungsionaris Staff (Raport Tersedia / 200 OK):** `staff1@raport.test` (Nama: **Budi Santoso** — Staff Ahli, Kemenhumas, UUID: `e20b3a32-15f1-4db8-9e55-320d750c8227`)
* **Fungsionaris Staff (Raport Belum Ada / Empty State 404):** `staff2@raport.test` (Nama: **Siti Rahmawati** — Staff Muda, Kemenristek)

### 2. Master Aspek Penilaian
* **Aspek BPH:** Kepemimpinan Strategis, Koordinasi & Tata Kelola, Manajemen Krisis & Pengambilan Keputusan, Integritas & Akuntabilitas.
* **Aspek Staff:** Kedisiplinan, Kerjasama Tim, Inisiatif.

---

## 🧪 Panduan Cara Mencoba Validasi & Skenario Form

### 1. Form Input Raport (`/admin/raport/create`)
1. **Dinamis Sesuai Role:**
   * Pilih akun **Bima Arya (BPH)**: form otomatis menampilkan 4 aspek khusus BPH.
   * Ganti ke akun **Siti Rahmawati (Staff)**: form otomatis mereset nilai sebelumnya dan hanya menampilkan 3 aspek khusus Staff.
2. **Validasi Angka 0–100 (Tidak Auto-0 saat Kosong):**
   * Kosongkan salah satu input nilai lalu klik *"Simpan & Terbitkan Raport"*. Sistem akan menampilkan pesan error validasi *"Nilai harus berupa angka 0–100"*.
   * Masukkan nilai negatif (contoh `-5`) atau lebih dari 100 (contoh `120`) untuk melihat pesan batas min/max.
   * Nilai `0` sah dan diterima jika diketik manual.
3. **Validasi Evaluasi Menyeluruh:**
   * Kosongkan kolom evaluasi atau hanya isi spasi, sistem akan menampilkan error *"Evaluasi menyeluruh tidak boleh kosong"*.
4. **Indikator Realtime Preview Rata-Rata:**
   * Setiap kali nilai aspek diisi, badge **`[Preview Rata-Rata]`** di header form akan menghitung formula rata-rata tanpa bobot secara langsung dengan presisi 2 angka desimal.
5. **Simulasi Error Duplikat (HTTP 409 Conflict):**
   * Pilih akun **Budi Santoso** (yang sudah memiliki raport awal), lalu submit. Sistem menampilkan alert peringatan penolakan duplikasi sesuai aturan MVP backend.
6. **Simulasi Sukses (HTTP 201 Created):**
   * Pilih akun **Siti Rahmawati** atau **Ahmad Fauzi** (fungsionaris yang belum dinilai), isi seluruh aspek dan evaluasi, lalu klik submit. Sistem akan menampilkan notifikasi sukses lengkap dengan preview JSON payload yang siap dikirim ke backend.

### 2. Form Kelola Aspek (`/admin/aspek`)
1. **Tambah Aspek Baru:**
   * Klik `+ Tambah Aspek Baru`, isi nama dan pilih role target (BPH/Staff). Aspek baru akan langsung muncul di tabel.
2. **Ubah Aspek:**
   * Klik tombol `Ubah` pada aspek buatan untuk mengubah nama atau deskripsi.
3. **Simulasi Proteksi Aspek Terpakai (HTTP 400 Bad Request):**
   * Coba klik tombol `Hapus` pada aspek **Kedisiplinan** atau **Kerjasama Tim**.
   * Konfirmasi hapus, maka sistem menampilkan pesan error pencegahan karena aspek telah terikat pada raport fungsionaris aktif.

### 3. Halaman Raport Pribadi (`/raport`)
* Gunakan pengalih akun di pojok kanan header:
  * **Budi Santoso:** Menampilkan transkrip raport lengkap dengan predikat dan ulasan kualitatif.
  * **Bima Arya:** Menampilkan transkrip raport versi BPH dengan aspek kepemimpinan.
  * **Siti Rahmawati:** Menampilkan **Empty State** resmi saat raport belum diterbitkan oleh Admin.

---

## ⚙️ Bagian yang Menggunakan Data Dummy vs Kesiapan Integrasi (Tugas 4)

* **Status Saat Ini (Tugas 3):**
  * Seluruh manipulasi data (CRUD aspek, pembuatan raport, pembacaan raport, status empty state) berjalan melalui state lokal dan data dummy di `data/dummyRaport.ts`.
  * Types dan Schema Zod di `types/raport.ts` dan `schemas/` telah disesuaikan 100% dengan format envelope backend (`ApiResponse<T>`, `ApiErrorResponse`).
* **Kesiapan Integrasi Tugas 4:**
  * File service API terpusat telah disiapkan di `libs/api.ts` (`authApi`, `reportApi`, `adminApi`) lengkap dengan header `Authorization: Bearer <TOKEN>`, `x-api-key`, dan penanganan error status HTTP (200, 201, 400, 401, 403, 404, 409).
  * Helper sesi JWT telah disiapkan di `libs/auth.ts` dan hook `hooks/useAuth.ts`.

---

## 🚀 Menjalankan Project Secara Lokal

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Jalankan pengecekan TypeScript & Linter
npx tsc --noEmit
npm run lint
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.
