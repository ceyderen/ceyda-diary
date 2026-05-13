"use client";

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { use, useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Comment = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const defaultPosts = [
  {
    id: "1",
    title: "yeni başlangıçlar",
    date: "3 Mayıs 2026",
    image: "/post1.jpg",
    desc: "Bazen her şeyi geride bırakmak yeni bir sen yazmak demektir.",
    content: [
      "Bugün biraz durup düşündüm.",
      "Hayat bazen çok hızlı akıyor ve biz fark etmeden aynı yerde kalıyoruz.",
      "Kendime bir söz verdim: daha sade, daha gerçek ve daha cesur olacağım.",
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
      "Bugün kendime küçük bir not bıraktım.",
      "Her şeyi aynı anda çözmek zorunda değilim.",
      "Bazen sadece durmak, nefes almak ve devam etmek yeterli.",
    ],
    quote: "Küçük adımlar da bir yoldur.",
  },
  {
    id: "3",
    title: "içime dönmek",
    date: "8 Mart 2026",
    image: "/post3.jpg",
    desc: "Bazen dış dünyadan uzaklaşmak gerekir.",
    content: [
      "Bugün biraz içime dönmek istedim.",
      "Kalabalığın içinde bile insan kendi sesini duymaya ihtiyaç duyuyor.",
      "Sessizlik bazen en güzel cevap oluyor.",
    ],
    quote: "Kendine dönmek, kaybolmak değil; yolu yeniden bulmaktır.",
  },
];

function getUserKey() {
  let key = localStorage.getItem("ceyda_user_key");

  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem("ceyda_user_key", key);
  }

  return key;
}

function timeAgo(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (diff < 60) return "az önce";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;

  return `${Math.floor(diff / 86400)} gün önce`;
}

export default function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [lastRead, setLastRead] = useState<string | null>(null);

  const fetchLikeCount = async () => {
    const { count } = await supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", id);

    setLikes(count || 0);
  };

  const fetchLiked = async () => {
    const userKey = getUserKey();

    const { data } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", id)
      .eq("user_key", userKey)
      .maybeSingle();

    setLiked(!!data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("post_comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Yorumlar alınamadı:", error.message);
      return;
    }

    setComments(data || []);
  };

  const saveReadTime = async () => {
    const userKey = getUserKey();

    const { data: oldRead } = await supabase
      .from("post_reads")
      .select("last_read_at")
      .eq("post_id", id)
      .eq("user_key", userKey)
      .maybeSingle();

    if (oldRead?.last_read_at) {
      setLastRead(oldRead.last_read_at);
    }

    await supabase.from("post_reads").upsert(
      {
        post_id: id,
        user_key: userKey,
        last_read_at: new Date().toISOString(),
      },
      {
        onConflict: "post_id,user_key",
      }
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (data) {
        setPost(data);
      } else {
        const foundDefault = defaultPosts.find(
          (item) => String(item.id) === String(id)
        );
        setPost(foundDefault || null);
      }
    };

    fetchPost();
    fetchComments();
    fetchLikeCount();
    fetchLiked();
    saveReadTime();
  }, [id]);

  const addComment = async () => {
  if (commentSaving) return;
  if (!input.trim()) return;

  setCommentSaving(true);

  const { error } = await supabase.from("post_comments").insert({
    post_id: id,
    name: name.trim() || "misafir",
    message: input.trim(),
  });

  if (error) {
    console.error("Yorum eklenemedi:", error.message);
    setCommentSaving(false);
    return;
  }

  setInput("");
  setName("");
  await fetchComments();

  setCommentSaving(false);
};

  const toggleLike = async () => {
    const userKey = getUserKey();

    if (liked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", id)
        .eq("user_key", userKey);

      setLiked(false);
    } else {
      await supabase.from("post_likes").insert({
        post_id: id,
        user_key: userKey,
      });

      setLiked(true);
    }

    fetchLikeCount();
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
              Blog • {post.date || new Date(post.created_at).toLocaleDateString("tr-TR")}
            </p>

            <h1 className="font-serif text-5xl md:text-7xl text-[#2f3c5b] leading-tight">
              {post.title} <span className="text-[#a78bfa]">♡</span>
            </h1>

            <p className="text-lg text-[#6f7b98] leading-relaxed mt-6 max-w-2xl">
              {post.desc || post.description}
            </p>
          </header>

          <div className="relative w-full h-[410px] rounded-[32px] overflow-hidden shadow-[0_18px_45px_rgba(180,160,220,0.18)] mb-12">
            <img
            src={post.image || "/post1.jpg"}
            alt={post.title}
            className="h-full w-full object-cover"
            style={{
              objectPosition: `center ${post.image_position ?? 50}%`,
            }}
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

            <span>
              okundu • {lastRead ? timeAgo(lastRead) : "ilk kez"}
            </span>
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
              disabled={commentSaving}
              className={`px-6 py-2.5 rounded-full text-white text-sm shadow-[0_10px_30px_rgba(183,157,247,0.28)] transition ${
                commentSaving
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-[#b79df7] hover:bg-[#aa8ff3]"
              }`}
            >
              {commentSaving ? "gönderiliyor..." : "gönder"}
            </button>
            </div>

            <div className="mt-6 space-y-3">
              {comments.length === 0 ? (
                <p className="text-sm text-[#a5adc2]">
                  henüz yorum yok, ilk yorumu sen bırak ♡
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-[#f7f2ff] px-4 py-3 rounded-xl text-sm text-[#5f6b87] flex justify-between gap-4"
                  >
                    <div>
                      <p>
                        <span className="font-semibold text-[#6f5fb8]">
                          {comment.name}:
                        </span>{" "}
                        {comment.message}
                      </p>
                      <p className="mt-1 text-xs text-[#a5adc2]">
                        {timeAgo(comment.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}