'use client';

import { useEffect, useState } from "react";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Locale } from "@/i18n";
import { UserSchool } from "@/lib/utils/auth";
import { GetAllSchoolJoinRequestBySchoolId } from "@/service/school/school-join-request.service";
import { formatTimeAgo } from "@/lib/functions/change-time";
import { studentImage, teacherImage } from "@/lib/context/images";
import JoinSchoolTableDropdown from "./join-school-table-dropdown";
import { SchoolJoinRequestAndOther } from "@/lib/schema/school/school-join-school/school-join-request.schema";

interface Props {
  lang: Locale;
  currentSchool: UserSchool;
}

export default function JoinSchoolTable({ lang, currentSchool }: Props) {
  const [requests, setRequests] = useState<SchoolJoinRequestAndOther[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await GetAllSchoolJoinRequestBySchoolId(currentSchool.schoolId);
        setRequests(res.data || []);
      } catch (err) {
        console.error("Failed to fetch join requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentSchool.schoolId]);

  return (
    <>
      <CardContent className="p-0 justify-between flex flex-col">
        {loading ? (
          <div>Loading...</div>
        ) : requests.length === 0 ? (
          <div>No School request found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Send on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.slice(0, 4).map((item) => {
                if (item.status !== "pending") return null;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.user?.image && item.userId ? (
                          <MyLink loading href={`/${lang}/p/${item.userId}`}>
                            <MyImage
                              className="rounded-full size-12"
                              role="AVATAR"
                              src={
                                item.user.image || (item.role === "STUDENT" ? studentImage : teacherImage)
                              }
                              alt={item.name ?? undefined}
                            />
                          </MyLink>
                        ) : (
                          <MyImage
                            className="rounded-full size-12"
                            role="AVATAR"
                            src={
                              item.user?.image || (item.role === "STUDENT" ? studentImage : teacherImage)
                            }
                            alt={item.name ?? undefined}
                          />
                        )}
                        <div>
                          {item.user?.name && item.userId && (
                            <MyLink
                              loading
                              href={`/${lang}/p/${item.userId}`}
                              className="font-medium"
                            >
                              {item.user.name}
                            </MyLink>
                          )}
                          <span className="text-muted-foreground mt-0.5 text-xs">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell className="text-right">
                      {formatTimeAgo(item.updateAt)}
                    </TableCell>
                    <TableCell>
                      <JoinSchoolTableDropdown requestId={item.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {requests.length > 0 && (
        <CardFooter>
          <MyLink
            loading
            type="button"
            button={{ library: "daisy", variant: "ghost" }}
            href={`/${lang}/s-t/join-school-requests`}
            className="w-full"
            classname=" w-full"
          >
            See others {requests.length}
          </MyLink>
        </CardFooter>
      )}
    </>
  );
}
