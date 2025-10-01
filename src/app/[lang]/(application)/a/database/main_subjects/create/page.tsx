import CreateMainSubjectForm from "@/components/page/admin/main-subject/create-main-subject-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authUser } from "@/lib/utils/auth-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create main Subject",
  description: "Create new main subject",
};

const CreateMainSubjectPage = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create new subject</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateMainSubjectForm auth={auth} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMainSubjectPage;
