import { BsClock } from "react-icons/bs";
import MyLink from "../common/myLink";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserSmCard } from "./user-card";

interface SubjectCardProps {
  subject?: any;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Card>
      <CardHeader className=" flex flex-row justify-between w-full">
        <div className=" flex gap-4">
          <CardTitle className=" h5">
            <MyLink href="/en/c/classname/subjects/subjectname">
              Subject name
            </MyLink>
          </CardTitle>
          <MyLink
            href="/en/c/classname/subjects/subjectname"
            className=" text-neutral"
          >
            #CODE123
          </MyLink>
          <span className=" text-neutral">Category</span>
        </div>
        <div>
          <UserSmCard role="Teacher" name="Teacher name" />
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <p>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </p>
        <div className="flex flex-row gap-4">
          <div className=" flex items-centers gap-2  ">
            <BsClock size={20} className=" mt-0.5" />
            <span className=" text-base">123 hours</span>
          </div>
          <div className=" flex items-centers gap-2  ">
            <span className=" text-base">85 Grades</span>
          </div>
          <div className=" flex items-centers gap-2  ">
            <span className=" text-base" title="main class">
              L4 SOD
            </span>
          </div>
          <div className=" flex items-centers gap-2  ">
            <span className=" text-base" title="main class">
              3 Learning outcomes
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col gap-2 items-start [.border-t]:pt-2">
        <MyLink href="" button={{ role: "page" }}>
          View subject
        </MyLink>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;
