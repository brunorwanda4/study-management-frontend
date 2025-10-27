// import "server-only";
export type Locale = "en" | "rw";

export const i18n = {
  defaultLocale: "en" as Locale,
  locales: ["en", "rw"] as Locale[],
};

const dictionaries = {
  en: () => import("@/locale/en.json").then((module) => module.default),
  rw: () => import("@/locale/rw.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!(locale in dictionaries)) {
    throw new Error(`Locale ${locale} is not supported`);
  }
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error("Error in getDictionary:", error);
    throw new Error(`Failed to load dictionary for locale ${locale}`);
  }
};
