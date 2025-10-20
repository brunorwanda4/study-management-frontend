import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import SchoolAdministrationForm from "@/components/table/school/create-school-administration-form ";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Locale } from "@/i18n";
import { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ schoolUsername: string }>;
}): Promise<Metadata> {
  const { schoolUsername } = await params;
  const auth = await authContext();
  if (!auth) return { title: "user not found", description: "User not login" };
  const school = await apiRequest<void, School>(
    "get",
    `/schools/username/${schoolUsername}`,
    undefined,
    { token: auth.token },
  );

  if (!school.data)
    return {
      title: `${schoolUsername} school | space-together`,
      description: `Details for school ${schoolUsername}`,
    };

  return {
    title: `${school.data.name} Administration | space-together`,
    description: `${school.data.description}`,
  };
}

interface props {
  params: Promise<{ lang: Locale; schoolUsername: string }>;
}

const AdministrationPage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolUsername } = params;
  const auth = await authContext();
  if (!auth) return redirect(`/${lang}/auth/login`);

  if (auth.user.role !== "SCHOOLSTAFF")
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
          <CardTitle>
            Add school staff <strong>{school.data.name}</strong>
          </CardTitle>
          <CardDescription>
            Fill out the form below to provide details about the school&apos;s
            administration and staff.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SchoolAdministrationForm school={school.data} auth={auth} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdministrationPage;
