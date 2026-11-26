"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginSection from "../section/LoginSection";
import SideBanner from "../section/SideBanner";

export default function LoginContainer() {
  const router = useRouter();
  const { user, isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && isAuthenticated && user) {
      if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/raport");
      }
    }
  }, [isAuthenticated, user, isInitializing, router]);

  return (
    <main className="flex flex-row min-h-[100dvh] h-full">
      <div className="flex-1 hidden md:block">
        <SideBanner />
      </div>
      <div className="flex-1">
        <LoginSection />
      </div>
    </main>
  );
}
