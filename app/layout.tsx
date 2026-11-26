import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "EvalOrg | Sistem Raport Evaluasi Fungsionaris",
  description: "Platform evaluasi kinerja fungsionaris organisasi mahasiswa berbasis rubrik objektif",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className="h-full antialiased font-sans"
    >
      <body className="font-sans min-h-full flex flex-col bg-canvas text-neutral-900 selection:bg-primary-100 selection:text-primary-900">
        <ToastProvider>
          <Navbar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
