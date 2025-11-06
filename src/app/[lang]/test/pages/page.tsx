import MyAvatar from "@/components/common/image/my-avatar";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const TestingPages = async () => {
  const auth = await authContext();

  if (!auth) {
    redirect(`/en/auth/login`);
  }
  return (
    <div>
      <MyAvatar />
      <MyAvatar />
      <MyAvatar />
      <MyAvatar />
      <MyAvatar />
    </div>
  );
};

export default TestingPages;
