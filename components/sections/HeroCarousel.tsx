"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const slides = [
  {
    src: "/images/2019-05-CONG-NHA-THO-LANG-CAT-1-540x415.jpg",
    alt: "Cổng nhà thờ giáo xứ Láng Cát",
  },
  {
    src: "/images/2019-05-DSC00173-540x405.jpg",
    alt: "Khu biệt thự sinh thái Châu Pha",
  },
  {
    src: "/images/2019-07-4-Copy-1.jpg",
    alt: "Công trình xây dựng Mạnh Hùng",
  },
];

export default function HeroCarousel() {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="absolute inset-0 bg-[#0d1b2a]" />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover opacity-75"
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}

      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full hero-overlay">
        <div className="text-center text-white max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Est. 2009 · Bà Rịa - Vũng Tàu
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            {t("heroTagline")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/danh-sach-du-an"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              {t("viewProjects")}
            </Link>
            <Link
              href="/lien-he"
              className="border-2 border-white/60 hover:border-orange-400 text-white hover:text-orange-400 font-bold px-8 py-3 rounded-lg transition-colors"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-orange-500 w-6" : "bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
