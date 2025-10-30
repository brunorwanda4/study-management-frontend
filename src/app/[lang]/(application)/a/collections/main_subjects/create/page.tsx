import CreateMainSubjectClientPage from "@/components/page/admin/main-subject/create-main-subject-client-page";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import type { LearningOutcomeWithOthers } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import type { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create main Subject",
  description: "Create new main subject",
};

export default async function CreateMainSubjectPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; id?: string }>;
}) {
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  // ✅ Await search params
  const params = await searchParams;
  const subjectId = params.id;

  // ✅ Fetch all data in parallel
  const [subjectRes, progressRes, outcomesRes] = await Promise.all([
    subjectId
      ? apiRequest<void, MainSubject>(
          "get",
          `/main-subjects/${subjectId}`,
          undefined,
          { token: auth.token, realtime: "main_subject" },
        )
      : apiRequest<void, MainSubject[]>("get", "/main-subjects", undefined, {
          token: auth.token,
          realtime: "main_subject",
        }),
    apiRequest<void, SubjectProgressTrackingConfig[]>(
      "get",
      `/subject-progress-configs`,
      undefined,
      { token: auth.token, realtime: "subject_progress_config" },
    ),
    subjectId
      ? apiRequest<void, LearningOutcomeWithOthers[]>(
          "get",
          `/learning-outcomes/subject/others/${subjectId}`,
          undefined,
          { token: auth.token, realtime: "learning_outcome" },
        )
      : apiRequest<void, LearningOutcomeWithOthers[]>(
          "get",
          `/learning-outcomes`,
          undefined,
          { token: auth.token, realtime: "learning_outcome" },
        ),
  ]);

  // ✅ Handle failed API requests (undefined or error)
  if (
    subjectRes.error ||
    progressRes.error ||
    outcomesRes.error ||
    subjectRes.data === undefined ||
    progressRes.data === undefined ||
    outcomesRes.data === undefined
  ) {
    return (
      <ErrorPage
        error={subjectRes.error || progressRes.error || outcomesRes.error}
        message="Failed to fetch one or more datasets"
      />
    );
  }

  // ✅ Normalize data to arrays for RealtimeProvider
  const subjectData = Array.isArray(subjectRes.data)
    ? subjectRes.data
    : subjectRes.data
      ? [subjectRes.data]
      : [];

  const progressData = Array.isArray(progressRes.data)
    ? progressRes.data
    : progressRes.data
      ? [progressRes.data]
      : [];

  const outcomeData = Array.isArray(outcomesRes.data)
    ? outcomesRes.data
    : outcomesRes.data
      ? [outcomesRes.data]
      : [];

  // ✅ Render main component
  return (
    <RealtimeProvider<
      MainSubject | SubjectProgressTrackingConfig | LearningOutcomeWithOthers
    >
      channels={[
        { name: "main_subject", initialData: subjectData },
        {
          name: "subject_progress_config",
          initialData: progressData,
        },
        {
          name: "learning_outcome",
          initialData: outcomeData,
        },
      ]}
    >
      <CreateMainSubjectClientPage auth={auth} subjectId={subjectId} />
    </RealtimeProvider>
  );
}
