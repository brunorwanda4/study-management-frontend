import DevelopingPage from "@/components/page/developing-page";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classUsername: string }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  return {
    title: "Class not found",
    description: `classUsername`,
  };
};

const ClassUsernamePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classUsername } = params;

  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return <DevelopingPage lang={lang} role={auth.user.role} />;

  // return (
  //   <div className="space-y-4">
  //     <div className="flex space-x-4">
  //       <div className=" w-1/2 space-y-4">
  //         <h3 className=" basic-title">Class activities</h3>
  //         <div className=" space-y-2">
  //           {[...Array(2)].map((_, index) => {
  //             return <PostCard postRole="NOTES" key={index} lang={lang} />;
  //           })}
  //           {[...Array(3)].map((_, index) => {
  //             return <PostCard postRole="IMAGE" key={index} lang={lang} />;
  //           })}
  //         </div>
  //       </div>
  //       <div className=" w-1/2 space-y-4">
  //         <ClassTimetable />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ClassUsernamePage;
