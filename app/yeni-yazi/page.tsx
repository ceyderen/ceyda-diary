"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GunlugumPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("/post1.jpg");
  const [imageY, setImageY] = useState(50);
  const [draggingImage, setDraggingImage] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const admin = sessionStorage.getItem("isAdmin");
    if (admin === "true") setIsAdmin(true);
  }, []);

  const handleLogin = () => {
    if (password.trim() === process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim()) {
      sessionStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setErrorText("");
    } else {
      setErrorText("şifre yanlış ♡");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setPassword("");
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("post-images")
      .upload(fileName, file);

    if (error) {
      console.error("Fotoğraf yüklenemedi:", error.message);
      return;
    }

    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);
    setImageY(50);
  };

  const savePost = async () => {
    if (saving) return;
    if (!title.trim() || !content.trim()) return;

    setSaving(true);

    const { error } = await supabase.from("posts").insert([
      {
        title,
        description: content.slice(0, 90) + "...",
        content,
        image,
        image_position: Math.round(Number(imageY)),
      },
    ]);

    if (error) {
      console.error(error.message);
      setSaving(false);
      return;
    }

    setTitle("");
    setContent("");
    setImage("/post1.jpg");
    setImageY(50);
    setSaving(false);

    router.push("/yazilarim");
  };

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbfbfd] px-6">
        <div className="w-full max-w-md rounded-[32px] border border-[#ece7ff] bg-white p-8 shadow-[0_15px_50px_rgba(180,160,230,0.18)]">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#a8a1dc]">
            admin only
          </p>

          <h1 className="mb-3 font-serif text-4xl text-gray-700">
            günlük paneli
          </h1>

          <p className="mb-6 text-sm text-gray-500">
            bu alan sadece sana özel ♡
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="şifre..."
            className="mb-4 w-full rounded-2xl border border-[#ece7ff] bg-[#faf8ff] px-4 py-4 outline-none transition focus:border-[#a8a1dc]"
          />

          {errorText && (
            <p className="mb-4 text-sm text-red-400">{errorText}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-[#a8a1dc] px-5 py-4 text-white transition hover:opacity-90"
          >
            giriş yap
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfbfd] px-6 py-16 text-gray-800">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#a8a1dc]">
              günlüğüm
            </p>

            <h1 className="font-serif text-5xl text-gray-700">
              bugün ne yazmak istersin?
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-[#e5def7] px-4 py-2 text-sm text-[#8f86d8] transition hover:bg-[#faf8ff]"
          >
            çıkış yap
          </button>
        </div>

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
          className="min-h-[260px] w-full resize-none leading-8 text-gray-700 outline-none"
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

          <div
          className="mb-5 cursor-grab overflow-hidden rounded-3xl border border-[#eee7fb] bg-[#faf8ff] active:cursor-grabbing"
          onMouseDown={() => setDraggingImage(true)}
          onMouseUp={() => setDraggingImage(false)}
          onMouseLeave={() => setDraggingImage(false)}
          onMouseMove={(e) => {
            if (!draggingImage) return;

            setImageY((prev) => {
              const next = prev + e.movementY * 0.4;
              return Math.min(100, Math.max(0, next));
            });
          }}
        >
          <img
            src={image}
            alt="seçilen görsel"
            draggable={false}
            className="h-56 w-full select-none object-cover"
            style={{
              objectPosition: `center ${imageY}%`,
            }}
          />
        </div>

          <p className="mb-5 text-xs text-gray-400">
            Fotoğrafın üstüne basılı tutup yukarı/aşağı sürükleyebilirsin.
          </p>

          <div className="grid grid-cols-4 gap-4">
            {["/post1.jpg", "/post2.jpg", "/post3.jpg", "/post4.jpg"].map(
              (img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    setImage(img);
                    setImageY(50);
                  }}
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
          disabled={saving}
          className={`mt-8 rounded-full px-6 py-3 text-white transition ${
            saving
              ? "cursor-not-allowed bg-gray-300"
              : "bg-[#a8a1dc] hover:opacity-90"
          }`}
        >
          {saving ? "kaydediliyor..." : "kaydet"}
        </button>
      </div>
    </main>
  );
}