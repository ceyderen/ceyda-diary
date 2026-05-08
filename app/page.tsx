  "use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

  export default function Home() {
    const [posts, setPosts] = useState([
      {
        id: 1,
        title: "Bugün Hissedilenler",
        content: "Bugün biraz karışık ama güzel bir gündü...",
      },
      {
        id: 2,
        title: "Küçük Bir Not",
        content: "Kendime hatırlatma: daha sakin ol.",
      },
    ]);

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
      const savedPosts = localStorage.getItem("posts");

      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    }, []);

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
      <div
        className="min-h-screen overflow-x-hidden p-3 transition duration-500 bg-[#fbf9ff] dark:bg-[#0f1117] md:p-6"      > 
      {/* dreamy glow */}
          {/* dreamy glow */}
          <div className="pointer-events-none absolute top-0 left-[-220px] h-[520px] w-[520px] rounded-full bg-[#eadcff] opacity-35 blur-3xl" />
          <div className="pointer-events-none absolute right-[-180px] top-[260px] h-[480px] w-[480px] rounded-full bg-[#f3dfff] opacity-35 blur-3xl" />


          <div className="mx-auto min-h-[calc(100vh-48px)] max-w-[1500px] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden transition duration-500 bg-white/65 dark:bg-[#1f2937]/85 backdrop-blur-xl border border-[#eee7fb] dark:border-white/10 text-gray-800 dark:text-gray-100">          
          <div className="grid grid-cols-1 gap-6 p-4 md:p-6 2xl:grid-cols-12 xl:p-8">

            {/* SOL */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="xl:col-span-3 space-y-6"
            >
              <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300 text-center">
                <img
                  src="/ceyda.jpg"
                  alt="ceyda"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />

                <h2 className="font-serif italic text-2xl md:text-3xl font-normal text-gray-600 tracking-wide">
                  ceyda <span className="text-[#a8a1dc]">♡</span>
                </h2>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  yazıyorum, yaşıyorum, öğreniyorum.
                  <br />
                  burası benim küçük dünyam.
                </p>

                <Link
                href="/hakkimda"
                className="mt-4 inline-block text-xs text-[#9b94d9] hover:translate-x-1 transition"
              >
                devamını oku →
              </Link>
              </div>

              <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300">
                <p className="text-sm text-gray-500 mb-4">🎧 şu an dinlediğim</p>

                <div className="flex gap-4 items-center">
                  <img
                    src="/music.jpg"
                    alt="music cover"
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Where&apos;s My Phone?
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Mitski</p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 w-1/2 bg-[#a8a1dc] rounded-full" />
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                    <span>1:47</span>
                    <span>4:21</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 text-gray-500">
                  <button className="hover:text-[#b7b0e8] transition">⤨</button>
                  <button className="hover:text-[#b7b0e8] transition">⏮</button>

                  <button className="w-10 h-10 rounded-full bg-[#a8a1dc] text-white flex items-center justify-center shadow-md hover:scale-105 transition">
                    ▶
                  </button>

                  <button className="hover:text-[#b7b0e8] transition">⏭</button>
                  <button className="hover:text-[#b7b0e8] transition">♡</button>
                </div>
              </div>

             <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300">
  <p className="font-medium text-gray-700 dark:text-gray-100 mb-4">
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
        className="group flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-[#f7f4ff] dark:hover:bg-white/10 hover:text-[#9b94d9]"
      >
        <span className="flex items-center gap-3">
          <span className="w-5 text-center text-[#a8a1dc]">{icon}</span>
          <span>{title}</span>
        </span>

        <span className="transition group-hover:translate-x-1">›</span>
      </Link>
    ))}
  </div>
