"use client";
import { IoLanguageOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import MyImage from "../myComponents/myImage";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/i18n";

const AuthLang = () => {
  const pathname = usePathname();
  const router = useRouter();
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLanguage = (lang : Locale) => {
      router.push(redirectedPathName(lang));
  }

  return (
    <div className=" flex space-x-2">
      <div className=" flex space-x-2 items-center ">
        {" "}
        <IoLanguageOutline /> <span>Change Languages:</span>
      </div>
      <Button onClick={() => handleLanguage("en")} library="shadcn" variant={"ghost"} size={"sm"} className=" cursor-pointer">
        <MyImage
          src="https://cdn-icons-png.flaticon.com/512/197/197374.png"
          role="ICON"
        />{" "}
        English
      </Button>
      <Button onClick={() => handleLanguage("rw")} library="shadcn" variant={"ghost"} size={"sm"} className=" cursor-pointer">
        <MyImage
          src="https://cdn-icons-png.flaticon.com/512/16022/16022575.png"
          role="ICON"
        />
        Kinyarwanda
      </Button>
    </div>
  );
};

export default AuthLang;
