"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to an API route
    setSent(true);
  };

  return (
    <>
      <section className="pt-32 py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{t("title")}</h1>
            <p className="text-gray-500">{t("subtitle")}</p>
            <div className="w-12 h-1 bg-orange-500 mt-3" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-8">Thông Tin Liên Hệ</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{t("address")}</div>
                    <div className="text-gray-500 text-sm space-y-1">
                      <p><span className="font-medium text-gray-600">Địa chỉ thuế:</span> 107B Khu phố Chu Hải, Phường Tân Hải, TP Hồ Chí Minh, Việt Nam</p>
                      <p><span className="font-medium text-gray-600">Văn phòng:</span> 107B Khu phố Chu Hải, Phường Tân Hải, Thành Phố Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu, Việt Nam</p>
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{t("phone")}</div>
                    <a href="tel:0984781709" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                      0984 781 709
                    </a>
                    <br />
                    <a href="tel:02543827775" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                      02543 827 775
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{t("email")}</div>
                    <a href="mailto:manhhungcons@gmail.com" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                      manhhungcons@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    🕐
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{t("hours")}</div>
                    <div className="text-gray-500 text-sm">Thứ 2 - Thứ 7: 7:00 - 18:00</div>
                    <div className="text-gray-400 text-xs">Chủ Nhật: Nghỉ</div>
                  </div>
                </li>
              </ul>

              {/* Map placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-100 h-64 bg-gray-100 flex items-center justify-center">
                <iframe
                  src="https://maps.google.com/maps?q=C%C3%B4ng+ty+TNHH+X%C3%A2y+D%E1%BB%B1ng+M%E1%BA%A1nh+H%C3%B9ng&ll=10.5013138,107.1139271&z=17&hl=vi&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-8">Gửi Tin Nhắn</h2>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-green-700 font-semibold">{t("formSuccess")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("formName")}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("formEmail")}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("formSubject")}</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("formMessage")}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    {t("formSend")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
