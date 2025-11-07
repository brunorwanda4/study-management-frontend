"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import ClassTeacherDialog from "@/components/page/class/dialog/add-class-teacher-dialog";
import ClassDialog from "@/components/page/school-staff/dialog/class-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Locale } from "@/i18n";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { Subject } from "@/lib/schema/subject/subject-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";
import { BsBook } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentLight } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";

interface props {
  cls?: ClassWithOthers;
  auth: AuthContext;
  isTable?: boolean;
  lang?: Locale;
  isSchool?: boolean;
}

const ClassModifySheet = ({ cls, auth, isTable, lang, isSchool }: props) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!cls?._id && !cls?.id) return;

      try {
        setLoading(true);
        setError(null);

        const [teacher_res, subject_res] = await Promise.all([
          apiRequest<void, Teacher[]>(
            "get",
            isSchool
              ? `/school/teachers/class/${cls._id || cls.id}`
              : `/teachers/class/${cls._id || cls.id}`,
            undefined,
            { token: auth.token, schoolToken: auth.schoolToken },
          ),
          apiRequest<void, Subject[]>(
            "get",
            isSchool
              ? `/school/subjects/class/${cls._id || cls.id}`
              : `/subjects/class/${cls._id || cls.id}`,
            undefined,
            { token: auth.token, schoolToken: auth.schoolToken },
          ),
        ]);

        setTeachers(teacher_res?.data || []);
        setSubjects(subject_res?.data || []);
      } catch (err: any) {
        console.error("❌ Failed to fetch teacher:", err);
        setError("Failed to load teacher classes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cls?._id, cls?.id, isSchool, auth.token, auth.schoolToken]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant={"ghost"} size={"sm"}>
            {cls?.image && (
              <MyImage src={cls?.image} alt={cls?.name} role="ICON" />
            )}
            <span className=" min-w-32 line-clamp-1">{cls?.name}</span>
          </Button>
        ) : (
          <Button library="daisy" variant={"outline"}>
            Modify Class
          </Button>
        )}
      </SheetTrigger>
      <SheetContent isPublic>
        <SheetHeader className=" p-0 relative">
          <div className=" relative">
            <MyImage src="/images/1.jpg" className=" w-full" />
            <div className="absolute -bottom-18 flex items-center gap-2 p-4">
              <MyAvatar
                size="lg"
                type="cycle"
                src={cls?.image}
                alt={cls?.name}
              />
              <div className="mt-6 space-x-1">
                <h3
                  data-tip={cls?.name ?? "Level 5 Software"}
                  className="line-clamp-1 leading-5 font-medium tooltip text-lg"
                >
                  {cls?.name ?? "Level 5 Software development"}
                </h3>
                <MyLink
                  className="line-clamp-1 flex space-x-1 link link-hover"
                  href={`/class`}
                >
                  <span>@</span>{" "}
                  <span className="line-clamp-1">
                    {cls?.username ?? "L5SOD"}
                  </span>
                </MyLink>
              </div>
            </div>
          </div>

          <div className=" mt-14 flex flex-col gap-2 px-4">
            <div className=" grid grid-cols-2 gap-y-1">
              <div className=" flex flex-row gap-2">
                <span>Code: </span>
                <span className=" text-primary">{cls?.code ?? "CODE123"}</span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <SiLevelsdotfyi /> <span>Level:</span>
                </div>
                <span className=" font-medium">
                  {cls?.trade?.name ?? "Primary"}
                </span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <PiStudentLight /> <span>Students:</span>
                </div>
                <span className=" font-medium">30</span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <BsBook /> <span>Subjects:</span>
                </div>
                <span className=" font-medium">20</span>
              </div>
              {cls?.capacity && (
                <div className=" flex gap-2 items-center">
                  <div className=" flex gap-1 items-center">
                    <FaPeopleGroup /> <span>Capacity:</span>
                  </div>
                  <span className=" font-medium">{cls?.capacity}</span>
                </div>
              )}
            </div>
            <div>{/* Other data which are needed */}</div>
            {cls?.description && (
              <div className=" flex flex-col">
                <h6 className="">Description:</h6>
                <p className=" text-sm ml-4">{cls.description}</p>
              </div>
            )}
            <div className=" flex gap-4 justify-end">
              <div className=" flex gap-2 text-sm">
                <span>Created on:</span>{" "}
                <span className=" font-medium">
                  {formatReadableDate(cls?.created_at)}
                </span>
              </div>
              <div className=" flex gap-2 text-sm">
                <span>Last update:</span>{" "}
                <span className=" font-medium">
                  {formatReadableDate(cls?.updated_at)}
                </span>
              </div>
            </div>
            <div className=" mt-4 flex justify-end flex-wrap gap-2">
              <Button
                library="daisy"
                variant={"primary"}
                className={cn("w-fit")}
                role="page"
                size={"sm"}
                href={`${lang}/c/`}
              >
                {"Visit class"}
              </Button>
              <ClassDialog auth={auth} isSchool cls={cls} />
            </div>
          </div>
        </SheetHeader>
        <Separator />
        <main className="px-4">
          {/* class teacher */}
          <div className=" space-y-4 flex-col flex">
            <div className=" flex justify-between ">
              <Label className=" ">Class Teacher</Label>
              {!cls?.class_teacher && (
                <ClassTeacherDialog auth={auth} cls={cls} />
              )}
            </div>
            {cls?.class_teacher && (
              <div className=" flex justify-between flex-row items-center">
                <div className=" flex gap-2 items-center">
                  <MyAvatar
                    src={cls.class_teacher.image}
                    alt={cls.class_teacher.name}
                    size="sm"
                  />
                  <div className=" flex flex-col">
                    <span className="">{cls.class_teacher.name}</span>
                  </div>
                </div>
                <ClassTeacherDialog
                  name="Change teacher"
                  auth={auth}
                  cls={cls}
                />
              </div>
            )}
          </div>
          {/* teachers */}
          <div className=" space-y-4 flex-col flex mt-4">
            <div className=" flex justify-between ">
              <Label className=" ">Teachers</Label>
            </div>
            {teachers.map((teacher) => {
              return (
                <div
                  key={teacher._id || teacher.id}
                  className=" flex justify-between flex-row items-center"
                >
                  <div className=" flex gap-2 items-center">
                    <MyAvatar
                      src={teacher.image}
                      alt={teacher.name}
                      size="xs"
                    />
                    <div className=" flex flex-col">
                      <span className="">{teacher.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" space-y-2 flex-col flex mt-4">
            <div className=" flex justify-between ">
              <Label className=" ">Subjects</Label>
            </div>
            <ul className="list list-outside ">
              {subjects.map((subject, i) => {
                return (
                  <li
                    key={subject._id || subject.id}
                    className=" p-2 list-row  flex justify-between flex-row items-center"
                  >
                    <div className=" flex gap-2 items-center">
                      <span className=" font-medium">{i + 1}.</span>
                      <span className="">{subject.name}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
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

export default ClassModifySheet;
