import "./globals.css";
import { Cormorant_Garamond, Inter, Sacramento } from "next/font/google";
import Link from "next/link";

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
  title: "Ceyda's Diary",
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
    <html lang="tr">
      <body className={`${inter.className} ${cormorant.variable}`}>
        <div className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-10">
          <div className="w-full flex items-center justify-between">
            
            <Link href="/" className="flex items-center gap-2">
              <span
                className={`${sacramento.className} text-4xl text-gray-400 tracking-wide`}
              >
                ceyda&apos;s
              </span>

              <span className="text-base text-gray-400 font-light">
                diary
              </span>

              <span className="text-[#a8a1dc] text-lg ml-1">
                ♡
              </span>
            </Link>

            <nav className="flex items-center gap-12 font-serif text-[15px] text-gray-700 tracking-wide">
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

            <div className="flex items-center gap-6 text-xl text-gray-700">
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">
                ⌕
              </span>
              <span className="cursor-pointer hover:text-[#a8a1dc] transition">
                ✧
              </span>
            </div>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}