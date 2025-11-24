import { UserSmCard } from "@/components/cards/user-card";
import PeoplePageFilter from "@/components/page/class/people/people-page-filter";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassIdPeoplePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className=" flex flex-col gap-2 w-full mt-2">
        <h3 className=" h3">42 People</h3>
        <PeoplePageFilter auth={auth} />
      </div>
      <div className=" flex flex-col lg:flex-row-reverse gap-4 lg:gap-8 justify-between ">
        <div className=" flex flex-col gap-2 lg:w-1/2">
          <div className=" flex flex-row justify-between  w-full mt-2">
            <h3 className=" h5">9 Teachers</h3>
            <div className=" flex gap-2">
              <span>5 Male</span>
              <span>4 Female</span>
            </div>
          </div>
          {/*Teachers*/}
          <div className=" flex flex-col gap-2">
            {[...Array(6)].map((_, t) => {
              return (
                <UserSmCard
                  key={t}
                  showMessage
                  subjects={["Kinyarwanda", "English"]}
                  name="Rwanda Bruno"
                  gender="MALE"
                />
              );
            })}
          </div>
        </div>
        {/*Students*/}
        <div className=" flex flex-col gap-2 lg:w-1/2">
          <div className=" flex flex-row justify-between  w-full mt-2">
            <h3 className=" h5">32 Students</h3>
            <div className=" flex gap-2">
              <span>5 Male</span>
              <span>4 Female</span>
            </div>
          </div>
          {/*Teachers*/}
          <div className=" flex flex-col gap-2">
            {[...Array(6)].map((_, t) => {
              return (
                <UserSmCard
                  key={t}
                  showMessage
                  name="Student name"
                  gender="MALE"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassIdPeoplePage;
