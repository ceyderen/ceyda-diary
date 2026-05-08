"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sacramento } from "next/font/google";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();

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
    { name: "misafir defteri", href: "/misafir-defteri" },
    { name: "hakkımda", href: "/hakkimda" },
    { name: "iletişim", href: "/iletisim" },
  ];

  return (
    <div className="flex h-20 w-full items-center border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md transition duration-500 dark:border-white/10 dark:bg-[#171923]/90 md:px-10">
      <div className="flex w-full items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span
            className={`${sacramento.className} text-3xl tracking-wide text-gray-400 transition dark:text-gray-200 md:text-4xl`}
          >
            ceyda&apos;s
          </span>

          <span className="text-base font-light text-gray-400 transition dark:text-gray-300">
            diary
          </span>

          <span className="ml-1 text-lg text-[#a8a1dc]">♡</span>
        </Link>

        <nav className="hidden items-center gap-8 font-serif text-[15px] tracking-wide text-gray-700 transition dark:text-gray-200 md:flex lg:gap-12">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex cursor-pointer flex-col items-center gap-1 transition hover:text-[#a8a1dc]"
              >
                <span className={isActive ? "text-[#8f86d8]" : ""}>
                  {item.name}
                </span>

                <span
                  className={`h-1 w-1 rounded-full bg-[#a8a1dc] transition duration-300 ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-xl text-gray-700 transition dark:text-gray-200">
          {showSearch && (
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  window.location.href = `/yazilarim?search=${encodeURIComponent(
                    search.trim()
                  )}`;
                }

                if (e.key === "Escape") {
                  setShowSearch(false);
                  setSearch("");
                }
              }}
              placeholder="yazı ara..."
              className="h-9 w-40 rounded-full border border-[#eee7fb] bg-white/85 px-4 text-sm text-gray-600 outline-none transition focus:w-48 focus:border-[#c9bff0] focus:shadow-[0_0_20px_rgba(180,160,230,0.18)] dark:border-white/10 dark:bg-[#232738]/90 dark:text-gray-100 md:w-48 md:focus:w-60"
            />
          )}

          <button
            type="button"
            onClick={() => {
              setShowSearch(!showSearch);
              if (showSearch) setSearch("");
            }}
            className="cursor-pointer transition hover:text-[#a8a1dc]"
            title="Ara"
          >
            ⌕
          </button>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-[19px] transition hover:scale-110 hover:text-[#a8a1dc]"
            title="dark mode"
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </div>
  );
}