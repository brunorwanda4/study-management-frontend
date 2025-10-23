import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolContacts from "@/components/page/school/school-contacts";
import SchoolHomeAbout from "@/components/page/school/school-home-about";
import SchoolImages from "@/components/page/school/school-images";
import { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolAboutPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!auth.school) return <JoinSchoolPage />;

  const schoolRes = await apiRequest<void, School>(
    "get",
    `/schools/${auth.school.id}`,
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
    },
  );
  if (!schoolRes.data) return <NotFoundPage />;

  const [sectors_res, trades_res] = await Promise.all([
    schoolRes.data.curriculum
      ? apiRequest<string[], SectorModel[]>(
          "post",
          "/sectors/by-ids",
          schoolRes.data.curriculum,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        )
      : { data: [] },
    schoolRes.data.education_level
      ? apiRequest<string[], TradeModule[]>(
          "post",
          "/trades/by_ids",
          schoolRes.data.education_level,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        )
      : { data: [] },
  ]);

  return (
    <RealtimeProvider<School | SectorModel | TradeModule>
      channels={[
        { name: "school", initialData: [schoolRes.data] },
        { name: "trade", initialData: trades_res.data ? trades_res.data : [] },
        {
          name: "trade",
          initialData: sectors_res.data ? sectors_res.data : [],
        },
      ]}
    >
      <div className="flex min-h-screen space-x-4 px-4">
        <div className="w-1/2 space-y-4">
          <SchoolHomeAbout
            trades={trades_res.data || []}
            sectors={sectors_res.data || []}
            school={schoolRes.data}
            isAboutSchool
            lang={lang}
          />
        </div>
        <div className="w-1/2 space-y-4">
          <SchoolContacts school={schoolRes.data} />
          <SchoolImages />
        </div>
        <div className="h-screen"></div>
      </div>
    </RealtimeProvider>
  );
};

export default SchoolAboutPage;
