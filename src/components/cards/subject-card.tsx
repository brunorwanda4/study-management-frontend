import Link from "next/link";
import MyImage from "@/components/myComponents/myImage";
import { Button } from "../ui/button";
import { Locale } from "@/i18n";

interface props {
  lang: Locale;
  role : "isNote"
}

const SubjectCard = ({ lang , role}: props) => {
  return (
    <div className=" basic-card space-y-2">
      <div className=" flex space-x-2">
        <MyImage src="/images/3.jpg" className=" size-10" classname=" card" />
        <div className=" flex flex-col">
          <strong className=" text-lg">React js</strong>
          <span className=" font-medium text-sm">SPJJEN</span>
        </div>
      </div>
      <div>
        <div className="">
          Class room : <span className=" font-medium">L5SOD</span>
        </div>
        <div>
          Topics : <span className=" font-medium">3</span>
        </div>
        <div>
          Type : <span className=" font-medium">General</span>
        </div>
      </div>
      <div>
        <span className=" font-medium">Purpose:</span>
        <p className=" line-clamp-3 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          dolores dolorem, quas veniam qui vel nihil incidunt tempora non rem
          facere earum voluptatibus animi quaerat in doloribus ipsam, expedita
          voluptates?
        </p>
      </div>
      <Button variant="primary">
        <Link href={role === "isNote" ? `/${lang}/notes/subjects/123` :`/${lang}/subject/123`} className="w-full">
          About Subject
        </Link>
      </Button>
    </div>
  );
};

export default SubjectCard;
