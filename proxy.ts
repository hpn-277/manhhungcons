import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Leftover from this domain's previous WordPress-era site. Scanners and
// scrapers still probe these paths constantly; reject them before they
// reach next-intl routing or any page render.
const BOT_PROBE_PATHS = /^\/(wp-json|wp-admin|wp-content|wp-includes|xmlrpc\.php|feed|comments\/feed|category|author|tag|wp-login\.php)(\/|$)/;

export default function proxy(request: NextRequest) {
  if (BOT_PROBE_PATHS.test(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 404 });
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
