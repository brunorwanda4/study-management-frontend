import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import { SchoolAcademicForm } from "@/components/page/school/create/school-academic-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Locale } from "@/i18n";
import { School } from "@/lib/schema/school/school-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "school - Academic",
};
interface props {
  params: Promise<{ lang: Locale; schoolUsername: string }>;
}

const SchoolAcademicOnboardingPage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolUsername } = params;
  const auth = await authUser();
  if (!auth) return redirect(`/${lang}/auth/login`);

  const allowedRoles = ["ADMIN", "SCHOOLSTAFF"];
  if (!auth.user.role || !allowedRoles.includes(auth.user.role))
    return <PermissionPage lang={lang} role={auth.user.role ?? "STUDENT"} />;

  const school = await apiRequest<void, School>(
    "get",
    `/schools/username/${schoolUsername}`,
    undefined,
    { token: auth.token },
  );
  if (!school.data) return <NotFoundPage />;

  if (school.data.creator_id !== auth.user.id)
    return <PermissionPage lang={lang} role={auth.user.role ?? "STUDENT"} />;
  return (
    <div className="mt-4 space-y-2 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Educational Background Information</CardTitle>
          <CardDescription>
            Please provide details about the academic offerings based on the
            school&apos;s configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SchoolAcademicForm school={school.data} lang={lang} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolAcademicOnboardingPage;
