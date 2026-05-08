"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type GuestNote = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export default function MisafirDefteriPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<GuestNote[]>([]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("guest_notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Notlar alınamadı:", error.message);
      return;
    }

    setNotes(data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async () => {
    if (!message.trim()) return;

    const { error } = await supabase.from("guest_notes").insert([
      {
        name: name.trim() || "anonim",
        message: message.trim(),
      },
    ]);

    if (error) {
      console.error("Not kaydedilemedi:", error.message);
      return;
    }

    await fetchNotes();

    setName("");
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#fbf9ff] px-6 py-14 text-gray-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a8a1dc]">
            misafir defteri
          </p>

          <h1 className="font-serif text-5xl text-gray-700">
            içinden geçenleri bırak ♡
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
            Buraya küçük bir not, güzel bir düşünce ya da sadece içinden geçen
            bir cümle bırakabilirsin.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-2xl rounded-[32px] border border-[#eee7fb] bg-white/80 p-6 shadow-[0_15px_45px_rgba(180,160,230,0.14)] backdrop-blur-xl">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ismin veya anonim..."
            className="mb-4 w-full rounded-2xl border border-[#eee7fb] bg-[#faf8ff] px-5 py-3 text-sm outline-none focus:border-[#c8bfff]"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="bugün içinden ne geçiyor?"
            className="min-h-[150px] w-full resize-none rounded-2xl border border-[#eee7fb] bg-[#faf8ff] px-5 py-4 text-sm leading-7 outline-none focus:border-[#c8bfff]"
          />

          <button
            type="button"
            onClick={saveNote}
            className="mt-5 rounded-full bg-gradient-to-r from-[#a8a1dc] to-[#c8bfff] px-7 py-3 text-sm text-white shadow-[0_10px_25px_rgba(168,161,220,0.35)] transition hover:-translate-y-1"
          >
            notu bırak →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="rounded-[28px] border border-[#eee7fb] bg-white/80 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(180,160,230,0.16)]"
              >
                <p className="text-sm leading-7 text-gray-600">
                  “{note.message}”
                </p>

                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="text-[#9b94d9]">— {note.name}</span>

                  <span className="text-gray-400">
                    {note.created_at
                      ? new Date(note.created_at).toLocaleDateString("tr-TR")
                      : ""}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-[28px] border border-[#eee7fb] bg-white/70 p-10 text-center text-gray-400">
              Henüz not bırakılmamış. İlk notu sen bırak ♡
            </div>
          )}
        </div>
      </div>
    </main>
  );
}