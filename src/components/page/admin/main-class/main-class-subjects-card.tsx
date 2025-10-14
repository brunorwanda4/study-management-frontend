"use client";

import NoItemsPage from "@/components/common/pages/no-items-page";
import CreateMainSubjectDialog from "@/components/page/admin/main-subject/create-main-subject-dialog";
import UpdateMainSubjectDialog from "@/components/page/admin/main-subject/update-main-subject-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { formatReadableDate } from "@/lib/utils/format-date";
import { BookOpen, Calendar, Clock, Layers, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  MainClass: MainClassModel;
  auth: AuthUserResult;
  subjects: MainSubject[];
}

const MainClassSubjectsCard = ({ MainClass, auth, subjects }: Props) => {
  const { data: currentSubjects } =
    useRealtimeData<MainSubject>("main_subject");
  const [displaySubjects, setDisplaySubjects] =
    useState<MainSubject[]>(subjects);

  // Sync with realtime data
  useEffect(() => {
    if (currentSubjects && currentSubjects.length > 0) {
      const filtered = currentSubjects.filter((subj) =>
        subj.main_class_ids.includes(MainClass.id || MainClass._id || ""),
      );
      setDisplaySubjects(filtered);
    }
  }, [currentSubjects, MainClass]);

  return (
    <Card className="w-full">
      <CardHeader className="mb-4 flex items-center justify-between">
        <CardTitle>Subjects for Main Class: {MainClass.name}</CardTitle>
        <CreateMainSubjectDialog mainClass={MainClass} auth={auth} />
      </CardHeader>

      <CardContent>
        {displaySubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <NoItemsPage
              title="This main class doesn't have any subjects yet 😥"
              details="Add a new subject to get started."
            />
            <CreateMainSubjectDialog mainClass={MainClass} auth={auth} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displaySubjects.map((subj, i) => (
              <Item
                key={`${subj.id || subj._id}-${i}`}
                variant="outline"
                className="transition-all hover:shadow-sm"
              >
                <ItemContent className="flex flex-col gap-2 p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <ItemTitle className="text-lg font-semibold">
                        {subj.name}
                      </ItemTitle>
                      <div className="text-muted-foreground text-sm">
                        Code: {subj.code}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <UpdateMainSubjectDialog
                        subject={subj}
                        auth={auth}
                        icon
                      />
                      <Badge
                        variant={subj.is_active ? "secondary" : "destructive"}
                      >
                        {subj.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  {subj.description && (
                    <ItemDescription className="text-muted-foreground text-sm">
                      {subj.description}
                    </ItemDescription>
                  )}

                  {/* Details Grid */}
                  <div className="text-muted-foreground mt-2 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4" />
                      <span className="capitalize">{subj.category}</span>
                    </div>

                    {subj.level && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span className="capitalize">{subj.level}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{subj.estimated_hours}h</span>
                    </div>

                    {subj.credits && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{subj.credits} credits</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{subj.contributors?.length || 0} contributors</span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-xs">
                    {subj.created_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created: {formatReadableDate(subj.created_at)}
                        </span>
                      </div>
                    )}
                    {subj.updated_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Updated: {formatReadableDate(subj.updated_at)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Link */}
                  <div className="mt-2">
                    <Link
                      href={`/a/collections/main_subjects/${subj.code}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      View full details
                    </Link>
                  </div>
                </ItemContent>
              </Item>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainClassSubjectsCard;
