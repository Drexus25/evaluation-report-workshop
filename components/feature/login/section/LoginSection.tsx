"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, X, IdCard, Lock } from "lucide-react"
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema"
import { Input } from "@/components/ui/Input"

export default function LoginSection() {
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginFormValues) => {
        setError(null)
        console.log(data)
        // TODO: integrate with backend
    }

    return (
        <section className="w-full h-full flex justify-center items-center">
            <div className="w-full max-w-md px-6">
                <h1 className="font-headline text-3xl font-bold text-neutral-900 mb-1">
                    Masuk ke Sistem Raport
                </h1>
                <p className="text-neutral-500 text-sm mb-6">
                    Gunakan email fungsionaris atau NIM resmi kampus Anda.
                </p>

                {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
                        <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
                        <div className="flex-1">
                            <p className="text-red-600 font-semibold text-sm">Gagal Masuk</p>
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>
                        <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 shrink-0 cursor-pointer">
                            <X size={16} />
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <Input
                        {...register("identity")}
                        label="Identitas Akun"
                        labelRight="NIM / Email"
                        placeholder="22081010045"
                        leftIcon={<IdCard size={18} />}
                        error={errors.identity?.message}
                    />

                    <Input
                        {...register("password")}
                        label="Kata Sandi"
                        placeholder="secret123"
                        type="password"
                        showPasswordToggle
                        leftIcon={<Lock size={18} />}
                        error={errors.password?.message}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 w-full bg-primary-700 hover:bg-primary-800 active:bg-primary-900 disabled:opacity-60 text-white font-semibold text-sm rounded-2xl py-4 mt-1 transition cursor-pointer"
                    >
                        Masuk ke Akun
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    )
}