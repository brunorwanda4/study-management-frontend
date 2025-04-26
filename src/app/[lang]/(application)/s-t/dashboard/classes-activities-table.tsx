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

const items = [
  {
    id: "5",
    name: "David Kim",
    className: "L4 SOD",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
    subject: "Kinyarwanda",
    type: "Homework",
    submit: "43 min from now",
  },
  {
    id: "1",
    name: "Alex Thompson",
    className: "S3",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
    subject: "English",
    type: "Excises",
    submit: "2 day from now",
  },
  {
    id: "4",
    name: "Maria Garcia",
    className: "L5 NIT",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
    subject: "Math",
    type: "Homework",
    submit: "3 hours from now",
  },
  {
    id: "2",
    name: "Sarah Chen",
    className: "L4 SOD",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
    subject: "Biology",
    type: "Test",
    submit: "1 hour ago",
  },
];

interface props {
  lang: Locale;
}

export default function ClassActivitiesTable({ lang }: props) {
  return (
    <Card className="w-1/2">
      <CardHeader className=" flex justify-between">
        <CardTitle className="text-lg font-semibold">
          Classes activities
        </CardTitle>
        <div className=" space-x-4">
          <Button variant={"ghost"} shape={"circle"} library="daisy">
            <HiOutlineDotsHorizontal size={24} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className=" p-0">
        <Table className="">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Class</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submit on</TableHead>
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
                      <div className="font-medium">{item.className}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell className="text-start">{item.type}</TableCell>
                <TableCell className="text-start">{item.submit}</TableCell>
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
