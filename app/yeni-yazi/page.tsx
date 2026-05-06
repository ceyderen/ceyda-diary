"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GunlugumPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("/post1.jpg");

  const router = useRouter();

  const savePost = () => {
    if (!title.trim() || !content.trim()) return;

    const existing = localStorage.getItem("posts");
    const posts = existing ? JSON.parse(existing) : [];

    const newPost = {
      id: crypto.randomUUID(),
      title,
      desc: content.slice(0, 90) + "...",
      image,
      date: new Date().toLocaleDateString("tr-TR"),
      content,
    };

    localStorage.setItem("posts", JSON.stringify([newPost, ...posts]));

    setTitle("");
    setContent("");
    setImage("/post1.jpg");

    router.push("/yazilarim");
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-gray-800 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <p className="text-xs tracking-[0.25em] uppercase text-[#a8a1dc] mb-4">
          günlüğüm
        </p>

        <h1 className="font-serif text-5xl text-gray-700 mb-6">
          bugün ne yazmak istersin?
        </h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="başlık..."
          className="w-full border-b border-gray-200 py-4 outline-none text-2xl font-serif mb-8"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="bugün neler hissettin?"
          className="w-full min-h-[260px] resize-none outline-none leading-8 text-gray-700"
        />

        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">yazı görseli seç</p>

          <div className="grid grid-cols-4 gap-4">
            {["/post1.jpg", "/post2.jpg", "/post3.jpg", "/post4.jpg"].map(
              (img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImage(img)}
                  className={`relative h-24 rounded-2xl overflow-hidden border-2 transition ${
                    image === img
                      ? "border-[#a8a1dc] scale-105"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="seçilecek görsel"
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        </div>

        <button
          onClick={savePost}
          className="mt-8 px-6 py-3 rounded-full bg-[#a8a1dc] text-white hover:opacity-90 transition"
        >
          kaydet
        </button>
      </div>
    </main>
  );
}