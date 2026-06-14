import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";

export default function Footer() {
  const t = useTranslations("footer");

  const services = [
    { href: "/dich-vu/sua-chua-bao-tri", label: "Sửa Chữa & Bảo Trì" },
    { href: "/dich-vu/xay-dung-biet-thu-mini-nha-cap-4-tron-goi", label: "Biệt Thự & Nhà Ở" },
    { href: "/dich-vu/xay-dung-co-so-ha-tang-ky-thuat", label: "Cơ Sở Hạ Tầng" },
{ href: "/dich-vu/xay-dung-nha-xuong", label: "Xây Dựng Nhà Xưởng" },
  ];

  return (
    <footer className="bg-[#0d1b2a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo-mh.png"
              alt="Xây Dựng Mạnh Hùng"
              width={52}
              height={52}
              className="object-contain"
            />
            <span className="text-white font-bold text-lg">Xây Dựng Mạnh Hùng</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            {t("company")}
            <br />
            {t("taxId")}
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/manhhungconstructor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              <FaFacebook size={20} />
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
            <li className="flex gap-2 items-start">
              <MdLocationOn className="text-orange-500 mt-0.5 shrink-0" size={18} />
              <div className="space-y-1">
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Địa chỉ thuế</span>
                  <p>107B Khu phố Chu Hải, Phường Tân Hải, TP Hồ Chí Minh, Việt Nam</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Địa chỉ văn phòng</span>
                  <p>107B Khu phố Chu Hải, Phường Tân Hải, Thành Phố Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu, Việt Nam</p>
                </div>
              </div>
            </li>
            <li className="flex gap-2 items-center">
              <MdPhone className="text-orange-500 shrink-0" size={18} />
              <a href="tel:0984781709" className="hover:text-orange-400 transition-colors">
                0984 781 709
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <MdEmail className="text-orange-500 shrink-0" size={18} />
              <a href="mailto:manhhungcons@gmail.com" className="hover:text-orange-400 transition-colors">
                manhhungcons@gmail.com
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <MdAccessTime className="text-orange-500 shrink-0" size={18} />
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
