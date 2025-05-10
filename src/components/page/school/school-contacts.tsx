import { Mail, Phone } from "lucide-react";
import { TiContacts } from "react-icons/ti";
import { TbSocial } from "react-icons/tb";
import Link from "next/link";
import MyImage from "@/components/myComponents/myImage";
import { SchoolDto } from "@/lib/schema/school.dto";

interface props {
  school: SchoolDto;
}

const SchoolContacts = ({ school }: props) => {
  return (
    <div className=" basic-card space-y-2">
      <div className=" flex space-x-2 items-center ">
        <TiContacts />
        <h3 className=" font-semibold capitalize">School contact</h3>
      </div>
      <div className=" space-y-2 ml-3">
        {school.contact?.phone && (
          <div className=" flex space-x-2 items-center text-myGray">
            <Phone size={16} /> <h5 className="">{school.contact?.phone}</h5>
          </div>
        )}
        {school.contact?.email && (
          <div className=" flex space-x-2 items-center text-myGray">
            <Mail size={16} /> <h5 className="">{school.contact?.email}</h5>
          </div>
        )}
        {school.contact?.whatsappNumber && (
          <div className=" flex space-x-2 items-center text-myGray">
            <MyImage role="ICON" src="/icons/whatsapp.png" />{" "}
            <h5 className="">{school.contact?.whatsappNumber}</h5>
          </div>
        )}
        {/* others */}
        <div>
          <div className=" flex space-x-2 items-center text-myGray">
            <TbSocial size={16} />{" "}
            <h5 className=" font-medium">Social accounts</h5>
          </div>
          <div className=" ml-2 space-y-1">
            {school.socialMedia?.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  key={index}
                  className=" flex -space-x-1 gap-2 items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MyImage
                    role="ICON"
                    src={
                      item.platform === "Facebook"
                        ? "/icons/facebook.png"
                        : item.platform === "Twitter"
                        ? "/icons/twitter.png"
                        : item.platform === "Instagram"
                        ? "/icons/instagram.png"
                        : item.platform === "LinkedIn"
                        ? "/icons/linkedin.png"
                        : item.platform === "YouTube"
                        ? "/icons/youtube.png"
                        : item.platform === "Threads"
                        ? "/icons/threads.png"
                        : "/icons/chain.png"
                    }
                  />
                  <span className=" line-clamp-1">{item.link}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolContacts;
