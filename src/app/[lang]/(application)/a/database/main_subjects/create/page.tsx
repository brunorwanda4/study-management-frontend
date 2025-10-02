import CreateMainSubjectClientPage from "@/components/page/admin/main-subject/create-main-subject-client-page";
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
  return <CreateMainSubjectClientPage auth={auth} />;
};

export default CreateMainSubjectPage;
