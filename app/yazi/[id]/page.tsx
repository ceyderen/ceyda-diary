"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const defaultPosts = [
  {
    id: "1",
    title: "yeni başlangıçlar",
    date: "3 Mayıs 2026",
    image: "/post1.jpg",
    desc: "Bazen her şeyi geride bırakmak yeni bir sen yazmak demektir.",
    content: [
      "Bugün biraz durup düşündüm.",
      "Hayat bazen çok hızlı akıyor ve biz fark etmeden aynı yerde kalıyoruz. Belki de bazı şeyleri bırakmak, yeniden başlamak için gerekli.",
      "Kendime bir söz verdim: daha sade, daha gerçek ve daha cesur olacağım.",
      "Küçük adımlarla, ama istikrarlı bir şekilde. Kimse için değil, kendim için.",
      "Çünkü en güzel yolculuk, kendine doğru olan yolculuktur.",
    ],
    quote: "Bazen gitmek, kalmaktan daha cesurdur.",
  },
  {
    id: "2",
    title: "küçük bir not",
    date: "2 Nisan 2026",
    image: "/post2.jpg",
    desc: "Kendime hatırlatma: daha sakin ol.",
    content: [
      "Bugün kendime küçük bir not bırakmak istedim.",
      "Her şeyi hemen çözmek zorunda değilim. Bazı şeylerin zamana ihtiyacı var.",
      "Daha sakin, daha nazik ve daha sabırlı olmayı öğreniyorum.",
    ],
    quote: "Kendine iyi davranmak da bir başlangıçtır.",
  },
  {
    id: "3",
    title: "içime dönmek",
    date: "8 Mart 2026",
    image: "/post3.jpg",
    desc: "Bazen dış dünyadan uzaklaşmak gerekir.",
    content: [
      "Bazen insanın biraz sessizliğe ihtiyacı oluyor.",
      "Dışarıdaki kalabalık azaldığında, içimdeki sesleri daha net duymaya başlıyorum.",
      "Belki de büyümek biraz da kendini dinlemeyi öğrenmektir.",
    ],
    quote: "Sessizlik bazen en doğru cevaptır.",
  },
];

export default function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [likes, setLikes] = useState(12);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    const savedPosts = saved ? JSON.parse(saved) : [];

    const allPosts = [...savedPosts, ...defaultPosts];

    const foundPost = allPosts.find(
      (item) => String(item.id) === String(id)
    );

    setPost(foundPost || null);

    const savedComments = localStorage.getItem(`comments-${id}`);
    const savedLikes = localStorage.getItem(`likes-${id}`);
    const savedLiked = localStorage.getItem(`liked-${id}`);

    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedLikes) setLikes(JSON.parse(savedLikes));
    if (savedLiked) setLiked(JSON.parse(savedLiked));
  }, [id]);

  const addComment = () => {
    if (!input.trim()) return;

    const newComment = name.trim() ? `${name}: ${input}` : input;
    const updatedComments = [...comments, newComment];

    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));

    setInput("");
    setName("");
  };

  const toggleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);

    localStorage.setItem(`liked-${id}`, JSON.stringify(newLiked));
    localStorage.setItem(`likes-${id}`, JSON.stringify(newLikes));
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-[#fbfbfd] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-gray-700">
            yazı bulunamadı
          </h1>

          <Link
            href="/yazilarim"
            className="text-[#9b95d6] mt-5 inline-block"
          >
            yazılara dön →
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs =
    Array.isArray(post.content)
      ? post.content
      : String(post.content || "").split("\n").filter((p) => p.trim() !== "");

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/yazilarim"
          className="text-sm text-[#9b95d6] hover:text-gray-700 transition"
        >
          ← yazılara dön
        </Link>

        <header className="mt-12 mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-[#a8a1dc] font-semibold mb-5">
            Blog • {post.date}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-gray-700 leading-tight">
            {post.title} <span className="text-[#a8a1dc]">♡</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
            {post.desc}
          </p>
        </header>

        <div className="relative w-full h-[390px] rounded-3xl overflow-hidden shadow-sm mb-12">
          <Image
            src={post.image || "/post1.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <section className="max-w-2xl space-y-7 text-[16px] leading-8 text-gray-700">
          {paragraphs.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}

          {post.quote && (
            <blockquote className="border-l-2 border-[#a8a1dc] pl-7 my-12 font-serif italic text-2xl text-gray-600 leading-relaxed">
              “{post.quote}”
            </blockquote>
          )}
        </section>

        <div className="max-w-2xl flex flex-wrap gap-3 mt-12">
          {["#blog", "#günlük", "#düşünceler"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full border border-[#d8d4f2] text-[#9b95d6] text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="max-w-2xl mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex items-center justify-between text-sm text-gray-500">
          <button
            onClick={toggleLike}
            className={`transition ${
              liked ? "text-[#a8a1dc]" : "text-[#9b95d6]"
            }`}
          >
            {liked ? "♥" : "♡"} {likes} beğeni
          </button>

          <span>okundu • 3 dk</span>
        </div>

        <div className="max-w-2xl mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-serif text-2xl text-gray-700 mb-4">
            yorum bırak ♡
          </h3>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="adın..."
            className="w-full border-b border-gray-200 py-3 mb-5 outline-none text-sm bg-transparent"
          />

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="bu yazı hakkında ne düşünüyorsun?"
            className="w-full min-h-[130px] resize-none border border-gray-100 rounded-2xl p-4 outline-none text-sm leading-7 bg-[#fbfbfd]"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={addComment}
              className="px-5 py-2 rounded-full bg-[#a8a1dc] text-white text-sm hover:opacity-90 transition"
            >
              gönder
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="bg-[#f7f5ff] px-4 py-3 rounded-xl text-sm text-gray-700 flex justify-between gap-4"
              >
                <span>{comment}</span>

                <button
                  onClick={() => {
                    const updated = comments.filter((_, i) => i !== index);
                    setComments(updated);
                    localStorage.setItem(
                      `comments-${id}`,
                      JSON.stringify(updated)
                    );
                  }}
                  className="text-gray-400 hover:text-[#a8a1dc] transition"
                >
                  sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}