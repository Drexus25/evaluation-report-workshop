# EvalOrg — Sistem Raport Evaluasi Fungsionaris Organisasi
> **Tugas 4 Workshop — Frontend Developer**  
> Integrasi REST API Backend, Axios Instance & Interceptors, Custom Hooks, Proteksi Sesi Pengguna, Error Handling & Feedback, serta Validasi Build Bersih.

---

## 📌 Daftar Halaman & Rute Aplikasi

| Route | Pengguna / Akses | Deskripsi & Fungsi |
|---|---|---|
| `/` | Public Visitor | Landing page interaktif pengenalan platform dan alur evaluasi |
| `/login` | Public / Mahasiswa | Halaman masuk akun fungsionaris & administrator (dilengkapi fitur *Quick Fill* akun uji) |
| `/raport` | Fungsionaris (`bph` / `staff`) | Raport pribadi via `GET /api/v1/me/report`, membedakan status 200 OK, 404 Belum Terbit, dan Network Error |
| `/admin` | Admin Only | Dashboard rekapitulasi performa organisasi dan metrik evaluasi |
| `/admin/aspek` | Admin Only | Manajemen master aspek penilaian (CRUD `GET/POST/PUT/DELETE /api/v1/admin/aspects`) |
| `/admin/raport` | Admin Only | Tabel rekap seluruh raport terbit & Modal Panel detail raport fungsionaris (`GET/DELETE /api/v1/admin/reports`) |
| `/admin/raport/create` | Admin Only | Form input raport baru dinamis per role, real-time preview rata-rata, proteksi duplikasi 409 |

---

## 🏗️ 1. Arsitektur Axios & Integrasi API

Seluruh komunikasi HTTP ke backend dikonfigurasikan secara terpusat melalui Axios instance di `libs/axios.ts` dan service API di `libs/api.ts`:

* **Base URL & Environment:**
  * Menggunakan variabel lingkungan `NEXT_PUBLIC_API_URL` (default: `https://api-ws.bemfilkomub.cloud/api/v1`).
  * Header pengaman `X-API-Key` diambil dari `NEXT_PUBLIC_API_KEY`.
* **Request Interceptor:**
  * Secara otomatis membaca token dari `authStorage.getToken()`.
  * Menyisipkan header `Authorization: Bearer <token>` dan `X-API-Key` pada setiap request keluar.
* **Response Interceptor & Error Normalization:**
  * Mengembalikan respons sukses terstandardisasi.
  * Menangani status **401 Unauthorized**: secara otomatis membersihkan sesi lokal (`authStorage.clearSession()`) dan memancarkan event `evalorg:session-expired` untuk mengarahkan pengguna ke `/login?expired=1`.
  * Membedakan **Network Error** (koneksi server terputus/gagal) agar tidak disalahartikan sebagai data kosong.
  * Mengklasifikasikan error status 400 (validasi), 403 (akses ditolak), 404 (tidak ditemukan), dan 409 (konflik/duplikasi) ke instance `ApiError`.

---

## 🪝 2. Custom Hooks & Manajemen Sesi

Seluruh pemanggilan data dan business logic dipisahkan ke dalam direktori `hooks/`:

1. **`useAuth` (`hooks/useAuth.ts`):**
   * Mengelola state autentikasi (`user`, `token`, `isAuthenticated`, `isAdmin`).
   * Fungsi `login`: mengirim kredensial ke `POST /api/v1/auth/login`, menyinkronkan profil via `GET /api/v1/me`, dan mengembalikan role untuk navigasi.
   * Fungsi `logout`: memanggil `POST /api/v1/auth/logout`, membersihkan `authStorage` (localStorage & sessionStorage), dan mencegah data akun sebelumnya tertinggal saat berganti akun.
   * Guard Navigasi: Rute `/admin/*` diproteksi oleh `AdminGuard` (pengguna non-admin dialihkan ke `/raport` dengan notifikasi 403). Rute `/raport` diproteksi oleh `AuthOnlyGuard`.
2. **`useAspects` (`hooks/useAspects.ts`):**
   * Mengelola state aspek penilaian, filter role (`all`, `bph`, `staff`), loading, dan mutasi.
   * `createAspect`: `POST /api/v1/admin/aspects`.
   * `updateAspect`: `PUT /api/v1/admin/aspects/:id`.
   * `deleteAspect`: `DELETE /api/v1/admin/aspects/:id` dengan dialog konfirmasi sebelum hapus.
   * Memperbarui tampilan secara otomatis setelah mutasi agar data selalu mutakhir.
3. **`useAdminReports` (`hooks/useAdminReports.ts`):**
   * Mengambil daftar raport (`GET /api/v1/admin/reports`) dan detail raport (`GET /api/v1/admin/reports/:id`).
   * Mengambil data fungsionaris (`GET /api/v1/admin/users`) dan aspek untuk form pembuatan raport.
   * Menggunakan nilai **`average_score` dari respons Backend sebagai nilai final** tanpa menghitung ulang dengan rumus berbeda.
   * `deleteReport`: `DELETE /api/v1/admin/reports/:id` dengan modal konfirmasi.
