import MyImage from "@/components/common/myImage";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { studentsImage } from "@/lib/context/images";
import { Dot } from "lucide-react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import PostCardFooter from "./post-card-footer";
import PostCardHeader from "./post-card-header";

interface props {
  postRole?: "NOTES" | "IMAGE" | "VIDEO" | "POST" | "ACTIVITY" | "TEXT";
  lang: Locale;
  role?: "isNote";
}

const PostCard = ({ postRole, lang, role }: props) => {
  return (
    <Card className="justify-between">
      <CardHeader>
        <PostCardHeader lang={lang} />
      </CardHeader>
      {postRole === "NOTES" && (
        <CardContent className="px-4 pb-2">
          <div className="text-myGray space-x-2 text-sm">
            <span>Kinyarwanda</span>
            <span className=" ">Notes</span>
          </div>
          <h3 className="text-center text-lg font-semibold">Lesson 1</h3>
          <p>
            <Link
              href={
                role === "isNote"
                  ? `/${lang}/notes/123`
                  : `/${lang}/class/student/notes/student`
              }
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem doloribus nobis totam nemo id provident tempora quos,
              sed modi. Commodi optio, nemo beatae tenetur repellat aspernatur
              asperiores delectus nihil accusamus...
            </Link>
          </p>
        </CardContent>
      )}
      {postRole === "IMAGE" && (
        <CardContent className="relative h-72 px-0 py-0">
          <MyImage src={studentsImage} className="h-full w-full" />
          <div className="flex justify-between">
            <Button
              library="daisy"
              variant="ghost"
              shape="circle"
              className="absolute top-1/2 left-0 -translate-x-0 -translate-y-1/2 transform text-white"
            >
              <FaChevronLeft size={32} />
            </Button>
            <Button
              library="daisy"
              variant="ghost"
              shape="circle"
              className="absolute top-1/2 right-0 -translate-x-0 -translate-y-1/2 transform text-white"
            >
              <FaChevronRight size={32} className="" />
            </Button>
          </div>
          <div className="absolute right-1/2 bottom-0 z-30 ml-4">
            <div className="flex -space-x-8">
              <Dot size={48} />
              <Dot size={48} className="text-white" />
              <Dot size={48} />
            </div>
          </div>
        </CardContent>
      )}

      <Separator />
      {postRole === "ACTIVITY" && (
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div className="text-myGray text-sm">
              <div className="space-x-2">
                <span>Kinyarwanda</span>
                <span className=" ">Activities</span>
              </div>
              <div>
                <span>Submit wed 12/1/2025</span>
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <span>100 Point</span>
            </div>
          </div>
          <div className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sed
            voluptates modi magnam possimus quisquam corrupti voluptatibus
            nesciunt perferendis voluptatem nobis natus facilis nostrum, ratione
            dolores vero numquam iusto cumque! ...
          </div>
        </CardContent>
      )}
      {postRole === "TEXT" && (
        <CardContent>
          <div className="p-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              labore eius nesciunt vel veritatis, quod delectus eligendi
              accusantium dicta dolorem provident culpa! Sunt exercitationem
              accusantium nesciunt. Perferendis nam maxime facilis.
            </p>
          </div>
          <Separator />
        </CardContent>
      )}
      {postRole !== "ACTIVITY" && <PostCardFooter postRole={postRole} />}
    </Card>
  );
};

export default PostCard;
