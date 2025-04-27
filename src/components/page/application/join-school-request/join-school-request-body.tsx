import SchoolJoinRequestCard from "@/components/cards/school-Join-request-card";
import { Locale } from "@/i18n";
import { SchoolJoinRequestAndSchool } from "@/lib/schema/school/school-join-school/school-join-request.schema";
import { AuthUserDto } from "@/lib/utils/auth";

interface props {
  requests: SchoolJoinRequestAndSchool[];
  lang: Locale;
  currentUser: AuthUserDto;
}

const JoinSchoolRequestBody = ({ lang, requests, currentUser }: props) => {
  return (
    <div className="flex flex-row gap-4 justify-center items-center">
      {requests.slice(0, 3).map((item) => {
        if (item.status !== "pending") return null;
        return (
          <SchoolJoinRequestCard
            currentUserImage={currentUser.image}
            key={item.id}
            request={item}
            lang={lang}
          />
        );
      })}
    </div>
  );
};

export default JoinSchoolRequestBody;
