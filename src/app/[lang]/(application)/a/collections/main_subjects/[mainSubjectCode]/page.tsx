import MainSubjectLearningOutcomeCard from "@/components/page/admin/main-subject/main-subject-learning-outcome-card";
import MainSubjectInformationCard from "@/components/page/admin/main-subject/MainSubjectInformationCard";
import MainSubjectGradingSchemeCard from "@/components/page/admin/subjects/subject-grading/subject-grading-card";
import MainSubjectProgressConfigCard from "@/components/page/admin/subjects/subject-progress-tracking-config/subject-progress-config-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";

import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import type { SubjectGrading } from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";
import type { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import type { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mainSubjectCode: string }>;
}): Promise<Metadata> {
  const { mainSubjectCode } = await params;
  return {
    title: `${mainSubjectCode} | Main Subject Code`,
    description: `Details for main subject ${mainSubjectCode}`,
  };
}

interface MainSubjectCodePageProps {
  params: Promise<{ mainSubjectCode: string }>;
}

const MainSubjectCodePage = async ({ params }: MainSubjectCodePageProps) => {
  const { mainSubjectCode } = await params;
  const auth = await authContext();

  if (!auth) redirect("/auth/login");

  // Fetch main subject
  const subjectResponse = await apiRequest<void, MainSubject>(
    "get",
    `/main-subjects/code/${mainSubjectCode}`,
    undefined,
    { token: auth.token, realtime: "main_subject" },
  );

  if (subjectResponse.statusCode === 404) {
    return <NotFoundPage message={subjectResponse.message} />;
  }

  if (!subjectResponse.data) {
    return (
      <ErrorPage
        message={subjectResponse.message}
        error={subjectResponse.error}
      />
    );
  }

  // Fetch learning outcomes for the subject
  const [learningOutcomeResponse, progressConfig, grading] = await Promise.all([
    apiRequest<void, LearningOutcome[]>(
      "get",
      `/learning-outcomes/subject/others/${subjectResponse.data._id ?? subjectResponse.data.id}`,
      undefined,
      { token: auth.token, realtime: "learning_outcome" },
    ),
    apiRequest<void, SubjectProgressTrackingConfig>(
      "get",
      `/subject-progress-configs/reference/${subjectResponse.data._id ?? subjectResponse.data.id}`,
      undefined,
      { token: auth.token, realtime: "subject_progress_config" },
    ),
    apiRequest<void, SubjectGrading>(
      "get",
      `/subject-grading-schemes/subject/${subjectResponse.data._id ?? subjectResponse.data.id}`,
      undefined,
      { token: auth.token, realtime: "subject_progress_config" },
    ),
  ]);

  if (progressConfig.statusCode === 404) {
    const apiBody = {
      created_by: auth.user.id,
      role: "MainSubject",
      reference_id: subjectResponse.data?._id || subjectResponse.data?.id,
    };

    const createDefaultProgress = await apiRequest<
      any,
      SubjectProgressTrackingConfig
    >("post", "/subject-progress-configs/default", apiBody, {
      token: auth.token,
      realtime: "subject_progress_config",
      revalidatePath: `/a/collections/main_subjects/${mainSubjectCode}`,
    });

    if (!createDefaultProgress.data) {
      <ErrorPage
        message={
          createDefaultProgress.message ||
          "Failed to create default subject progress config"
        }
        error={createDefaultProgress.error || createDefaultProgress.message}
      />;
    }
  }

  if (grading.statusCode === 404) {
    const apiBody = {
      created_by: auth.user.id,
      role: "MainSubject",
      reference_id: subjectResponse.data?._id || subjectResponse.data?.id,
    };

    const createDefaultProgress = await apiRequest<
      any,
      SubjectProgressTrackingConfig
    >("post", "/subject-grading-schemes/default/percentage", apiBody, {
      token: auth.token,
      realtime: "subject_grading_scheme",
      revalidatePath: `/a/collections/main_subjects/${mainSubjectCode}`,
    });

    if (!createDefaultProgress.data) {
      <ErrorPage
        message={
          createDefaultProgress.message ||
          "Failed to create default subject progress config"
        }
        error={createDefaultProgress.error || createDefaultProgress.message}
      />;
    }
  }

  if (!learningOutcomeResponse.data || !progressConfig.data || !grading.data) {
    return (
      <ErrorPage
        message={
          learningOutcomeResponse.message ||
          progressConfig.message ||
          grading.message ||
          "Failed to fetch one or more datasets"
        }
        error={
          learningOutcomeResponse.error || progressConfig.error || grading.error
        }
      />
    );
  }

  // Render the main subject and its learning outcomes
  return (
    <RealtimeProvider<
      | MainSubject
      | LearningOutcome
      | SubjectProgressTrackingConfig
      | SubjectGrading
    >
      channels={[
        { name: "main_subject", initialData: [subjectResponse.data] },
        {
          name: "learning_outcome",
          initialData: learningOutcomeResponse.data,
        },
        {
          name: "subject_progress_config",
          initialData: [progressConfig.data],
        },
        {
          name: "subject_grading_scheme",
          initialData: [grading.data],
        },
      ]}
    >
      <main className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4">
          <MainSubjectInformationCard
            auth={auth}
            subject={subjectResponse.data}
          />
          <MainSubjectProgressConfigCard
            auth={auth}
            progress={progressConfig.data}
            subject={subjectResponse.data}
          />
          <MainSubjectGradingSchemeCard auth={auth} grading={grading.data} />
        </div>
        <MainSubjectLearningOutcomeCard
          MainSubject={subjectResponse.data}
          learningOutcome={learningOutcomeResponse.data}
          auth={auth}
        />
      </main>
    </RealtimeProvider>
  );
};

export default MainSubjectCodePage;
