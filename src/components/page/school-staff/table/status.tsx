import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

interface props {
  lang: Locale;
  title: string;
  total: number;
  Ftotal: number;
  Mtotal: number;
  role: string;
}

export const StaffPeople = ({
  lang,
  total,
  Ftotal,
  Mtotal,
  title,
  role,
}: props) => {
  return (
    <div className="happy-card p-0">
      <div className="border-b-border flex justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2 space-x-1">
          <MyImage className="size-6" src="/icons/group.png" />
          <h5 className="basic-title text-my">{title}</h5>
        </div>
        <Button size="sm" variant="ghost">
          <BsThreeDots />
        </Button>
      </div>
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-semibold">{total}</div>
          <Link
            href={`/${lang}/school-staff/people`}
            className="link-hover text-myGray text-sm font-medium"
          >
            {role}{" "}
          </Link>
        </div>
        {/* school members */}
        <div className="flex space-x-4">
          <Button size="sm" className="px-1">
            <span className="text-xl font-medium">{Mtotal}</span>
            <span className="text-sm font-normal">Males</span>
          </Button>
          <Button size="sm" className="px-1">
            <span className="text-xl font-medium">{Ftotal}</span>
            <span className="text-sm font-normal">Females</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
