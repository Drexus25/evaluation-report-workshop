"use client";

import Link from "next/link";
import { useState } from "react";
import { getAspects, saveAspect, deleteAspect, type Aspect } from "@/libs/store";
import { Icon } from "@iconify/react";

export default function AspekPage() {
  const [aspects, setAspects] = useState<Aspect[]>(() => [...getAspects()].reverse());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const load = () => setAspects([...getAspects()].reverse());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess(false);
    if (!name.trim()) { setError("Aspect name is required."); return; }
    saveAspect({ name: name.trim(), description: description.trim() });
    setName(""); setDescription("");
    setSuccess(true);
    load();
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this aspect? Reports using it will retain the data.")) return;
    deleteAspect(id);
    load();
  };

  return (
    <div className="w-full min-h-screen px-6 py-36 max-w-3xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#053322]/50 mb-1 font-medium">
          <Link href="/admin" className="hover:text-[#10704b] transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Aspects</span>
        </div>
        <h1 className="text-4xl font-extrabold text-[#10704b]">Manage Aspects</h1>
        <p className="text-[#053322]/60 mt-1 text-sm font-medium">
          Define the evaluation aspects that can be assigned to reports.
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden mb-6">
        <div className="bg-[#10704b] px-6 py-3">
          <h2 className="text-[#FFEFB3] font-bold text-sm uppercase tracking-widest">Add New Aspect</h2>
        </div>
        <form onSubmit={handleAdd} className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-[#053322]">Aspect Name</label>
            <input
              type="text"
              placeholder="e.g. Content & Substance"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 border-[#10704b]/30 focus:border-[#10704b] focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-[#053322]">
              Description <span className="font-normal text-[#053322]/50">(optional)</span>
            </label>
            <textarea
              placeholder="Brief description of what this aspect evaluates…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 border-[#10704b]/30 focus:border-[#10704b] focus:outline-none transition-all resize-none"
            />
          </div>

          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-100 border border-red-300 text-red-700 text-sm font-medium flex items-center gap-2">
              <span>⚠️</span><span>{error}</span>
            </div>
          )}
          {success && (
            <div className="px-4 py-2.5 rounded-xl bg-green-100 border border-green-300 text-green-700 text-sm font-medium flex items-center gap-2">
              <span>✅</span><span>Aspect added successfully.</span>
            </div>
          )}

          <button
            type="submit"
            className="self-end flex items-center gap-2 bg-[#10704b] text-[#FFEFB3] border-2 border-[#053322] px-7 py-2.5 rounded-full font-semibold text-sm hover:bg-[#0d5c3d] transition-all"
          >
            <Icon icon="ri:add-line" width={18} /> Add Aspect
          </button>
        </form>
      </div>

      {/* Aspect List */}
      <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden">
        <div className="bg-[#10704b] px-6 py-3 flex items-center justify-between">
          <h2 className="text-[#FFEFB3] font-bold text-sm uppercase tracking-widest">Existing Aspects</h2>
          <span className="text-[#FFEFB3]/70 text-xs font-semibold">{aspects.length} total</span>
        </div>

        {aspects.length === 0 ? (
          <div className="px-6 py-12 text-center text-[#053322]/50 text-sm font-medium">
            No aspects yet. Add one above to get started.
          </div>
        ) : (
          <div className="divide-y divide-[#10704b]/10">
            {aspects.map((a) => (
              <div key={a.id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[#053322] text-sm">{a.name}</p>
                  {a.description && (
                    <p className="text-xs text-[#053322]/60 mt-0.5 leading-relaxed">{a.description}</p>
                  )}
                  <p className="text-xs text-[#053322]/40 mt-1">
                    Added {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-400 hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  title="Delete aspect"
                >
                  <Icon icon="ri:delete-bin-line" width={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
