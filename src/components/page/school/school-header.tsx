import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Locale } from "@/i18n";
import {
  schoolBackground,
  schoolImage,
  schoolLogoImage,
} from "@/lib/context/images";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import Link from "next/link";
import { TfiWorld } from "react-icons/tfi";

interface props {
  lang: Locale;
  onThePage?: boolean;
  school?: School;
  auth: AuthContext;
}

const SchoolHeader = ({ school, auth, lang, onThePage }: props) => {
  return (
    <div className="space-y-2">
      {!onThePage && (
        <MyImage
          src={schoolBackground}
          className="h-80 w-full"
          classname=" card rounded-t-none"
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MyLink loading href={`/${lang}/school`}>
            <Avatar className="size-32">
              <AvatarImage src={school?.logo ? school.logo : schoolLogoImage} />
              <AvatarFallback>{school?.name}</AvatarFallback>
            </Avatar>
          </MyLink>
          <div className="space-y-1">
            <MyLink
              className="underline-offset-0"
              loading
              href={`/${lang}/school`}
            >
              <h1 className="basic-title">
                {school?.name ? school.name : "School name"}
              </h1>
            </MyLink>
            <Link href={`/${lang}/school`} className="link-hover">
              @ {school?.username ? school.username : "school_username"}
            </Link>
            <div>
              <div className="text-myGray flex items-center space-x-2 text-sm font-semibold">
                <TfiWorld />
                <span>
                  {school?.school_type ? school.school_type : "Public school"}
                </span>
              </div>
            </div>
            {/* TODO: to add school days */}
            {/* <div className=" flex -space-x-1 items-center text-myGray">
              <FaSchool />
              <div className=" flex items-center -space-x-2">
                <Dot size={32} />
                <div>Boarding school</div>
              </div>
              <div className=" flex items-center -space-x-2">
                <Dot size={32} />
                <div>Day school</div>
              </div>
            </div> */}
          </div>
        </div>
        {school?.id === auth.school?.id && (
          <div className="flex items-center space-x-2">
            <MyImage
              className="size-20"
              classname="mask mask-squircle"
              src={auth.user?.image ? auth.user.image : schoolImage}
            />
            <div>
              <h4 className="basic-title">{auth.user.name}</h4>
              <span>{auth.user?.role}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolHeader;
