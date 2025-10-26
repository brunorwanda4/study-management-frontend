"use client";
import SchoolJoinRequestCard from "@/components/cards/school-Join-request-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface props {
  requests: JoinSchoolRequestWithRelations[];
  lang: Locale;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

const JoinSchoolRequestBody = ({
  lang,
  requests,
  auth,
  realtimeEnabled = true,
}: props) => {
  const { data: initialRequests } =
    useRealtimeData<JoinSchoolRequestWithRelations>("join_school_request");
  const [displayRequests, setDisplayRequests] =
    useState<JoinSchoolRequestWithRelations[]>(requests);

  useEffect(() => {
    if (realtimeEnabled && initialRequests) {
      setDisplayRequests(initialRequests as JoinSchoolRequestWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayRequests(initialRequests);
    }
  }, [initialRequests, realtimeEnabled]);

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {displayRequests.map((item) => {
        if (item.status !== "Pending") return null;
        return (
          <SchoolJoinRequestCard
            key={item.id}
            request={item}
            lang={lang}
            auth={auth}
          />
        );
      })}
    </div>
  );
};

export default JoinSchoolRequestBody;
