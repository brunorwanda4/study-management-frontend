import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

interface props {
  lang: Locale;
  title: string;
  total: number;
  Ftotal: number;
  Mtotal: number;
  role: string;
  icon : string;
}
 
const StaffPeople = ({ lang,Ftotal,Mtotal, icon, total, title, role }: props) => {
  return (
    <Card className="w-1/3">
      <CardHeader className=" flex justify-between">
        <CardTitle className="   flex gap-2 space-x-1 items-center">
          <MyImage className=" size-6" src={icon} />
          <h5 className=" basic-title text-my">{title}</h5>
        </CardTitle>
        <Button library="daisy" size="sm" variant="ghost" shape="circle">
          <BsThreeDots />
        </Button>
      </CardHeader>
      <CardContent>
        <div className=" flex items-center space-x-4">
          <div className=" font-semibold text-3xl" >{total}</div>
          <Link
            href={`/${lang}/school-staff/people`}
            className=" font-medium link-hover text-myGray text-sm"
          >
            {role}{" "}
          </Link>
        </div>
        {/* school members */}
        <div className=" space-x-2 flex ">
          <Button library="daisy" size="sm" className=" px-1">
            <span className="  text-xl font-medium">{Mtotal}</span>
            <span className=" text-sm font-normal">Males</span>
          </Button>
          <Button library="daisy" size="sm" className=" px-1">
            <span className="  text-xl font-medium">{Ftotal}</span>
            <span className=" text-sm font-normal">Females</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffPeople;
