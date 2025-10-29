"use client";
import MyImage from "@/components/common/myImage";
import AppLogo from "@/components/page/application/navbar/app-logo";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type JSX } from "react";
import { GrLinkNext } from "react-icons/gr";

interface props {
  lang: Locale;
  diction: any;
}

const AuthLayoutImage = ({ lang, diction }: props) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const SentenceBreaker = (sentence: string): JSX.Element => {
    const splitSentence = sentence.split(",").map((part, index) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < sentence.split(",").length - 1 && <br />}
      </React.Fragment>
    ));

    return (
      <p className=" font-semibold text-2xl text-white text-center">
        {splitSentence}
      </p>
    );
  };

  const isOnboarding = new RegExp(`^/${lang}/auth/onboarding`).test(pathname);

  return (
    <div className={cn("w-1/2 h-screen fixed", isOnboarding && " w-1/3")}>
      <div
        className={cn(
          "absolute z-50 top-0 items-center m-2 flex justify-between w-full",
          theme && "text-white",
        )}
      >
        <div className={cn(" p-2")}>
          <AppLogo lang={lang} />
        </div>
        <Link
          className={cn(
            "btn btn-sm group mr-4 z- btn-ghost backdrop-blur-lg bg-white/10",
            theme === "dark" && "hover:bg-black/30",
          )}
          href={`/${lang}/`}
        >
          {diction.goBack}
          <GrLinkNext className="group/toHome duration-300 group-hover:scale-x-125" />
        </Link>
      </div>
      <div className=" w-full h-full relative">
        <MyImage
          src={cn("/images/2.jpg")}
          alt="Picture of the author"
          className="  h-full w-full"
        />
        {theme === "dark" && (
          <div className=" absolute w-full top-0 bg-black/20 z-10 h-screen" />
        )}
        <div className=" absolute w-full bottom-0 bg-linear-to-t from-black to-transparent h-1/4 z-10">
          <div className=" w-full relative mt-4">
            {pathname === `/${lang}/auth/register` && (
              <div className=" ">
                {SentenceBreaker(diction.spaceTogether)}
                <div className="  flex justify-center mt-8 gap-2">
                  <div className=" h-1 w-[12%] bg-white backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-1/12 bg-white/40 backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-1/12 bg-white/40 backdrop-blur-lg rounded-full" />
                </div>
              </div>
            )}
            {pathname === `/${lang}/auth/onboarding` && (
              <div className=" ">
                {SentenceBreaker(diction.onboarding.description)}
                <div className="  flex justify-center mt-8 gap-2">
                  <div className=" h-1 w-1/12 bg-white backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-[12%] bg-white backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-1/12 bg-white/40 backdrop-blur-lg rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutImage;
