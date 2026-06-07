import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const services = [
    { href: "/dich-vu/sua-chua-bao-tri", label: "Sửa Chữa & Bảo Trì" },
    { href: "/dich-vu/xay-dung-biet-thu-mini-nha-cap-4-tron-goi", label: "Biệt Thự & Nhà Ở" },
    { href: "/dich-vu/xay-dung-co-so-ha-tang-ky-thuat", label: "Cơ Sở Hạ Tầng" },
    { href: "/dich-vu/xay-dung-nha-tho", label: "Xây Nhà Thô" },
    { href: "/dich-vu/xay-dung-nha-xuong", label: "Xây Dựng Nhà Xưởng" },
  ];

  return (
    <footer className="bg-[#0d1b2a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">MH</span>
            </div>
            <span className="text-white font-bold text-lg">Xây Dựng Mạnh Hùng</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            {t("company")}
            <br />
            {t("taxId")}
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/xaydungmanhhung"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              f
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            {t("services")}
          </h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            {t("contact")}
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2">
              <span className="text-orange-500 mt-0.5">📍</span>
              <span>Thị Xã Phú Mỹ, Bà Rịa - Vũng Tàu</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500">📞</span>
              <a href="tel:0984781709" className="hover:text-orange-400 transition-colors">
                0984 781 709
              </a>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500">✉️</span>
              <a href="mailto:manhhungcons@gmail.com" className="hover:text-orange-400 transition-colors">
                manhhungcons@gmail.com
              </a>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500">🕐</span>
              <span>Thứ 2 - Thứ 7: 7:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-gray-500">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
