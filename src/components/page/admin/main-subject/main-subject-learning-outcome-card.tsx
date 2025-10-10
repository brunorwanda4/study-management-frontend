"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock,
  Dot,
  FileCheck2,
  ListChecks,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineBookmarkBorder } from "react-icons/md";

import NoItemsPage from "@/components/common/pages/no-items-page";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

import CreateLearningOutcomeDialog from "@/components/page/admin/subjects/learning-outcome/create-learning-outcome-dialog";
import UpdateLearningOutcomeDialog from "@/components/page/admin/subjects/learning-outcome/update-learning-outcome-dialog";
import CreateSubjectTopicDialog from "@/components/page/admin/subjects/subject-topic/create-subject-topic-dialog";
import UpdateSubjectTopicDialog from "@/components/page/admin/subjects/subject-topic/update-subject-topic-dialog";

import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { LearningOutcomeWithOthers } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";

interface Props {
  MainSubject: MainSubject;
  auth: AuthUserResult;
  learningOutcome: LearningOutcomeWithOthers[];
}

const MainSubjectLearningOutcomeCard = ({
  MainSubject,
  auth,
  learningOutcome,
}: Props) => {
  const { data: currentLearningOutcome } =
    useRealtimeData<LearningOutcomeWithOthers>("learning_outcome");

  const [displayLearningOutcome, setDisplayLearningOutcome] =
    useState<LearningOutcomeWithOthers[]>(learningOutcome);

  useEffect(() => {
    if (currentLearningOutcome?.length) {
      setDisplayLearningOutcome(currentLearningOutcome);
    }
  }, [currentLearningOutcome]);

  return (
    <Card className="bg-base-100 border-base-300 h-fit w-full border shadow-lg">
      <CardHeader className="border-base-300 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            🎯 Learning Outcomes
          </CardTitle>
          <CreateLearningOutcomeDialog subject={MainSubject} auth={auth} />
        </div>

        <CardDescription className="text-base-content/70 text-sm">
          All learning outcomes for{" "}
          <span className="font-semibold">{MainSubject.name}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {displayLearningOutcome.length === 0 ? (
          <NoLearningOutcomeState subject={MainSubject} auth={auth} />
        ) : (
          displayLearningOutcome.map((item, i) => (
            <LearningOutcomeItem
              key={`${item.id || item._id}-${i}`}
              item={item}
              auth={auth}
              subject={MainSubject}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default MainSubjectLearningOutcomeCard;

//
// ------------------ Subcomponents ------------------
//

const NoLearningOutcomeState = ({
  subject,
  auth,
}: {
  subject: MainSubject;
  auth: AuthUserResult;
}) => (
  <div className="flex items-center justify-center">
    <div className="flex flex-col gap-3">
      <NoItemsPage
        title="No learning outcomes yet 😥"
        details="Add new learning outcomes to get started"
      />
      <div className="flex justify-center">
        <CreateLearningOutcomeDialog subject={subject} auth={auth} />
      </div>
    </div>
  </div>
);

const LearningOutcomeItem = ({
  item,
  auth,
  subject,
}: {
  item: LearningOutcomeWithOthers;
  auth: AuthUserResult;
  subject: MainSubject;
}) => (
  <Item
    variant="outline"
    className="border-base-300 bg-base-200/80 hover:bg-base-200 border p-4 transition-all"
  >
    <ItemHeader>
      <div className="flex items-start justify-between">
        <ItemTitle className="text-lg font-semibold">
          {item.order}. {item.title}
        </ItemTitle>

        <div className="flex gap-2">
          <UpdateLearningOutcomeDialog
            learningOutcome={item}
            auth={auth}
            mainSubject={subject}
            icon
          />
          <CreateSubjectTopicDialog auth={auth} learningOutCome={item} />
        </div>
      </div>

      <ItemDescription className="text-base-content/70 mt-2 text-sm">
        {item.description}
      </ItemDescription>

      <LearningOutcomeMetadata item={item} />
    </ItemHeader>

    <ItemContent className="mt-4 space-y-4">
      {item.key_competencies && (
        <KeyCompetenciesSection competencies={item.key_competencies} />
      )}

      {item.topics?.length ? (
        <TopicsSection topics={item.topics} item={item} auth={auth} />
      ) : (
        <p className="text-base-content/60 text-xs italic">
          No topics for this learning outcome
        </p>
      )}

      <AssessmentCriteriaSection criteria={item.assessment_criteria} />
    </ItemContent>
  </Item>
);

//
// ------------------ Helper Sections ------------------
//

const LearningOutcomeMetadata = ({
  item,
}: {
  item: LearningOutcomeWithOthers;
}) => (
  <div className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
    <MetadataField
      icon={<MdOutlineBookmarkBorder />}
      label="Order"
      value={item.order}
    />
    <MetadataField
      icon={<Clock className="h-4 w-4" />}
      label="Hours"
      value={item.estimated_hours || "—"}
    />
    <div className="flex items-center gap-2">
      <Star className="text-secondary h-4 w-4" />
      <span className="font-medium">Mandatory:</span>
      <Badge className={item.is_mandatory ? "badge-success" : "badge-ghost"}>
        {item.is_mandatory ? "Yes" : "No"}
      </Badge>
    </div>
  </div>
);

const MetadataField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

const KeyCompetenciesSection = ({
  competencies,
}: {
  competencies: LearningOutcomeWithOthers["key_competencies"];
}) => (
  <SectionCard
    title="Key Competencies"
    icon={<ListChecks className="h-4 w-4" />}
  >
    <div className="grid gap-4 text-sm sm:grid-cols-3">
      <CompetencyColumn title="Knowledge" items={competencies.knowledge} />
      <CompetencyColumn title="Skills" items={competencies.skills} />
      <CompetencyColumn
        title="Attitudes"
        items={competencies.attitudes}
        emptyText="None"
      />
    </div>
  </SectionCard>
);

const CompetencyColumn = ({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: string[];
  emptyText?: string;
}) => (
  <div>
    <p className="text-secondary mb-1 font-medium">{title}</p>
    {items.length ? (
      <ul className="list-inside list-disc space-y-1">
        {items.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    ) : (
      <p className="text-base-content/60 text-xs italic">{emptyText}</p>
    )}
  </div>
);

const TopicsSection = ({
  topics,
  item,
  auth,
}: {
  topics: any[];
  item: LearningOutcomeWithOthers;
  auth: AuthUserResult;
}) => (
  <SectionCard title="Topics" icon={<BookOpen className="h-4 w-4" />}>
    <div className="flex flex-col gap-3">
      {topics.map((topic) => (
        <TopicItem key={topic._id} topic={topic} item={item} auth={auth} />
      ))}
    </div>
  </SectionCard>
);

const TopicItem = ({ topic, item, auth }: any) => (
  <Item variant="muted" className="bg-base-200/60 border-base-300 border p-3">
    <ItemHeader>
      <div className="flex w-full items-center justify-between">
        <ItemTitle className="text-sm font-medium">
          {topic.order}. {topic.title}
        </ItemTitle>

        <div className="flex gap-2">
          <UpdateSubjectTopicDialog
            icon
            auth={auth}
            learningOutCome={item}
            topic={topic}
          />
          <CreateSubjectTopicDialog
            icon
            auth={auth}
            learningOutCome={item}
            topic={topic}
          />
        </div>
      </div>

      {topic.description && (
        <ItemDescription className="text-base-content/70 text-xs">
          {topic.description}
        </ItemDescription>
      )}
    </ItemHeader>

    <ItemContent>
      {topic.sub_topics?.length ? (
        <SubTopicList subTopics={topic.sub_topics} item={item} auth={auth} />
      ) : (
        <p className="text-base-content/60 mt-2 text-xs italic">No subtopics</p>
      )}
    </ItemContent>
  </Item>
);

const SubTopicList = ({ subTopics, item, auth }: any) => (
  <div className="mt-2">
    <p className="text-secondary mb-1 text-sm font-medium">Sub Topics</p>
    <ul className="space-y-1">
      {subTopics.map((sub: any) => (
        <li key={sub._id}>
          <div className="flex flex-1 justify-between">
            <div className="flex gap-1">
              <Dot />
              <span className="font-semibold">{sub.order}.</span>
              {sub.title}
            </div>
            <UpdateSubjectTopicDialog
              topic={sub}
              learningOutCome={item}
              auth={auth}
              icon
            />
          </div>

          {sub.learning_materials?.length ? (
            <ul className="text-base-content/80 mt-1 ml-5 list-disc text-sm">
              {sub.learning_materials.map((mat: any) => (
                <li key={mat._id} className="flex flex-col">
                  <span className="flex items-center gap-2 font-medium">
                    <FileCheck2 className="h-3 w-3" /> {mat.title}
                  </span>
                  {mat.link && (
                    <Link
                      href={mat.link}
                      target="_blank"
                      className="link link-secondary text-xs underline"
                    >
                      {mat.link}
                    </Link>
                  )}
                  {mat.description && (
                    <p className="text-base-content/70 text-xs">
                      {mat.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base-content/60 text-xs italic">
              No learning materials
            </p>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const AssessmentCriteriaSection = ({ criteria }: { criteria?: string[] }) => (
  <SectionCard
    title="Assessment Criteria"
    icon={<CheckCircle2 className="h-4 w-4" />}
  >
    {criteria?.length ? (
      <ul className="list-inside list-disc space-y-1 text-sm">
        {criteria.map((crit, i) => (
          <li key={i}>{crit}</li>
        ))}
      </ul>
    ) : (
      <p className="text-base-content/60 text-xs italic">
        No assessment criteria
      </p>
    )}
  </SectionCard>
);

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-base-100 border-base-300 border p-3">
    <h4 className="mb-2 flex items-center gap-2 font-semibold">
      {icon}
      {title}
    </h4>
    {children}
  </div>
);
