import { SchoolAcademicForm } from "@/components/forms/school/school-academic-form";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Create - school",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const SchoolAcademicOnboardingPage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolId } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (currentUser.role !== "SCHOOLSTAFF")
    return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"} />;
  const school = await getSchoolByIdService(schoolId);
  if (!school.data) return <NotFoundPage />;
  return (
    <div className=" px-4 mt-4 space-y-2">
      <div>
        <h1 className="title-page">
          Educational Background Information {school.data.name}
        </h1>
        <p>
          Please provide details about your education across different levels,
          including subjects, assessments, and qualifications from Primary,
          Ordinary Level (O-Level), Advanced Level (A-Level), and TVET.
        </p>
      </div>
      <SchoolAcademicForm />
    </div>
  );
};

export default SchoolAcademicOnboardingPage;
