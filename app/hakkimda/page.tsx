import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Heart,
  MapPin,
  PenLine,
  Music,
  Cat,
  Coffee,
  BookOpen,
  Moon,
  Camera,
} from "lucide-react";

export default function HakkimdaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf9ff] text-[#35415c]">
        {/* blur background */}
<div className="absolute top-0 left-[-200px] h-[500px] w-[500px] rounded-full bg-[#e9d8ff] opacity-30 blur-3xl" />

<div className="absolute right-[-150px] top-[300px] h-[450px] w-[450px] rounded-full bg-[#f3dfff] opacity-30 blur-3xl" />
      <section className="mx-auto max-w-[1500px] px-8 py-10">
        <div className="relative rounded-[36px] bg-white/60 backdrop-blur-xl p-14 shadow-[0_20px_80px_rgba(165,145,205,0.18)] border border-[#eee7fb]">

          {/* ÜST HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_.55fr] items-center gap-10 mb-12">
            <div>
              <p className="uppercase tracking-[0.25em] text-sm font-semibold text-[#a78bfa] mb-5">
                hakkımda ♡
              </p>

              <h1 className="font-serif text-5xl md:text-7xl text-[#33405d] mb-7 leading-tight">
                merhaba, ben ceyda ♡
              </h1>

              <p className="text-[#72809b] leading-8 max-w-xl text-lg">
                21 yaşındayım, hayalleri olan, küçük şeylerden mutluluk çıkaran
                sakin bir ruhum. Yazmayı, müzik dinlemeyi ve kendimi anlatmayı
                çok seviyorum.
              </p>

              <p className="text-[#72809b] leading-8 max-w-xl text-lg mt-5">
                Burası benim dünyam, hoş geldin! ♡
              </p>

              <p className="mt-8 font-serif italic text-3xl text-[#8b9ab8]">
                ceyda ♡
              </p>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-6 rounded-[40px] bg-[#d8c4ff]/35 blur-2xl" />
                <div className="relative h-[360px] w-[360px] overflow-hidden rounded-[42px] shadow-xl transition duration-500 hover:-translate-y-2 hover:scale-[1.02]">                <Image
                  src="/about-main.jpg"
                  alt="Ceyda"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -left-6 bottom-4 text-6xl opacity-70">
                🪻
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="rotate-3 rounded-3xl bg-[#eee7ff] px-10 py-12 shadow-lg border border-white text-center">
                <p className="font-serif italic text-2xl leading-relaxed text-[#55617c]">
                  “en güzel
                  <br />
                  sohbetler,
                  <br />
                  içten bir merhaba
                  <br />
                  ile başlar.”
                </p>
                <p className="mt-5 text-2xl text-[#a78bfa]">♡</p>
              </div>
            </div>
          </div>

          {/* ORTA KARTLAR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Biraz ben */}
            <div className="rounded-[28px] bg-white/85 border border-[#eee7fb] p-9 shadow-sm transition duration-300 hover:shadow-[0_10px_40px_rgba(180,160,220,0.18)] hover:-translate-y-1">
              <h2 className="font-serif text-2xl mb-7">
                biraz ben <span className="text-[#a78bfa]">♡</span>
              </h2>

              <div className="space-y-5 text-[#6f7b98]">
                <Info icon={<Heart />} text="21 yaşındayım" />
                <Info icon={<MapPin />} text="İstanbul, Türkiye" />
                <Info icon={<PenLine />} text="Yazmayı çok seviyorum" />
                <Info icon={<Music />} text="Müzik ruhumun ilacı" />
                <Info icon={<Cat />} text="Kedilere aşığım" />
                <Info icon={<Coffee />} text="Kahve olmadan yapamam" />
              </div>

              <div className="mt-8 text-6xl opacity-70 text-right">🪻</div>
            </div>

            {/* Burada neler var */}
            <div className="rounded-[28px] bg-white/85 border border-[#eee7fb] p-9 shadow-sm transition duration-300 hover:shadow-[0_10px_40px_rgba(180,160,220,0.18)] hover:-translate-y-1">
              <h2 className="font-serif text-2xl mb-7">
                burada neler var? <span className="text-[#a78bfa]">♡</span>
              </h2>

              <div className="space-y-7">
                <MiniLink
                  href="/yazilarim"
                  icon={<BookOpen />}
                  title="yazılarım"
                  desc="içimden geçenleri paylaştığım yazılar"
                />
                <MiniLink
                  href="/gunlugum"
                  icon={<Moon />}
                  title="günlüğüm"
                  desc="günlük düşüncelerim ve anılarım"
                />
                <MiniLink
                  href="/foto-kosesi"
                  icon={<Camera />}
                  title="foto köşesi"
                  desc="objektifimden küçük kareler"
                />
                <MiniLink
                  href="/muzikler"
                  icon={<Music />}
                  title="müzikler"
                  desc="ruh halime eşlik eden şarkılar"
                />
              </div>
            </div>

            {/* Fotoğraf widget */}
            <div className="rounded-[28px] bg-white/85 border border-[#eee7fb] p-9 shadow-sm transition duration-300 hover:shadow-[0_10px_40px_rgba(180,160,220,0.18)] hover:-translate-y-1">
              <h2 className="font-serif text-2xl mb-7">
                anılarım <span className="text-[#a78bfa]">♡</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {["memory1.jpg", "memory2.jpg", "memory3.jpg", "memory4.jpg"].map(
                  (img) => (
                    <div
                      key={img}
                      className="group relative h-32 overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={`/${img}`}
                        alt="Anı fotoğrafı"
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                  )
                )}
              </div>

              <Link
                href="/foto-kosesi"
                className="mt-6 block text-sm text-[#a78bfa] hover:underline"
              >
                daha fazlası için foto köşesi’ne göz at ♡
              </Link>
            </div>
          </div>

          {/* ALT SÖZ */}
          <div className="mt-8 rounded-[28px] bg-[#f1eaff] px-10 py-8 text-center border border-[#eee7fb]">
            <p className="font-serif text-2xl text-[#65708c]">
              “hayat, kendini bulmakla değil, kendini yaratmakla ilgilidir.”
            </p>
            <p className="mt-3 text-2xl text-[#a78bfa]">♡</p>
          </div>
        </div>
      </section>
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
  <div className="relative">
    <div className="absolute inset-0 bg-[#d8c4ff] blur-2xl opacity-40 rounded-full" />

    <Image
      src="/avatar.png"
      alt="avatar"
      width={120}
      height={120}
      className="relative object-contain hover:scale-105 transition duration-300"
    />
  </div>
</div>
<div className="fixed bottom-6 right-6 z-50 hidden md:block">
  <div className="relative">
    <div className="absolute inset-0 bg-[#d8c4ff] blur-2xl opacity-40 rounded-full" />

    <Image
      src="/avatar.png"
      alt="avatar"
      width={120}
      height={120}
      className="relative object-contain hover:scale-105 transition duration-300"
    />
  </div>
</div>
    </main>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[#a78bfa] [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function MiniLink({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link href={href} className="flex gap-4 group">
      <span className="mt-1 text-[#a78bfa] [&_svg]:h-6 [&_svg]:w-6">
        {icon}
      </span>
      <span>
        <strong className="block text-[#3d4864] group-hover:text-[#a78bfa]">
          {title}
        </strong>
        <span className="text-[#7b86a0] text-sm">{desc}</span>
      </span>
    </Link>
  );
}