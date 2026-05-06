"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type IntroPage = {
  id: number;
  type: "intro";
  title: string;
  subtitle: string;
  photos: string[];
};

type EditorialPage = {
  id: number;
  type: "editorial";
  title: string;
  subtitle: string;
  mainPhoto: string;
  sidePhotos: string[];
};

type CollagePage = {
  id: number;
  type: "collage";
  title: string;
  subtitle: string;
  photos: string[];
};

type Page = IntroPage | EditorialPage | CollagePage;

const pages: Page[] = [
  {
    id: 1,
    type: "intro",
    title: "foto köşesi",
    subtitle: "anılar, şehirler,\nışıklar.",
    photos: ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg", "/photos/4.jpg", "/photos/5.jpg"],
  },
  {
    id: 2,
    type: "editorial",
    title: "warsaw,\napril 2026",
    subtitle: "some cities feel like unfinished dreams.",
    mainPhoto: "/photos/editorial.jpg",
    sidePhotos: ["/photos/6.jpg", "/photos/7.jpg"],
  },
  {
    id: 3,
    type: "collage",
    title: "memory collage",
    subtitle: "tiny things i wanted to keep.",
    photos: ["/photos/8.jpg", "/photos/9.jpg", "/photos/10.jpg", "/photos/11.jpg", "/photos/12.jpg", "/photos/13.jpg"],
  },
];

