import SchoolJoinRequestCard from "@/components/cards/school-Join-request-card";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import NotFoundPage from "@/components/page/not-found";
import StaffDashboardDetails from "@/components/page/school-staff/dashboard/staff-dashboard-details";
// import StaffSchoolDashboardRequest from "@/components/page/school-staff/dashboard/staff-dashboard-request";
import SchoolHeader from "@/components/page/school/school-header";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { GetAllJoinSchoolRequestByCurrentUserEmail } from "@/service/school/school-join-request.service";
import { getSchoolByIdService } from "@/service/school/school.service";
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
  const [currentUser, currentSchool] = await Promise.all([
    await getAuthUserServer(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }

  // page which shown base on user
  if (currentSchool) {
    const school = await getSchoolByIdService(currentSchool.schoolId);
    if (!school.data) return <NotFoundPage />;
    return (
      <div className=" p-4 space-y-4 w-full">
        <SchoolHeader school={school.data} onThePage lang={lang} />
        <StaffDashboardDetails schoolStaffs={school.data.SchoolStaff} teachers={school.data.Teacher} students={school.data.Student} lang={lang} />
        <div className=" flex space-x-4">
          <div className=" w-1/2 space-y-4">
            {/* <StaffSchoolDashboardRequest requests={school.data.SchoolJoinRequest}/> */}
            {/* <PostCard lang={lang} postRole="IMAGE" /> */}
          </div>
          <div className=" w-1/2">
            {/* <StaffDashboardActions /> */}
          </div>
        </div>
        {/* <ExampleTable /> */}
       <div className=" flex space-x-4">
       <div className=" basic-card">
       {/* <SchoolJoinTable items={school.data.SchoolJoinRequest}/> */}
       </div>
       <div>
        hello
       </div>
       </div>
      </div>
    );
  }

  const getSchoolJoinRequest = await GetAllJoinSchoolRequestByCurrentUserEmail(
    currentUser.email
  );
  return (
    <div className=" w-full px-4 py-2 space-y-4 grid place-content-center h-full">
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
            if (item.status !== "pending") return null;
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
