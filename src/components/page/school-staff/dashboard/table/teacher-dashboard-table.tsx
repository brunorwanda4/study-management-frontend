import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
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
import { teacherImage } from "@/lib/context/images";
import { TeacherDto } from "@/lib/schema/school/teacher.dto";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface props {
  lang: Locale;
  teachers: TeacherDto[];
}

export default function TeachersDashboardTable({ lang, teachers }: props) {
  return (
    <Card className="w-1/2 pb-2">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg font-semibold">Teachers</CardTitle>
        <div className="space-x-4">
          <MyLink
            href={`/${lang}/s-t/teachers`}
            type="button"
            button={{ library: "daisy", variant: "outline", size: "sm" }}
          >
            All teachers
          </MyLink>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>Gender</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MyLink
                      loading
                      href={`/${lang}/p/${item.userId}?teacherId=${item.id}`}
                    >
                      <MyImage
                        className="size-12 rounded-full"
                        classname="mask mask-squircle"
                        src={item.image || teacherImage}
                        alt={item.name}
                      />
                    </MyLink>
                    <div>
                      <MyLink
                        loading
                        href={`/${lang}/p/${item.userId}?teacherId=${item.id}`}
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
                <TableCell>{item.phone}</TableCell>
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
          href={`/${lang}/s-t/classes`}
          className="w-full"
          classname=" w-full"
        >
          See others {teachers.length}
        </MyLink>
      </CardFooter>
    </Card>
  );
}
