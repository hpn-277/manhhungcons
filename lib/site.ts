import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.xaydungmanhhung.vn";

// Default locale ("vi") has no URL prefix (localePrefix: "as-needed"); only
// non-default locales are prefixed, e.g. "/en".
export function localePath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path === "" ? "/" : path;
  return `/${locale}${path}`;
}

export function localizedMetadata(
  locale: string,
  path: string,
  meta: { title: string; description: string }
) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])
  );
  return {
    ...meta,
    alternates: {
      canonical: localePath(locale, path),
      languages,
    },
  };
}
