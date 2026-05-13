"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Post = {
  id: string | number;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  created_at?: string;
  image_position?: number;
};

function formatDate(date?: string) {
  if (!date) return "bugün";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "bugün";

  return parsed.toLocaleDateString("tr-TR");
}

function YazilarimContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase().trim() || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id,title,description,image,image_position,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Yazılar alınamadı:", error.message);
        setPosts([]);
        setLoading(false);
        return;
      }

      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search) return posts;

    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const description = post.description?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";
      const date = post.created_at?.toLowerCase() || "";

      return (
        title.includes(search) ||
        description.includes(search) ||
        content.includes(search) ||
        date.includes(search)
      );
    });
  }, [posts, search]);

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#fbf9ff] px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#a8a1dc]">
            blog
          </p>

          <h1 className="mb-6 font-serif text-5xl text-gray-700 md:text-6xl">
            yazılarım <span className="text-[#2f3c5b]">♡</span>
          </h1>

          <p className="mb-10 text-lg text-gray-500">
            düşüncelerim, notlarım ve küçük hikâyelerim.
          </p>

          <div className="space-y-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex animate-pulse flex-col gap-6 rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="h-44 w-full rounded-xl bg-[#eee7fb] sm:h-28 sm:w-40" />

                <div className="flex-1">
                  <div className="mb-4 h-3 w-24 rounded-full bg-[#eee7fb]" />
                  <div className="mb-4 h-7 w-56 rounded-full bg-[#eee7fb]" />
                  <div className="h-4 w-full max-w-md rounded-full bg-[#eee7fb]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf9ff]">
      <div className="pointer-events-none absolute left-[-200px] top-0 h-[500px] w-[500px] rounded-full bg-[#eadcff] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-150px] top-[200px] h-[450px] w-[450px] rounded-full bg-[#f3dfff] opacity-30 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-14 lg:grid-cols-[1fr_360px] lg:px-10">
        <article className="max-w-3xl">
          <div className="space-y-10">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#a8a1dc]">
                blog
              </p>

              <h1 className="font-serif text-5xl text-gray-700 md:text-6xl">
                yazılarım <span className="text-[#2f3c5b]">♡</span>
              </h1>

              <p className="mt-5 text-lg text-gray-500">
                düşüncelerim, notlarım ve küçük hikâyelerim.
              </p>

              {search && (
                <div className="mt-6 rounded-2xl border border-[#eee7fb] bg-white/70 px-5 py-3 text-sm text-gray-500 shadow-sm backdrop-blur-md">
                  “<span className="text-[#8f86d8]">{search}</span>” için{" "}
                  <span className="font-semibold text-gray-700">
                    {filteredPosts.length}
                  </span>{" "}
                  sonuç bulundu.
                </div>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <div
                  key={`${post.id}-${index}`}
                  onClick={() => router.push(`/yazi/${post.id}`)}
                  className="flex cursor-pointer flex-col gap-6 rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-1 sm:flex-row sm:items-center"
                >
                  <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-52">
                    <img
                    src={post.image || `/post${(index % 4) + 1}.jpg`}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `center ${post.image_position ?? 50}%`,
                    }}
                  />
                  </div>

                  <div className="flex-1">
                    <p className="mb-2 text-xs text-gray-400">
                      {formatDate(post.created_at)}
                    </p>

                    <h2 className="font-serif text-2xl text-gray-800">
                      {post.title} <span className="text-[#a8a1dc]">♡</span>
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {post.description ||
                        post.content ||
                        "Bu yazı için kısa açıklama yok."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-[#eee7fb] bg-white/80 p-10 text-center shadow-sm backdrop-blur-md">
                <p className="font-serif text-2xl text-gray-700">
                  henüz yazı yok ♡
                </p>
                <p className="mt-3 text-sm text-gray-400">
                  Günlüğüm panelinden ilk yazını ekleyebilirsin.
                </p>
              </div>
            )}
          </div>
        </article>

        <aside className="space-y-7 lg:pt-24">
          <SideCard title="günün sözü">
            <p className="text-center font-serif text-lg leading-relaxed text-gray-700">
              “Kendine inanmak, başarıya giden ilk adımdır.”
            </p>
            <div className="mt-6 text-center text-2xl text-[#a8a1dc]">♡</div>
          </SideCard>

          <div className="rounded-[30px] border border-[#eee7fb] bg-[#f8f4ff]/90 p-6 shadow-[0_15px_50px_rgba(180,160,220,0.14)] backdrop-blur-xl">
            <h3 className="mb-5 text-sm text-[#7c739c]">playlist</h3>

            <div className="space-y-4 text-sm">
              <Song no="1" title="Illicit Affairs" artist="Taylor Swift" time="3:10" />
              <Song no="2" title="Espresso" artist="Sabrina Carpenter" time="2:55" />
              <Song no="3" title="Birds of a Feather" artist="Billie Eilish" time="3:30" />
              <Song no="4" title="Untouched" artist="The Veronicas" time="4:15" />
            </div>

            <div className="mt-6 flex h-11 items-center gap-1 overflow-hidden rounded-2xl bg-[#eee7ff] px-4">
              {Array.from({ length: 38 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-[#b49af5]"
                  style={{ height: `${10 + (i % 5) * 5}px` }}
                />
              ))}
            </div>
          </div>

          <SideCard title="son yazılar">
            <div className="space-y-5">
              {posts.slice(0, 3).map((post, index) => (
                <RelatedPost
                key={`${post.id}-${index}`}
                image={post.image || `/post${(index % 4) + 1}.jpg`}
                imagePosition={post.image_position ?? 50}
                title={post.title}
                date={formatDate(post.created_at)}
                href={`/yazi/${post.id}`}
              />
              ))}
            </div>
          </SideCard>
        </aside>
      </div>

      <footer className="relative z-10 pb-10 text-center text-gray-400">
        <p className="font-serif text-2xl">ceyda&apos;s diary ♡</p>
        <p className="mt-2 text-sm">yazıyorum, yaşıyorum, öğreniyorum.</p>
      </footer>
    </main>
  );
}

export default function YazilarimPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf9ff]" />}>
      <YazilarimContent />
    </Suspense>
  );
}

function SideCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur-md">
      <h3 className="mb-5 text-sm text-gray-500">{title}</h3>
      {children}
    </div>
  );
}

function Song({
  no,
  title,
  artist,
  time,
}: {
  no: string;
  title: string;
  artist: string;
  time: string;
}) {
  return (
    <div className="grid grid-cols-[20px_1fr_1fr_40px] gap-3 text-gray-500">
      <span>{no}</span>
      <span className="text-gray-700">{title}</span>
      <span>{artist}</span>
      <span>{time}</span>
    </div>
  );
}

function RelatedPost({
  image,
  imagePosition,
  title,
  date,
  href,
}: {
  image: string;
  imagePosition: number;
  title: string;
  date: string;
  href: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 transition hover:bg-[#f7f5ff]"
    >
      <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          style={{
            objectPosition: `center ${imagePosition}%`,
          }}
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold leading-snug text-gray-700">
          {title}
        </h4>

        <p className="mt-1 text-sm text-gray-400">
          {date}
        </p>
      </div>
    </div>
  );
}