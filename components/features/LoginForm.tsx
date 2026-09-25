"use client";

import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", { username, password });
  };

  return (
    <div className="w-full max-w-md bg-[#FFEFB3] rounded-3xl p-8 sm:p-10 border-3 border-[#10704b]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#10704b]">Login</h1>
        <p className="text-sm text-[#053322]/80 mt-1 font-medium">
          Enter your username and password to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
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
            required
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 border-[#10704b]/30 focus:border-[#10704b] focus:bg-white focus:outline-none transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
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
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 border-[#10704b]/30 focus:border-[#10704b] focus:bg-white focus:outline-none transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3 px-6 rounded-full bg-[#10704b] text-[#FFEFB3] font-bold text-base border-2 border-[#053322] hover:bg-[#0d5c3d] hover:shadow-md active:scale-[0.99] cursor-pointer transition-all duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}