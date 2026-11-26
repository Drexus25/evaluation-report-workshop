import { z } from "zod";

export const scoreItemSchema = z.object({
  aspect_id: z.string({ error: "ID aspek wajib ada" }),
  score: z
    .number({
      error: "Nilai wajib diisi angka 0–100",
    })
    .int("Nilai harus berupa bilangan bulat")
    .min(0, "Nilai minimal adalah 0")
    .max(100, "Nilai maksimal adalah 100"),
  feedback: z.string().trim().optional(),
});

export const raportSchema = z.object({
  user_id: z
    .string({ error: "Fungsionaris wajib dipilih" })
    .min(1, "Fungsionaris wajib dipilih"),
  overall_evaluation: z
    .string({ error: "Evaluasi menyeluruh tidak boleh kosong" })
    .trim()
    .min(1, "Evaluasi menyeluruh tidak boleh kosong"),
  scores: z
    .array(scoreItemSchema)
    .min(1, "Semua aspek penilaian wajib diisi"),
});

export type RaportFormValues = z.infer<typeof raportSchema>;

export const updateReportSchema = z.object({
  overall_evaluation: z
    .string({ error: "Evaluasi menyeluruh tidak boleh kosong" })
    .trim()
    .min(1, "Evaluasi menyeluruh tidak boleh kosong"),
  scores: z
    .array(scoreItemSchema)
    .min(1, "Semua aspek penilaian wajib diisi"),
});

export type UpdateReportFormValues = z.infer<typeof updateReportSchema>;
