"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/libs/cn";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string, duration?: number) => string;
    error: (message: string, title?: string, duration?: number) => string;
    warning: (message: string, title?: string, duration?: number) => string;
    info: (message: string, title?: string, duration?: number) => string;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toastHelpers = useMemo(
    () => ({
      success: (message: string, title = "Berhasil", duration = 4000) =>
        showToast({ type: "success", title, message, duration }),
      error: (message: string, title = "Terjadi Kesalahan", duration = 5000) =>
        showToast({ type: "error", title, message, duration }),
      warning: (message: string, title = "Peringatan", duration = 4500) =>
        showToast({ type: "warning", title, message, duration }),
      info: (message: string, title = "Informasi", duration = 4000) =>
        showToast({ type: "info", title, message, duration }),
    }),
    [showToast]
  );

  const contextValue = useMemo(
    () => ({
      toasts,
      showToast,
      removeToast,
      toast: toastHelpers,
    }),
    [toasts, showToast, removeToast, toastHelpers]
  );

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />;
      case "info":
        return <Info className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />;
    }
  };

  const getToastBorder = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-emerald-200 bg-white/95 text-emerald-950";
      case "error":
        return "border-red-200 bg-white/95 text-red-950";
      case "warning":
        return "border-amber-200 bg-white/95 text-amber-950";
      case "info":
        return "border-primary-200 bg-white/95 text-primary-950";
    }
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast Floating Viewport */}
      <div
        aria-live="polite"
        className="fixed top-5 left-4 right-4 sm:left-auto sm:right-5 sm:w-full sm:max-w-sm z-[100] flex flex-col gap-2.5 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: -16, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.96 }
              }
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className={cn(
                "pointer-events-auto p-4 rounded-xl border shadow-lg backdrop-blur-md flex items-start gap-3",
                getToastBorder(item.type)
              )}
            >
              <div className="mt-0.5">{getToastIcon(item.type)}</div>
              <div className="flex-1 min-w-0">
                {item.title && (
                  <p className="text-xs font-bold leading-none mb-1">
                    {item.title}
                  </p>
                )}
                <p className="text-xs leading-relaxed text-neutral-700">
                  {item.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(item.id)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Tutup notifikasi"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast harus digunakan di dalam ToastProvider");
  }
  return context;
}
