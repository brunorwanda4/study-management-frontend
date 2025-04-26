import SendJoinSchoolRequest from "@/components/dialog/send-join-school-request-dialog";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Button } from "@/components/ui/button";
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

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "@alexthompson",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
    email: "alex.t@company.com",
    role: "Student",
    sendOn: "2 day ago",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
    email: "sarah.c@company.com",
    role: "Teacher",
    sendOn: "1 hour ago",
  },
  {
    id: "4",
    name: "Maria Garcia",
    username: "@mariagarcia",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
    email: "m.garcia@company.com",
    role: "School Staff",
    sendOn: "3 days ago",
  },
  {
    id: "5",
    name: "David Kim",
    username: "@davidkim",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
    email: "d.kim@company.com",
    role: "Teacher",
    sendOn: "43 min ago",
  },
];

interface props {
  lang: Locale;
  currentSchool: UserSchool;
}

export default function JoinSchoolTable({ lang, currentSchool }: props) {
  return (
    <Card className=" w-1/2 pb-2">
      <CardHeader className=" flex justify-between">
        <CardTitle className="text-lg font-semibold">
          Join School Requests
        </CardTitle>
        <div className=" space-x-4">
          <SendJoinSchoolRequest currentSchool={currentSchool} lang={lang} />
          <Button variant={"ghost"} shape={"circle"} library="daisy">
            <HiOutlineDotsHorizontal size={24} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className=" p-0">
        <Table className="">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Send on</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MyImage
                      className="rounded-full size-12"
                      classname="mask mask-squircle"
                      src={item.image}
                      alt={item.name}
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">
                        {item.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell className="text-right">{item.sendOn}</TableCell>
                <TableCell>
                  <HiOutlineDotsHorizontal />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <MyLink
          loading
          type="button"
          button={{ library: "daisy", variant: "ghost" }}
          href={`/${lang}/s-t/join-school-request`}
          className=" w-full"
        >
          See others 43
        </MyLink>
      </CardFooter>
    </Card>
  );
}
