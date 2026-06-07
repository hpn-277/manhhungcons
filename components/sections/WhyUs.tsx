import { useTranslations } from "next-intl";

const icons = ["🏆", "⭐", "💡", "🤝"];

export default function WhyUs() {
  const t = useTranslations("home");
  const keys = ["professional", "quality", "innovation", "support"] as const;

  return (
    <section className="py-20 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
            {t("whyTitle")}
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keys.map((key, i) => (
            <div
              key={key}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-colors"
            >
              <div className="text-3xl mb-4">{icons[i]}</div>
              <h3 className="text-white font-bold text-lg mb-2">
                {t(`why.${key}.title`)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(`why.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
