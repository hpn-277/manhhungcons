"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const logos = [
  { src: "/images/clients/logo-bvbr.jpg", alt: "Bệnh Viện Bà Rịa" },
  { src: "/images/clients/logo-auri.jpg", alt: "AURI" },
  { src: "/images/clients/logo_kduy.jpg", alt: "K Duy" },
  { src: "/images/clients/HQC-1.jpg", alt: "HQC" },
  { src: "/images/clients/DIC2.jpg", alt: "DIC" },
  { src: "/images/clients/doi-tac-manh-hung-1.jpg", alt: "Đối tác Mạnh Hùng" },
  { src: "/images/clients/doi-tac-manh-hung-2.jpg", alt: "Đối tác Mạnh Hùng" },
  { src: "/images/clients/doi-tac-manh-hung-3.jpg", alt: "Đối tác Mạnh Hùng" },
  { src: "/images/clients/doi-tac-manh-hung.jpg", alt: "Đối tác Mạnh Hùng" },
  { src: "/images/clients/doi-tac-manh-hung.png", alt: "Đối tác Mạnh Hùng" },
];

export default function Clients() {
  const t = useTranslations("home");

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            {t("clientsTitle")}
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto" />
        </div>

        {/* Marquee wrapper */}
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-10 items-center animate-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="shrink-0 w-36 h-20 relative"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
