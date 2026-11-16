import { z } from "zod";

export const aspectSchema = z.object({
  name: z
    .string({ error: "Nama aspek wajib diisi" })
    .trim()
    .min(1, "Nama aspek wajib diisi")
    .max(100, "Nama aspek maksimal 100 karakter"),
  description: z.string().trim().optional(),
  role_type: z.enum(["bph", "staff", "both"], {
    error: "Pilih target role yang valid (BPH, Staff, atau Keduanya)",
  }),
});

export type AspectFormValues = z.infer<typeof aspectSchema>;
