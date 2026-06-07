"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-black text-orange-500">
        {count}{suffix}
      </div>
      <div className="text-gray-600 mt-2 font-medium">{label}</div>
    </div>
  );
}

export default function StatCounter() {
  const t = useTranslations("home.stats");

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat value={15} suffix="+" label={t("years")} />
          <Stat value={23} suffix="+" label={t("projects")} />
          <Stat value={5} suffix="" label={t("services")} />
          <Stat value={9} suffix="+" label={t("clients")} />
        </div>
      </div>
    </section>
  );
}
