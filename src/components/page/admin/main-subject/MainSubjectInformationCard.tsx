"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { BookOpen, Calendar, Clock, LinkIcon, Users } from "lucide-react";

interface PropsMainSubject {
  subject: MainSubject;
  auth: AuthUserResult;
}

const MainSubjectInformationCard = ({ subject, auth }: PropsMainSubject) => {
  return (
    <Card className="max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subject Information</CardTitle>
          <div className="flex items-center gap-4">
            {/* <MainSubjectDisableDialog subject={subject} auth={auth} />
            <DeleteMainSubjectDialog subject={subject} auth={auth} /> */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <aside className="md:w-80">
          {/* Subject Header */}
          <div className="space-y-3 border-b pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{subject.name}</h1>
                <p className="text-muted-foreground text-lg">{subject.code}</p>
              </div>
              <Badge
                variant={subject.is_active ? "default" : "secondary"}
                className={` ${
                  subject.is_active
                    ? "border-green-200 bg-green-100 text-green-800"
                    : "border-gray-200 bg-gray-100 text-gray-800"
                } `}
              >
                {subject.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Edit Button */}
            <div>
              {/* <UpdateMainSubjectDialog subject={subject} auth={auth} /> */}
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {/* Category and Level */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="capitalize">
                {subject.category}
              </Badge>
              {subject.level && (
                <Badge variant="secondary" className="capitalize">
                  {subject.level}
                </Badge>
              )}
            </div>

            {/* Description */}
            {subject.description && (
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Description
                </h3>
                <p className="text-sm leading-relaxed">{subject.description}</p>
              </div>
            )}

            {/* Hours and Credits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Hours</p>
                  <p className="font-medium">{subject.estimated_hours}h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Credits</p>
                  <p className="font-medium">{subject.credits || 0}</p>
                </div>
              </div>
            </div>

            {/* Class Links */}
            <div className="flex items-center gap-2">
              <LinkIcon className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Linked Classes</p>
                <p className="font-medium">
                  {subject.main_class_ids?.length || 0} classes
                </p>
              </div>
            </div>

            {/* Contributors */}
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Contributors</p>
                <p className="font-medium">
                  {subject.contributors.length} people
                </p>
              </div>
            </div>

            {/* Prerequisites */}
            {subject.prerequisites && subject.prerequisites.length > 0 && (
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Prerequisites
                </h3>
                <p className="text-sm">
                  {subject.prerequisites.length} required subjects
                </p>
              </div>
            )}

            {/* Academic Year */}
            {(subject.starting_year || subject.ending_year) && (
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Academic Year</p>
                  <p className="font-medium">
                    {subject.starting_year && subject.ending_year
                      ? `${new Date(subject.starting_year).getFullYear()} - ${new Date(subject.ending_year).getFullYear()}`
                      : subject.starting_year
                        ? `From ${new Date(subject.starting_year).getFullYear()}`
                        : `Until ${new Date(subject.ending_year!).getFullYear()}`}
                  </p>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="space-y-2 border-t pt-4">
              {subject.created_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Created:</span>
                  <span>
                    {new Date(subject.created_at).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              )}
              {subject.updated_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Updated:</span>
                  <span>
                    {new Date(subject.updated_at).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
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
