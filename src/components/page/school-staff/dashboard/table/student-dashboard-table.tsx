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
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AddStudentInSchoolDialog from "../../dialog/add-student-in-school-dialog";

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    class: "S1",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
    email: "alex.t@company.com",
    role: "Student",
    gender: "Male",
  },
  {
    id: "2",
    name: "Sarah Chen",
    class: "S1",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
    email: "sarah.c@company.com",
    role: "Teacher",
    gender: "Female",
  },
  {
    id: "4",
    name: "Maria Garcia",
    class: "S1",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
    email: "m.garcia@company.com",
    role: "School Staff",
    gender: "Female",
  },
  {
    id: "5",
    name: "David Kim",
    class: "S1",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
    email: "d.kim@company.com",
    role: "Teacher",
    gender: "Female",
  },
];

interface props {
  lang: Locale;
}

export default function StudentDashboardTable({ lang }: props) {
  return (
    <Card className="w-1/2 pb-2">
      <CardHeader className=" flex justify-between">
        <CardTitle className="text-lg font-semibold">Students</CardTitle>
        <div className=" space-x-4">
          <MyLink
            loading
            href={`/${lang}/s-t/students`}
            type="button"
            button={{ variant: "info", library: "daisy" , size : "sm"}}
            className=" w-fit"
          >
            View all students
          </MyLink>
          <AddStudentInSchoolDialog />
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
              <TableHead>Class</TableHead>
              <TableHead>Gender</TableHead>
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
                <TableCell>{item.class}</TableCell>
                <TableCell className="text-start">{item.gender}</TableCell>
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
          href={`/${lang}/s-t/classes/activities`}
          className=" w-full"
        >
          See others 400
        </MyLink>
      </CardFooter>
    </Card>
  );
}
