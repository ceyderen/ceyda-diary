"use client";

import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("Spotify bağlantı hatası:", error);
      window.location.href = "/muzikler?spotify=error";
      return;
    }

    if (code) {
      localStorage.setItem("spotify_code", code);
      window.location.href = "/muzikler?spotify=success";
      return;
    }

    window.location.href = "/muzikler";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f4ef]">
      <div className="rounded-[28px] bg-white/80 px-8 py-6 shadow-sm border border-[#eee7ff] text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-[#a79bdc]">
          spotify
        </p>
        <h1 className="mt-2 font-serif text-2xl text-[#182640]">
          Spotify bağlanıyor...
        </h1>
        <p className="mt-2 text-sm text-[#8b95b0]">
          Birkaç saniye içinde müzikler sayfasına dönüyorsun.
        </p>
      </div>
    </main>
  );
}