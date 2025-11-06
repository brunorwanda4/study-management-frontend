import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import {
  classImage,
  schoolLogoImage,
  teacherImage,
} from "@/lib/context/images";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  currentCls: ClassWithOthers;
  lang: Locale;
  currentSchool?: School;
  currentUser: AuthContext;
}

const ClassHeader = ({
  currentCls,
  // currentUser,
  currentSchool,
  lang,
}: props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <MyImage
          src={currentCls.image ? currentCls.image : classImage}
          classname="mask mask-squircle"
          className="size-20"
        />
        <div className=" ">
          <h4 className="basic-title">{currentCls.name}</h4>
          <span>@ {currentCls.username}</span>
          {currentCls.class_teacher && (
            <MyLink
              loading
              href={`/${lang}/p/${currentCls.class_teacher.user_id}?teacherId=${currentCls.class_teacher_id}`}
              className="flex gap-2"
            >
              <MyImage
                src={
                  currentCls.class_teacher?.image
                    ? currentCls.class_teacher.image
                    : teacherImage
                }
                classname="mask mask-squircle"
                className="size-6"
              />
              {currentCls.class_teacher.name}
            </MyLink>
          )}
        </div>
      </div>
      {/* school data */}
      {currentCls.school && (
        <div>
          <div className="flex items-center space-x-2">
            <MyLink
              href={
                currentSchool?.id === currentCls.school.id
                  ? `/${lang}/school`
                  : `/${lang}/school/${currentCls.school.username}`
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
                className="size-16"
              />
            </MyLink>
            <div className="">
              <MyLink
                href={
                  currentSchool?.id === currentCls.school.id
                    ? `/${lang}/school`
                    : `/${lang}/school/${currentCls.school.id}`
                }
                type="link"
                className="underline-offset-0"
              >
                <h4 className="basic-title">{currentCls.school.name}</h4>
              </MyLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassHeader;
