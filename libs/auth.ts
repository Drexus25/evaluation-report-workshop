import { User } from "@/types";

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

export const AUTH_CHANGE_EVENT = "evalorg:auth-changed";

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}

export const authStorage = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
    notifyAuthChange();
  },

  getRawUser(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USER_KEY);
  },

  getUser(): User | null {
    const raw = this.getRawUser();
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  setUser(user: User) {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    notifyAuthChange();
  },

  clearSession() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Bersihkan seluruh data pengguna agar tidak tertinggal saat berganti akun
    sessionStorage.clear();
    notifyAuthChange();
  },

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  },
};
