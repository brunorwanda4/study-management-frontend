import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  lang: Locale;
  auth: AuthContext;
}

const StaffDashboardDetails = async ({ lang, auth }: Props) => {
  const [total_student, total_female_student, total_male_student] =
    await Promise.all([
      apiRequest<void, any>("get", "/school/students/stats/count", undefined, {
        token: auth.token,
        schoolToken: auth.schoolToken,
      }),
      apiRequest<void, any>(
        "get",
        "/school/students/stats/count?gender=FEMALE",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      ),
      apiRequest<void, any>(
        "get",
        "/school/students/stats/count?gender=MALE",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      ),
    ]);
  return (
    <div className="flex w-full space-x-4">
      {/* <StaffPeople
        icon="/icons/student.png"
        total={total_student.data.count}
        title="Students"
        link={`/${lang}/s-t/students`}
        Ftotal={
          students.filter((student) => student.gender === "FEMALE").length
        }
        Mtotal={students.filter((student) => student.gender === "MALE").length}
        role="Total students"
      />
       */}
      staff dashboard details
    </div>
  );
};

export default StaffDashboardDetails;
