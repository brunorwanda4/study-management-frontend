import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TfiWorld } from "react-icons/tfi";
import {  FaUserMinus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { Locale } from "@/i18n";
import MyImage from "@/components/myComponents/myImage";
import { SchoolAndOthers, } from "@/lib/schema/school.dto";

interface props {
  isMySchool?: boolean;
  lang: Locale;
  onThePage?: boolean;
  school ?: SchoolAndOthers;
}

const SchoolHeader = ({ isMySchool, school ,lang, onThePage }: props) => {
  return (
    <div className=" space-y-2">
      {!onThePage && (
        <MyImage
          src={school?.logo ? school.logo : "https://img.freepik.com/free-photo/red-buildings-households_1127-2024.jpg?t=st=1745209220~exp=1745212820~hmac=bfe15881f9ddcdf60c6b18bf704e12723017253ffb865653e6f4d12b9bfb1d37&w=1380"}
          className=" w-full h-80"
          classname=" card rounded-t-none"
        />
      )}
      <div className=" flex justify-between items-center">
        <div className=" flex space-x-2 items-center">
          <Avatar className=" size-32">
            <AvatarImage src={school?.logo ? school.logo : "https://img.freepik.com/free-vector/gradient-school-logo-design-template_23-2149664347.jpg?t=st=1745211049~exp=1745214649~hmac=678f349c9bd7752892a1fe4e786b2071c68c9c58a033d1066eab7663a99d4f4c&w=826"} />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className=" space-y-1">
            <h1 className=" basic-title">{school?.name ? school.name : "School name"}</h1>
            <Link href={`/${lang}/school`} className=" link-hover">@ {school?.username ? school.username:"school_username"}</Link>
            <div>
              <div className=" text-sm text-myGray flex space-x-2 font-semibold items-center">
                <TfiWorld />
                <span>{school?.schoolType ? school.schoolType :"Public school"}</span>
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
        <div>
          {!onThePage &&
            (!isMySchool ? (
              <Link href={`/${lang}/school/school-username/ask-to-join`}>
                <Button library="daisy" variant="info">
                  <FaUserPlus />
                  Ask Join school
                </Button>
              </Link>
            ) : (
              <Button library="daisy" variant="error">
                {" "}
                <FaUserMinus /> Left school
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolHeader;
