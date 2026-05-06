"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultPosts = [
  {
    id: 1,
    title: "yeni başlangıçlar",
    desc: "Bazen her şeyi geride bırakmak yeni bir sen yazmak demektir.",
    image: "/post1.jpg",
    date: "3 Mayıs 2026",
  },
  {
    id: 2,
    title: "küçük bir not",
    desc: "Kendime hatırlatma: daha sakin ol.",
    image: "/post2.jpg",
    date: "2 Nisan 2026",
  },
  {
    id: 3,
    title: "içime dönmek",
    desc: "Bazen dış dünyadan uzaklaşmak gerekir.",
    image: "/post3.jpg",
    date: "8 Mart 2026",
  },
];

    export default function YazilarimPage() {
      const router = useRouter();
      const [posts, setPosts] = useState(defaultPosts);

      useEffect(() => {
        const saved = localStorage.getItem("posts");
        const savedPosts = saved ? JSON.parse(saved) : [];

        setPosts([...savedPosts, ...defaultPosts]);
      }, []);

      const deletePost = (id: string | number) => {
      const updatedPosts = posts.filter((post) => post.id !== id);

      setPosts(updatedPosts);

      const savedOnly = updatedPosts.filter(
        (post) => typeof post.id === "string"
      );

      localStorage.setItem("posts", JSON.stringify(savedOnly));
    };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-gray-800">
      <div className="max-w-7xl mx-auto px-10 py-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
        <article className="max-w-3xl">
          <div className="space-y-10">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#a8a1dc] font-semibold mb-4">
                blog
              </p>

              <h1 className="font-serif text-5xl md:text-6xl text-gray-700">
                yazılarım <span className="text-[#a8a1dc]">♡</span>
              </h1>

              <p className="text-gray-500 mt-5 text-lg">
                düşüncelerim, notlarım ve küçük hikâyelerim.
              </p>
            </div>

            {posts.map((post, index) => (
              <div
                key={`${post.id}-${index}`}
                onClick={() => router.push(`/yazi/${post.id}`)}
                className="flex gap-6 items-center bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 transition cursor-pointer"
              >
                <div className="relative w-40 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image || `/post${(index % 4) + 1}.jpg`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
              <div className="flex justify-between items-start gap-4">
                
                <div>
                  <p className="text-xs text-gray-400 mb-2">{post.date}</p>

                  <h2 className="font-serif text-2xl text-gray-800">
                    {post.title} <span className="text-[#a8a1dc]">♡</span>
                  </h2>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post.id);
                  }}
                  className="text-gray-300 hover:text-[#a8a1dc] transition text-lg"
                >
                  ✕
                </button>

              </div>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {post.desc}
              </p>
            </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-7 lg:pt-24">
          <SideCard title="günün sözü">
            <p className="font-serif text-lg text-gray-700 leading-relaxed text-center">
              “Kendine inanmak, başarıya giden ilk adımdır.”
            </p>
            <div className="text-[#a8a1dc] text-2xl mt-6 text-center">♡</div>
          </SideCard>

          <SideCard title="playlist">
            <div className="space-y-4 text-sm">
              <Song no="1" title="Illicit Affairs" artist="Taylor Swift" time="3:10" />
              <Song no="2" title="Espresso" artist="Sabrina Carpenter" time="2:55" />
              <Song no="3" title="Birds of a Feather" artist="Billie Eilish" time="3:30" />
              <Song no="4" title="Untouched" artist="The Veronicas" time="4:15" />
            </div>

            <div className="mt-6 h-11 rounded-xl bg-[#eeeafd] flex items-center px-4 gap-1">
              {Array.from({ length: 38 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-[#a8a1dc]"
                  style={{ height: `${10 + (i % 5) * 5}px` }}
                />
              ))}
            </div>
          </SideCard>

          <SideCard title="bu yazıya benzer">
            <div className="space-y-5">
              <RelatedPost image="/post1.jpg" title="Küçük Bir Not ♡" date="2 Nisan 2026" href="/yazi/2" />
              <RelatedPost image="/post2.jpg" title="Bazen Her Şey Anlam Kazanır" date="18 Mart 2026" href="/yazi/3" />
              <RelatedPost image="/post3.jpg" title="İçime Dönmek Üzerine" date="8 Mart 2026" href="/yazi/3" />
            </div>
          </SideCard>

          <SideCard title="son yazılar">
            <div className="space-y-5">
              <RelatedPost image="/post4.jpg" title="Bugün Hissedilenler ♡" date="1 Mayıs 2026" href="/yazi/1" />
              <RelatedPost image="/post1.jpg" title="Küçük Bir Not ♡" date="2 Nisan 2026" href="/yazi/2" />
            </div>
          </SideCard>
        </aside>
      </div>

      <footer className="text-center pb-10 text-gray-400">
        <p className="font-serif text-2xl">ceyda's diary ♡</p>
        <p className="text-sm mt-2">yazıyorum, yaşıyorum, öğreniyorum.</p>
      </footer>
    </main>
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
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm text-gray-500 mb-5">{title}</h3>
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
  title,
  date,
  href,
}: {
  image: string;
  title: string;
  date: string;
  href: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex gap-4 items-center cursor-pointer hover:bg-[#f7f5ff] p-2 rounded-2xl transition"
    >
      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 text-sm leading-snug">
          {title}
        </h4>
        <p className="text-sm text-gray-400 mt-1">{date}</p>
      </div>
    </div>
  );
}