"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMeta,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/RoleBadge";
import Navbar from "@/components/ui/Navbar";

export default function ComponentPreviewPage() {
  const [activeTab, setActiveTab] = useState<"all" | "button" | "card" | "badge" | "navbar">("all");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-neutral-700 antialiased font-body pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-16">
        {/* ==========================================================================
            1. BUTTON COMPONENT
            ========================================================================== */}
        {(activeTab === "all" || activeTab === "button") && (
          <section id="button" className="space-y-8 scroll-mt-24">
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </span>
                <div>
                  <h2 className="text-2xl font-bold font-headline text-neutral-800">
                    Button Component
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    @/components/ui/Button.tsx
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Visual Specimen Showcase (Matching the User's Blueprint) */}
            <div className="bg-[#141718] text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-neutral-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                    Visual Graphic Specimen
                  </span>
                  <h3 className="text-xl font-headline font-bold text-white mt-1">
                    Design System Action Tokens
                  </h3>
                </div>
                <span className="text-xs text-neutral-400 bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-700">
                  Dark Canvas Mode
                </span>
              </div>

              {/* Grid 4 Varian Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {/* Primary */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>Variant: &quot;primary&quot;</span>
                    <span className="text-accent">#1F6F78 (100%)</span>
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    Akses Raport Saya
                  </Button>
                </div>

                {/* Secondary */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>Variant: &quot;secondary&quot;</span>
                    <span className="text-neutral-300">#FFFFFF Solid</span>
                  </div>
                  <Button variant="secondary" size="lg" className="w-full">
                    Lihat Alur Penilaian
                  </Button>
                </div>

                {/* Outline */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>Variant: &quot;outline&quot;</span>
                    <span className="text-accent">Border 2px Primary</span>
                  </div>
                  <Button variant="outline" size="lg" className="w-full">
                    Akses Raport Saya
                  </Button>
                </div>

                {/* Ghost */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>Variant: &quot;ghost&quot;</span>
                    <span className="text-neutral-400">#8E9398 Neutral</span>
                  </div>
                  <Button variant="ghost" size="lg" className="w-full">
                    Lihat Alur Penilaian
                  </Button>
                </div>
              </div>
            </div>

            {/* Light Canvas Variations & Sizes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sizes (sm, md, lg) */}
              <Card variant="default" padding="lg">
                <CardHeader>
                  <CardTitle as="h3">Button Sizes</CardTitle>
                  <CardMeta>sm / md / lg</CardMeta>
                </CardHeader>
                <CardDescription>
                  Prop <code className="font-mono text-xs text-primary">size</code> menyesuaikan tinggi, padding horizontal, dan ukuran teks secara proporsional.
                </CardDescription>
                <CardContent className="pt-4 flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <Button variant="primary" size="sm">
                      Small Button (36px)
                    </Button>
                    <span className="text-xs text-neutral-400 font-mono">size=&quot;sm&quot;</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="primary" size="md">
                      Medium Button (44px)
                    </Button>
                    <span className="text-xs text-neutral-400 font-mono">size=&quot;md&quot;</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="primary" size="lg">
                      Large Button (56px)
                    </Button>
                    <span className="text-xs text-neutral-400 font-mono">size=&quot;lg&quot;</span>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive States (Loading & Disabled) */}
              <Card variant="default" padding="lg">
                <CardHeader>
                  <CardTitle as="h3">States & Feedbacks</CardTitle>
                  <CardMeta>Loading & Disabled</CardMeta>
                </CardHeader>
                <CardDescription>
                  Spinner bawaan otomatis menyesuaikan ukuran tombol dan membatasi aksi klik.
                </CardDescription>
                <CardContent className="pt-4 flex flex-col items-start gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isButtonLoading}
                    onClick={() => setIsButtonLoading(true)}
                  >
                    {isButtonLoading ? "Menyimpan Data..." : "Klik untuk Loading"}
                  </Button>

                  <Button variant="secondary" size="md" isLoading>
                    Secondary Loading
                  </Button>

                  <Button variant="primary" size="md" disabled>
                    Primary Disabled
                  </Button>

                  <Button variant="outline" size="md" disabled className="!text-neutral-400 !border-neutral-300">
                    Outline Disabled
                  </Button>
                </CardContent>
              </Card>

              {/* Icons Support */}
              <Card variant="default" padding="lg">
                <CardHeader>
                  <CardTitle as="h3">With Icons</CardTitle>
                  <CardMeta>leftIcon & rightIcon</CardMeta>
                </CardHeader>
                <CardDescription>
                  Mendukung penyisipan ikon di sisi kiri dan kanan label tombol.
                </CardDescription>
                <CardContent className="pt-4 flex flex-col items-start gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    }
                  >
                    Tambah Raport
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    rightIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    }
                  >
                    Buka Detail
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    }
                  >
                    Unduh PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ==========================================================================
            2. ROLEBADGE / BADGE COMPONENT
            ========================================================================== */}
        {(activeTab === "all" || activeTab === "badge") && (
          <section id="badge" className="space-y-8 scroll-mt-24">
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  02
                </span>
                <div>
                  <h2 className="text-2xl font-bold font-headline text-neutral-800">
                    RoleBadge / Badge Component
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    @/components/ui/RoleBadge.tsx
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* All Variants */}
              <Card variant="default" padding="lg">
                <CardHeader bordered>
                  <CardTitle as="h3">Semua Varian Status & Role</CardTitle>
                  <CardMeta>5 Varian</CardMeta>
                </CardHeader>
                <CardDescription className="pt-3">
                  Badge status memadukan dot indikator dan tone warna semantik dari design system.
                </CardDescription>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-neutral-200/60">
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">Status: Terverifikasi</p>
                      <p className="text-[11px] text-neutral-500 font-mono">variant=&quot;verified&quot;</p>
                    </div>
                    <RoleBadge variant="verified">Terverifikasi</RoleBadge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-neutral-200/60">
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">Status: Draft Pengajuan</p>
                      <p className="text-[11px] text-neutral-500 font-mono">variant=&quot;draft&quot;</p>
                    </div>
                    <RoleBadge variant="draft">Draft Pengajuan</RoleBadge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-neutral-200/60">
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">Status: Terkunci</p>
                      <p className="text-[11px] text-neutral-500 font-mono">variant=&quot;locked&quot;</p>
                    </div>
                    <RoleBadge variant="locked">Terkunci</RoleBadge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-neutral-200/60">
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">Role: BPH Inti</p>
                      <p className="text-[11px] text-neutral-500 font-mono">variant=&quot;bph&quot;</p>
                    </div>
                    <RoleBadge variant="bph">BPH Inti</RoleBadge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-neutral-200/60">
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">Role: Staff / Departemen</p>
                      <p className="text-[11px] text-neutral-500 font-mono">variant=&quot;staff&quot;</p>
                    </div>
                    <RoleBadge variant="staff">Departemen Riset</RoleBadge>
                  </div>
                </CardContent>
              </Card>

              {/* Sizes & Dot Controls */}
              <Card variant="default" padding="lg">
                <CardHeader bordered>
                  <CardTitle as="h3">Ukuran & Opsi Dot</CardTitle>
                  <CardMeta>sm / md / lg</CardMeta>
                </CardHeader>
                <CardDescription className="pt-3">
                  Tersedia 3 skala ukuran proporsional serta fleksibilitas menampilkan atau menyembunyikan dot indicator.
                </CardDescription>
                <CardContent className="pt-4 space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-3">
                      Skala Ukuran:
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <RoleBadge variant="verified" size="sm">
                        Small (11px)
                      </RoleBadge>
                      <RoleBadge variant="verified" size="md">
                        Medium (12px)
                      </RoleBadge>
                      <RoleBadge variant="verified" size="lg">
                        Large (14px)
                      </RoleBadge>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-3">
                      Dengan & Tanpa Dot:
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <RoleBadge variant="draft" showDot={true}>
                        Dengan Dot
                      </RoleBadge>
                      <RoleBadge variant="draft" showDot={false}>
                        Tanpa Dot
                      </RoleBadge>
                      <RoleBadge variant="bph" showDot={true}>
                        BPH + Dot
                      </RoleBadge>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-3">
                      Auto-detection dari Teks Children:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <RoleBadge>Terverifikasi</RoleBadge>
                      <RoleBadge>Draft</RoleBadge>
                      <RoleBadge>BPH</RoleBadge>
                      <RoleBadge>Staff Pengurus</RoleBadge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ==========================================================================
            3. CARD COMPONENT
            ========================================================================== */}
        {(activeTab === "all" || activeTab === "card") && (
          <section id="card" className="space-y-8 scroll-mt-24">
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  03
                </span>
                <div>
                  <h2 className="text-2xl font-bold font-headline text-neutral-800">
                    Card Component System
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    @/components/ui/Card.tsx
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Variant: Default */}
              <Card variant="default" padding="md">
                <CardHeader>
                  <CardTitle as="h4">Default</CardTitle>
                  <CardMeta>variant=&quot;default&quot;</CardMeta>
                </CardHeader>
                <CardDescription>
                  Surface putih solid dengan border tipis dan bayangan lembut elevasi rendah.
                </CardDescription>
                <CardFooter bordered className="mt-4">
                  <span className="text-xs text-neutral-400 font-mono">Padding: md (24px)</span>
                </CardFooter>
              </Card>

              {/* Variant: Subtle */}
              <Card variant="subtle" padding="md">
                <CardHeader>
                  <CardTitle as="h4">Subtle</CardTitle>
                  <CardMeta>variant=&quot;subtle&quot;</CardMeta>
                </CardHeader>
                <CardDescription>
                  Background tinted surface-subtle, cocok untuk container sekunder atau filter panel.
                </CardDescription>
                <CardFooter bordered className="mt-4">
                  <span className="text-xs text-neutral-400 font-mono">Padding: md (24px)</span>
                </CardFooter>
              </Card>

              {/* Variant: Outline */}
              <Card variant="outline" padding="md">
                <CardHeader>
                  <CardTitle as="h4">Outline</CardTitle>
                  <CardMeta>variant=&quot;outline&quot;</CardMeta>
                </CardHeader>
                <CardDescription>
                  Border neutral-300 yang lebih tegas tanpa efek bayangan untuk tampilan flat.
                </CardDescription>
                <CardFooter bordered className="mt-4">
                  <span className="text-xs text-neutral-400 font-mono">Padding: md (24px)</span>
                </CardFooter>
              </Card>

              {/* Variant: Interactive */}
              <Card variant="interactive" padding="md">
                <CardHeader>
                  <CardTitle as="h4">Interactive</CardTitle>
                  <CardMeta>variant=&quot;interactive&quot;</CardMeta>
                </CardHeader>
                <CardDescription>
                  Hover lift animation (-translate-y-0.5) dengan border hover highlight dan kursor pointer.
                </CardDescription>
                <CardFooter bordered className="mt-4">
                  <span className="text-xs text-primary font-semibold">Coba Arahkan Kursor &rarr;</span>
                </CardFooter>
              </Card>
            </div>

            {/* Compound Card Composition Example */}
            <div className="pt-2">
              <div className="mb-4">
                <h3 className="text-lg font-headline font-semibold text-neutral-800">
                  Contoh Komposisi Lengkap: Card + Badge + Button
                </h3>
                <p className="text-xs text-neutral-500">
                  Menggabungkan CardHeader, CardTitle, CardDescription, CardMeta, CardContent, dan CardFooter.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="default" padding="lg" className="border-t-4 border-t-primary">
                  <CardHeader bordered>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <RoleBadge variant="verified">Terverifikasi</RoleBadge>
                        <CardMeta>PERIODE 2025/2026</CardMeta>
                      </div>
                      <CardTitle as="h3">Evaluasi Program Kerja Departemen Riset</CardTitle>
                    </div>
                  </CardHeader>

                  <CardDescription className="pt-3">
                    Penilaian capaian KPI dan akuntabilitas pelaksanaan workshop evaluasi triwulan II oleh tim penilai internal.
                  </CardDescription>

                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-subtle border border-neutral-200/60 text-xs">
                      <div>
                        <span className="text-neutral-400 block font-mono">Skor Akhir</span>
                        <span className="text-lg font-bold text-primary font-headline">92.4 / 100</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-mono">Penguji</span>
                        <span className="text-sm font-semibold text-neutral-700">BPH Inti</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter bordered>
                    <span className="text-xs text-neutral-500">Terakhir diedit: 20 Okt 2026</span>
                    <Button variant="primary" size="sm">
                      Lihat Detail Raport
                    </Button>
                  </CardFooter>
                </Card>

                <Card variant="default" padding="lg" className="border-t-4 border-t-status-warning">
                  <CardHeader bordered>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <RoleBadge variant="draft">Draft Pengajuan</RoleBadge>
                        <CardMeta>MENUNGGU REVIEW</CardMeta>
                      </div>
                      <CardTitle as="h3">Laporan Akuntabilitas Divisi Media Kreatif</CardTitle>
                    </div>
                  </CardHeader>

                  <CardDescription className="pt-3">
                    Dokumentasi metrik publikasi dan transparansi anggaran operasional media sosial periode berjalan.
                  </CardDescription>

                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-subtle border border-neutral-200/60 text-xs">
                      <div>
                        <span className="text-neutral-400 block font-mono">Kelengkapan Berkas</span>
                        <span className="text-lg font-bold text-status-warning-text font-headline">78% Selesai</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-mono">PIC Pelaksana</span>
                        <span className="text-sm font-semibold text-neutral-700">Staff Multimedia</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter bordered>
                    <span className="text-xs text-neutral-500">Batas akhir: 25 Okt 2026</span>
                    <Button variant="secondary" size="sm">
                      Edit Draft
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================================================
            4. NAVBAR COMPONENT
            ========================================================================== */}
        {(activeTab === "all" || activeTab === "navbar") && (
          <section id="navbar" className="space-y-8 scroll-mt-24">
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  04
                </span>
                <div>
                  <h2 className="text-2xl font-bold font-headline text-neutral-800">
                    Navbar Component
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    @/components/ui/Navbar.tsx
                  </p>
                </div>
              </div>
            </div>

            <Card variant="default" padding="none" className="overflow-hidden">
              <div className="p-6 bg-surface-subtle border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline font-semibold text-neutral-800 text-base">
                    Live Container Mockup
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Komponen Navbar responsif dengan logo EvalOrg, navigasi desktop, tombol Masuk/Login, dan drawer mobile menu.
                  </p>
                </div>
                <CardMeta>Fixed Header Component</CardMeta>
              </div>

              {/* Viewport frame mockup */}
              <div className="relative border-b border-neutral-200 bg-neutral-100 min-h-[140px] flex items-center justify-center p-4">
                <div className="w-full bg-surface rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
                  {/* Navbar disisipkan secara statis di dalam mockup */}
                  <div className="scale-95 origin-top">
                    <Navbar className="!static !shadow-none !border-0" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface text-xs text-neutral-500 flex items-center justify-between">
                <span>Viewport: Responsive (Desktop & Mobile Burger Menu)</span>
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Preview Halaman Login &rarr;
                </Link>
              </div>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
