import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { TbSocial } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";

import MyImage from "@/components/common/myImage"; // Assuming MyImage handles its own styling and accessibility for icons
import { Card, CardHeader } from "@/components/ui/card";
import { SchoolDto, SocialMediaDto } from "@/lib/schema/school/school.dto"; // Assuming SocialMediaItem is defined in school.dto or can be inferred

// --- Helper for Social Media Icons ---
// This makes the social media mapping much cleaner and easier to extend.
const socialIconMap: Record<string, string> = {
  Facebook: "/icons/facebook.png",
  Twitter: "/icons/twitter.png",
  Instagram: "/icons/instagram.png",
  LinkedIn: "/icons/linkedin.png",
  YouTube: "/icons/youtube.png",
  Threads: "/icons/threads.png",
  Default: "/icons/chain.png", // Fallback icon
};

const getSocialIcon = (platform?: string): string => {
  if (platform && socialIconMap[platform]) {
    return socialIconMap[platform];
  }
  return socialIconMap.Default;
};

// --- Props Interface ---
interface SchoolContactsProps {
  school: SchoolDto;
}
interface ContactDetailProps {
  icon: React.ReactNode;
  text?: string | null;
  className?: string;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  icon,
  text,
  className,
}) => {
  if (!text) return null;
  return (
    <div className={`text-myGray flex items-center space-x-2 ${className}`}>
      {icon}
      <h5 className="">{text}</h5>
    </div>
  );
};

// --- Main Component ---
const SchoolContacts: React.FC<SchoolContactsProps> = ({ school }) => {
  const { contact, socialMedia } = school;

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex items-center space-x-2 border-b-0">
        <TiContacts size={20} aria-hidden="true" />{" "}
        <h3 className="text-lg font-semibold capitalize">School Contact</h3>
      </CardHeader>
      <div className="ml-3 space-y-3">
        <ContactDetail
          icon={<Phone size={16} aria-hidden="true" />}
          text={contact?.phone}
        />
        <ContactDetail
          icon={<Mail size={16} aria-hidden="true" />}
          text={contact?.email}
        />
        {contact?.whatsappNumber && ( // Custom logic for WhatsApp if MyImage is specific
          <div className="text-myGray flex items-center space-x-2">
            <MyImage
              role="ICON"
              src="/icons/whatsapp.png"
              alt="WhatsApp Icon"
            />{" "}
            {/* Added alt text */}
            <h5 className="">{contact.whatsappNumber}</h5>
          </div>
        )}
        {/* Social Media Accounts */}
        {socialMedia && socialMedia.length > 0 && (
          <div className="pt-2">
            {" "}
            {/* Added padding-top for separation */}
            <div className="text-myGray flex items-center space-x-2">
              <TbSocial size={18} aria-hidden="true" />
              <h4 className="font-medium">Social Accounts</h4>
            </div>
            <div className="mt-2 ml-2 space-y-1.5">
              {socialMedia.map(
                (
                  item: SocialMediaDto,
                  index: number, // Added types for item
                ) => (
                  <Link
                    href={item.link || "#"} // Provide a fallback href
                    key={index}
                    className="group text-myGray flex items-center gap-2 transition-colors duration-150 hover:text-blue-600" // Added hover effect and group for potential parent styling
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${
                      item.platform || "social media"
                    } page`} // Accessibility
                  >
                    <MyImage
                      role="ICON"
                      src={getSocialIcon(item.platform)}
                      alt={`${item.platform || "Social Media"} Icon`}
                    />
                    <span className="line-clamp-1 group-hover:underline">
                      {item.platform || item.link}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SchoolContacts;
