"use client";

import SearchBox from "@/components/common/form/search-box";
import ChangeDisplay from "@/components/display/change-diplay";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import { Separator } from "@/components/ui/separator";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState } from "react";

interface Props {
  auth: AuthContext;
}

const SchoolStaffTeacherFilter = ({ auth }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data, addItem, deleteItem } =
    useRealtimeData<TeacherWithRelations>("teacher");

  async function fetchTeachers(filter?: string) {
    setLoading(true);
    try {
      const url = filter
        ? `/school/teachers/with-relations?filter=${encodeURIComponent(filter)}`
        : `/school/teachers/with-relations?limit=9`;

      const res = await apiRequest<void, TeacherWithRelations[]>(
        "get",
        url,
        undefined,
        { token: auth.token, schoolToken: auth.schoolToken },
      );

      if (res?.data) {
        data.forEach((t) => deleteItem(t.id || t._id || ""));
        res.data.forEach((t) => addItem(t));
      }
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />
          {/* Reusable SearchBox */}
          <SearchBox
            onSearch={fetchTeachers}
            placeholder="Search teacher by name, phone, email"
            loading={loading}
            live={false} // set true if you want live typing search
          />
        </div>

        <TeacherDialog auth={auth} isSchool />
      </div>
      <Separator />
    </div>
  );
};

export default SchoolStaffTeacherFilter;
