import { RaportData, User } from "@/types";

export const dummyUserBph: User = {
  id: "usr_bph_001",
  user_id: "usr_bph_001",
  name: "Muhammad Zaki Pratama",
  nim: "22081010045",
  email: "zaki.pratama@evalorg.ac.id",
  role: "bph",
  department: "Badan Pengurus Harian (Ketua Umum)",
  period: "Semester Genap 2024/2025",
};

export const dummyRaportBph: RaportData = {
  id: "rpt_bph_001",
  user_id: "usr_bph_001",
  user: dummyUserBph,
  scores: [
    {
      aspect_id: "asp_bph_01",
      aspect_name: "Kepemimpinan & Visi Strategis",
      score: 92,
      notes: "Mampu memimpin rapat pleno secara terarah dan merumuskan program tepat sasaran.",
    },
    {
      aspect_id: "asp_bph_02",
      aspect_name: "Komunikasi & Koordinasi Antardivisi",
      score: 88,
      notes: "Respon aktif dalam sinkronisasi antar-kepala departemen.",
    },
    {
      aspect_id: "asp_bph_03",
      aspect_name: "Manajemen Krisis & Problem Solving",
      score: 90,
      notes: "Cepat mengambil mitigasi saat terjadi kendala logistik kegiatan.",
    },
    {
      aspect_id: "asp_bph_04",
      aspect_name: "Akuntabilitas & Integritas Organisasi",
      score: 94,
      notes: "Disiplin tinggi terhadap transparansi anggaran dan laporan pertanggungjawaban.",
    },
  ],
  average_score: 91.0,
  evaluation:
    "Menunjukkan kepemimpinan yang sangat solid dan berdedikasi tinggi dalam mengarahkan roda organisasi selama satu semester ini. Hubungan kerja dengan jajaran BPH dan seluruh departemen terjalin secara kondusif dan akuntabel. Catatan untuk ke depannya: tingkatkan mekanisme kontrol berkala terhadap delegasi tugas ke koordinator divisi agar beban kerja tetap seimbang.",
  created_at: "2025-06-15T10:30:00Z",
  created_by: "Administrator Pusat",
};

export const dummyUserStaff: User = {
  id: "usr_stf_002",
  user_id: "usr_stf_002",
  name: "Annisa Maharani Putri",
  nim: "23081010112",
  email: "annisa.maharani@evalorg.ac.id",
  role: "staff",
  department: "Departemen Komunikasi & Informasi",
  period: "Semester Genap 2024/2025",
};

export const dummyRaportStaff: RaportData = {
  id: "rpt_stf_002",
  user_id: "usr_stf_002",
  user: dummyUserStaff,
  scores: [
    {
      aspect_id: "asp_stf_01",
      aspect_name: "Kedisiplinan & Presensi Agenda",
      score: 85,
      notes: "Kehadiran rapat divisi dan kepanitiaan mencapai 95%.",
    },
    {
      aspect_id: "asp_stf_02",
      aspect_name: "Kualitas Eksekusi Tugas & Deadline",
      score: 88,
      notes: "Desain konten feed publikasi selalu selesai sebelum tanggal rilis.",
    },
    {
      aspect_id: "asp_stf_03",
      aspect_name: "Kolaborasi Tim & Komunikasi",
      score: 90,
      notes: "Kooperatif dan proaktif membantu rekan divisi yang mengalami kendala.",
    },
    {
      aspect_id: "asp_stf_04",
      aspect_name: "Inisiatif & Kreativitas Kerja",
      score: 84,
      notes: "Memberikan banyak ide visual segar untuk kampanye media sosial.",
    },
  ],
  average_score: 86.75,
  evaluation:
    "Kinerja fungsionaris sangat memuaskan, konsisten, dan dapat diandalkan dalam seluruh rangkaian agenda departemen. Memiliki inisiatif tinggi dalam pembuatan materi kreatif dan mampu bekerja di bawah tenggat waktu yang ketat. Diharapkan dapat terus mempertahankan semangat kolaborasi serta mulai melatih anggota staf baru pada periode berikutnya.",
  created_at: "2025-06-18T14:15:00Z",
  created_by: "Administrator Pusat",
};

export const dummyUserEmpty: User = {
  id: "usr_stf_003",
  user_id: "usr_stf_003",
  name: "Rizky Aditya Pratama",
  nim: "23081010204",
  email: "rizky.aditya@evalorg.ac.id",
  role: "staff",
  department: "Departemen Riset & Pengembangan",
  period: "Semester Genap 2024/2025",
};
