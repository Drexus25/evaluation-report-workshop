"use client";

import React, { useState, useMemo } from "react";
import { Loader2, Search } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import { cn } from "@/libs/cn";
import { User, ReportListItem } from "@/types";

interface UsersListTableProps {
  users: User[];
  reports: ReportListItem[];
  isLoading: boolean;
  onOpenDetail: (user: User) => void;
  onOpenEdit: (user: User) => void;
}

type RoleFilterKey = "all" | "bph" | "staff" | "admin";

export default function UsersListTable({
  users,
  reports,
  isLoading,
  onOpenDetail,
  onOpenEdit,
}: UsersListTableProps) {
  const [filterRole, setFilterRole] = useState<RoleFilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const reportByUserId = useMemo(() => {
    const map = new Map<string, ReportListItem>();
    reports.forEach((report) => {
      const uid = report.user_id || report.user?.id;
      if (uid) map.set(uid, report);
    });
    return map;
  }, [reports]);

  const hasAdminUsers = useMemo(
    () => users.some((u) => u.role === "admin"),
    [users]
  );

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return users.filter((item) => {
      const matchesRole = filterRole === "all" ? true : item.role === filterRole;
      if (!matchesRole) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        (item.position || "").toLowerCase().includes(query) ||
        (item.ministry || "").toLowerCase().includes(query) ||
        (item.nim || "").toLowerCase().includes(query)
      );
    });
  }, [users, filterRole, searchQuery]);

  const roleTabs = useMemo(() => {
    const base: Array<{ key: RoleFilterKey; label: string; count: number }> = [
      { key: "all", label: "Semua", count: users.length },
      {
        key: "bph",
        label: "BPH",
        count: users.filter((u) => u.role === "bph").length,
      },
      {
        key: "staff",
        label: "Staff",
        count: users.filter((u) => u.role === "staff").length,
      },
    ];
    if (hasAdminUsers) {
      base.push({
        key: "admin",
        label: "Admin",
        count: users.filter((u) => u.role === "admin").length,
      });
    }
    return base;
  }, [users, hasAdminUsers]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-neutral-200 w-fit flex-wrap">
          {roleTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterRole(tab.key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ease-out cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                filterRole === tab.key
                  ? "bg-primary text-surface font-bold shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <label htmlFor="users-search" className="sr-only">
            Cari nama, email, NIM, atau kementerian fungsionaris
          </label>
          <input
            id="users-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, atau NIM..."
            className="w-full bg-surface border border-neutral-200 rounded-xl py-2 px-3 pl-8 text-xs text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary"
          />
          <Search
            className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <Card
        variant="default"
        padding="none"
        className="border-neutral-200 overflow-hidden"
      >
        <CardHeader bordered className="px-6 py-4 bg-surface">
          <div>
            <CardTitle className="text-base sm:text-lg">
              Daftar Akun Fungsionaris
            </CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Klik Lihat Detail untuk memuat profil lengkap fungsionaris langsung dari server
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-0 divide-y divide-neutral-200">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <p className="text-xs text-neutral-500 font-medium">
                Mengambil daftar fungsionaris dari API...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-600 uppercase font-semibold border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3.5">Fungsionaris</th>
                    <th className="px-6 py-3.5">Peran</th>
                    <th className="px-6 py-3.5">Jabatan &amp; Kementerian</th>
                    <th className="px-6 py-3.5">Status Raport</th>
                    <th className="px-6 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredUsers.map((user) => {
                    const userReport = reportByUserId.get(user.id);
                    const roleVariant =
                      user.role === "admin"
                        ? "admin"
                        : user.role === "bph"
                        ? "bph"
                        : "staff";
                    const roleLabel =
                      user.role === "admin"
                        ? "Admin"
                        : user.role === "bph"
                        ? "BPH"
                        : "Staff";

                    const orgDetails = [
                      user.position,
                      user.ministry,
                      user.department,
                    ]
                      .filter(Boolean)
                      .join(" • ");

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-neutral-50/70 transition-colors duration-150 ease-out"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-neutral-900 text-sm">
                            {user.name}
                          </div>
                          <div className="text-neutral-600 text-xs">
                            {user.email}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <RoleBadge variant={roleVariant} size="sm">
                            {roleLabel}
                          </RoleBadge>
                        </td>

                        <td className="px-6 py-4 text-neutral-700">
                          {orgDetails || (
                            <span className="text-neutral-400 italic">-</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {user.role === "admin" ? (
                            <RoleBadge variant="neutral" size="sm">
                              Administrator
                            </RoleBadge>
                          ) : userReport ? (
                            <RoleBadge variant="verified" size="sm">
                              Sudah Ada Raport
                            </RoleBadge>
                          ) : (
                            <RoleBadge variant="draft" size="sm">
                              Belum Dinilai
                            </RoleBadge>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => onOpenDetail(user)}
                              className="text-xs"
                            >
                              Lihat Detail
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onOpenEdit(user)}
                              className="text-xs"
                            >
                              Ubah
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-neutral-500 text-sm italic"
                      >
                        Tidak ada fungsionaris yang sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
