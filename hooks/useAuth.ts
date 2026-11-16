"use client";

import { useState, useCallback } from "react";
import { User } from "@/types";
import { authStorage } from "@/libs/auth";
import { authApi } from "@/libs/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => authStorage.getUser());
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const data = await authApi.login({ email, password });
        authStorage.setToken(data.token);
        authStorage.setUser(data.user);
        setToken(data.token);
        setUser(data.user);
        return data;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      if (token) {
        await authApi.logout().catch(() => {});
      }
    } finally {
      authStorage.clearSession();
      setToken(null);
      setUser(null);
    }
  }, [token]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };
}
