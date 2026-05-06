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
    const foundPost = allPosts.find((item) => String(item.id) === String(id));

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
      <main className="min-h-screen bg-[#fbf9ff] flex items-center justify-center">
        <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-[#eee7fb] shadow-[0_20px_70px_rgba(180,160,220,0.16)] px-12 py-10 text-center">
          <h1 className="font-serif text-4xl text-[#35415c]">
            yazı bulunamadı
          </h1>

          <Link href="/yazilarim" className="text-[#a78bfa] mt-5 inline-block">
            yazılara dön →
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = Array.isArray(post.content)
    ? post.content
    : String(post.content || "")
        .split("\n")
        .filter((p) => p.trim() !== "");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf9ff] text-[#35415c]">
      <div className="absolute top-0 left-[-220px] h-[520px] w-[520px] rounded-full bg-[#eadcff] opacity-35 blur-3xl" />
      <div className="absolute right-[-180px] top-[260px] h-[480px] w-[480px] rounded-full bg-[#f3dfff] opacity-35 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/yazilarim"
          className="text-sm text-[#9b8ee8] hover:text-[#35415c] transition"
        >
          ← yazılara dön
        </Link>

        <article className="mt-10 rounded-[36px] bg-white/75 backdrop-blur-xl border border-[#eee7fb] shadow-[0_20px_80px_rgba(180,160,220,0.14)] p-8 md:p-12">
          <header className="mb-8">
            <p className="text-xs tracking-[0.25em] uppercase text-[#a78bfa] font-semibold mb-5">
              Blog • {post.date}
            </p>

            <h1 className="font-serif text-5xl md:text-7xl text-[#2f3c5b] leading-tight">
              {post.title} <span className="text-[#a78bfa]">♡</span>
            </h1>

            <p className="text-lg text-[#6f7b98] leading-relaxed mt-6 max-w-2xl">
              {post.desc}
            </p>
          </header>

          <div className="relative w-full h-[410px] rounded-[32px] overflow-hidden shadow-[0_18px_45px_rgba(180,160,220,0.18)] mb-12">
            <Image
              src={post.image || "/post1.jpg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <section className="max-w-2xl space-y-7 text-[16px] leading-8 text-[#5f6b87]">
            {paragraphs.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}

            {post.quote && (
              <blockquote className="rounded-[28px] bg-[#f4eeff] border border-[#eee7fb] px-7 py-6 my-12 font-serif italic text-2xl text-[#65708c] leading-relaxed">
                “{post.quote}”
              </blockquote>
            )}
          </section>

          <div className="max-w-2xl flex flex-wrap gap-3 mt-12">
            {["#blog", "#günlük", "#düşünceler"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-[#d8c4ff] bg-[#fbf8ff] text-[#9b8ee8] text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="max-w-2xl mt-8 bg-[#fbf8ff] rounded-2xl border border-[#eee7fb] px-6 py-5 flex items-center justify-between text-sm text-[#7b86a0]">
            <button
              onClick={toggleLike}
              className={`transition ${
                liked ? "text-[#a78bfa]" : "text-[#9b8ee8]"
              }`}
            >
              {liked ? "♥" : "♡"} {likes} beğeni
            </button>

            <span>okundu • 3 dk</span>
          </div>

          <div className="max-w-2xl mt-12 bg-white/85 rounded-[30px] shadow-sm border border-[#eee7fb] p-6">
            <h3 className="font-serif text-2xl text-[#35415c] mb-4">
              yorum bırak ♡
            </h3>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="adın..."
              className="w-full border-b border-[#e4dcf8] py-3 mb-5 outline-none text-sm bg-transparent placeholder:text-[#a5adc2]"
            />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="bu yazı hakkında ne düşünüyorsun?"
              className="w-full min-h-[130px] resize-none border border-[#eee7fb] rounded-2xl p-4 outline-none text-sm leading-7 bg-[#fcfaff] placeholder:text-[#a5adc2]"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={addComment}
                className="px-6 py-2.5 rounded-full bg-[#b79df7] text-white text-sm shadow-[0_10px_30px_rgba(183,157,247,0.28)] hover:bg-[#aa8ff3] transition"
              >
                gönder
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-[#f7f2ff] px-4 py-3 rounded-xl text-sm text-[#5f6b87] flex justify-between gap-4"
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
                    className="text-[#a5adc2] hover:text-[#a78bfa] transition"
                  >
                    sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}