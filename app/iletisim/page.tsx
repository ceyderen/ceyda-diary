"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaPinterestP,
  FaSpotify,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import {
  Mail,
  User,
  MessageCircle,
  Pencil,
  MapPin,
  Clock3,
} from "lucide-react";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("https://formspree.io/f/xzdovzbz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setSent(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => setSent(false), 3000);
  }
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcf9ff] px-6 py-10 md:px-10">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#eadcff]/50 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#f7e8ff]/50 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#efe4ff]/40 blur-3xl" />
      <section className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-[36px] border border-[#eee7f8] bg-white/70 shadow-[0_10px_40px_rgba(215,195,245,0.15)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(215,195,245,0.22)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.4fr_1fr]">
        <div className="relative flex flex-col justify-between border-b border-[#f1ebfa] p-10 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3eaff] text-[#b59ce6]">
              <Mail size={24} />
            </div>

            <h1 className="font-serif text-5xl italic leading-tight text-[#4d5c7a]">
              iletişime geçelim ♡
            </h1>

            <p className="mt-8 max-w-[260px] leading-9 text-[#7582a0]">
              bir fikrin, sorun ya da sadece merhaba demek mi istiyorsun?
              benimle dilediğin zaman iletişime geçebilirsin.
            </p>

            <div className="mt-14 h-[1px] w-16 bg-[#e7ddf6]" />

            <p className="mt-12 max-w-[260px] font-serif text-3xl italic leading-relaxed text-[#b59ce6]">
              “en güzel sohbetler,
              <br />
              içten bir merhaba ile başlar.”
            </p>
          </div>

          <div className="mt-10 text-3xl text-[#c8b4ef]">♡</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-b border-[#f1ebfa] p-8 lg:border-b-0 lg:border-r lg:p-10"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#ece6f6] bg-white transition duration-300 focus-within:border-[#cdb7f7] focus-within:shadow-[0_0_20px_rgba(181,156,230,0.18)] px-5 py-5">
              <User className="text-[#97a1bb]" size={20} />
              <input
                required
                type="text"
                placeholder="adın"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent text-[#6d7894] outline-none placeholder:text-[#9aa3bb]"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#ece6f6] bg-white transition duration-300 focus-within:border-[#cdb7f7] focus-within:shadow-[0_0_20px_rgba(181,156,230,0.18)] px-5 py-5">
              <Mail className="text-[#97a1bb]" size={20} />
              <input
                required
                type="email"
                placeholder="e-posta adresin"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent text-[#6d7894] outline-none placeholder:text-[#9aa3bb]"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#ece6f6] bg-white transition duration-300 focus-within:border-[#cdb7f7] focus-within:shadow-[0_0_20px_rgba(181,156,230,0.18)] px-5 py-5">
            <Pencil className="text-[#97a1bb]" size={20} />
            <input
              required
              type="text"
              placeholder="konu"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full bg-transparent text-[#6d7894] outline-none placeholder:text-[#9aa3bb]"
            />
          </div>

          <div className="mt-5 rounded-3xl border border-[#ece6f6] bg-white transition duration-300 focus-within:border-[#cdb7f7] focus-within:shadow-[0_0_20px_rgba(181,156,230,0.18)] p-5">
            <div className="mb-4 flex items-center gap-3 text-[#97a1bb]">
              <MessageCircle size={20} />
              <span>mesajını buraya yaz...</span>
            </div>

            <textarea
              required
              rows={8}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full resize-none bg-transparent text-[#6d7894] outline-none"
            />
          </div>

          <div className="mt-7 flex justify-center">
            <button
            type="submit"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#bfa6f7] to-[#a88df1] px-10 py-4 text-lg font-medium text-white shadow-lg shadow-[#c7b2f5]/40 transition duration-300 hover:scale-105"
          >
            <span className="relative z-10">
              mesaj gönder ✧
            </span>

            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-1000 group-hover:translate-x-full" />
          </button>
          </div>

          <p className="mt-5 text-center text-[#97a1bb]">
            mesajına en kısa sürede dönüş yapacağım, söz! ♡
          </p>
        </form>

        <div className="relative min-h-[500px] overflow-hidden">
        <img
          src="/contactgirl.png"
          alt="contact"
          className="h-full w-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9ff]/50 via-transparent to-transparent" />

        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#e9dcff]/40 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[#f5dfff]/40 blur-3xl" />
      </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl grid-cols-1 overflow-hidden rounded-[36px] border border-[#eee7f8] bg-white/70 shadow-[0_10px_40px_rgba(215,195,245,0.15)] backdrop-blur-xl md:grid-cols-2 xl:grid-cols-4 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(215,195,245,0.22)]">
        <div className="border-b border-[#f1ebfa] p-10 md:border-r xl:border-b-0">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eaff] text-[#b59ce6]">
            <Mail size={28} />
          </div>

          <h3 className="text-2xl font-semibold text-[#4d5c7a]">e-posta</h3>
          <p className="mt-3 text-[#97a1bb]">ceyderen011@gmail.com</p>
          <p className="mt-5 leading-8 text-[#7582a0]">
            benimle e-posta üzerinden iletişime geçebilirsin.
          </p>
        </div>

        <div className="border-b border-[#f1ebfa] p-10 md:border-r xl:border-b-0">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eaff] text-[#b59ce6]">
            <MapPin size={28} />
          </div>

          <h3 className="text-2xl font-semibold text-[#4d5c7a]">konum</h3>
          <p className="mt-3 text-[#97a1bb]">İstanbul, Türkiye</p>
          <p className="mt-5 leading-8 text-[#7582a0]">
            şu an için buradayım ama hayallerim her yerde. ♡
          </p>
        </div>

        <div className="border-b border-[#f1ebfa] p-10 xl:border-b-0 xl:border-r">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eaff] text-[#b59ce6]">
            <Clock3 size={28} />
          </div>

          <h3 className="text-2xl font-semibold text-[#4d5c7a]">
            yanıt süresi
          </h3>
          <p className="mt-3 text-[#97a1bb]">24-48 saat</p>
          <p className="mt-5 leading-8 text-[#7582a0]">
            tüm mesajlara özenle dönüş yapıyorum.
          </p>
        </div>

        <div className="relative p-10">
          <h3 className="text-2xl font-semibold text-[#4d5c7a]">
            sosyal medya
          </h3>

          <p className="mt-4 leading-8 text-[#7582a0]">
            günlük paylaşımlar için beni takip et! ♡
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://instagram.com/ceyderen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c6f4] bg-white/80 text-[#b59ce6] transition hover:-translate-y-1 hover:scale-110 hover:text-pink-400"
            >
              <FaInstagram size={23} />
            </a>

            <a
              href="https://pinterest.com/evbodygetshigh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c6f4] bg-white/80 text-[#b59ce6] transition hover:-translate-y-1 hover:scale-110 hover:text-red-400"
            >
              <FaPinterestP size={22} />
            </a>

            <a
              href="https://open.spotify.com/user/7j4l14b93brmpzcq71jje4cmn?si=05aa7909b11a409e"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c6f4] bg-white/80 text-[#b59ce6] transition hover:-translate-y-1 hover:scale-110 hover:text-green-400"
            >
              <FaSpotify size={23} />
            </a>

            <a
              href="https://www.youtube.com/@ceyderenn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c6f4] bg-white/80 text-[#b59ce6] transition hover:-translate-y-1 hover:scale-110 hover:text-red-500"
            >
              <FaYoutube size={24} />
            </a>

            <a
              href="https://tiktok.com/@ceyddie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c6f4] bg-white/80 text-[#b59ce6] transition hover:-translate-y-1 hover:scale-110 hover:text-pink-400"
            >
              <FaTiktok size={22} />
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-8 flex max-w-7xl items-center justify-center rounded-[30px] bg-gradient-to-r from-[#efe2ff] to-[#f7efff] px-8 py-8 text-center text-[#97a1bb]">
        © 2026 ceyda’s diary. tüm hakları saklıdır. ♡
      </footer>

      {sent && (
  <div className="fixed bottom-8 right-8 z-50 rounded-[28px] border border-[#eadfff] bg-white/90 px-7 py-5 text-[#6f7896] shadow-[0_18px_45px_rgba(181,156,230,0.28)] backdrop-blur-md animate-bounce">
    <p className="font-serif text-xl italic text-[#b59ce6]">
      mesajın gönderildi ♡
    </p>
    <p className="mt-1 text-sm text-[#9aa3bb]">
      en kısa zamanda dönüş yapacağım 💌
    </p>
  </div>
)}
    </main>
  );
}