"use client";

import UpdateSubjectGradingSchemeDialog from "@/components/page/admin/subjects/subject-grading/update-subject-grading-schema-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { SubjectGrading } from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import {
  BarChart2,
  Clock,
  Edit,
  Percent,
  Scale,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  grading: SubjectGrading;
  auth: AuthContext;
}

const MainSubjectGradingSchemeCard = ({ grading, auth }: Props) => {
  const { data } = useRealtimeData<SubjectGrading>("subject_grading_scheme");
  const [currentScheme, setCurrentScheme] = useState<SubjectGrading>(grading);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d.id === grading.id);
      if (updated) setCurrentScheme(updated);
    }
  }, [data, grading.id]);

  return (
    <Card className="h-fit max-w-full lg:max-w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Grading Scheme</CardTitle>
          <UpdateSubjectGradingSchemeDialog
            icon
            auth={auth}
            grading={currentScheme}
          />
        </div>
      </CardHeader>

      <CardContent>
        <aside className="space-y-5">
          {/* --- Scheme Type & Passing Grade --- */}
          <div className="space-y-3 border-b pb-4">
            <div className="flex items-center gap-2 text-sm">
              <Scale className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">Scheme Type</p>
                <p className="font-medium capitalize">
                  {currentScheme.scheme_type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Percent className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">
                  Minimum Passing Grade
                </p>
                <p className="font-medium">
                  {currentScheme.minimum_passing_grade}
                </p>
              </div>
            </div>
          </div>

          {/* --- Grade Boundaries --- */}
          <div className="border-b pb-4">
            <h3 className="text-muted-foreground mb-2 text-sm font-medium">
              Grade Boundaries
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(currentScheme.grade_boundaries || {}).map(
                ([grade, value]) => (
                  <GradeItem key={grade} grade={grade} value={value} />
                ),
              )}
            </div>
          </div>

          {/* --- Assessment Weights --- */}
          <div className="border-b pb-4">
            <h3 className="text-muted-foreground mb-2 text-sm font-medium">
              Assessment Weights
            </h3>
            <div className="space-y-2">
              {Object.entries(currentScheme.assessment_weights || {}).map(
                ([assessment, weight]) => (
                  <AssessmentWeightItem
                    key={assessment}
                    label={assessment}
                    value={weight}
                  />
                ),
              )}
            </div>
          </div>

          {/* --- Metadata --- */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <UserCircle className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">Role</p>
                <p className="font-medium">{currentScheme.role}</p>
              </div>
            </div>

            {currentScheme.updated_at && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-xs">Last Updated</p>
                  <p className="font-medium">
                    {new Date(currentScheme.updated_at).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

/* ---------------------- Sub Components ---------------------- */

const GradeItem = ({ grade, value }: { grade: string; value: number }) => (
  <div className="card border p-2 text-center">
    <div className="flex flex-col items-center justify-center gap-1">
      <BarChart2 className="text-primary h-4 w-4" />
      <p className="text-muted-foreground text-xs">{grade}</p>
      <p className="text-sm font-semibold">{value}%</p>
    </div>
  </div>
);

const AssessmentWeightItem = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="flex items-center justify-between rounded-md border px-3 py-2">
    <div className="flex items-center gap-2">
      <Edit className="text-muted-foreground h-4 w-4" />
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm font-medium">{value}%</span>
  </div>
);

export default MainSubjectGradingSchemeCard;
