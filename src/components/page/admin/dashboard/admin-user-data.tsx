import MyImage from "@/components/common/myImage";
import { AuthUserResult } from "@/lib/utils/auth-user";

interface props {
  auth: AuthUserResult;
}

const AdminUserData = ({ auth }: props) => {
  return (
    <section className="flex items-center gap-4">
      <MyImage
        src={auth.user.image || "/icons/bog.png"}
        role="AVATAR"
        className="size-28"
        original
        priority
      />
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-medium">{auth.user.name}</h4>
        <span className="">@{auth.user.name}</span>
        <span className="text-sm font-medium">{auth.user.role}</span>
      </div>
    </section>
  );
};

export default AdminUserData;
