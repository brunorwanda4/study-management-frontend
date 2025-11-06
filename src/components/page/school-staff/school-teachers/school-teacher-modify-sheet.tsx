"use client";
import { useEffect, useState } from "react";

import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import ClassTeacherDialog from "@/components/page/class/dialog/add-class-teacher-dialog";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { Locale } from "@/i18n";
import { splitCamelCase } from "@/lib/helpers/format-text";
import type { Class } from "@/lib/schema/class/class-schema";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import apiRequest from "@/service/api-client";

interface Props {
  teacher?: TeacherWithRelations;
  auth: AuthContext;
  isTable?: boolean;
  lang?: Locale;
  isSchool?: boolean;
}

const SchoolTeacherModifySheet = ({
  teacher,
  auth,
  isTable,
  lang,
  isSchool,
}: Props) => {
  const [teacherClasses, setTeacherClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch data correctly
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacher?._id && !teacher?.id) return;

      try {
        setLoading(true);
        setError(null);

        const res = await apiRequest<void, Class[]>(
          "get",
          isSchool
            ? `/school/classes/teacher/${teacher._id || teacher.id}`
            : `/classes/teacher/${teacher._id || teacher.id}`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        );

        setTeacherClasses(res?.data || []);
      } catch (err: any) {
        console.error("❌ Failed to fetch teacher classes:", err);
        setError("Failed to load teacher classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [teacher?._id, teacher?.id, isSchool, auth.token, auth.schoolToken]);

  return (
    <Sheet isPublic>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant={"ghost"} size={"sm"}>
            <div className="flex items-center space-x-3">
              <MyAvatar src={teacher?.image} alt={teacher?.name} size="sm" />
              <div className="flex flex-col items-start overflow-hidden">
                {teacher?.name || "N/A"}
                {teacher?.email && (
                  <span
                    className="text-muted-foreground truncate text-sm"
                    title={teacher.email} // Add title attribute
                  >
                    {teacher.email}
                  </span>
                )}
              </div>
            </div>
          </Button>
        ) : (
          <Button library="daisy" variant={"outline"}>
            Modify teacher
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        isPublic
        className="overflow-y-auto max-h-screen flex flex-col gap-4"
      >
        {/* ===== HEADER ===== */}
        <SheetHeader className="p-0 relative">
          <div className="relative">
            <MyImage
              src={
                teacher?.image
                  ? teacher.image
                  : teacher?.gender === "MALE"
                    ? "/images/teachers/male-teacher.jpg"
                    : "/images/teachers/female-teacher.jpg"
              }
              className="w-full h-64"
            />

            <div className="space-x-1 p-4">
              <div className="flex justify-between">
                {teacher?.name && (
                  <h3
                    data-tip={teacher.name ?? "Teacher name"}
                    className="line-clamp-1 leading-5 font-medium tooltip text-lg"
                  >
                    {teacher.name}
                  </h3>
                )}
                <Badge
                  library="daisy"
                  variant={teacher?.is_active ? "info" : "error"}
                >
                  {teacher?.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              {teacher?.user?.username && (
                <MyLink
                  className="line-clamp-1 flex space-x-1 link link-hover"
                  href={`/p/${teacher.user.username}`}
                >
                  <span>@</span>
                  <span>{teacher.user.username}</span>
                </MyLink>
              )}

              {/* INFO GRID */}
              <div className="grid grid-cols-2 mt-4 gap-y-1 gap-x-2">
                <div className="flex gap-2">
                  <span>Subjects:</span>
                  <span className="font-medium">
                    {teacher?.subject_ids?.length || 0}
                  </span>
                </div>

                <div className="flex gap-2">
                  <span>Classes:</span>
                  <span className="font-medium">
                    {teacher?.class_ids?.length || 0}
                  </span>
                </div>

                {teacher?.email && (
                  <div className="flex gap-2">
                    <span>Email:</span>
                    <span className="font-medium">{teacher.email}</span>
                  </div>
                )}
                {teacher?.phone && (
                  <div className="flex gap-2">
                    <span>Phone:</span>
                    <span className="font-medium">{teacher.phone}</span>
                  </div>
                )}

                {teacher?.gender && (
                  <div className="flex gap-2">
                    <span>Gender:</span>
                    <span className="font-medium">
                      {splitCamelCase(teacher.gender)}
                    </span>
                  </div>
                )}

                {teacher?.type && (
                  <div className="flex gap-2">
                    <span>Type:</span>
                    <span className="font-medium">{teacher.type}</span>
                  </div>
                )}

                {teacher?.user?.employment_type && (
                  <div className="flex gap-2">
                    <span>Employment:</span>
                    <span className="font-medium">
                      {splitCamelCase(teacher.user.employment_type)}
                    </span>
                  </div>
                )}
              </div>

              {/* USER INFO */}
              {teacher?.user && (
                <div className="flex gap-2 mt-4 items-center">
                  <MyAvatar
                    src={teacher.image}
                    alt={teacher.name}
                    role={{ role: "TEACHER", gender: teacher.gender }}
                    size="sm"
                  />
                  <div className="flex flex-col gap-0">
                    <p className="font-medium leading-4">{teacher.user.name}</p>
                    <MyLink
                      href={`/${lang}/p/${teacher.user.username}`}
                      className="link link-hover text-sm leading-4"
                    >
                      @{teacher.user.username}
                    </MyLink>
                  </div>
                </div>
              )}
            </div>

            {/* DATES */}
            <div className="flex gap-4 justify-end px-4 text-xs opacity-80">
              <div className="flex gap-2">
                <span>Created:</span>
                <span className="font-medium">
                  {formatReadableDate(teacher?.created_at)}
                </span>
              </div>
              <div className="flex gap-2">
                <span>Updated:</span>
                <span className="font-medium">
                  {formatReadableDate(teacher?.updated_at)}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 px-4 flex justify-start flex-wrap gap-2">
              <TeacherDialog
                isSchool={isSchool}
                auth={auth}
                teacher={teacher}
              />
              {teacher?.user?.username && (
                <Button
                  library="daisy"
                  variant={"primary"}
                  className={cn("w-fit")}
                  role="page"
                  size={"sm"}
                  href={`/${lang}/p/${teacher.user.username}`}
                >
                  View Teacher
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>

        {/* ===== MAIN CONTENT ===== */}
        <main className="px-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between w-full items-center">
              <Label>Teacher Classes</Label>
              <ClassTeacherDialog teacher={teacher} auth={auth} />
            </div>

            {/* Loading / Error / Data states */}
            {loading && <p className="text-sm opacity-70">Loading classes…</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!loading && !error && teacherClasses.length === 0 && (
              <p className="text-sm opacity-70">No classes found.</p>
            )}

            {teacherClasses.map((cls) => (
              <div
                key={cls._id || cls.id}
                className="flex justify-between items-center w-full"
              >
                <div className="flex gap-2 items-center">
                  <MyAvatar
                    src={cls.image}
                    alt={cls.name}
                    size="sm"
                    type="square"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{cls.name}</span>
                    <span className="text-sm opacity-70">@{cls.username}</span>
                  </div>
                </div>
                {/* <Button
                  size={"xs"}
                  variant={"ghost"}
                  library="daisy"
                  type="button"
                >
                  Remove
                </Button> */}
              </div>
            ))}
          </div>
        </main>

        <SheetFooter className="h-screen">
          <div className="h-screen" />
          app footer
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SchoolTeacherModifySheet;
