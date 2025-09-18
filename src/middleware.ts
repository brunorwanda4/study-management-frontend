import { i18n, Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./router";

function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

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
  //   const isLoggedIn = await getUserFromSession();
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!(await authUser()); // Check if the user is authenticated
  const detectedLocale = extractLocaleFromPath(pathname) || getLocale(req);

  // Step 1: Handle API auth routes (always allowed)
  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Step 2: Avoid redirect if already on a public or auth route
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
    // Redirect public route without a locale to a locale-prefixed route
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

  // Step 3: Redirect unauthorized users to login (skip redirect loops)
  if (!isLoggedIn) {
    if (!pathname.startsWith(`/${detectedLocale}/auth/login`)) {
      const redirectUrl = new URL(
        `/${detectedLocale}/auth/login`,
        nextUrl.origin,
      );
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next(); // Prevent redirect loop for login page
  }

  // Step 4: Add locale to the path if missing
  if (!pathname.startsWith(`/${detectedLocale}`)) {
    const localePrefixPath = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(new URL(localePrefixPath, nextUrl.origin));
  }

  // const user = request.auth?.user;

  // if (user?.role === "STUDENT" && pathname.startsWith(`/${detectedLocale}/teacher`)) {
  //   return NextResponse.redirect(new URL("/", nextUrl.origin));
  // }

  // Redirect if the user is logged in but not a teacher and tries to access the teacher page
  // if (
  //   isLoggedIn &&
  //   user?.role !== "ADMIN" &&
  //   pathname.startsWith(`/${detectedLocale}/admin`)
  // ) {
  //   return NextResponse.redirect(new URL(`/${detectedLocale}/${user?.role}`, nextUrl.origin));
  // }

  // Step 5: Allow authenticated users to access protected routes
  return NextResponse.next();
}

export default async function Middleware(req: NextRequest) {
  const res = (await authMiddleware(req)) ?? NextResponse.next();
  //   await updateUserSessionExpires()
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ], // Protect all routes except for assets
};
