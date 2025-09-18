import MyImage from "@/components/common/myImage";
import { Locale } from "@/i18n";
import { toLowerCase } from "@/lib/functions/characters";
import { AuthUserDto } from "@/lib/utils/auth";
import Link from "next/link";

interface props {
  lang: Locale;
  user: AuthUserDto;
}
const SettingHeader = ({ user, lang }: props) => {
  return (
    <div className="m-4 flex justify-between">
      <div className="flex items-center gap-2">
        <MyImage
          role="AVATAR"
          className="size-40"
          src={user?.image || "/images/p.jpg"}
        />
        <div className="flex flex-col space-y-1">
          <div>
            <h4 className="text-lg font-semibold">{user.name}</h4>
          </div>
          <div>
            <span>username:</span>
            <span className="to-myGray text-sm">
              @{" "}
              {!!user?.username ? (
                user.username
              ) : (
                <span className="text-warning">No username</span>
              )}
            </span>
          </div>
          <div>
            <span>Role :</span>{" "}
            <span className="text-sm font-semibold capitalize">
              {user.role && toLowerCase(user.role)}
            </span>
          </div>
          <div>
            <span>Email :</span>{" "}
            <span className="text-sm font-semibold">{user.email}</span>
          </div>
          <Link href={`/${lang}/settings/profile`}></Link>
        </div>
      </div>
      <div>{/* TODO: add links which explain about user activities */}</div>
    </div>
  );
};

export default SettingHeader;
