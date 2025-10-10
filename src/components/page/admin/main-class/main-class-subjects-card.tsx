"use client";
import NoItemsPage from "@/components/common/pages/no-items-page";
import CreateMainSubjectDialog from "@/components/page/admin/main-subject/create-main-subject-dialog";
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
  ItemTitle,
} from "@/components/ui/item";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  MainClass: MainClassModel;
  auth: AuthUserResult;
  subjects: MainSubject[];
}

const MainClassSubjectsCard = ({ MainClass, auth, subjects }: props) => {
  const { data: currentSubjects } =
    useRealtimeData<MainSubject>("main_subject");
  const [displaySubjects, setDisplaySubjects] =
    useState<MainSubject[]>(subjects);

  // Sync with realtime data when available
  useEffect(() => {
    if (currentSubjects && currentSubjects.length > 0) {
      setDisplaySubjects(currentSubjects);
    }
  }, [currentSubjects]);
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle>Subjects</CardTitle>
          <CreateMainSubjectDialog mainClass={MainClass} auth={auth} />
        </div>
        <CardDescription>
          All subject for main class {MainClass.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displaySubjects.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-3">
              <NoItemsPage
                title="It looks like this main class doesn't have main subject 😥"
                details="Add new new main subject"
              />
              <CreateMainSubjectDialog auth={auth} mainClass={MainClass} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {displaySubjects.map((item, i) => {
              return (
                <Item key={`${item.id || item._id}-${i}`} variant="outline">
                  <Link href={`/a/collections/main_subjects/${item.code}`}>
                    <ItemContent>
                      <ItemTitle>{item.name}</ItemTitle>
                      <ItemDescription>{item.description}</ItemDescription>
                    </ItemContent>
                  </Link>
                </Item>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainClassSubjectsCard;
