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
import { studentImage } from "@/lib/context/images";
import { studentsAndOther } from "@/lib/schema/school/student.dto";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface props {
  lang: Locale;
  students: studentsAndOther[];
}

export default function StudentDashboardTable({ lang, students }: props) {
  return (
    <Card className="w-1/2 pb-2 flex">
      <CardHeader className=" flex justify-between">
        <CardTitle className="text-lg font-semibold">Students</CardTitle>
        <div className=" space-x-4">
          <MyLink
            loading
            href={`/${lang}/s-t/students`}
            type="button"
            button={{ variant: "outline", library: "daisy", size: "sm" }}
            className=" w-fit"
          >
            All students
          </MyLink>
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
            {students.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MyLink
                      loading
                      href={`/${lang}/p/${item.userId}?studentId=${item.id}`}
                    >
                      <MyImage
                        className="rounded-full size-12"
                        classname="mask mask-squircle"
                        src={item.image || studentImage}
                        alt={item.name}
                      />
                    </MyLink>
                    <div>
                      <MyLink
                        loading
                        href={`/${lang}/p/${item.userId}?studentId=${item.id}`}
                        className="font-medium"
                      >
                        {item.name}
                      </MyLink>
                      <span className="text-muted-foreground mt-0.5 text-xs">
                        {item.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <MyLink loading className=" underline-offset-0" href={`/${lang}/c/${item.classId}`}>
                    {item.class.name}
                  </MyLink>
                </TableCell>
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
          href={`/${lang}/s-t/students`}
          classname=" w-full"
          className=" w-full"
        >
          See others {students.length}
        </MyLink>
      </CardFooter>
    </Card>
  );
}
