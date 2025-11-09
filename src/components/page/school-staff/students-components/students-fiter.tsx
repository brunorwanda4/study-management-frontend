"use client";

import SearchBox from "@/components/common/form/search-box";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import StudentDialog from "@/components/page/student/dialogs/student-dialog";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type {
  PaginatedStudentWithRelations,
  StudentWithRelations,
} from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
}

const StudentFilter = ({ auth }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });

  const { data, addItem, deleteItem } =
    useRealtimeData<StudentWithRelations>("student");

  async function fetchStudents(page = 1, filterValue = filter) {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        skip: skip.toString(),
      });

      if (filterValue) params.set("filter", filterValue);

      const res = await apiRequest<void, PaginatedStudentWithRelations>(
        "get",
        `/school/students/with-details?${params.toString()}`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
          realtime: "student",
        },
      );

      if (res?.data) {
        // Clear old data
        data.forEach((s) => deleteItem(s.id || s._id || ""));
        // Add new students
        res.data.students.forEach((s) => addItem(s));

        setPagination({
          total_pages: res.data.total_pages,
          current_page: res.data.current_page,
        });
      }
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔁 Refetch whenever filter changes
  useEffect(() => {
    fetchStudents(1);
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={(value) => setFilter(value)}
            placeholder="Search student..."
            loading={loading}
            live={false}
          />
        </div>

        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={(page) => fetchStudents(page)}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />
          <StudentDialog auth={auth} isSchool />
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default StudentFilter;
