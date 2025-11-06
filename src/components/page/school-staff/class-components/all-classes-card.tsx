"use client";
import ClassCard from "@/components/cards/class-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface props {
  lang: Locale;
  auth: AuthContext;
  classes: ClassWithOthers[];
  realtimeEnabled?: boolean;
}

const AllClassesCards = ({
  lang,
  auth,
  classes,
  realtimeEnabled = true,
}: props) => {
  const { data: initialClasses, isConnected } =
    useRealtimeData<ClassWithOthers>("class");
  const [displayClasses, setDisplayClasses] =
    useState<ClassWithOthers[]>(classes);

  useEffect(() => {
    if (realtimeEnabled && initialClasses) {
      setDisplayClasses(initialClasses as ClassWithOthers[]);
    } else if (!realtimeEnabled) {
      setDisplayClasses(initialClasses);
    }
  }, [initialClasses, realtimeEnabled]);
  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayClasses.map((cls) => {
        return (
          <ClassCard
            key={cls.id || cls._id}
            isSchoolStaff
            lang={lang}
            auth={auth}
            cls={cls}
          />
        );
      })}
    </div>
  );
};

export default AllClassesCards;
