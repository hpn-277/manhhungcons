import { useTranslations } from "next-intl";
import { getProjects } from "@/lib/content";
import ProjectsFilter from "@/components/ui/ProjectsFilter";

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const projects = getProjects();

  return (
    <>
      <div className="bg-[#0d1b2a] pt-32 pb-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{t("title")}</h1>
          <p className="text-gray-300 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ProjectsFilter projects={projects} />
        </div>
      </section>
    </>
  );
}
