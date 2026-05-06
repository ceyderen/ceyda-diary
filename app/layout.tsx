import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "../components/Navbar";

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
  return (
    <html lang="tr">
      <body className={`${inter.className} ${cormorant.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}