</div>
            </motion.div>

              {/* ORTA */}
              <div className="xl:col-span-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative h-[260px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300"
                >
                  <img
                    src="/hero.jpg"
                    alt="hero"
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/20 to-[#eadcff]/30 backdrop-blur-[2px]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-[#232738]/90 backdrop-blur-md px-10 py-6 rounded-3xl shadow-xl text-center max-w-sm hover:scale-105 transition duration-300">
                      <p className="text-[11px] tracking-widest text-gray-400 mb-2">
                        GÜNLÜK • 3 MAYIS 2026
                      </p>

                      <h2 className="font-serif italic text-3xl font-normal text-gray-700 dark:text-gray-100 tracking-wide">
                        yeni başlangıçlar <span className="text-[#a8a1dc]">♡</span>
                      </h2>

                      <p className="mt-4 text-[15px] leading-relaxed text-[#7d7891] dark:text-gray-300">
                        Bazen her şeyi geride bırakmak yeni bir sen yazmak demektir.
                      </p>

                      <Link
                        href="/yazilarim"
                        className="mt-4 block text-xs text-gray-400 transition hover:text-[#b7b0e8]"
                      >
                        devamını oku →
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9b94d9]" />
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-5">
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
                        className="group flex gap-4 items-center rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f8f5ff] dark:hover:bg-white/5"
                      >
                        <img
                          src={`/foto${(i % 4) + 1}.jpg`}
                          alt={post.title}
                          className="h-20 w-28 rounded-2xl object-cover transition duration-300 group-hover:scale-[1.03]"
                        />

                        <div className="flex-1">
                          <p className="mb-1 text-[11px] uppercase tracking-[0.15em] text-[#a8a1dc]">
                            günlük • 3 dk okuma
                          </p>

                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {post.title} <span className="text-[#9b94d9]">♡</span>
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">{post.content}</p>
                        </div>

                        <span className="text-xs text-gray-400">bugün</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="overflow-hidden rounded-3xl border border-[#eee7fb] bg-gradient-to-r from-[#f6efff]/90 via-white/80 to-[#f4edff]/90 p-6 shadow-[0_15px_45px_rgba(180,160,230,0.16)] backdrop-blur-xl"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eee7ff] text-4xl shadow-inner">
              💌
            </div>

            <div>
              <h3 className="font-serif text-2xl text-gray-700 dark:text-gray-100">
                misafir defterine göz at ♡
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                Burada güzel insanlar düşüncelerini, hislerini ve küçük notlarını bırakıyor.
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

                <p className="mt-4 text-xs text-[#9b94d9]">
                  — {name}
                </p>
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
              className="xl:col-span-3 space-y-6"
            >
              <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300">
                <p className="text-sm text-gray-500">günün sözü</p>

                <p className="mt-5 text-sm leading-relaxed">
                  “Kendine inanmak,
                  <br />
                  başarıya giden ilk adımdır.”
                </p>

                <p className="text-3xl text-[#9b94d9] mt-4">♡</p>
              </div>

              <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-medium text-gray-700">🎵 playlist</p>
                  <Link href="/muzikler" className="text-xs text-[#a8a1dc] hover:underline">
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
                      className="grid grid-cols-[20px_1fr_1fr_40px] gap-2 text-xs items-center"
                    >
                      <span className="text-gray-400">{song[0]}</span>
                      <span className="text-gray-400">{song[1]}</span>
                      <span className="text-gray-400">{song[2]}</span>
                      <span className="text-gray-400 text-right">{song[3]}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 h-12 bg-[#eeeaf8] rounded-xl flex items-center gap-3 px-3 text-[#a8a1dc]">
                  <div className="w-7 h-7 rounded-full bg-[#a8a1dc] text-white flex items-center justify-center text-xs">
                    ▶
                  </div>

                  <div className="flex-1 flex items-center gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-[3px] bg-[#a8a1dc] rounded-full"
                        style={{ height: `${8 + (i % 5) * 3}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300">
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                bugünkü küçük not
              </p>

              <div className="rounded-2xl bg-[#f8f5ff] dark:bg-white/10 p-5 text-center">
                <p className="font-serif italic text-xl text-gray-700 dark:text-gray-100">
                  “Kendine nazik davran.”
                </p>

                <p className="mt-3 text-xs leading-relaxed text-gray-400">
                  Bugün her şeyi mükemmel yapmak zorunda değilsin.  
                  Küçük bir adım da yeter.
                </p>

                <p className="mt-4 text-2xl text-[#a8a1dc]">♡</p>
              </div>
            </div>

                          <div className="bg-white/70 dark:bg-[#171923]/80 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(180,160,230,0.18)] transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
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
                    className="rounded-lg h-20 w-full object-cover"
                  />
                ))}
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
          className={`w-36 h-44 cursor-grab hover:scale-110 transition duration-300 animate-[float_4s_ease-in-out_infinite] ${
            isHolding
              ? "-translate-y-4 rotate-3 scale-110 cursor-grabbing drop-shadow-2xl"
              : "hover:-translate-y-2"
          }`}
        >
          <img
            src="/avatar.png"
            alt="avatar"
            className="w-full h-full object-contain drop-shadow-xl"
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
            className="rounded-2xl border border-white/70 bg-white/85 px-4 py-2 text-sm text-[#7d7891] shadow-[0_10px_30px_rgba(180,160,230,0.22)] backdrop-blur-md dark:border-white/10 dark:bg-[#232738]/90 dark:text-gray-100"          >
            {message}
          </div>
        )}

        {selectedPost && (
          <div
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1c2231] dark:text-gray-100 w-[500px] p-8 rounded-3xl shadow-2xl relative animate-[fadeIn_0.3s_ease]"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-5 text-gray-400 hover:text-black"
              >
                ✕
              </button>

              <p className="text-xs text-[#9b94d9] mb-3">bugünün yazısı</p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                {selectedPost.title}
              </h2>

              <p className="text-sm text-gray-500 mt-5 leading-relaxed">
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