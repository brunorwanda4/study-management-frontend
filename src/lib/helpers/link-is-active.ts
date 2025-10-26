import type { Locale } from "@/i18n";

export const isActivePath = (
  currentPath: string,
  targetUrl: string | undefined,
  lang?: Locale,
) => {
  if (!targetUrl) return false;

  const normalizedTarget = lang ? `/${lang}${targetUrl}` : targetUrl;

  const exactMatchRoutes = ["/a/", "/a", "/s-t", "/s-t/"];

  const requiresExactMatch = exactMatchRoutes.some(
    (route) => route === targetUrl || `/${lang}${route}` === normalizedTarget,
  );

  if (requiresExactMatch) {
    return (
      currentPath === normalizedTarget || currentPath === `${normalizedTarget}/`
    );
  }

  return (
    currentPath.startsWith(normalizedTarget) &&
    (currentPath === normalizedTarget ||
      currentPath.startsWith(`${normalizedTarget}/`))
  );
};
