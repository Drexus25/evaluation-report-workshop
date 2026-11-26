"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Loader2, Lock, Mail, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { ApiError } from "@/libs/api";

export default function LoginSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const [error, setError] = useState<string | null>(null);
  const [dismissNotice, setDismissNotice] = useState(false);
  const isSessionExpired = !dismissNotice && searchParams.get("expired") === "1";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    try {
      const user = await login(data.email, data.password);
      toast.success(
        `Selamat datang kembali, ${user.name}!`,
        "Login Berhasil"
      );

      // Arahkan pengguna setelah login sesuai role
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/raport");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        toast.error(err.message, "Gagal Masuk");
      } else {
        const fallbackMsg = "Terjadi kesalahan koneksi ke server backend.";
        setError(fallbackMsg);
        toast.error(fallbackMsg, "Error");
      }
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-center py-8">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
        className="w-full max-w-md px-6"
      >
        <div className="mb-6">
          <h1 className="font-headline text-3xl font-bold text-neutral-900 mb-1 tracking-tight">
            Masuk ke Sistem Raport
          </h1>
          <p className="text-neutral-500 text-sm">
            Gunakan email akun fungsionaris atau administrator Anda.
          </p>
        </div>

        {isSessionExpired && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
            <AlertCircle className="text-amber-600 mt-0.5 shrink-0" size={18} aria-hidden="true" />
            <div className="flex-1">
              <p className="text-amber-800 font-semibold text-xs">Pemberitahuan Sesi</p>
              <p className="text-amber-700 text-xs mt-0.5">Sesi Anda telah berakhir. Silakan masuk kembali.</p>
            </div>
            <button
              type="button"
              onClick={() => setDismissNotice(true)}
              aria-label="Tutup pemberitahuan sesi"
              className="text-amber-500 hover:text-amber-700 shrink-0 cursor-pointer rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
            <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} aria-hidden="true" />
            <div className="flex-1">
              <p className="text-red-600 font-semibold text-xs">Gagal Masuk</p>
              <p className="text-red-500 text-xs mt-0.5">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="Tutup pesan error"
              className="text-red-400 hover:text-red-600 shrink-0 cursor-pointer rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("email")}
            type="email"
            autoComplete="email"
            label="Email Akun"
            placeholder="admin@raport.com"
            leftIcon={<Mail size={18} aria-hidden="true" />}
            error={errors.email?.message}
            disabled={isSubmitting}
          />

          <Input
            {...register("password")}
            label="Kata Sandi"
            placeholder="••••••••••••"
            type="password"
            autoComplete="current-password"
            showPasswordToggle
            leftIcon={<Lock size={18} aria-hidden="true" />}
            error={errors.password?.message}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full bg-primary-700 hover:bg-primary-800 active:bg-primary-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-2xl py-3.5 mt-2 transition duration-150 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Memverifikasi Akun...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Akun</span>
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
