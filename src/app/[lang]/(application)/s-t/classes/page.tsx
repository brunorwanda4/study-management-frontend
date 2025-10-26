import PermissionPage from "@/components/page/permission-page";
import ClassesSchoolTable from "@/components/page/school-staff/table/class-table/classes-table";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { ClassWithOthers } from "@/lib/schema/class/class-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Class Management",
  description: "Manage your class members and their roles",
  keywords: "class, management, students, teachers",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffClassesPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school)
    return <PermissionPage lang={lang} role={auth.user.role ?? "STUDENT"} />;

  const [classes] = await Promise.all([
    apiRequest<void, ClassWithOthers[]>(
      "get",
      `/school/classes/with-details`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "class",
      },
    ),
  ]);

  return (
    <RealtimeProvider<ClassWithOthers>
      channels={[
        {
          name: "class",
          initialData: classes.data ?? [],
        },
      ]}
    >
      <div className="max-w-full space-y-2 p-4">
        <h2 className="title-page">Classes</h2>
        <div>
          <ClassesSchoolTable lang={lang} classes={classes.data ?? []} />
        </div>
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffClassesPage;
