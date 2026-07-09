import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    // Legacy WordPress URLs still indexed by Google, mapped to their closest
    // equivalent on the new site. Default locale (vi) has no URL prefix.
    return [
      {
        source: "/thi-cong-be-nuoc-ngam",
        destination: "/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
      {
        source: "/dieu-kien-khi-thi-cong-be-xu-ly-nuoc-thai",
        destination: "/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
      {
        source: "/cac-tieu-chuan-khi-thi-cong-be-nuoc-pccc",
        destination: "/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
      {
        source: "/thi-cong-be-cong-nghiep-bang-be-tong-cot-thep",
        destination: "/dich-vu/xay-dung-co-so-ha-tang-ky-thuat",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
