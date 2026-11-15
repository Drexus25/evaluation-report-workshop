import { z } from "zod"

export const loginSchema = z.object({
    identity: z.string().min(1, "Identitas akun tidak boleh kosong."),
    password: z.string().min(1, "Kata sandi tidak boleh kosong."),
})

export type LoginFormValues = z.infer<typeof loginSchema>
