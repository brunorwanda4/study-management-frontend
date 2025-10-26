"use client";

import UpdateMainSubjectDialog from "@/components/page/admin/main-subject/update-main-subject-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import { BookOpen, Calendar, Clock, LinkIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface PropsMainSubject {
  subject: MainSubject;
  auth: AuthContext;
}

const MainSubjectInformationCard = ({ subject, auth }: PropsMainSubject) => {
  const { data } = useRealtimeData<MainSubject>("main_subject");
  const [currentSubject, setCurrentSubject] = useState(subject);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === subject._id);
      if (updated) setCurrentSubject(updated);
    }
  }, [data, subject._id]);

  return (
    <Card className="h-fit max-w-full lg:max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subject Information</CardTitle>
          <div className="flex items-center gap-4">
            {/* <MainSubjectDisableDialog subject={subject} auth={auth} />
            <DeleteMainSubjectDialog subject={subject} auth={auth} /> */}
            <UpdateMainSubjectDialog
              icon
              subject={currentSubject}
              auth={auth}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <aside className="md:w-80">
          {/* Subject Header */}
          <div className="space-y-3 border-b pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{currentSubject.name}</h1>
                <p className="text-muted-foreground text-lg">
                  {currentSubject.code}
                </p>
              </div>
              <Badge
                variant={currentSubject.is_active ? "default" : "secondary"}
              >
                {currentSubject.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {/* Category and Level */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="capitalize">
                {currentSubject.category}
              </Badge>
              {currentSubject.level && (
                <Badge variant="secondary" className="capitalize">
                  {currentSubject.level}
                </Badge>
              )}
            </div>

            {/* Description */}
            {currentSubject.description && (
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Description
                </h3>
                <p className="text-sm leading-relaxed">
                  {currentSubject.description}
                </p>
              </div>
            )}

            {/* Hours and Credits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Hours</p>
                  <p className="font-medium">
                    {currentSubject.estimated_hours}h
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Credits</p>
                  <p className="font-medium">{currentSubject.credits || 0}</p>
                </div>
              </div>
            </div>

            {/* Class Links */}
            <div className="flex items-center gap-2">
              <LinkIcon className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Linked Classes</p>
                <p className="font-medium">
                  {currentSubject.main_class_ids?.length || 0} classes
                </p>
              </div>
            </div>

            {/* Contributors */}
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Contributors</p>
                <p className="font-medium">
                  {currentSubject.contributors.length} people
                </p>
              </div>
            </div>

            {/* Prerequisites */}
            {currentSubject.prerequisites &&
              currentSubject.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                    Prerequisites
                  </h3>
                  <p className="text-sm">
                    {currentSubject.prerequisites.length} required subjects
                  </p>
                </div>
              )}

            {/* Academic Year */}
            {(currentSubject.starting_year || currentSubject.ending_year) && (
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Academic Year</p>
                  <p className="font-medium">
                    {currentSubject.starting_year && currentSubject.ending_year
                      ? `${new Date(currentSubject.starting_year).getFullYear()} - ${new Date(currentSubject.ending_year).getFullYear()}`
                      : currentSubject.starting_year
                        ? `From ${new Date(currentSubject.starting_year).getFullYear()}`
                        : `Until ${new Date(currentSubject.ending_year!).getFullYear()}`}
                  </p>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="space-y-2 border-t pt-4">
              {currentSubject.created_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Created:</span>
                  <span>{formatReadableDate(currentSubject.created_at)}</span>
                </div>
              )}
              {currentSubject.updated_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Updated:</span>
                  <span>{formatReadableDate(currentSubject.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default MainSubjectInformationCard;
