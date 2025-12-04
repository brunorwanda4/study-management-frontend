import type { Locale } from "@/i18n";
import type { Subject } from "@/lib/schema/subject/subject-schema";
import type {
  TemplateSubjectWithOther,
  TemplateTopic,
} from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { BsClock } from "react-icons/bs";
import MyLink, { LoadingIndicatorText } from "../common/myLink";
import DialogTemplateSubject from "../page/admin/tempate-subject/dialog-template-subject";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserSmCard } from "./user-card";

export interface SubjectCardProps {
  subject?: Subject;
  isOnSubjectPage?: boolean;
  showModify?: boolean;
  templateSubject?: TemplateSubjectWithOther;
  lang: Locale;
  auth?: AuthContext;
}

const SubjectCard = ({
  subject,
  isOnSubjectPage,
  showModify,
  lang,
  auth,
  templateSubject,
}: SubjectCardProps) => {
  return (
    <Card>
      <CardHeader className=" flex flex-row justify-between w-full">
        <div className=" flex gap-4">
          <CardTitle className=" h5">
            <MyLink
              href={
                templateSubject
                  ? `/${lang}/a/collections/template_subjects/${templateSubject.code}`
                  : "/en/c/classname/subjects/subjectname"
              }
            >
              {templateSubject ? templateSubject.name : " Subject name"}
            </MyLink>
          </CardTitle>
          <MyLink
            href={
              templateSubject
                ? `/${lang}/a/collections/template_subjects/${templateSubject.code}`
                : "/en/c/classname/subjects/subjectname"
            }
            className=" text-base-content/50"
          >
            #{templateSubject ? templateSubject.code : "CODE123"}
          </MyLink>
          <span className=" text-base-content/">
            {templateSubject ? templateSubject.category : "Category"}
          </span>
        </div>
        <div>
          {templateSubject && auth && (
            <DialogTemplateSubject auth={auth} sub={templateSubject} />
          )}
          {!templateSubject && (
            <UserSmCard role="Teacher" name="Teacher name" />
          )}
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        {!templateSubject && (
          <MyLink roleTag="sub" href="">
            main subject name
          </MyLink>
        )}
        <p>
          {templateSubject
            ? templateSubject.description
            : "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
        </p>
        <div className="flex flex-row gap-4">
          <div className=" flex items-centers gap-2  ">
            <BsClock size={18} className=" mt-0.5" />
            <span className=" text-base">
              {templateSubject ? templateSubject.estimated_hours : "123"} hours
            </span>
          </div>
          <div className=" flex items-centers gap-2  ">
            <span className=" text-base">
              {templateSubject ? templateSubject.credits : "85"} Grades
            </span>
          </div>
          {!templateSubject && (
            <div className=" flex items-centers gap-2  ">
              <span className=" text-base" title="main class">
                L4 SOD
              </span>
            </div>
          )}
          <div className=" flex items-centers gap-2  ">
            <span className=" text-base" title="main class">
              {templateSubject ? templateSubject.topics?.length : "3"} Learning
              outcomes
            </span>
          </div>
        </div>
        {/*template subject main classes*/}
        {templateSubject && (
          <div className=" flex flex-col gap-2">
            <h5 className="font-medium">Main classes:</h5>
            {templateSubject.prerequisite_classes?.map((cls) => {
              return (
                <MyLink
                  key={cls._id || cls.username}
                  href={`/${lang}/a/collections/main_classes/${cls.username}`}
                  className=" w-fit"
                >
                  <LoadingIndicatorText className=" text-sm">
                    {cls.name}
                  </LoadingIndicatorText>
                </MyLink>
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className=" flex flex-col space-y-4 items-start [.border-t]:pt-2">
        <div className=" flex flex-row gap-2 ">
          {showModify && (
            <MyLink
              href="/en/c/classname/subjects/subjectname"
              button={{ size: "sm", variant: "outline" }}
            >
              Modify
            </MyLink>
          )}
          {!isOnSubjectPage && (
            <MyLink
              href="/en/c/classname/subjects/subjectname"
              button={{ role: "page", size: "sm" }}
            >
              View subject
            </MyLink>
          )}

          {!showModify && (
            <MyLink
              href="/en/c/classname/subjects/subjectname"
              button={{ role: "page", size: "sm" }}
            >
              Notes
            </MyLink>
          )}
          {!showModify && (
            <MyLink
              href="/en/c/classname/subjects/subjectname"
              button={{ role: "page", size: "sm" }}
            >
              Classwork
            </MyLink>
          )}
        </div>
        {isOnSubjectPage && (
          <div className=" w-full ">
            <h4 className="h6">Learning Outcomes</h4>
            {/*all learning outcomes*/}
            {templateSubject?.topics ? (
              <ul className="list bg-base-100 gap-0 space-y-0 w-full">
                {templateSubject.topics?.map((topic) => (
                  <li key={topic.order} className=" w-full">
                    <TopicItem topic={topic} level={0} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="list bg-base-100 gap-0 space-y-0 ">
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
                          lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, lorem ipsum dolor sit amet consectetur
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
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;

interface TopicItemProps {
  topic: TemplateTopic;
  level?: number; // for indentation or styling
}

export const TopicItem = ({ topic, level = 0 }: TopicItemProps) => {
  const padding = level * 4; // or Tailwind class mapping

  return (
    <div style={{ paddingLeft: padding }} className="space-y-1 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row gap-2">
          <span className="font-medium">{topic.order}.</span>
          <p className="font-medium">{topic.title}</p>
        </div>

        {topic.estimated_hours && (
          <div className="flex items-center gap-2">
            {/*<BsClock size={14} />*/}
            <span>{topic.estimated_hours} hours</span>
          </div>
        )}
      </div>

      {topic.description && (
        <p className="text-sm text-base-content/80">{topic.description}</p>
      )}

      {/* Recursively render subtopics */}
      {topic.subtopics?.length ? (
        <div className="mt-2 space-y-2">
          {topic.subtopics.map((sub) => (
            <TopicItem key={sub.order} topic={sub} level={level + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
