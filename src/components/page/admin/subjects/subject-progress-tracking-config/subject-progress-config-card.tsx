"use client";

import UpdateSubjectProgressTrackingConfigDialog from "@/components/page/admin/subjects/subject-progress-tracking-config/update-subject-progress-tracking-config-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock,
  Target,
  TrendingUp,
  UserCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  progress: SubjectProgressTrackingConfig;
  auth: AuthContext;
  subject?: MainSubject;
}

const MainSubjectProgressConfigCard = ({ progress, auth, subject }: Props) => {
  const { data } = useRealtimeData<SubjectProgressTrackingConfig>(
    "subject_progress_config",
  );
  const [currentProgress, setCurrentProgress] =
    useState<SubjectProgressTrackingConfig>(progress);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === progress._id);
      if (updated) setCurrentProgress(updated);
    }
  }, [data, progress._id]);

  const { thresholds } = currentProgress;

  return (
    <Card className="h-fit max-w-full lg:max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Progress Tracking Configuration</CardTitle>
          <div>
            <UpdateSubjectProgressTrackingConfigDialog
              icon
              auth={auth}
              config={currentProgress}
              subject={subject}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <aside className="md:w-80">
          {/* Tracking Options */}
          <div className="space-y-3 border-b pb-4">
            <h3 className="text-muted-foreground text-sm font-medium">
              Tracking Options
            </h3>
            <div className="space-y-2">
              <TrackingItem
                icon={Activity}
                label="Track Attendance"
                value={currentProgress.track_attendance}
              />
              <TrackingItem
                icon={ClipboardList}
                label="Track Assignments"
                value={currentProgress.track_assignments}
              />
              <TrackingItem
                icon={Target}
                label="Track Topic Coverage"
                value={currentProgress.track_topic_coverage}
              />
              <TrackingItem
                icon={TrendingUp}
                label="Track Skill Acquisition"
                value={currentProgress.track_skill_acquisition}
              />
            </div>
          </div>

          {/* Thresholds */}
          <div className="mt-4 space-y-3 border-b pb-4">
            <h3 className="text-muted-foreground text-sm font-medium">
              Thresholds
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <ThresholdItem
                icon={CheckCircle2}
                label="Satisfactory"
                value={thresholds.satisfactory}
                color="text-success"
              />
              <ThresholdItem
                icon={AlertTriangle}
                label="Needs Improvement"
                value={thresholds.needs_improvement}
                color="text-warning"
              />
              <ThresholdItem
                icon={XCircle}
                label="At Risk"
                value={thresholds.at_risk}
                color="text-error"
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <UserCircle className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">Role</p>
                <p className="font-medium">{currentProgress.role}</p>
              </div>
            </div>

            {currentProgress.updated_at && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-xs">Last Updated</p>
                  <p className="font-medium">
                    {new Date(currentProgress.updated_at).toLocaleDateString(
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

const TrackingItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: boolean;
}) => (
  <div className="flex items-center justify-between rounded-md border px-3 py-2">
    <div className="flex items-center gap-2">
      <Icon className="text-muted-foreground h-4 w-4" />
      <span className="text-sm">{label}</span>
    </div>
    <span
      className={cn(
        "text-sm font-medium",
        value ? "text-success" : "text-muted-foreground",
      )}
    >
      {value ? "Yes" : "No"}
    </span>
  </div>
);

const ThresholdItem = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
}) => (
  <div className="rounded-md border p-2 text-center">
    <div className={cn("flex flex-col items-center justify-center gap-1")}>
      <Icon className={cn("h-4 w-4", color)} />
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={cn("text-sm font-semibold", color)}>{value}%</p>
    </div>
  </div>
);

export default MainSubjectProgressConfigCard;
