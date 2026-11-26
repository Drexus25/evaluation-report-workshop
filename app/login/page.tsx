import { Suspense } from "react";
import LoginContainer from "@/components/feature/login/container/LoginContainer";

export const metadata = {
  title: "Masuk ke Sistem Raport | EvalOrg",
  description: "Halaman masuk akun fungsionaris dan administrator EvalOrg",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-canvas flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContainer />
    </Suspense>
  );
}
