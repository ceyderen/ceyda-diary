"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const StarDecor = () => (
  <>
    <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#c8b6ff]/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-12 bottom-0 h-28 w-28 rounded-full bg-[#f0d9ff]/30 blur-3xl" />

    <span className="pointer-events-none absolute left-8 top-8 text-lg text-[#b7a9ee]/70">
      ✧
    </span>
    <span className="pointer-events-none absolute right-10 top-12 text-sm text-[#d8c9ff]/80">
      ✦
    </span>
    <span className="pointer-events-none absolute left-14 bottom-10 text-xs text-[#c9b8ff]/70">
      ✧
    </span>
  </>
);

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  const getReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Ana sayfa yazıları alınamadı:", error.message);
        return;
      }

      setPosts(data || []);
    };

    fetchPosts();
  }, []);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const [message, setMessage] = useState("");
  const [isHolding, setIsHolding] = useState(false);

  const [selectedPost, setSelectedPost] = useState<null | {
    id: number;
    title: string;
    content: string;
  }>(null);

  useEffect(() => {
    setPos({
      x: window.innerWidth - 140,
      y: window.innerHeight - 165,
    });
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      setPos({
        x: e.clientX - 55,
        y: e.clientY - 70,
      });
    };

    const handleUp = () => {
      isDragging.current = false;
      setIsHolding(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fbf9ff] p-3 transition duration-500 dark:bg-[#0f1117] md:p-6">
      {/* dreamy glow */}
      <div className="pointer-events-none absolute left-[-220px] top-0 h-[520px] w-[520px] rounded-full bg-[#eadcff] opacity-35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] top-[260px] h-[480px] w-[480px] rounded-full bg-[#f3dfff] opacity-35 blur-3xl" />
      <div className="pointer-events-none absolute left-[35%] top-[120px] h-[300px] w-[300px] rounded-full bg-[#d9ccff] opacity-20 blur-3xl" />

      <div className="mx-auto min-h-[calc(100vh-48px)] w-full max-w-[1500px] overflow-hidden rounded-3xl border border-[#eee7fb] bg-white/65 text-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl transition duration-500 dark:border-white/10 dark:bg-[#1f2937]/85 dark:text-gray-100">
        <div className="grid grid-cols-1 gap-6 p-4 md:p-6 xl:p-8 2xl:grid-cols-12">
          {/* SOL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 xl:col-span-3"
          >
            {/* PROFIL KARTI */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <StarDecor />

              <div className="pointer-events-none absolute left-1/2 top-[65px] h-[54px] w-[185px] -translate-x-1/2 rotate-[-10deg] rounded-[50%] border border-[#b7a9ee]/35" />
              <div className="pointer-events-none absolute left-1/2 top-[68px] h-[54px] w-[155px] -translate-x-1/2 rotate-[8deg] rounded-[50%] border border-[#f1dcff]/40" />

              <div className="relative z-10">
                <img
                  src="/ceyda.jpg"
                  alt="ceyda"
                  className="mx-auto mb-4 h-24 w-24 rounded-full border border-white/80 object-cover shadow-[0_0_30px_rgba(180,160,230,0.28)]"
                />

                <h2 className="font-serif text-2xl font-normal italic tracking-wide text-gray-600 md:text-3xl">
                  ceyda <span className="text-[#a8a1dc]">♡</span>
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  yazıyorum, yaşıyorum, öğreniyorum.
                  <br />
                  burası benim küçük dünyam.
                </p>

                <Link
                  href="/hakkimda"
                  className="mt-4 inline-block text-xs text-[#9b94d9] transition hover:translate-x-1"
                >
                  devamını oku →
                </Link>
              </div>
            </div>

            {/* MÜZİK KARTI */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <StarDecor />

              <div className="relative z-10">
                <p className="mb-4 text-sm text-gray-500">
                  🎧 şu sıralar dinlediğim
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src="/music.jpg"
                    alt="music cover"
                    className="h-16 w-16 rounded-xl object-cover shadow-[0_0_24px_rgba(168,161,220,0.22)]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Where&apos;s My Phone?
                    </p>
                    <p className="mt-1 text-xs text-gray-400">Mitski</p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="h-1 rounded-full bg-gray-200">
                    <div className="h-1 w-1/2 rounded-full bg-[#a8a1dc]" />
                  </div>

                  <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                    <span>1:47</span>
                    <span>4:21</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-gray-500">
                  <button className="transition hover:text-[#b7b0e8]">⤨</button>
                  <button className="transition hover:text-[#b7b0e8]">⏮</button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a8a1dc] text-white shadow-md transition hover:scale-105">
                    ▶
                  </button>

                  <button className="transition hover:text-[#b7b0e8]">⏭</button>
                  <button className="transition hover:text-[#b7b0e8]">♡</button>
                </div>
              </div>
            </div>

            {/* KISAYOLLAR */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <span className="pointer-events-none absolute right-8 top-6 text-[#c9b8ff]/70">
                ✧
              </span>

              <div className="relative z-10">
                <p className="mb-4 font-medium text-gray-700 dark:text-gray-100">
                  kısayollar
                </p>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  {[
                    ["♧", "yazılarım", "/yazilarim"],
                    ["▣", "günlüğüm", "/yeni-yazi"],
                    ["♫", "müzikler", "/muzikler"],
                    ["▧", "anı defteri", "/foto-kosesi"],
                    ["✎", "misafir defteri", "/misafir-defteri"],
                    ["♙", "hakkımda", "/hakkimda"],
                    ["✉", "iletişim", "/iletisim"],
                  ].map(([icon, title, href]) => (
                    <Link
                      key={title}
                      href={href}
                      className="group flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-[#f7f4ff] hover:text-[#9b94d9] dark:hover:bg-white/10"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-5 text-center text-[#a8a1dc]">
                          {icon}
                        </span>
                        <span>{title}</span>
                      </span>

                      <span className="transition group-hover:translate-x-1">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ORTA */}
          <div className="space-y-6 xl:col-span-6">
            {/* HERO */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-[220px] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] md:h-[260px]"
            >
              <img
                src="/hero.jpg"
                alt="hero"
                className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px]"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/20 to-[#eadcff]/30 backdrop-blur-[2px]" />

              <span className="pointer-events-none absolute left-8 top-8 z-10 text-xl text-white/80">
                ✧
              </span>
              <span className="pointer-events-none absolute bottom-8 right-10 z-10 text-sm text-white/70">
                ✦
              </span>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative max-w-[88%] overflow-hidden rounded-3xl bg-white/90 px-6 py-5 text-center shadow-xl backdrop-blur-md transition duration-300 hover:scale-105 dark:bg-[#232738]/90 md:max-w-sm md:px-10 md:py-6">
                  <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#c8b6ff]/25 blur-2xl" />
                  <span className="pointer-events-none absolute right-7 top-5 text-[#b7a9ee]/70">
                    ✧
                  </span>

                  <div className="relative z-10">
                    <p className="mb-2 text-[11px] tracking-widest text-gray-400">
                      GÜNLÜK • 3 MAYIS 2026
                    </p>

                    <h2 className="font-serif text-2xl font-normal italic tracking-wide text-gray-700 dark:text-gray-100 md:text-3xl">
                      yeni başlangıçlar{" "}
                      <span className="text-[#a8a1dc]">♡</span>
                    </h2>

                    <p className="mt-4 text-[15px] leading-relaxed text-[#7d7891] dark:text-gray-300">
                      Bazen her şeyi geride bırakmak yeni bir sen yazmak
                      demektir.
                    </p>

                    <Link
                      href="/yazilarim"
                      className="mt-4 block text-xs text-gray-400 transition hover:text-[#b7b0e8]"
                    >
                      devamını oku →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#9b94d9]" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
            </div>

            {/* SON YAZILAR */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80"
            >
              <span className="pointer-events-none absolute right-8 top-7 text-[#c9b8ff]/70">
                ✧
              </span>

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    son yazılar
                  </h2>

                  <Link
                    href="/yazilarim"
                    className="text-xs text-[#9b94d9] hover:underline"
                  >
                    hepsini gör →
                  </Link>
                </div>

                <div className="space-y-5">
                  {posts.map((post, i) => (
                    <div
                      key={post.id ?? i}
                      onClick={() => setSelectedPost(post)}
                      className="group flex cursor-pointer flex-col gap-4 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f8f5ff] dark:hover:bg-white/5 sm:flex-row sm:items-center"
                    >
                      <img
                        src={post.image || `/post${(i % 4) + 1}.jpg`}
                        alt={post.title}
                        className="h-36 w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.03] sm:h-20 sm:w-28"
                      />

                      <div className="flex-1">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.15em] text-[#a8a1dc]">
                          günlük •{" "}
                          {getReadingTime(
                            post.content || post.description || ""
                          )}{" "}
                          dk okuma
                        </p>

                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {post.title}{" "}
                          <span className="text-[#9b94d9]">♡</span>
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                          {post.description || post.content}
                        </p>
                      </div>

                      <span className="text-xs text-gray-400">bugün</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* MISAFIR DEFTERI CTA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-[#eee7fb] bg-gradient-to-r from-[#f6efff]/90 via-white/80 to-[#f4edff]/90 p-6 shadow-[0_15px_45px_rgba(180,160,230,0.16)] backdrop-blur-xl"
            >
              <StarDecor />

              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eee7ff] text-4xl shadow-inner">
                    💌
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-gray-700 dark:text-gray-100">
                      misafir defterine göz at ♡
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                      Burada güzel insanlar düşüncelerini, hislerini ve küçük
                      notlarını bırakıyor.
                    </p>

                    <Link
                      href="/misafir-defteri"
                      className="mt-4 inline-block rounded-full bg-gradient-to-r from-[#a8a1dc] to-[#c8bfff] px-6 py-3 text-sm text-white shadow-[0_10px_25px_rgba(168,161,220,0.35)] transition hover:-translate-y-1 hover:opacity-90"
                    >
                      misafir defterini aç →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {[
                    ["buraya yazmak iyi hissettirdi ♡", "melis"],
                    ["bugün biraz yoruldum ama geçecek sanırım.", "anonim"],
                    ["harika bir ortam, ellerine sağlık ✨", "ayça"],
                  ].map(([note, name]) => (
                    <div
                      key={name}
                      className="rounded-2xl border border-white/70 bg-white/80 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-200">
                        “{note}”
                      </p>

                      <p className="mt-4 text-xs text-[#9b94d9]">— {name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* SAĞ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6 xl:col-span-3"
          >
            {/* GÜNÜN SÖZÜ */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <StarDecor />

              <div className="relative z-10">
                <p className="text-sm text-gray-500">günün sözü</p>

                <p className="mt-5 text-sm leading-relaxed">
                  “Kendine inanmak,
                  <br />
                  başarıya giden ilk adımdır.”
                </p>

                <p className="mt-4 text-3xl text-[#9b94d9]">♡</p>
              </div>
            </div>

            {/* PLAYLIST */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <span className="pointer-events-none absolute right-8 top-7 text-[#c9b8ff]/70">
                ✧
              </span>

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">
                    🎵 playlist
                  </p>
                  <Link
                    href="/muzikler"
                    className="text-xs text-[#a8a1dc] hover:underline"
                  >
                    tümünü aç →
                  </Link>
                </div>

                <div className="space-y-3 text-sm">
                  {[
                    ["1", "Illicit Affairs", "Taylor Swift", "3:10"],
                    ["2", "Espresso", "Sabrina Carpenter", "2:55"],
                    ["3", "Birds of a Feather", "Billie Eilish", "3:30"],
                    ["4", "Untouched", "The Veronicas", "4:15"],
                  ].map((song) => (
                    <div
                      key={song[0]}
                      className="grid grid-cols-[20px_1fr_1fr_40px] items-center gap-2 text-xs"
                    >
                      <span className="text-gray-400">{song[0]}</span>
                      <span className="text-gray-400">{song[1]}</span>
                      <span className="text-gray-400">{song[2]}</span>
                      <span className="text-right text-gray-400">
                        {song[3]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex h-12 items-center gap-3 rounded-xl bg-[#eeeaf8] px-3 text-[#a8a1dc]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a8a1dc] text-xs text-white">
                    ▶
                  </div>

                  <div className="flex flex-1 items-center gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-[#a8a1dc]"
                        style={{ height: `${8 + (i % 5) * 3}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BUGÜNKÜ NOT */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <span className="pointer-events-none absolute right-8 top-7 text-[#c9b8ff]/70">
                ✧
              </span>

              <div className="relative z-10">
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-300">
                  bugünkü küçük not
                </p>

                <div className="rounded-2xl bg-[#f8f5ff] p-5 text-center dark:bg-white/10">
                  <p className="font-serif text-xl italic text-gray-700 dark:text-gray-100">
                    “Kendine nazik davran.”
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-gray-400">
                    Bugün her şeyi mükemmel yapmak zorunda değilsin. Küçük bir
                    adım da yeter.
                  </p>

                  <p className="mt-4 text-2xl text-[#a8a1dc]">♡</p>
                </div>
              </div>
            </div>

            {/* ANILAR */}
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] dark:bg-[#171923]/80">
              <span className="pointer-events-none absolute right-8 top-7 text-[#c9b8ff]/70">
                ✧
              </span>

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">
                    anılar
                  </p>

                  <Link
                    href="/foto-kosesi"
                    className="text-xs text-[#9b94d9] hover:underline"
                  >
                    tümünü gör →
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <img
                      key={n}
                      src={`/foto${n}.jpg`}
                      alt={`anı ${n}`}
                      className="h-20 w-full rounded-lg object-cover transition duration-300 hover:-translate-y-1 hover:scale-105"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <footer className="flex flex-col gap-2 px-6 pb-6 text-center text-xs text-gray-400 md:flex-row md:justify-between">
          <p>© 2026 ceyda&apos;s diary. tüm hakları saklıdır.</p>
          <p>made with ♡ by ceyda</p>
        </footer>
      </div>

      {/* KARAKTER */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          isDragging.current = true;
          setIsHolding(true);
        }}
        onClick={() => {
          const messages = [
            "iyi gidiyorsun ♡",
            "biraz dinlenmeyi unutma ☕",
            "bugün de çok güzel ilerledin ✨",
            "küçük adımlar da başarıdır 🌙",
          ];

          setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
        }}
        className={`h-32 w-28 cursor-grab animate-[float_4s_ease-in-out_infinite] transition duration-300 hover:scale-110 md:h-44 md:w-36 ${
          isHolding
            ? "-translate-y-4 rotate-3 scale-110 cursor-grabbing drop-shadow-2xl"
            : "hover:-translate-y-2"
        }`}
      >
        <img
          src="/avatar.png"
          alt="avatar"
          className="h-full w-full object-contain drop-shadow-xl"
          draggable={false}
        />
      </div>

      {message && (
        <div
          style={{
            position: "fixed",
            left: pos.x + 100,
            top: pos.y + 10,
          }}
          className="rounded-2xl border border-white/70 bg-white/85 px-4 py-2 text-sm text-[#7d7891] shadow-[0_10px_30px_rgba(180,160,230,0.22)] backdrop-blur-md dark:border-white/10 dark:bg-[#232738]/90 dark:text-gray-100"
        >
          {message}
        </div>
      )}

      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-[500px] animate-[fadeIn_0.3s_ease] rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1c2231] dark:text-gray-100 md:p-8"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute right-5 top-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <p className="mb-3 text-xs text-[#9b94d9]">bugünün yazısı</p>

            <h2 className="text-2xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
              {selectedPost.title}
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-gray-500">
              {selectedPost.content}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-6 z-[9999] flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-lg text-[#9b94d9] shadow-[0_10px_30px_rgba(180,160,230,0.25)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#f7f4ff] dark:border-white/10 dark:bg-[#232738]/90"
        title="Yukarı çık"
      >
        ↑
      </button>
    </div>
  );
}