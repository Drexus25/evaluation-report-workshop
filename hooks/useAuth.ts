"use client";

import {
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { authStorage, AUTH_CHANGE_EVENT } from "@/libs/auth";
import { authApi, ApiError } from "@/libs/api";

let syncedToken: string | null = null;
let pendingSyncPromise: Promise<User | null> | null = null;
let pendingSyncToken: string | null = null;

function resetAuthSyncCache() {
  syncedToken = null;
  pendingSyncPromise = null;
  pendingSyncToken = null;
}

/**
 * Deduplicate GET /api/v1/me across all concurrent useAuth() callers
 * for a given token.
 */
async function syncSessionForToken(currentToken: string): Promise<User | null> {
  if (syncedToken === currentToken) {
    return authStorage.getUser();
  }

  if (!pendingSyncPromise || pendingSyncToken !== currentToken) {
    pendingSyncToken = currentToken;
    pendingSyncPromise = authApi
      .getMe()
      .then((freshUser) => {
        if (authStorage.getToken() === currentToken) {
          syncedToken = currentToken;
          authStorage.setUser(freshUser);
        }
        return freshUser;
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          resetAuthSyncCache();
          authStorage.clearSession();
        }
        return null;
      })
      .finally(() => {
        if (pendingSyncToken === currentToken) {
          pendingSyncPromise = null;
          pendingSyncToken = null;
        }
      });
  }

  return pendingSyncPromise;
}

function subscribeAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handleSessionExpired = () => {
    resetAuthSyncCache();
    callback();
  };
  const handleAuthChange = () => {
    if (!authStorage.getToken()) {
      resetAuthSyncCache();
    }
    callback();
  };
  window.addEventListener("storage", handleAuthChange);
  window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  window.addEventListener("evalorg:session-expired", handleSessionExpired);
  return () => {
    window.removeEventListener("storage", handleAuthChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    window.removeEventListener("evalorg:session-expired", handleSessionExpired);
  };
}

const getTokenSnapshot = () => authStorage.getToken();
const getRawUserSnapshot = () => authStorage.getRawUser();
const getServerNullSnapshot = () => null;

export function useAuth() {
  const router = useRouter();
  const token = useSyncExternalStore(
    subscribeAuth,
    getTokenSnapshot,
    getServerNullSnapshot
  );
  const rawUser = useSyncExternalStore(
    subscribeAuth,
    getRawUserSnapshot,
    getServerNullSnapshot
  );

  const user = useMemo<User | null>(() => {
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser) as User;
    } catch {
      return null;
    }
  }, [rawUser]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Verifikasi profil pengguna dari backend saat aplikasi dimuat jika token ada
  useEffect(() => {
    let isMounted = true;

    async function syncSession() {
      if (!token) {
        resetAuthSyncCache();
        if (isMounted) setIsInitializing(false);
        return;
      }

      if (syncedToken === token) {
        if (isMounted) setIsInitializing(false);
        return;
      }

      await syncSessionForToken(token);
      if (isMounted) setIsInitializing(false);
    }

    syncSession();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = useCallback(
    async (identity: string, password: string): Promise<User> => {
      setIsLoading(true);
      try {
        // Panggil endpoint autentikasi backend POST /auth/login
        const loginData = await authApi.login({
          email: identity,
          password,
        });

        resetAuthSyncCache();
        authStorage.setToken(loginData.token);
        authStorage.setUser(loginData.user);

        // Ambil profil paling mutakhir via GET /me (shared dengan useEffect)
        const profile = await syncSessionForToken(loginData.token);
        return profile ?? loginData.user;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      if (authStorage.getToken()) {
        await authApi.logout().catch(() => {});
      }
    } finally {
      // Bersihkan seluruh data pengguna dan cache sinkronisasi saat sesi berakhir
      resetAuthSyncCache();
      authStorage.clearSession();
      setIsLoading(false);
      router.push("/login");
    }
  }, [router]);

  return {
    user,
    token,
    isLoading,
    isInitializing,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === "admin",
    isBphOrStaff: user?.role === "bph" || user?.role === "staff",
    login,
    logout,
  };
}
