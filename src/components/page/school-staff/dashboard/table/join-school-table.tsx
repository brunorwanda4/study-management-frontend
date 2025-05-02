import SendJoinSchoolRequest from "@/components/page/school-staff/dialog/send-join-school-request-dialog";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GetAllSchoolJoinRequestBySchoolId } from "@/service/school/school-join-request.service";
import { formatTimeAgo } from "@/lib/functions/change-time";
import { studentImage, teacherImage } from "@/lib/context/images";
interface props {
  lang: Locale;
  currentSchool: UserSchool;
}

export default async function JoinSchoolTable({ lang, currentSchool }: props) {
  const requests = await GetAllSchoolJoinRequestBySchoolId(
    currentSchool.schoolId
  );
  return (
    <Card className=" w-1/2 pb-2">
      <CardHeader className=" flex justify-between">
        <CardTitle className="text-lg font-semibold">
          Join School Requests
        </CardTitle>
        <div className=" space-x-4">
          <SendJoinSchoolRequest currentSchool={currentSchool} lang={lang} />
          <MyLink
            href={`/${lang}/s-t/join-school-requests`}
            type="button"
            loading
            button={{ variant: "outline", size: "sm", library: "daisy" }}
          >
            All Request
          </MyLink>
        </div>
      </CardHeader>
      <CardContent className=" p-0 justify-between flex flex-col">
        {!requests.data ? (
          <div>no data found</div>
        ) : requests.data.length === 0 ? (
          <div>No School request found</div>
        ) : (
          <Table className="">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Send on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.data.slice(0, 4).map((item) => {
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
                                item.user?.image
                                  ? item.user.image || "/images/p.jpg"
                                  : item.role === "STUDENT"
                                  ? studentImage
                                  : teacherImage
                              }
                              alt={item.name ?? undefined}
                            />
                          </MyLink>
                        ) : (
                          <MyImage
                            className="rounded-full size-12"
                            role="AVATAR"
                            src={
                              item.user?.image
                                ? item.user.image || "/images/p.jpg"
                                : item.role === "STUDENT"
                                ? studentImage
                                : teacherImage
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
                    {/* 2 day ago */}
                    <TableCell className="text-right">
                      {formatTimeAgo(item.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <HiOutlineDotsHorizontal />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      {requests.data ? (
        <CardFooter>
          {requests.data.length !== 0 ? (
            <MyLink
              loading
              type="button"
              button={{ library: "daisy", variant: "ghost" }}
              href={`/${lang}/s-t/join-school-requests`}
              className=" w-full"
              classname=" w-full"
            >
              See others {requests.data.length}
            </MyLink>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
