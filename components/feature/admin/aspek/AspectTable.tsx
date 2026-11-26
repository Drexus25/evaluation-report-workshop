"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Aspect } from "@/types";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";

interface AspectTableProps {
  aspects: Aspect[];
  isLoading: boolean;
  onEdit: (aspect: Aspect) => void;
  onDelete: (aspect: Aspect) => void;
}

export default function AspectTable({
  aspects,
  isLoading,
  onEdit,
  onDelete,
}: AspectTableProps) {
  return (
    <Card
      variant="default"
      padding="none"
      className="border-neutral-200 overflow-hidden"
    >
      <CardHeader bordered className="px-6 py-4 bg-surface">
        <div>
          <CardTitle className="text-base sm:text-lg">
            Daftar Aspek Penilaian Aktif
          </CardTitle>
          <p className="text-xs text-neutral-500 mt-0.5">
            Rubrik evaluasi yang digunakan pada formulir penilaian fungsionaris
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-0 divide-y divide-neutral-200">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-xs text-neutral-500 font-medium">
              Mengambil data aspek penilaian...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-600 uppercase font-semibold border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3.5">Nama Aspek &amp; Keterangan</th>
                  <th className="px-6 py-3.5">Role Berlaku</th>
                  <th className="px-6 py-3.5">ID Referensi</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {aspects.map((aspect) => (
                  <tr
                    key={aspect.id}
                    className="hover:bg-neutral-50/70 transition-colors duration-150 ease-out"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900 text-sm">
                        {aspect.name}
                      </div>
                      {aspect.description ? (
                        <div className="text-neutral-600 text-xs mt-0.5 max-w-md">
                          {aspect.description}
                        </div>
                      ) : (
                        <div className="text-neutral-500 text-xs italic mt-0.5">
                          Tidak ada deskripsi tambahan
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <RoleBadge
                        variant={aspect.role_type === "bph" ? "bph" : "staff"}
                        size="sm"
                      >
                        {aspect.role_type === "bph"
                          ? "Khusus BPH"
                          : "Khusus Staff"}
                      </RoleBadge>
                    </td>

                    <td className="px-6 py-4 font-mono text-[11px] text-neutral-500 tabular-nums">
                      {aspect.id.slice(0, 12)}...
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(aspect)}
                          className="rounded-full text-xs"
                        >
                          Ubah
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(aspect)}
                          className="rounded-full text-xs border-status-destructive/30 text-status-destructive-text hover:bg-status-destructive-bg/20"
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {aspects.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-neutral-500 text-sm italic"
                    >
                      Tidak ada aspek penilaian pada filter ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
