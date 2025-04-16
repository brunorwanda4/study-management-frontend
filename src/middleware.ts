import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, Locale } from "@/i18n";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./router";
// import { RedirectContents } from "./utils/context/redirect-content";

function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: Locale[] = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(
      languages,
      locales,
      i18n.defaultLocale as Locale
    );
    if (!locale || !locales.includes(locale as Locale)) {
      throw new RangeError(`Locale ${locale} is not supported`);
    }
    return locale as Locale;
  } catch {
    return i18n.defaultLocale as Locale;
  }
}

function extractLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split("/");
  if (segments.length > 1 && i18n.locales.includes(segments[1] as Locale)) {
    return segments[1] as Locale;
  }
  return null;
}

async function authMiddleware(req: NextRequest) {
//   const isLoggedIn = await getUserFromSession();
  const pathname = req.nextUrl.pathname;
  const detectedLocale = extractLocaleFromPath(pathname) || getLocale(req);

  if (pathname.startsWith(apiAuthPrefix)) return NextResponse.next()

  if (
    publicRoutes.some(
      (route) =>
        pathname === route ||
        pathname === `/${detectedLocale}${route}` ||
        pathname === `/${detectedLocale}`
    ) ||
    authRoutes.some(
      (route) =>
        pathname === route ||
        pathname === `/${detectedLocale}${route}` ||
        pathname === `/${detectedLocale}`
    )
  ) {
    // Redirect public route without a locale to a locale-prefixed route
    if (!pathname.startsWith(`/${detectedLocale}`)) {
      const localePath =
        pathname === "/"
          ? `/${detectedLocale}`
          : `/${detectedLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`
          }`;
      return NextResponse.redirect(new URL(localePath, req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith(`/${detectedLocale}`)) {
    const localePrefixPath = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(new URL(localePrefixPath,  req.nextUrl.origin));
  }

//   if (!isLoggedIn) {
//     if (!pathname.startsWith(`/${detectedLocale}/auth/login`)) {
//       return NextResponse.redirect(
//         new URL(`/${detectedLocale}/auth/login`, req.nextUrl.origin)
//       );
//     }
//     return NextResponse.next(); // Prevent redirect loop for login page
//   }

  return NextResponse.next();
}

export default async function Middleware(req:NextRequest) {
  const res = (await authMiddleware(req)) ?? NextResponse.next();
//   await updateUserSessionExpires()
  return res;
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"], // Protect all routes except for assets
};
