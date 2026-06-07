"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/gioi-thieu", label: t("about") },
    { href: "/danh-sach-du-an", label: t("projects") },
    { href: "/dich-vu", label: t("services") },
    { href: "/blog", label: t("blog") },
    { href: "/lien-he", label: t("contact") },
  ];

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === "vi" ? "en" : "vi" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-black text-sm">MH</span>
          </div>
          <span
            className={`font-bold text-lg leading-tight hidden sm:block ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Xây Dựng<br />
            <span className="text-orange-500">Mạnh Hùng</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className={`text-sm font-semibold px-3 py-1 rounded border transition-colors ${
              scrolled
                ? "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500"
                : "border-white/50 text-white hover:border-orange-400 hover:text-orange-400"
            }`}
          >
            {locale === "vi" ? "EN" : "VI"}
          </button>

          <Link
            href="/lien-he"
            className="hidden lg:block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
          >
            {t("getQuote")}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? "bg-gray-800" : "bg-white"}`} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? "bg-gray-800" : "bg-white"}`} />
            <div className={`w-6 h-0.5 transition-all ${scrolled ? "bg-gray-800" : "bg-white"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 font-medium py-2 border-b border-gray-100 hover:text-orange-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lien-he"
              className="mt-3 bg-orange-500 text-white text-center font-semibold py-2 rounded hover:bg-orange-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t("getQuote")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
