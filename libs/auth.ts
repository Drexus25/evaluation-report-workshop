export const dummyAccounts = [
  {
    username: "member",
    password: "member123",
    role: "member",
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },

];

export type UserRole = "member" | "admin";

export interface AuthSession {
  username: string;
  role: UserRole;
}

const SESSION_KEY = "auth_session";

export function login(username: string, password: string): AuthSession | null {
  const account = dummyAccounts.find(
    (a) => a.username === username.trim() && a.password === password
  );

  if (!account) return null;

  const session: AuthSession = {
    username: account.username,
    role: account.role as UserRole,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null; // SSR guard
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

let _cachedRaw: string | null = undefined as unknown as string | null;
let _cachedSession: AuthSession | null = null;

export function getSessionSnapshot(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (raw === _cachedRaw) return _cachedSession;
  _cachedRaw = raw;
  try {
    _cachedSession = raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    _cachedSession = null;
  }
  return _cachedSession;
}