4. **`usePersonalReport` (`hooks/usePersonalReport.ts`):**
   * Mengambil profil fungsionaris aktif (`GET /api/v1/me`) dan raport pribadi (`GET /api/v1/me/report`).
   * **Pembedaan tegas 404 vs Error Jaringan:**
     * Status **404**: Menampilkan *Empty State resmi* ("Raport Belum Diterbitkan").
     * Status **Network Error / 500**: Menampilkan *Error Card* dengan tombol "Coba Muat Ulang" (tidak ditampilkan seolah-olah data kosong).
5. **`useToast` (`context/ToastContext.tsx`):**
   * Sistem notifikasi global (Success, Error, Warning, Info) berbasis **Framer Motion**.
   * Mendukung preferensi aksesibilitas `useReducedMotion()`.

---

## 🎨 3. Loading, Feedback & Error Handling

* **Submit Prevention:** Tombol submit pada seluruh formulir otomatis berada pada status `disabled` saat `isSubmitting` atau `isLoading` aktif dengan indikator animasi spinner untuk mencegah *duplicate submissions*.
* **Penanganan Duplikat (HTTP 409):** Ketika admin menginput raport untuk fungsionaris yang sudah memiliki raport, sistem menampilkan banner peringatan 409 tanpa menghapus nilai dan evaluasi yang telah diketik pengguna.
* **Validasi Error Backend:** Error validasi dari backend dipetakan langsung ke elemen form bersangkutan.
* **Animasi Transisi:** Modal, toast, dan card menggunakan transisi halus Framer Motion dengan dukungan penuh untuk `prefers-reduced-motion`.

---

## 👥 Akun Uji Coba (Kredensial Demo)

Tersedia tombol pintas (*Quick Fill*) pada halaman `/login` untuk memudahkan penguji:

* **Administrator:** `admin@raport.com` / `admin@raport.test` (Role: `admin`, Password: `password123`)
* **Fungsionaris BPH:** `bph1@raport.test` (Nama: **Bima Arya Pratama**, Password: `password123`)
* **Fungsionaris Staff (Raport Tersedia 200 OK):** `staff1@raport.test` (Nama: **Budi Santoso**, Password: `password123`)
* **Fungsionaris Staff (Raport Belum Ada 404):** `staff2@raport.test` (Nama: **Siti Rahmawati**, Password: `password123`)

---

## ⚙️ Variabel Lingkungan (.env)

Buat file `.env` di direktori utama berdasarkan template `.env.example`:

```env
# URL Base Endpoint Backend API
NEXT_PUBLIC_API_URL=https://api-ws.bemfilkomub.cloud/api/v1

# Header Pengaman X-API-Key
NEXT_PUBLIC_API_KEY=<API_KEY>
```

> **Catatan Keamanan:** File `.env` telah didaftarkan pada `.gitignore` sehingga rahasia dan kunci otentikasi tidak akan terunggah ke repositori publik.

---

## 🚀 Panduan Menjalankan Frontend Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Siapkan file konfigurasi environment
cp .env.example .env

# 3. Jalankan server pengembangan
npm run dev

# 4. Jalankan pengecekan TypeScript & Linter
npx tsc --noEmit
npm run lint

# 5. Jalankan build produksi
npm run build
```

Buka [http://localhost:3000](http://localhost:3000) di peramban web Anda.

---

## 📋 Skenario Alur Presentasi Final (Durasi ±5 Menit)

1. **Alur 1 — Admin Login & Kelola Aspek:**
   * Buka `/login` → Klik tombol cepat `Admin` → Klik *"Masuk ke Akun"*.
   * Sistem otomatis mengarahkan ke dashboard admin `/admin`.
   * Buka menu *"Kelola Aspek"* (`/admin/aspek`) → Tambah aspek baru → Coba ubah deskripsi → Tampilkan dialog konfirmasi hapus.
2. **Alur 2 — Input Raport & Validasi Nilai:**
   * Buka menu *"Input Raport Baru"* (`/admin/raport/create`).
   * Pilih fungsionaris → Aspek akan tampil secara dinamis sesuai role target.
   * Masukkan nilai aspek → Amati badge realtime `[Preview Rata-Rata]`.
   * Coba submit pada fungsionaris yang sudah memiliki raport → Amati penanganan error 409 (input tidak terhapus).
   * Submit fungsionaris yang belum dinilai → Muncul notifikasi sukses HTTP 201.
3. **Alur 3 — Rekap & Detail Raport:**
   * Buka menu *"Daftar Raport"* (`/admin/raport`) → Filter role BPH/Staff dan gunakan pencarian.
   * Klik *"Lihat Detail"* → Muncul modal pop-up menampilkan transkrip lengkap dengan nilai `average_score` asli dari backend.
4. **Alur 4 — Fungsionaris Login & Raport Pribadi:**
   * Lakukan logout dari akun admin via sidebar atau navbar.
   * Login menggunakan akun Staff / BPH → Diarahkan langsung ke `/raport`.
   * Lihat transkrip resmi beserta predikat kinerja dan evaluasi naratif.
   * Uji akun belum dinilai (Empty State 404) vs simulasi error jaringan.
5. **Alur 5 — Sesi Berakhir & Proteksi Rute:**
   * Coba akses langsung rute `/admin` menggunakan akun non-admin → Muncul pesan 403 Forbidden dan diarahkan ke rute aman.
   * Logout akun → Sesi dibersihkan total tanpa data akun tertinggal.
