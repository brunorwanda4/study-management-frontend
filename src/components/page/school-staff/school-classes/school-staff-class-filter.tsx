"use client";

import SearchBox from "@/components/common/form/search-box";
import ChangeDisplay from "@/components/display/change-diplay";
import ClassDialog from "@/components/page/school-staff/dialog/class-dialog";
import { Separator } from "@/components/ui/separator";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState } from "react";

interface props {
  auth: AuthContext;
}

const SchoolStaffClassFilter = ({ auth }: props) => {
  const [loading, setLoading] = useState(false);
  const { data, addItem, deleteItem } =
    useRealtimeData<ClassWithOthers>("class");

  async function fetchTeachers(filter?: string) {
    setLoading(true);
    try {
      const url = filter
        ? `/school/classes/with-others?filter=${encodeURIComponent(filter)}`
        : `/school/classes/with-others?limit=9`;

      const res = await apiRequest<void, ClassWithOthers[]>(
        "get",
        url,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
          realtime: "class",
        },
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
      <div className=" flex justify-between w-full items-center">
        <div className=" flex gap-4 items-center">
          {/* choose table or card */}
          <ChangeDisplay />
          <SearchBox
            onSearch={fetchTeachers}
            placeholder="Search class..."
            loading={loading}
            live={false} // set true if you want live typing search
          />
        </div>
        <ClassDialog auth={auth} isSchool />
      </div>
      <Separator />
    </div>
  );
};

export default SchoolStaffClassFilter;
