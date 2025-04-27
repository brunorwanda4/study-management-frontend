import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Locale } from "@/i18n";
import {
  classImage,
  schoolLogoImage,
  teacherImage,
} from "@/lib/context/images";
import { ClassAndOthers } from "@/lib/schema/class/class.schema";
import { AuthUserDto, UserSchool } from "@/lib/utils/auth";

interface props {
  currentCls: ClassAndOthers;
  lang: Locale;
  currentSchool?: UserSchool;
  currentUser: AuthUserDto;
}

const ClassHeader = ({
  currentCls,
  // currentUser,
  currentSchool,
  lang,
}: props) => {
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex space-x-2 items-center">
        <MyImage
          src={currentCls.image ? currentCls.image : classImage}
          classname="mask mask-squircle"
          className=" size-20"
        />
        <div className=" ">
          <h4 className=" basic-title">{currentCls.name}</h4>
          <span>@ {currentCls.username}</span>
          {currentCls.teacher && (
            <div className=" flex gap-2">
              <MyImage
                src={
                  currentCls.teacher?.image
                    ? currentCls.teacher.image
                    : teacherImage
                }
                classname="mask mask-squircle"
                className=" size-6"
              />
              {currentCls.teacher.name}
            </div>
          )}
        </div>
      </div>
      {/* school data */}
      {currentCls.school && (
        <div>
          <div className=" flex items-center space-x-2">
            <MyLink
              href={
                currentSchool?.schoolId === currentCls.school.id
                  ? `/${lang}/school`
                  : `/${lang}/school/${currentCls.school.id}`
              }
              loading
              type="link"
            >
              <MyImage
                src={
                  currentCls.school?.logo
                    ? currentCls.school.logo
                    : schoolLogoImage
                }
                alt={currentCls.school.name}
                classname=" object-contain"
                className=" size-16"
              />
            </MyLink>
            <div className="">
              <MyLink
                href={
                  currentSchool?.schoolId === currentCls.school.id
                    ? `/${lang}/school`
                    : `/${lang}/school/${currentCls.school.id}`
                }
                type="link"
                className=" underline-offset-0"
              >
                <h4 className=" basic-title">{currentCls.school.name}</h4>
              </MyLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassHeader;
