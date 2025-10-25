import { i18n, type Locale } from "@/i18n";
import {
  authContext,
  refreshAuthToken,
  setAuthCookies,
  willExpireSoon,
} from "@/lib/utils/auth-context";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { jwtDecode } from "jwt-decode";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./router";

function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const locales: Locale[] = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(
      languages,
      locales,
      i18n.defaultLocale as Locale,
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
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const auth = await authContext();
  const isLoggedIn = !!auth;

  if (
    auth?.user &&
    auth.token &&
    (await willExpireSoon(jwtDecode<{ exp: number }>(auth.token).exp))
  ) {
    const newToken = await refreshAuthToken(auth.token);
    if (newToken)
      await setAuthCookies(
        newToken,
        auth.user.id,
        auth.schoolToken ?? undefined,
      );
  }

  const detectedLocale = extractLocaleFromPath(pathname) || getLocale(req);

  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  if (
    publicRoutes.some(
      (route) =>
        pathname === route ||
        pathname === `/${detectedLocale}${route}` ||
        pathname === `/${detectedLocale}`,
    ) ||
    authRoutes.some(
      (route) =>
        pathname === route ||
        pathname === `/${detectedLocale}${route}` ||
        pathname === `/${detectedLocale}`,
    )
  ) {
    if (!pathname.startsWith(`/${detectedLocale}`)) {
      const localePath =
        pathname === "/"
          ? `/${detectedLocale}`
          : `/${detectedLocale}${
              pathname.startsWith("/") ? pathname : `/${pathname}`
            }`;
      return NextResponse.redirect(new URL(localePath, nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    if (!pathname.startsWith(`/${detectedLocale}/auth/login`)) {
      const redirectUrl = new URL(
        `/${detectedLocale}/auth/login`,
        nextUrl.origin,
      );
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith(`/${detectedLocale}`)) {
    const localePrefixPath = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(new URL(localePrefixPath, nextUrl.origin));
  }

  return NextResponse.next();
}

export default async function Middleware(req: NextRequest) {
  const res = (await authMiddleware(req)) ?? NextResponse.next();
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
