"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sacramento } from "next/font/google";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const menuItems = [
    { name: "ana sayfa", href: "/" },
    { name: "yazılarım", href: "/yazilarim" },
    { name: "günlüğüm", href: "/yeni-yazi" },
    { name: "anı defteri", href: "/foto-kosesi" },
    { name: "müzikler", href: "/muzikler" },
    { name: "hakkımda", href: "/hakkimda" },
    { name: "iletişim", href: "/iletisim" },
  ];

  return (
    <div className="w-full h-20 bg-white/80 dark:bg-[#171923]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/10 flex items-center px-10 transition duration-500">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`${sacramento.className} text-4xl text-gray-400 dark:text-gray-200 tracking-wide transition`}
          >
            ceyda&apos;s
          </span>

          <span className="text-base text-gray-400 dark:text-gray-300 font-light transition">
            diary
          </span>

          <span className="text-[#a8a1dc] text-lg ml-1">♡</span>
        </Link>

        <nav className="flex items-center gap-12 font-serif text-[15px] text-gray-700 dark:text-gray-200 tracking-wide transition">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer hover:text-[#a8a1dc] transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-xl text-gray-700 dark:text-gray-200 transition">
          <span className="cursor-pointer hover:text-[#a8a1dc] transition">
            ⌕
          </span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-[19px] hover:text-[#a8a1dc] hover:scale-110 transition"
            title="dark mode"
          >
            {darkMode ? "☀" : "☾"}
          </button>

          <span className="cursor-pointer hover:text-[#a8a1dc] transition">
            ✧
          </span>
        </div>
      </div>
    </div>
  );
}