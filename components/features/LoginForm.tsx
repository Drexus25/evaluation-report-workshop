"use client";

import { useState } from "react";
import { login } from "@/libs/auth";
import {
  validateLoginForm,
  getFieldError,
  type ValidationError,
} from "@/schemas/loginSchema";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const usernameError = getFieldError(errors, "username");
  const passwordError = getFieldError(errors, "password");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);

    const result = validateLoginForm({ username, password });
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);

    setIsLoading(true);
    const session = login(username, password);
    setIsLoading(false);

    if (!session) {
      setAuthError("Invalid username or password. Please try again.");
      return;
    }

    const destination = session.role === "admin" ? "/admin" : "/report";
    window.location.href = destination;
  };

  return (
    <div className="w-full max-w-md bg-[#FFEFB3] rounded-3xl p-8 sm:p-10 border-3 border-[#10704b]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#10704b]">Login</h1>
        <p className="text-sm text-[#053322]/80 mt-1 font-medium">
          Enter your username and password to continue
        </p>
      </div>

      {authError && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-red-100 border border-red-300 text-red-700 text-sm font-medium flex items-center gap-2">
          <span>⚠️</span>
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="text-sm font-bold text-[#053322]"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => prev.filter((err) => err.field !== "username"));
              setAuthError(null);
            }}
            className={`w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 focus:outline-none transition-all duration-200 ${
              usernameError
                ? "border-red-400 focus:border-red-500"
                : "border-[#10704b]/30 focus:border-[#10704b] focus:bg-white"
            }`}
          />
          {usernameError && (
            <p className="text-xs text-red-600 font-medium mt-0.5">
              {usernameError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-bold text-[#053322]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => prev.filter((err) => err.field !== "password"));
              setAuthError(null);
            }}
            className={`w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 focus:outline-none transition-all duration-200 ${
              passwordError
                ? "border-red-400 focus:border-red-500"
                : "border-[#10704b]/30 focus:border-[#10704b] focus:bg-white"
            }`}
          />
          {passwordError && (
            <p className="text-xs text-red-600 font-medium mt-0.5">
              {passwordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full py-3 px-6 rounded-full bg-[#10704b] text-[#FFEFB3] font-bold text-base border-2 border-[#053322] hover:bg-[#0d5c3d] hover:shadow-md active:scale-[0.99] cursor-pointer transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
