"use client";

import { useState } from "react";

export default function YeniYazi() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title || !content) return;

    const existing = localStorage.getItem("posts");
    const posts = existing ? JSON.parse(existing) : [];

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    const updated = [newPost, ...posts];

    localStorage.setItem("posts", JSON.stringify(updated));

    setTitle("");
    setContent("");

    alert("yazı eklendi ✨");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f2f0]">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-[400px] space-y-4">
        
        <h2 className="font-serif text-2xl text-center">
          yeni yazı ekle ✨
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="başlık..."
          className="w-full p-3 rounded-xl border outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="bugün ne hissettin..."
          className="w-full p-3 rounded-xl border h-32 resize-none outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#b7b0e8] text-white py-2 rounded-xl hover:scale-105 transition"
        >
          kaydet
        </button>

      </div>
    </div>
  );
}