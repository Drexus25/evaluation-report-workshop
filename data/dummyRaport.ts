import { Aspect, RaportData, User } from "@/types";

export const dummyAccounts = {
  admin: {
    email: "admin@raport.test",
    password: "password123",
    role: "admin",
  },
  bph: {
    email: "bph1@raport.test",
    password: "password123",
    role: "bph",
  },
  staff: {
    email: "staff1@raport.test",
    password: "password123",
    role: "staff",
  },
};

export const dummyUserBph: User = {
  id: "b10b3a32-15f1-4db8-9e55-320d750c8221",
  name: "Bima Arya Pratama",
  email: "bph1@raport.test",
  role: "bph",
  position: "Ketua BPH",
  ministry: "Presidium BPH Inti",
  nim: "22081010045",
  period: "Semester Ganjil 2026/2027",
};

export const dummyRaportBph: RaportData = {
  id: "8ca6c18f-a496-4122-bcfa-f45853fba881",
  user_id: "b10b3a32-15f1-4db8-9e55-320d750c8221",
  name: "Bima Arya Pratama",
  role: "bph",
  position: "Ketua BPH",
  ministry: "Presidium BPH Inti",
  user: dummyUserBph,
  scores: [
    {
      aspect_id: "22222222-2222-2222-2222-222222222201",
      aspect_name: "Kepemimpinan Strategis",
      score: 92,
      notes: "Mampu memimpin koordinasi lintas kementerian dan merumuskan kebijakan yang solutif.",
    },
    {
      aspect_id: "22222222-2222-2222-2222-222222222202",
      aspect_name: "Koordinasi & Tata Kelola",
      score: 88,
      notes: "Rapat pleno dan tindak lanjut monitoring program berjalan teratur.",
    },
    {
      aspect_id: "22222222-2222-2222-2222-222222222203",
      aspect_name: "Manajemen Krisis & Pengambilan Keputusan",
      score: 90,
      notes: "Cepat dan tepat dalam meredam dinamika organisasi serta risiko kegiatan.",
    },
    {
      aspect_id: "22222222-2222-2222-2222-222222222204",
      aspect_name: "Integritas & Akuntabilitas",
      score: 94,
      notes: "Transparan dan disiplin dalam penyusunan laporan pertanggungjawaban.",
    },
  ],
  average_score: 91.0,
  overall_evaluation:
    "Kepemimpinan sangat matang dalam memandu arah kebijakan organisasi. Hubungan sinergis dengan seluruh kementerian terbangun solid dan akuntabel. Rekomendasi: terus optimalkan pemberdayaan staf muda pada siklus berikutnya.",
  created_at: "2026-10-18T10:00:00Z",
  updated_at: "2026-10-18T10:00:00Z",
  created_by: "Admin Pusat",
};

export const dummyUserStaff: User = {
  id: "e20b3a32-15f1-4db8-9e55-320d750c8227",
  name: "Budi Santoso",
  email: "staff1@raport.test",
  role: "staff",
  position: "Staff Ahli",
  ministry: "Kemenhumas",
  nim: "23081010112",
  period: "Semester Ganjil 2026/2027",
};

export const dummyRaportStaff: RaportData = {
  id: "7ca6c18f-a496-4122-bcfa-f45853fba880",
  user_id: "e20b3a32-15f1-4db8-9e55-320d750c8227",
  name: "Budi Santoso",
  role: "staff",
  position: "Staff Ahli",
  ministry: "Kemenhumas",
  user: dummyUserStaff,
  average_score: 88.33,
  overall_evaluation:
    "Kinerja dan dedikasi selama satu semester sangat memuaskan, komunikasi aktif dalam eksekusi program kemenhumas.",
  scores: [
    {
      aspect_id: "11111111-1111-1111-1111-111111111101",
      aspect_name: "Kedisiplinan",
      score: 90,
      notes: "Kehadiran rapat kementerian dan briefing selalu tepat waktu.",
    },
    {
      aspect_id: "11111111-1111-1111-1111-111111111102",
      aspect_name: "Kerjasama Tim",
      score: 85,
      notes: "Sangat kooperatif dan mudah diajak bertukar ide.",
    },
    {
      aspect_id: "11111111-1111-1111-1111-111111111103",
      aspect_name: "Inisiatif",
      score: 90,
      notes: "Proaktif memberikan solusi saat perancangan kampanye publik.",
    },
  ],
  created_at: "2026-10-20T10:00:00Z",
  updated_at: "2026-10-20T10:00:00Z",
  created_by: "Admin Pusat",
};

export const dummyUserEmpty: User = {
  id: "f30b3a32-15f1-4db8-9e55-320d750c8229",
  name: "Siti Rahmawati",
  email: "staff2@raport.test",
  role: "staff",
  position: "Staff Muda",
  ministry: "Kemenristek",
  nim: "24081010301",
  period: "Semester Ganjil 2026/2027",
};

export const dummyAllAspects: Aspect[] = [
  {
    id: "22222222-2222-2222-2222-222222222201",
    name: "Kepemimpinan Strategis",
    description: "Visi kepemimpinan dan kapabilitas pengambilan keputusan organisasi",
    role_type: "bph",
  },
  {
    id: "22222222-2222-2222-2222-222222222202",
    name: "Koordinasi Antardivisi",
    description: "Efektivitas sinkronisasi antar-kepala departemen dan tim",
    role_type: "bph",
  },
  {
    id: "11111111-1111-1111-1111-111111111101",
    name: "Kedisiplinan",
    description: "Ketepatan waktu kehadiran dan pelaksanaan tugas",
    role_type: "both",
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    name: "Kerjasama Tim",
    description: "Kemampuan berkolaborasi dengan sesama fungsionaris",
    role_type: "both",
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    name: "Inisiatif",
    description: "Proaktif memberikan ide dan solusi dalam menghadapi kendala kerja",
    role_type: "both",
  },
  {
    id: "22222222-2222-2222-2222-222222222204",
    name: "Integritas & Akuntabilitas",
    description: "Kepatuhan terhadap kode etik organisasi dan transparansi LPJ",
    role_type: "both",
  },
];

export const dummyAspectsStaff = dummyAllAspects.filter(
  (a) => a.role_type === "staff" || a.role_type === "both"
);

export const dummyAspectsBph = dummyAllAspects.filter(
  (a) => a.role_type === "bph" || a.role_type === "both"
);

export const dummyAdminUsersList: User[] = [
  dummyUserBph,
  dummyUserStaff,
  dummyUserEmpty,
  {
    id: "a40b3a32-15f1-4db8-9e55-320d750c8230",
    name: "Ahmad Fauzi",
    email: "staff3@raport.test",
    role: "staff",
    position: "Staff Ahli",
    ministry: "Kemenkeu",
    nim: "23081010199",
  },
];

export const dummyInitialReports: RaportData[] = [
  dummyRaportBph,
  dummyRaportStaff,
];
