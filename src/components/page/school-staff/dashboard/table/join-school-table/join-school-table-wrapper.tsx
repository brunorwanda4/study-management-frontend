import MyLink from "@/components/common/myLink";
import SendJoinSchoolRequest from "@/components/page/school-staff/dialog/send-join-school-request-dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import { UserSchool } from "@/lib/utils/auth";
import JoinSchoolTable from "./Join-school-table.client";

interface Props {
  lang: Locale;
  currentSchool: UserSchool;
}

export default function JoinSchoolTableWrapper({ lang, currentSchool }: Props) {
  return (
    <Card className="w-1/2 pb-2">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg font-semibold">
          Join School Requests
        </CardTitle>
        <div className="space-x-4">
          <SendJoinSchoolRequest currentSchool={currentSchool} lang={lang} />
          <MyLink
            href={`/${lang}/s-t/join-school-requests`}
            type="button"
            loading
            button={{ variant: "outline", size: "sm", library: "daisy" }}
          >
            All Request
          </MyLink>
        </div>
      </CardHeader>
      <JoinSchoolTable lang={lang} currentSchool={currentSchool} />
    </Card>
  );
}
