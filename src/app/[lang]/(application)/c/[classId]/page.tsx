import DevelopingPage from "@/components/page/developing-page";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { getClassById } from "@/service/class/class.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const { classId } = params;
  const classResponse = await getClassById(classId);

  return {
    title: classResponse.data?.name || "Class not found",
    description: `${classResponse.data?.name}`,
  };
};

const ClassIdPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;

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

export default ClassIdPage;
