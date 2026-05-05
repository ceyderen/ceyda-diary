"use client";

import { useState, useRef, useEffect } from "react";

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
  const [darkMode, setDarkMode] = useState(false);
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
        className={`min-h-screen p-6 transition duration-500 ${
          darkMode ? "bg-[#111827]" : "bg-[#f3f2f0]"
        }`}
        >
      <div
      className={`min-h-[calc(100vh-48px)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden transition duration-500 ${
        darkMode ? "bg-[#1f2937]/90 text-gray-100" : "bg-white/80 text-gray-800"
      }`}
    >
        <div className="grid grid-cols-12 gap-6 p-8">
          {/* SOL */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300 text-center">
              <img
                src="/ceyda.jpg"
                alt="ceyda"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />

                <h2 className="font-serif italic text-3xl font-normal text-gray-600 tracking-wide">
                ceyda <span className="text-[#a8a1dc]">♡</span>
                  </h2>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                yazıyorum, yaşıyorum, öğreniyorum.
                <br />
                burası benim küçük dünyam.
              </p>

              <p className="text-xs text-[#9b94d9] mt-4 cursor-pointer">
                devamını oku →
              </p>
            </div>

            {/* ŞU AN DİNLEDİĞİM */}
            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
              <p className="text-sm text-gray-500 mb-4">🎧 şu an dinlediğim</p>

              <div className="flex gap-4 items-center">
                <img
                  src="/music.jpg"
                  alt="music cover"
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">Where's My Phone?</p>
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
            

            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
              <p className="font-medium text-gray-700 mb-4">kısayollar</p>

              <div className="space-y-3 text-sm text-gray-600">
                {[
                "📖 yazılarım",
                "🌙 günlüğüm",
                "🎧 müzikler",
                "📷 foto köşesi",
                "💌 iletişim",
              ].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center hover:text-[#9b94d9] transition cursor-pointer"
                >
                  <span>{item}</span>
                  <span>›</span>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* ORTA */}
          <div className="col-span-6 space-y-6">
          {/* HERO */}
          <div className="relative h-[260px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
            
            {/* ARKA PLAN */}
            <img
              src="/hero.jpg"
              className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

            {/* ORTA KART */}
            <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md px-10 py-6 rounded-3xl shadow-xl text-center max-w-sm hover:scale-105 transition duration-300">
                
                <p className="text-[11px] tracking-widest text-gray-400 mb-2">
                  GÜNLÜK • 3 MAYIS 2026
                </p>

                <h2 className="font-serif italic text-3xl font-normal text-gray-700 tracking-wide">
                  yeni başlangıçlar{" "}
                  <span className="text-[#a8a1dc]">♡</span>
                </h2>

                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  Bazen her şeyi geride bırakmak yeni bir sen yazmak demektir.
                </p>

                <span className="block text-xs text-gray-400 mt-4 cursor-pointer hover:text-[#b7b0e8] transition">
                  devamını oku →
                </span>

              </div>
            </div>
          </div>

            <div className="flex justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9b94d9]" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>

            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-medium text-gray-800">
                  son yazılar
                </h2>

                <span className="text-xs text-[#9b94d9] cursor-pointer">
                  hepsini gör →
                </span>
              </div>

              <div className="space-y-5">
                {posts.map((post, i) => (
                  <div
                    key={post.id ?? i}
                    onClick={() => setSelectedPost(post)}
                    className="flex gap-4 items-center p-2 rounded-xl hover:bg-[#f6f3ff] transition cursor-pointer"
                  >
                    <img
                      src={`/foto${(i % 4) + 1}.jpg`}
                      alt={post.title}
                      className="w-28 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {post.title}{" "}
                        <span className="text-[#9b94d9]">♡</span>
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {post.content}
                      </p>
                    </div>

                    <span className="text-xs text-gray-400">bugün</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
              <p className="text-sm text-gray-500">günün sözü</p>

              <p className="mt-5 text-sm leading-relaxed">
                “Kendine inanmak,
                <br />
                başarıya giden ilk adımdır.”
              </p>

              <p className="text-3xl text-[#9b94d9] mt-4">♡</p>
            </div>

            {/* PLAYLIST */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-gray-700">🎵 playlist</p>
              <span className="text-xs text-[#a8a1dc] cursor-pointer">
                tümünü aç →
              </span>
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
                  <span className="text-gray-800">{song[1]}</span>
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
                {Array.from({ length: 52 }).map((_, i) => ( 
                  <span
                    key={i}
                    className="w-[3px] bg-[#a8a1dc] rounded-full"
                    style={{ height: `${8 + (i % 5) * 3}px` }}
                  />
                ))}
              </div>
              </div>
              </div>
  

            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
              <p className="text-sm text-gray-500 mb-3">yapılacaklar</p>

              <ul className="text-sm mt-2 space-y-2">
                <li>☑ blog yazısı yaz</li>
                <li>☑ kitap oku</li>
                <li>☐ spor yap</li>
                <li>☐ yeni tarif dene</li>
              </ul>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-gray-700">anılar</p>

                <span className="text-xs text-[#9b94d9] cursor-pointer">
                  tümünü gör →
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <img
                  src="/foto1.jpg"
                  alt="anı 1"
                  className="rounded-lg h-20 object-cover"
                />
                <img
                  src="/foto2.jpg"
                  alt="anı 2"
                  className="rounded-lg h-20 object-cover"
                />
                <img
                  src="/foto3.jpg"
                  alt="anı 3"
                  className="rounded-lg h-20 object-cover"
                />
                <img
                  src="/foto4.jpg"
                  alt="anı 4"
                  className="rounded-lg h-20 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="px-10 pb-6 flex justify-between text-xs text-gray-400">
          <p>© 2026 ceyda's diary. tüm hakları saklıdır.</p>
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
            "iyi gidiyorsun 💙",
            "bir mola ver ☕",
            "devam et ✨",
          ];

          setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
        }}
        className={`w-32 h-40 cursor-grab hover:scale-110 transition duration-300 ${
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
          className="bg-white px-3 py-1 rounded-lg shadow text-sm"
        >
          {message}
        </div>
      )}

      {/* YAZI DETAY POPUP */}
        {selectedPost && (
        <div
        onClick={() => setSelectedPost(null)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-[500px] p-8 rounded-3xl shadow-2xl relative animate-[fadeIn_0.3s_ease]"
        >
      <button
        onClick={() => setSelectedPost(null)}
        className="absolute top-4 right-5 text-gray-400 hover:text-black"
      >
        ✕
      </button>

      <p className="text-xs text-[#9b94d9] mb-3">bugünün yazısı</p>

      <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
        {selectedPost.title}
      </h2>

      <p className="text-sm text-gray-500 mt-5 leading-relaxed">
        {selectedPost.content}
      </p>
    </div>
  </div>
)}
    </div>
  );
}