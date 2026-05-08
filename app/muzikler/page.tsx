    "use client";

    import { useEffect, useState } from "react";

    const songs = [
      [
        "1",
        "Illicit Affairs",
        "Taylor Swift",
        "3:10",
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=200&h=200&fit=crop",
      ],
      [
        "2",
        "Espresso",
        "Sabrina Carpenter",
        "2:55",
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop",
      ],
      [
        "3",
        "Birds of a Feather",
        "Billie Eilish",
        "3:30",
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop",
      ],
      [
        "4",
        "Untouched",
        "The Veronicas",
        "4:15",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      ],
      [
        "5",
        "Cigarette After Sex",
        "Nothing's Gonna Hurt You Baby",
        "4:46",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
      ],
      [
        "6",
        "The Night We Met",
        "Lord Huron",
        "3:28",
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop",
      ],
    ];

    const albums = [
      [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        "Midnights",
        "Taylor Swift",
      ],
      [
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        "emails i can't send",
        "Sabrina Carpenter",
      ],
      [
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
        "Happier Than Ever",
        "Billie Eilish",
      ],
      [
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
        "GUTS",
        "Olivia Rodrigo",
      ],
    ];

    export default function MuziklerPage() {
      const [search, setSearch] = useState("");
      const [nowPlaying, setNowPlaying] = useState<any>(null);
      const [liveProgressMs, setLiveProgressMs] = useState(0);

      const filteredSongs = songs.filter(
        (song) =>
          song[1].toLowerCase().includes(search.toLowerCase()) ||
          song[2].toLowerCase().includes(search.toLowerCase())
      );
    useEffect(() => {
    async function getNowPlaying() {
      try {
        const res = await fetch("/api/now-playing");
        const data = await res.json();

        setNowPlaying(data);
        setLiveProgressMs(data?.progressMs || 0);
      } catch (error) {
        console.error("Now playing alınamadı:", error);
      }
    }

    getNowPlaying();

    const spotifyInterval = setInterval(getNowPlaying, 15000);

    return () => clearInterval(spotifyInterval);
  }, []);

  useEffect(() => {
    if (!nowPlaying?.isPlaying) return;

    const timer = setInterval(() => {
      setLiveProgressMs((prev) => {
        const next = prev + 1000;
        return Math.min(next, nowPlaying?.durationMs || next);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nowPlaying?.isPlaying, nowPlaying?.durationMs]);

      const progress =
    liveProgressMs && nowPlaying?.durationMs
      ? Math.min((liveProgressMs / nowPlaying.durationMs) * 100, 100)
      : 0;

          const formatTime = (ms?: number) => {
          if (!ms) return "0:00";

          const minutes = Math.floor(ms / 60000);
          const seconds = Math.floor((ms % 60000) / 1000)
            .toString()
            .padStart(2, "0");

          return `${minutes}:${seconds}`;
        };

          const controlSpotify = async (
          action: "play" | "pause" | "next" | "previous"
        ) => {
          try {
            await fetch(`/api/player/${action}`, {
              method: "POST",
            });

            setTimeout(async () => {
              const res = await fetch("/api/now-playing");
              const data = await res.json();

              setNowPlaying(data);
              setLiveProgressMs(data?.progressMs || 0);
            }, 400);
          } catch (error) {
            console.error(error);
          }
        };
      return (
        <main className="relative min-h-screen overflow-hidden bg-[#faf6ff] dark:bg-[#0f1117] px-6 py-10 text-[#293046] dark:text-gray-100 transition duration-500">  
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(218,199,255,0.45),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(255,221,235,0.55),transparent_32%),radial-gradient(circle_at_55%_82%,rgba(235,218,255,0.48),transparent_38%),linear-gradient(180deg,#fffaff_0%,#faf6ff_45%,#fffafd_100%) dark:opacity-20]" />
          <div className="pointer-events-none absolute left-10 top-24 text-3xl text-white/80">
            ✦
          </div>
          <div className="pointer-events-none absolute right-32 top-20 text-2xl text-white/80">
            ✧
          </div>
          <div className="pointer-events-none absolute bottom-14 left-16 text-3xl text-white/80">
            ✦
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-serif text-4xl italic text-[#20283d] drop-shadow-[0_0_10px_rgba(220,200,255,0.35)] sm:text-5xl">
                  müziklerim ♡
                </h1>
                <p className="mt-3 text-sm text-[#9b95ad]">
                  ruh halime eşlik eden şarkılar, favorilerim ve daha fazlası.
                </p>
              </div>

              <div className="relative hidden md:block">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="şarkı veya sanatçı ara..."
                  className="w-80 rounded-full border border-white bg-white/80 px-6 py-3 text-sm shadow-sm outline-none placeholder:text-[#aaa3bb]"
                />
                <span className="absolute right-5 top-3 text-[#9b8ed8]">⌕</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_360px]">
              <section className="space-y-7">
                <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#d9bfd7] via-[#bea0bb] to-[#a687aa] p-7 text-white shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(190,160,210,0.35)]"> 
                  <div className="absolute -right-10 top-0 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute bottom-0 left-20 h-40 w-72 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative z-10 mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                        Spotify Playlist
                      </p>
                      <h2 className="mt-3 font-serif text-5xl">ceydadiariess ♡</h2>
                      <p className="mt-3 text-sm text-white/80">
                        ruh halime eşlik eden şarkılar
                      </p>
                    </div>

                    <div className="text-5xl opacity-80">♫</div>
                  </div>

                  <div className="relative z-10 mt-8 overflow-hidden rounded-[30px] border border-white/35 bg-white/20 p-2 shadow-[0_20px_60px_rgba(70,40,80,0.18)] backdrop-blur-md">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/4gRUJR9HG7gA9Z4lPbKKfn?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="block rounded-[24px]"
                  />
                </div>
                </div>

                <div className="rounded-[34px] bg-white/75 p-6 shadow-sm backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold text-[#5f5875]">♫ şarkı listesi</h3>
                    <button className="rounded-full bg-[#f5f1ff] px-5 py-2 text-xs text-[#9b8ed8]">
                      sırala: eklenme tarihi
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filteredSongs.map((song) => (
                      <div
                        key={song[0]}
                        className="flex items-center gap-5 rounded-3xl bg-white/90 px-5 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(200,180,230,0.2)]"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6f2ff] text-sm text-[#a79bdc]">
                          {song[0]}
                        </div>

                        <img
                        src={song[4]}
                        alt={song[1]}
                        className="h-12 w-12 rounded-xl object-cover shadow-sm"
                      />

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-semibold text-[#293046]">
                            {song[1]}
                          </h4>
                          <p className="truncate text-sm text-[#9690a7]">
                            {song[2]}
                          </p>
                        </div>

                        <span className="text-sm text-[#7d7891]">{song[3]}</span>
                        <span className="text-xl text-[#a79bdc]">♡</span>
                        <span className="text-xl text-[#a79bdc]">⋯</span>
                      </div>
                    ))}
                  </div>

                  <button className="mx-auto mt-5 block rounded-full bg-white px-12 py-3 text-sm text-[#9b8ed8] shadow-sm">
                    daha fazla yükle⌄
                  </button>
                </div>
              </section>

              <aside className="space-y-6">
                <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-[#fff6fb] via-[#f5efff] to-[#efe7ff] p-6 shadow-[0_18px_45px_rgba(190,160,220,0.22)] backdrop-blur-xl">
    <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#ffd6e8]/60 blur-3xl" />
    <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-[#cbb8ff]/55 blur-3xl" />
    <div className="absolute right-10 bottom-20 h-24 w-24 rounded-full bg-[#ffe7b8]/45 blur-2xl" />

    <div className="relative z-10 mb-5 flex items-center justify-between">
      <h3 className="font-semibold text-[#5f5875]">
        ♫ şu an dinliyorum
      </h3>
      <span className="text-2xl text-[#b7a2f5]">✧</span>
    </div>

    <div className="relative z-10 overflow-hidden rounded-[28px] border border-white/70 bg-white/45 p-5 shadow-inner backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#ffeef7]/30 to-[#e9ddff]/50" />

      <div className="relative z-10 flex items-center gap-4">
        <img
          src={nowPlaying?.albumImage || "/playlist-cover.png"}
          className="h-20 w-20 rounded-2xl object-cover shadow-[0_10px_25px_rgba(150,120,180,0.28)] ring-4 ring-white/70"
          alt="album cover"
        />

        <div className="min-w-0">
          <h4 className="truncate font-semibold text-[#2e3142]">
            {nowPlaying?.title || "Şu an çalan yok"}
          </h4>

          <p className="truncate text-sm text-[#8f89a0]">
            {nowPlaying?.artist || "Spotify kapalı olabilir"}
          </p>

          <div className="mt-2 inline-flex rounded-full bg-white/70 dark:bg-[#171923]/80 px-3 py-1 text-[11px] text-[#9b8ed8]">
            live from Spotify
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-end gap-[3px]">
        <div className="mt-6 flex h-12 items-center justify-center gap-[4px]">
          {[
            12, 18, 26, 34, 22, 16, 28, 38, 30, 20,
            14, 24, 36, 42, 28, 18, 12, 20, 30, 40,
            34, 26, 18, 22, 32, 44, 36, 24, 16, 28,
          ].map((height, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-[#c7b6ff] via-[#d9b7ff] to-white/95"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 h-[6px] rounded-full bg-white/70 dark:bg-[#171923]/80">
        <div
          className="h-[6px] rounded-full bg-gradient-to-r from-[#b7a2f5] via-[#d9b7ff] to-[#f6c7df] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

  <div className="relative z-10 mt-6 flex items-center justify-between">
    <span className="text-xs text-[#9a93ad]">
      {formatTime(liveProgressMs)}
    </span>

    <div className="flex items-center gap-7 text-[#8f89a5]">
      <button
        onClick={() => controlSpotify("previous")}
        className="text-lg transition hover:scale-110"
      >
        ⏮
      </button>

      <button
        onClick={() =>
          controlSpotify(nowPlaying?.isPlaying ? "pause" : "play")
        }
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#c7b6ff] to-[#a98df2] text-white shadow-[0_10px_28px_rgba(169,141,242,0.45)] transition hover:scale-105"
      >
        {nowPlaying?.isPlaying ? "❚❚" : "▶"}
      </button>

      <button
        onClick={() => controlSpotify("next")}
        className="text-lg transition hover:scale-110"
      >
        ⏭
      </button>
    </div>

    <span className="text-xs text-[#9a93ad]">
      {formatTime(nowPlaying?.durationMs)}
    </span>
      </div>
    </div>
  </div>

                <div className="rounded-[30px] bg-white/80 p-6 shadow-sm backdrop-blur">
                  <h3 className="mb-5 font-semibold text-[#5f5875]">
                    ♡ bugünkü ruh halim
                  </h3>

                  <div className="rounded-3xl bg-gradient-to-br from-[#fffaff] to-[#f2edff] px-6 py-10 text-center text-[#6d6681]">
                    <p className="leading-7">
                      Müzik, ifade edemediğimiz <br />
                      her şeyi anlatır.
                    </p>
                    <p className="mt-5 text-2xl text-[#a99ce6]">♡</p>
                  </div>
                </div>

                <div className="rounded-[30px] bg-white/80 p-6 shadow-sm backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold text-[#5f5875]">
                      ❀ favori albümlerim
                    </h3>
                    <span className="text-xs text-[#a99ce6]">tümünü gör →</span>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {albums.map((album, index) => (
                      <div key={index}>
                        <img
                          src={album[0]}
                          className="aspect-square rounded-xl object-cover shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                          alt={album[1]}
                        />
                        <p className="mt-2 truncate text-xs font-semibold text-[#5f5875]">
                          {album[1]}
                        </p>
                        <p className="truncate text-[11px] text-[#9b95ad]">
                          {album[2]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
            {/* alt süs çizgisi */}
          <div className="pointer-events-none mx-auto mt-10 flex max-w-6xl items-center justify-center gap-3 text-[#d7cafa]">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d7cafa] to-[#d7cafa]" />
            <span className="text-xl">✧ ♡ ✧</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d7cafa] to-[#d7cafa]" />
          </div>

          
          {/* sağ alt karakter */}
  <div className="pointer-events-none fixed bottom-5 right-10 z-50 hidden md:block">
    {/* konuşma balonu */}
    <div className="absolute -left-44 top-8 rounded-full border border-white/70 bg-white/85 px-5 py-3 text-sm text-[#8f89a0] shadow-[0_10px_30px_rgba(190,170,220,0.22)] backdrop-blur-md">
      ♫ bugün biraz müzik iyi gelir
    </div>

    {/* müzik notaları */}
    <div className="absolute -left-8 top-4 text-2xl text-[#b9a7ea] animate-bounce">
      ♪
    </div>

    <div
      className="absolute right-0 -top-5 text-xl text-[#cbb8f4]"
      style={{
        animation: "float 3s ease-in-out infinite",
      }}
    >
      ♫
    </div>

    <img
      src="/avatar1.png"
      alt="character"
      className="w-[190px] drop-shadow-[0_12px_35px_rgba(160,135,205,0.45)]"
      style={{
        animation: "float 4s ease-in-out infinite",
      }}
    />
  </div>
          </div>
        </main>
      );
    }