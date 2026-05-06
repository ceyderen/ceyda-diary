import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import { Sacramento } from "next/font/google";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({ subsets: ["latin"] });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Ceyda's Diary ",
  description: "kişisel blog",
  icons: {
    icon: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} ${cormorant.variable}`}>


        {/* NAVBAR */}
        <div className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-10">
          <div className="w-full flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center gap-2">
              <span className={`${sacramento.className} text-4xl text-gray-400 tracking-wide`}>
                ceyda's
              </span>

              <span className="text-base text-gray-400 font-light">
                diary
              </span>

              <span className="text-[#a8a1dc] text-lg ml-1">
                ♡
              </span>
            </div>

            {/* MENU */}
            <nav className="flex items-center gap-12 font-serif text-[15px] text-gray-700 tracking-wide">
              <div className="relative">
                <Link href="/" className="cursor-pointer">
                ana sayfa
              </Link>
                <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#a8a1dc]" />
              </div>

              <Link
                href="/yazilarim"
                className="cursor-pointer hover:text-[#a8a1dc] transition"
              >
                yazılarım
              </Link>
              
              <Link
                href="/yeni-yazi"
                className="cursor-pointer hover:text-[#a8a1dc] transition"
              >
                günlüğüm
              </Link>
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">foto köşesi</span>
              <Link href="/muzikler">müzikler</Link>
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">hakkımda</span>
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">iletişim</span>
            </nav>

            {/* ICONS */}
            <div className="flex items-center gap-6 text-xl text-gray-700">
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">⌕</span>
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">✧</span>
            </div>
          </div>
        </div>

        {/* SAYFA */}
        {children}

      </body>
    </html>
  );
}