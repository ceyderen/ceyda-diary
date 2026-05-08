"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GunlugumPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("/post1.jpg");

  const router = useRouter();

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

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
    <main className="min-h-screen bg-[#fbfbfd] px-6 py-16 text-gray-800">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#a8a1dc]">
          günlüğüm
        </p>

        <h1 className="mb-6 font-serif text-5xl text-gray-700">
          bugün ne yazmak istersin?
        </h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="başlık..."
          className="mb-8 w-full border-b border-gray-200 py-4 font-serif text-2xl outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="bugün neler hissettin?"
          className="min-h-[260px] w-full resize-none text-gray-700 outline-none leading-8"
        />

        <div className="mt-8">
          <p className="mb-4 text-sm text-gray-500">yazı görseli seç</p>

          <label className="mb-5 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#cfc6ef] bg-[#faf8ff] px-5 py-5 text-sm text-[#8f86d8] transition hover:bg-[#f3efff]">
            upload photo ♡
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadPhoto}
              className="hidden"
            />
          </label>

          <div className="mb-5 overflow-hidden rounded-3xl border border-[#eee7fb] bg-[#faf8ff]">
            <img
              src={image}
              alt="seçilen görsel"
              className="h-56 w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {["/post1.jpg", "/post2.jpg", "/post3.jpg", "/post4.jpg"].map(
              (img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImage(img)}
                  className={`relative h-24 overflow-hidden rounded-2xl border-2 transition ${
                    image === img
                      ? "scale-105 border-[#a8a1dc]"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="seçilecek görsel"
                    className="h-full w-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={savePost}
          className="mt-8 rounded-full bg-[#a8a1dc] px-6 py-3 text-white transition hover:opacity-90"
        >
          kaydet
        </button>
      </div>
    </main>
  );
}