import { useTranslations } from "next-intl";
import { getProjects } from "@/lib/content";
import ProjectsFilter from "@/components/ui/ProjectsFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Công Trình Đã Thực Hiện",
  description:
    "Các công trình thi công, xây dựng nhà ở, nhà xưởng, hạ tầng kỹ thuật tiêu biểu của Mạnh Hùng tại Bà Rịa - Vũng Tàu.",
};

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const projects = getProjects();

  return (
    <>
      <section className="pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{t("title")}</h1>
            <p className="text-gray-500">{t("subtitle")}</p>
            <div className="w-12 h-1 bg-orange-500 mt-3" />
          </div>
          <ProjectsFilter projects={projects} />
        </div>
      </section>
    </>
  );
}