export default function FotoKosesiPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-[#f8f5fb] text-[#2f3341]">
      <div
        ref={scrollRef}
        className="no-scrollbar flex h-full cursor-grab snap-x snap-mandatory scroll-pl-20 gap-16 overflow-x-auto scroll-smooth px-20 py-10 active:cursor-grabbing"
      >
        {pages.map((page) => (
          <section
            key={page.id}
            className="relative h-[820px] w-[1400px] shrink-0 snap-center overflow-hidden rounded-[42px] border border-[#eee7f7] bg-[url('/paper.png')] bg-no-repeat bg-center bg-[length:1400px_820px] shadow-[0_20px_60px_rgba(180,160,210,0.15)] animate-[fadeIn_1.2s_ease] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_60%)] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03))]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[url('/grain.png')] opacity-[0.03]" />

            <div className="absolute bottom-10 right-10 z-20 text-[11px] tracking-[0.3em] text-[#b7adc9]">
              0{page.id} / 03
            </div>

            {page.type === "intro" && (
              <>
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#f1ebf8]" />

                <div className="absolute left-0 top-0 flex h-full w-1/2 flex-col justify-between px-20 py-24">
                  <div>
                    <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#b4aac8]">
                      0{page.id}
                    </p>

                    <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#bbaecc]">
                      personal archive
                    </p>

                    <h1 className="font-serif text-[82px] leading-[0.9] text-[#3d3b4b]">
                      {page.title}
                    </h1>

                    <p className="mt-10 whitespace-pre-line text-[24px] leading-[1.8] text-[#746f85]">
                      {page.subtitle}
                    </p>

                    <p className="mt-6 rotate-[-2deg] text-lg italic text-[#a08eb8]">
                      kept somewhere between memory and feeling.
                    </p>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-full w-1/2 p-16">
                  <div className="relative h-full w-full">
                    {page.photos.map((photo, index) => (
                      <div
                      key={index}
                      onClick={() => setSelectedPhoto(photo)}
                      className="absolute cursor-pointer bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-500 hover:z-50 hover:-translate-y-2 hover:scale-[1.05] animate-[float_6s_ease-in-out_infinite]"
                        style={{
                          width: index === 0 ? "240px" : index === 2 ? "260px" : "220px",
                          transform: `rotate(${index % 2 === 0 ? "-4deg" : "3deg"})`,
                          top: index === 0 ? "20px" : index === 1 ? "120px" : index === 2 ? "320px" : index === 3 ? "430px" : "230px",
                          left: index === 0 ? "20px" : index === 1 ? "280px" : index === 2 ? "120px" : index === 3 ? "360px" : "220px",
                        }}
                      >
                        <div className="absolute left-1/2 top-[-10px] z-20 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-[#e9dcc7]/80 shadow-sm backdrop-blur-sm" />

                        <div className="relative h-[240px] w-full overflow-hidden">
                          <Image src={photo} alt="" fill className="object-cover transition-transform duration-700 hover:scale-110" />
                        </div>

                        <p className="mt-4 text-center text-sm italic text-[#857b99]">
                          march 2026
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {page.type === "editorial" && (
              <div className="relative z-10 grid h-full grid-cols-[1.1fr_0.9fr] gap-12 p-16">
                <div
                onClick={() => setSelectedPhoto(page.mainPhoto)}
                className="
                relative
                cursor-pointer
                overflow-hidden
                rounded-[28px]

                shadow-[0_18px_40px_rgba(0,0,0,0.16)]

                transition-all
                duration-700

                hover:-translate-y-2
                hover:scale-[1.01]
                hover:shadow-[0_30px_70px_rgba(0,0,0,0.24)]
                "
              >
                  <Image src={page.mainPhoto} alt="" fill className="object-cover" />
                </div>

                <div className="flex flex-col justify-between py-8">
                  <div>
                    <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-[#b6aacd]">
                      editorial memory
                    </p>

                    <h1 className="whitespace-pre-line font-serif text-[82px] leading-[0.9] text-[#3c3948]">
                      {page.title}
                    </h1>

                    <p className="mt-10 text-[24px] leading-[1.7] text-[#746f85]">
                      {page.subtitle}
                    </p>

                    <p className="mt-8 max-w-[400px] text-[17px] leading-[1.9] text-[#8f86a5]">
                      some places feel softer after midnight. some memories only return through colors and light.
                    </p>
                  </div>

                  <div className="flex gap-6">
                    {page.sidePhotos.map((photo, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPhoto(photo)}
                    className="
                    relative
                    h-[200px]
                    w-[180px]
                    cursor-pointer
                    overflow-hidden
                    rounded-[22px]

                    shadow-[0_16px_35px_rgba(0,0,0,0.14)]

                    transition-all
                    duration-500

                    hover:-translate-y-2
                    hover:scale-[1.04]
                    hover:shadow-[0_25px_50px_rgba(0,0,0,0.22)]
                    "                  >                       
                   <Image src={photo} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {page.type === "collage" && (
              <div className="relative z-10 h-full w-full p-16">
                <h1 className="absolute left-16 top-10 font-serif text-[70px] text-[#433f52]">
                  {page.title}
                </h1>

                <p className="absolute left-16 top-[130px] text-lg italic text-[#9d92b2]">
                  {page.subtitle}
                </p>

                {page.photos.map((photo, index) => (
                  <div
                  key={index}
                  onClick={() => setSelectedPhoto(photo)}
                      className="
                      absolute
                      cursor-pointer
                      overflow-hidden
                      rounded-[24px]

                      transition-all
                      duration-500

                      hover:z-50
                      hover:-translate-y-3
                      hover:scale-[1.05]
                      "                 
                      
                      style={{
                      width: index === 0 ? "320px" : index === 1 ? "230px" : index === 2 ? "260px" : index === 3 ? "300px" : index === 4 ? "220px" : "250px",
                      height: index === 0 ? "400px" : index === 1 ? "260px" : index === 2 ? "300px" : index === 3 ? "220px" : index === 4 ? "300px" : "240px",
                      top: index === 0 ? "180px" : index === 1 ? "90px" : index === 2 ? "420px" : index === 3 ? "180px" : index === 4 ? "460px" : "300px",
                      left: index === 0 ? "80px" : index === 1 ? "450px" : index === 2 ? "420px" : index === 3 ? "820px" : index === 4 ? "980px" : "760px",
                      transform: `rotate(${index % 2 === 0 ? "-6deg" : "5deg"})`,
                    }}
                  >
                    <Image src={photo} alt="" fill className="object-cover" />
                  </div>
                ))}

                <p className="absolute bottom-16 right-20 rotate-[-4deg] text-[22px] italic text-[#9f92b6]">
                  “some moments only exist here now.”
                </p>
              </div>
            )}

            <div className="absolute right-[-100px] top-8 h-[770px] w-[160px] rounded-r-[40px] border border-[#ebe2f5] bg-[#f4eef8] opacity-80 shadow-inner" />
          </section>
        ))}
      </div>
            {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#16121f]/60 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[78vh] w-[72vw] overflow-hidden rounded-[34px] border border-white/30 bg-white/20 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
          >
            <Image
              src={selectedPhoto}
              alt=""
              fill
              className="object-contain p-4"
            />

            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-6 top-6 z-10 rounded-full bg-white/80 px-4 py-2 text-sm text-[#3d374c] shadow-md backdrop-blur"
            >
              kapat
            </button>

            <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/75 px-5 py-2 text-sm italic text-[#7c7193] backdrop-blur">
              kept somewhere soft.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}