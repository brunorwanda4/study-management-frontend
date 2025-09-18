import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

interface props {
  lang: Locale;
}
const StaffClasses = ({ lang }: props) => {
  return (
    <div className="basic-card p-0">
      <div className="border-b-border flex justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2 space-x-1">
          <MyImage className="size-6" src="/icons/blackboard.png" />
          <h5 className="basic-title text-my">Classes</h5>
        </div>
        <Button library="daisy" size="sm" variant="ghost" shape="circle">
          <BsThreeDots />
        </Button>
      </div>
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-semibold">24</div>
          <Link
            href={`/${lang}/school-staff/classes`}
            className="link-hover text-myGray text-sm font-medium"
          >
            All Classes
          </Link>
        </div>
        {/* school members */}
        <div className="flex space-x-1">
          <Button size="sm" className="px-1">
            <span className="text-xl font-medium">12</span>
            <span className="text-sm font-normal">Primary</span>
          </Button>
          <Button size="sm" className="px-1">
            <span className="text-xl font-medium">14</span>
            <span className="text-sm font-normal">O-Lever</span>
          </Button>
          <Button size="sm" className="px-1">
            <span className="text-xl font-medium">21</span>
            <span className="text-sm font-normal">E-Lever</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffClasses;
