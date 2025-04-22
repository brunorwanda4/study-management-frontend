import SchoolJoinRequestCard from "@/components/cards/school-Join-request-card";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { GetAllJoinSchoolRequestByCurrentUserEmail } from "@/service/school/school-join-request.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "School Dashboard",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  const getSchoolJoinRequest = await GetAllJoinSchoolRequestByCurrentUserEmail(
    currentUser.email
  );
  return (
    <div className=" w-full px-4 py-2 space-y-4 flex justify-center flex-col items-center">
      <div className=" flex flex-col justify-center items-center space-y-2">
        <div className=" flex justify-center items-center w-full h-full gap-2 flex-row-reverse">
          <MyLink
            loading
            href={`/${lang}/s-t/new`}
            button={{ library: "daisy", variant: "info" }}
            type="button"
          >
            <MyImage src="/icons/memo.png" role="ICON" />
            Register your school
          </MyLink>
          <Button library="daisy" variant={"outline"}>
            <MyImage src="/icons/school.png" role="ICON" />
            Join your school
          </Button>
        </div>
      </div>
      {getSchoolJoinRequest.data && (
        <div className=" flex flex-row gap-4 justify-center items-center">
          {getSchoolJoinRequest.data.map((item) => {
            return (
              <SchoolJoinRequestCard
                currentUserImage={currentUser.image}
                key={item.id}
                request={item}
                lang={lang}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SchoolStaffPage;
