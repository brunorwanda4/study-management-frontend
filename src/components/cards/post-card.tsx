import { Separator } from "@/components/ui/separator";
import PostCardHeader from "./post-card-header";
import PostCardFooter from "./post-card-footer";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Dot } from "lucide-react";
import { Locale } from "@/i18n";
import Link from "next/link";
import MyImage from "@/components/myComponents/myImage";

interface props {
  postRole?: "NOTES" | "IMAGE" | "VIDEO" | "POST" | "ACTIVITY" | "TEXT";
  lang: Locale;
  role?: "isNote";
}

const PostCard = ({ postRole, lang, role }: props) => {
  return (
    <div className=" basic-card p-0 justify-between">
      <div>
        <PostCardHeader lang={lang} />
        <Separator />
      </div>
      {postRole === "NOTES" && (
        <div className=" px-4 pb-2">
          <div className=" space-x-2 text-sm text-myGray">
            <span>Kinyarwanda</span>
            <span className=" ">Notes</span>
          </div>
          <h3 className=" text-lg font-semibold text-center">Lesson 1</h3>
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
        </div>
      )}
      {postRole === "IMAGE" && (
        <div className=" relative h-72">
          <MyImage
            src="https://i.pinimg.com/1200x/53/58/41/5358412892040d5d10ba7262c3efa1b0.jpg"
            className=" w-full h-full"
          />
          <div className=" flex justify-between">
            <Button
              library="daisy"
              variant="ghost"
              shape="circle"
              className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 text-white"
            >
              <FaChevronLeft size={32} />
            </Button>
            <Button
              library="daisy"
              variant="ghost"
              shape="circle"
              className=" absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 text-white"
            >
              <FaChevronRight size={32} className="" />
            </Button>
          </div>
          <div className=" absolute bottom-0 z-30  right-1/2 ml-4">
            <div className=" -space-x-8 flex">
              <Dot size={48} />
              <Dot size={48} className="text-white" />
              <Dot size={48} />
            </div>
          </div>
        </div>
      )}

      <Separator />
      {postRole === "ACTIVITY" && (
        <div className=" p-4">
          <div className=" flex justify-between">
            <div className=" text-sm text-myGray">
              <div className=" space-x-2">
                <span>Kinyarwanda</span>
                <span className=" ">Activities</span>
              </div>
              <div>
                <span>Submit wed 12/1/2025</span>
              </div>
            </div>
            <div className=" flex flex-col text-sm">
              <span>100 Point</span>
            </div>
          </div>
          <div className=" mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sed
            voluptates modi magnam possimus quisquam corrupti voluptatibus
            nesciunt perferendis voluptatem nobis natus facilis nostrum, ratione
            dolores vero numquam iusto cumque! ...
          </div>
        </div>
      )}
      {postRole === "TEXT" && (
        <div>
          <div className=" p-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              labore eius nesciunt vel veritatis, quod delectus eligendi
              accusantium dicta dolorem provident culpa! Sunt exercitationem
              accusantium nesciunt. Perferendis nam maxime facilis.
            </p>
          </div>
          <Separator />
        </div>
      )}
      {postRole !== "ACTIVITY" && <PostCardFooter postRole={postRole} />}
    </div>
  );
};

export default PostCard;
