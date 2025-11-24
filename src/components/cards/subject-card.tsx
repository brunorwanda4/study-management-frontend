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
  isOnSubjectPage?: boolean;
}

const SubjectCard = ({ subject, isOnSubjectPage }: SubjectCardProps) => {
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
        <MyLink roleTag="sub" href="">
          main subject name
        </MyLink>
        <p>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </p>
        <div className="flex flex-row gap-4">
          <div className=" flex items-centers gap-2  ">
            <BsClock size={18} className=" mt-0.5" />
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
      <CardFooter className=" flex flex-col space-y-4 items-start [.border-t]:pt-2">
        <div className=" flex flex-row gap-2 ">
          {!isOnSubjectPage && (
            <MyLink
              href="/en/c/classname/subjects/subjectname"
              button={{ role: "page", size: "sm" }}
            >
              View subject
            </MyLink>
          )}
          <MyLink
            href="/en/c/classname/subjects/subjectname"
            button={{ role: "page", size: "sm" }}
          >
            Notes
          </MyLink>
          <MyLink
            href="/en/c/classname/subjects/subjectname"
            button={{ role: "page", size: "sm" }}
          >
            Classworks
          </MyLink>
        </div>
        {isOnSubjectPage && (
          <div>
            <h4 className="h6">Learning Outcomes</h4>
            {/*all learning outcomes*/}
            <ul className="list bg-base-100 gap-0 space-y-0 rounded-box shadow-md">
              {[...Array(3)].map((_, t) => {
                return (
                  <li key={t} className="list-row">
                    <span className=" h5">{t + 1}.</span>
                    <div className=" text-base">
                      <div className=" flex flex-row justify-between  items-center">
                        <h5 className="h5">Learning outcome name</h5>
                        <div className=" flex items-centers gap-2  ">
                          <BsClock size={18} className=" mt-0.5" />
                          <span className=" text-base">20 hours</span>
                        </div>
                      </div>
                      <p className="">
                        lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                      </p>
                      <div className=" mt-2 space-y-2 flex flex-col">
                        {[...Array(4)].map((_, i) => {
                          return (
                            <span key={i}>
                              {t + 1}.{i + 1} Topic introduction
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;
