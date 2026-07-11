import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { SITE_URL, localizedMetadata } from "@/lib/site";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Công Ty TNHH Xây Dựng Mạnh Hùng",
  alternateName: "Xây Dựng Mạnh Hùng",
  image: `${SITE_URL}/logo.jpg`,
  url: SITE_URL,
  telephone: ["+84984781709", "+842543827775"],
  email: "manhhungcons@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "107B Khu phố Chu Hải, Phường Tân Hải",
    addressLocality: "Thành phố Phú Mỹ",
    addressRegion: "Bà Rịa - Vũng Tàu",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.5013138,
    longitude: 107.1139271,
  },
  areaServed: "Bà Rịa - Vũng Tàu",
  sameAs: ["https://www.facebook.com/manhhungconstructor"],
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    ...localizedMetadata(locale, "", {
      title: isEn ? "Manh Hung Construction" : "Xây Dựng Mạnh Hùng",
      description: isEn
        ? "Manh Hung Construction Co., Ltd. - Factory, industrial, and residential construction services in Ba Ria - Vung Tau."
        : "Công Ty TNHH Xây Dựng Mạnh Hùng - Dịch vụ thi công, xây dựng nhà xưởng, nhà ở, công trình công nghiệp và dân dụng tại Bà Rịa - Vũng Tàu",
    }),
    title: {
      default: isEn ? "Manh Hung Construction" : "Xây Dựng Mạnh Hùng",
      template: isEn ? "%s | Manh Hung Construction" : "%s | Xây Dựng Mạnh Hùng",
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: isEn ? "Manh Hung Construction" : "Xây Dựng Mạnh Hùng",
      locale: isEn ? "en_US" : "vi_VN",
      type: "website",
      images: [`${SITE_URL}/logo.jpg`],
    },
    twitter: {
      card: "summary",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
