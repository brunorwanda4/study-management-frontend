"use client";

import MyImage from "@/components/common/myImage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { i18n, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BsGearWide, BsPalette } from "react-icons/bs";
import { IoLanguageSharp } from "react-icons/io5";

interface props {
  lang: Locale;
  diction: any;
}

const AuthSetting = ({ lang, diction }: props) => {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState<Locale>(lang);

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleSave = () => {
    router.push(redirectedPathName(selectedLang));
  };

  const handleThemeChange = (e: string) => {
    setTheme(e);
  };

  const mainTheme = ["dark", "light"];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          shape="circle"
          library="daisy"
          className=" absolute right-2 top-2 btn-square btn-circle z-50"
        >
          <BsGearWide size={24} />
          <span className=" sr-only">auth setting</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{diction.dialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {diction.dialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" flex flex-col gap-1">
          {/* language */}
          <div className="">
            <div className=" flex gap-2 items-center">
              <IoLanguageSharp />
              <h4 className=" happy-title-base text-base">
                {diction.dialog.language.title}
              </h4>
            </div>
            <div className=" flex-col flex gap-px mt-2">
              {i18n.locales.map((locale) => (
                <Button
                  key={locale}
                  variant="ghost"
                  size="sm"
                  className=" justify-start"
                >
                  <label
                    key={locale}
                    htmlFor={locale}
                    className=" justify-between flex w-full"
                  >
                    <div className=" flex items-center gap-2">
                      <input
                        className=" size-4 radio radio-info radio-sm"
                        value={locale}
                        name="language"
                        checked={selectedLang === locale}
                        id={locale}
                        type="radio"
                        onChange={() => setSelectedLang(locale)}
                      />
                      {locale === "rw" ? (
                        <span>{diction.dialog.language.rw}</span>
                      ) : (
                        <span>{diction.dialog.language.en}</span>
                      )}
                    </div>
                    <MyImage
                      src={`/icons/${locale === "rw" ? "rwanda" : "english"}.png`}
                      className=" size-4"
                    />
                  </label>
                </Button>
              ))}
            </div>
          </div>
          {/* theme */}
          <div className="">
            <div className=" flex gap-2 items-center">
              <BsPalette />
              <h4 className=" happy-title-base text-base">
                {diction.dialog.theme.title}
              </h4>
            </div>
            <div className=" flex-col flex gap-1">
              {mainTheme.map((t) => (
                <Button
                  className=" justify-between"
                  onClick={() => handleThemeChange(t)}
                  key={t}
                  size="sm"
                  variant="ghost"
                >
                  <span
                    className={cn(
                      " capitalize",
                      resolvedTheme === t && "text-info",
                    )}
                  >
                    {t}
                  </span>
                  <MyImage
                    src={`/icons/${t === "dark" ? "moon" : "sun"}.png`}
                    className=" size-4"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant={"outline"}
              className="capitalize"
              library="daisy"
              size={"sm"}
            >
              {diction.dialog.button.cancel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSave}
            className={cn(
              "capitalize",
              buttonVariants({
                size: "sm",
                variant: "secondary",
                library: "daisy",
              }),
            )}
          >
            {diction.dialog.button.save}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthSetting;
