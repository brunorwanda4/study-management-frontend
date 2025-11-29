"use client";

import SearchBox from "@/components/common/form/search-box";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import ClassDialog from "@/components/page/school-staff/dialog/class-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type {
  ClassWithOthers,
  PaginatedClassesWithOthers,
} from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
}

const SchoolStaffClassFilter = ({ auth }: Props) => {
  const [loading, setLoading] = useState(false);
  const [classType, setClassType] = useState<"all" | "main" | "sub">("all");
  const [filter, setFilter] = useState<string>(""); // ✅ track current search filter
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });

  const { data, addItem, deleteItem } =
    useRealtimeData<ClassWithOthers>("class");

  async function fetchClasses(
    page = 1,
    filterValue = filter,
    type = classType,
  ) {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      let endpoint = "";
      switch (type) {
        case "main":
          endpoint = `/school/classes/main-classes/with-details`;
          break;
        case "sub":
          endpoint = `/school/classes/subclasses/with-details`;
          break;
        default:
          endpoint = `/school/classes/with-others`;
      }

      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        skip: skip.toString(),
      });

      if (filterValue) params.set("filter", filterValue);

      const res = await apiRequest<void, PaginatedClassesWithOthers>(
        "get",
        `${endpoint}?${params.toString()}`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
          realtime: "class",
        },
      );

      if (res?.data) {
        // clear old data
        data.forEach((t) => deleteItem(t.id || t._id || ""));
        // add new data
        res.data.classes.forEach((t) => addItem(t));

        setPagination({
          total_pages: res.data.total_pages,
          current_page: res.data.current_page,
        });
      }
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Refetch whenever classType or filter changes
  useEffect(() => {
    fetchClasses(1);
  }, [classType, filter]);

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={(value) => setFilter(value)} // ✅ update filter state only
            placeholder="Search class..."
            loading={loading}
            live={true}
          />

          <div>
            <Select
              value={classType}
              onValueChange={(value: "all" | "main" | "sub") =>
                setClassType(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select class type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All classes</SelectItem>
                  <SelectItem value="main">Main classes</SelectItem>
                  <SelectItem value="sub">Sub classes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={(page) => fetchClasses(page)}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />
          <ClassDialog auth={auth} isSchool />
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default SchoolStaffClassFilter;
