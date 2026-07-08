import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    // Legacy WordPress URLs still indexed by Google, mapped to their closest
    // equivalent on the new site. Destinations include the /vi/ prefix to
    // avoid a second redirect hop through the locale middleware.
    return [
      {
        source: "/thi-cong-be-nuoc-ngam",
        destination: "/vi/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
      {
        source: "/dieu-kien-khi-thi-cong-be-xu-ly-nuoc-thai",
        destination: "/vi/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
      {
        source: "/cac-tieu-chuan-khi-thi-cong-be-nuoc-pccc",
        destination: "/vi/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
      {
        source: "/thi-cong-be-cong-nghiep-bang-be-tong-cot-thep",
        destination: "/vi/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
