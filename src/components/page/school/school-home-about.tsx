import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import Link from "next/link";
 import { FaSchool } from "react-icons/fa6";
import { MdOutlineSchool, MdSchool } from "react-icons/md";

interface props {
  lang: Locale;
  isAboutSchool?: boolean;
}

const SchoolHomeAbout = ({ lang, isAboutSchool }: props) => {
  return (
    <div className=" w-full basic-card space-y-4">
      <div className=" space-y-1">
        <div className=" flex space-x-2 items-center">
          <FaSchool /> <h3 className=" font-semibold">About School</h3>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          consequatur sequi suscipit quo corrupti laboriosam maxime sapiente
          animi quod. Maiores eos fuga ea error. Quas sit aperiam nulla!
          Voluptatem, tenetur
        </p>
      </div>
      <div className=" space-y-4">
        {/* school education */}
        <div className=" space-y-1">
          <div className=" flex space-x-2 items-center text-myGray">
            <MdSchool /> <h4 className=" font-semibold">School Education</h4>
          </div>
          <div className=" space-y-2">
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <Avatar className=" size-8">
                  <AvatarImage src="/images/logortb.jpg" />
                  <AvatarFallback>LOGO</AvatarFallback>
                </Avatar>
                <h6 className=" font-medium">TVET</h6>
              </div>
            </div>
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <Avatar className=" size-8">
                  <AvatarImage src="/images/REB_Logo.png" />
                  <AvatarFallback>LOGO</AvatarFallback>
                </Avatar>
                <h6 className=" font-medium">REB</h6>
              </div>
            </div>
          </div>
        </div>
        {/* schooling */}
        <div className=" space-y-1">
          <div className=" flex space-x-2 items-center text-myGray">
            <MdOutlineSchool /> <h4 className=" font-semibold">Schooling</h4>
          </div>
          <div className=" space-y-2">
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <h6 className=" font-medium">Boarding</h6>
              </div>
            </div>
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <h6 className=" font-medium">Days</h6>
              </div>
            </div>
          </div>
        </div>
        {/* other this about school */}
        {isAboutSchool && (
        // TODO: add tooltip when you hover it you see the meaning for item
          <div>
            {/* sectors */}
            <div className=" space-y-2">
              <div className=" flex space-x-2 items-center text-myGray">
                <MdOutlineSchool />{" "}
                <h4 className=" font-semibold">Sectors school have</h4>
              </div>
              {/* all sectors */}
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Primary</h6>
                  <span className=" text-sm text-myGray">P1 --- P6</span>
                </div>
              </div>
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Ordinary Level</h6>
                  <span className=" text-sm text-myGray">S1 --- S3</span>
                </div>
              </div>
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Adicantance Level</h6>
                  <span className=" text-sm text-myGray">S4 --- S6 (4)</span>
                </div>
              </div>
            </div>
            {/* school trades */}
            <div className=" space-y-2">
              <div className=" flex space-x-2 items-center text-myGray">
                <MdOutlineSchool /> <h4 className=" font-semibold">Trades</h4>
              </div>
              {/* all trades */}
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Math Physic Geography (MPG)</h6>
                  <span className=" text-sm text-myGray">S4MPG --- S6MPG</span>
                </div>
              </div>
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Math Physic Computer (MPC)</h6>
                  <span className=" text-sm text-myGray">S4MPC --- S6MPC</span>
                </div>
              </div>
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Kinyarwanda English Kiswahili (KEK)</h6>
                  <span className=" text-sm text-myGray">S4KEK --- S6KEK</span>
                </div>
              </div>
              <div className=" flex -space-x-1 items-center">
                <Dot size={32} />
                <div className=" flex space-x-2 items-center">
                  <h6 className=" font-medium">Software Development (SOD)</h6>
                  <span className=" text-sm text-myGray">L3SOD --- L5SOD</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* to check is in on about school it will not show it */}
      {!isAboutSchool && (
        <Link href={`/${lang}/school/about`} className=" ">
          <Button variant="ghost" size="sm" className=" w-full">
            See more
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SchoolHomeAbout;
