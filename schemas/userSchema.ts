import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string({ error: "Nama lengkap wajib diisi" })
    .trim()
    .min(1, "Nama lengkap tidak boleh kosong")
    .max(255, "Nama lengkap maksimal 255 karakter"),
  role: z.enum(["admin", "bph", "staff"], {
    error: "Role harus salah satu dari: admin, bph, atau staff",
  }),
  position: z
    .string()
    .trim()
    .max(255, "Jabatan maksimal 255 karakter"),
  ministry: z
    .string()
    .trim()
    .max(255, "Kementerian/biro maksimal 255 karakter"),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
