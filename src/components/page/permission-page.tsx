"use client";
import { Locale } from "@/i18n";
import { redirectContents } from "@/lib/hooks/redirect";
import { UserRoleDto } from "@/lib/schema/user/user.dto";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import MyImage from "../common/myImage";
import MyLink from "../common/myLink";
import { Button } from "../ui/button";

interface props {
  description?: string;
  lang: Locale;
  role: UserRoleDto;
}

const PermissionPage = ({ description, lang, role }: props) => {
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
          src="/png/permission.png"
        />
        <div>
          <div className="text-center">
            <p className=" ">
              {!!description
                ? description
                : "Your permission not allowed on this page"}
            </p>
            <div className="mt-2 flex justify-center space-x-2">
              <MyLink
                button={{ library: "daisy", variant: "default" }}
                type="button"
                href={redirectContents({ lang, role })}
              >
                <MyImage role="ICON" src="/icons/3d-house.png" /> Go Home
              </MyLink>
              <Button
                library="daisy"
                size="sm"
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

export default PermissionPage;
