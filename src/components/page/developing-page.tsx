"use client";
import type { Locale } from "@/i18n";
import { redirectContents } from "@/lib/hooks/redirect";
import type { userRole } from "@/lib/schema/common-details-schema";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import MyImage from "../common/myImage";
import MyLink from "../common/myLink";
import { Button } from "../ui/button";

interface props {
  lang: Locale;
  role?: userRole;
}

const DevelopingPage = ({ lang, role }: props) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <MyImage
          className="h-80 w-96"
          classname=" object-contain"
          src="/png/developing.png"
        />
        <div>
          <div className="text-center">
            <p className=" ">
              {"Sorry this page we are developing it try again later 😔"}
            </p>
            <div className="mt-2 flex justify-center space-x-2">
              <MyLink
                loading
                button={{ library: "daisy", variant: "default" }}
                type="button"
                href={redirectContents({ lang, role : role ?? "STUDENT" })}
              >
                <MyImage role="ICON" src="/icons/3d-house.png" /> Go Home
              </MyLink>
              <Button
                library="daisy"
                variant="info"
                onClick={() => handleGoBack()}
              >
                <BsArrowLeft /> Go back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopingPage;
