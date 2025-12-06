"use client";

import type { Locale } from "@/i18n";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import type {
  TemplateSubjectWithOther,
  TemplateTopic,
} from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { getInitialsUsername } from "@/lib/utils/generate-username";
import { Layers } from "lucide-react";
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

/* ----------------------------------------------------
   Helpers
-----------------------------------------------------*/

// get subject or template value
function pick<T>(
  subjectVal: T | undefined,
  templateVal: T | undefined,
  fallback: T,
) {
  return subjectVal ?? templateVal ?? fallback;
}

function buildSubjectLink(
  lang: Locale,
  subject?: ClassSubjectWithRelations,
  template?: TemplateSubjectWithOther,
) {
  if (subject?.class)
    return `/${lang}/c/${subject.class.username}/subjects/${subject.code}`;
  if (template)
    return `/${lang}/a/collections/template_subjects/${template.code}`;
  return "/en/c/classname/subjects/subjectname";
}

/* ----------------------------------------------------
   Component
-----------------------------------------------------*/

export interface SubjectCardProps {
  subject?: ClassSubjectWithRelations;
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
  const link = buildSubjectLink(lang, subject, templateSubject);

  const name = pick(subject?.name, templateSubject?.name, "Subject name");
  const code = pick(subject?.code, templateSubject?.code, "CODE123");
  const category = pick(
    subject?.category,
    templateSubject?.category,
    "Category",
  );
  const description = pick(
    subject?.description,
    templateSubject?.description,
    "lorem ipsum dolor sit amet consectetur adipisicing elit...",
  );

  const estimatedHours = pick(
    subject?.estimated_hours,
    templateSubject?.estimated_hours,
    "123",
  );

  const credits = pick(subject?.credits, templateSubject?.credits, "85");

  const topics = subject?.topics ?? templateSubject?.topics ?? [];

  return (
    <Card>
      {/* ----------------------------------------------------
         Header
      ----------------------------------------------------- */}
      <CardHeader className=" flex flex-row justify-between w-full">
        <div className=" flex gap-4 items-start">
          <CardTitle className=" h5">
            <div className=" flex flex-col gap-1">
              <MyLink href={link}>{name}</MyLink>

              <MyLink
                href={link}
                className=" text-base-content/50 text-sm font-normal"
              >
                #{code}
              </MyLink>
            </div>
          </CardTitle>

          <div className=" text-base-content/90 flex gap-1 items-center">
            <Layers className="h-3 w-3" />
            <span className=" text-base-content/90 test-sm">{category}</span>
          </div>
        </div>

        <div>
          {templateSubject && auth && isOnSubjectPage && (
            <DialogTemplateSubject auth={auth} sub={templateSubject} />
          )}

          {!templateSubject && (
            <UserSmCard
              role="Teacher"
              name={subject?.teacher?.name ?? "Teacher name"}
              image={subject?.teacher?.image}
            />
          )}
        </div>
      </CardHeader>

      {/* ----------------------------------------------------
         Content
      ----------------------------------------------------- */}
      <CardContent className=" flex flex-col gap-2">
        <p>{description}</p>

        {/* Info Row */}
        <div className="flex flex-row gap-4">
          <div className=" flex items-centers gap-1">
            <BsClock size={14} className=" mt-1" />
            <span className=" text-sm">{estimatedHours} hours</span>
          </div>

          <div className=" flex items-centers gap-2">
            <span className=" text-sm">{credits} Grades</span>
          </div>

          {!templateSubject && subject?.class && (
            <MyLink
              href={`/${lang}/c/${subject.class.username}`}
              className=" flex items-centers gap-2"
            >
              <span className=" text-sm" title={subject.class.name}>
                {getInitialsUsername(subject.class.name)}
              </span>
            </MyLink>
          )}

          <div className=" flex items-centers gap-2">
            <span className=" text-sm">{topics.length} Learning outcomes</span>
          </div>
        </div>

        {/* Template Subject → Prerequisite classes */}
        {templateSubject &&
          templateSubject?.prerequisite_classes?.length > 0 && (
            <div className=" flex flex-col gap-2">
              <h5 className="font-medium">Main classes:</h5>

              {templateSubject?.prerequisite_classes.map((cls) => (
                <MyLink
                  key={cls._id || cls.username}
                  href={`/${lang}/a/collections/main_classes/${cls.username}`}
                  className=" w-fit"
                >
                  <LoadingIndicatorText className=" text-sm">
                    {cls.name}
                  </LoadingIndicatorText>
                </MyLink>
              ))}
            </div>
          )}
      </CardContent>

      {/* ----------------------------------------------------
         Footer
      ----------------------------------------------------- */}
      <CardFooter className=" flex flex-col space-y-4 items-start [.border-t]:pt-2">
        {/* Buttons */}
        <div className=" flex flex-row gap-2">
          {showModify && (
            <MyLink
              href="/en/c/classname/subjects/subjectname"
              button={{ size: "sm", variant: "outline" }}
            >
              Modify
            </MyLink>
          )}

          {!isOnSubjectPage && (
            <MyLink href={link} button={{ role: "page", size: "sm" }}>
              View subject
            </MyLink>
          )}

          {!showModify && (
            <>
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
                Classwork
              </MyLink>
            </>
          )}
        </div>

        {/* Learning outcomes */}
        {isOnSubjectPage && (
          <div className=" w-full ">
            <h4 className="h6">Learning Outcomes</h4>

            {topics.length > 0 ? (
              <ul className="list bg-base-100 gap-0 space-y-0 w-full">
                {topics.map((topic) => (
                  <li key={topic.order} className=" w-full">
                    <TopicItem topic={topic} level={0} />
                  </li>
                ))}
              </ul>
            ) : (
              // Demo state
              <ul className="list bg-base-100 gap-0 space-y-0">
                {[...Array(3)].map((_, t) => (
                  <li key={t} className="list-row">
                    <span className=" h5">{t + 1}.</span>
                    <div className=" text-base">
                      <div className=" flex flex-row justify-between  items-center">
                        <h5 className="h5">Learning outcome name</h5>
                        <div className=" flex items-centers gap-2">
                          <BsClock size={18} className=" mt-0.5" />
                          <span className=" text-base">20 hours</span>
                        </div>
                      </div>
                      <p>
                        lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                      <div className=" mt-2 space-y-2 flex flex-col">
                        {[...Array(4)].map((_, i) => (
                          <span key={i}>
                            {t + 1}.{i + 1} Topic introduction
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;

/* ----------------------------------------------------
   Recursive TopicItem
-----------------------------------------------------*/

interface TopicItemProps {
  topic: TemplateTopic;
  level?: number;
}

export const TopicItem = ({ topic, level = 0 }: TopicItemProps) => {
  const padding = level * 16; // px paddingLeft

  return (
    <div style={{ paddingLeft: padding }} className="space-y-1 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row gap-2">
          <span className="font-medium">{topic.order}.</span>
          <p className="font-medium">{topic.title}</p>
        </div>

        {topic.estimated_hours && (
          <div className="flex items-center gap-2">
            <span>{topic.estimated_hours} hours</span>
          </div>
        )}
      </div>

      {topic.description && (
        <p className="text-sm text-base-content/80">{topic.description}</p>
      )}

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
