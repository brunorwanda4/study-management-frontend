import type { ClassWithOthers } from "@/lib/schema/class/class-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const TestingPages = async () => {
  const auth = await authContext();

  if (!auth) {
    redirect(`/en/auth/login`);
  }
  const [classes] = await Promise.all([
    apiRequest<void, ClassWithOthers[]>(
      "get",
      `/school/classes/with-others?limit=1`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "class",
      },
    ),
  ]);
  return (
    <div>
      {classes.data && (
        <div>
          {classes.data.map((cls) => (
            <div key={cls._id || cls.id}>{JSON.stringify(cls)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestingPages;
