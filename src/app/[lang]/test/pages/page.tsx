import CreateClassForm from "@/components/page/class/form/create-class-form";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const TestingPages = async () => {
  const auth = await authContext();

  if (!auth) {
    redirect(`/en/auth/login`);
  }
  return <CreateClassForm auth={auth} />;
};

export default TestingPages;
