"use client";

import SearchBox from "@/components/common/form/search-box";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";
import DialogTemplateSubject from "./dialog-template-subject";

interface Props {
  auth: AuthContext;
}

const FilterTemplateSubject = ({ auth }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });

  const { data, addItem, deleteItem } =
    useRealtimeData<TemplateSubjectWithOther>("template_subject");

  async function fetchSub(page = 1, filterValue = filter) {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        skip: skip.toString(),
      });

      if (filterValue) {
        params.set("filter", filterValue);
      }

      const res = await apiRequest<void, Paginated<TemplateSubjectWithOther>>(
        "get",
        `/template-subjects/others?${params.toString()}`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
          realtime: "template_subject",
        },
      );

      if (res?.data) {
        // Clear existing data
        data.forEach((s) => deleteItem(s._id || s.id || ""));

        // Add new data
        res.data.data.forEach((s) => addItem(s));

        setPagination({
          total_pages: res.data.total_pages,
          current_page: res.data.current_page,
        });
      }
    } catch (err) {
      console.error("Failed to fetch template subjects:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSub(1);
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={(value) => setFilter(value)}
            placeholder="Search subject..."
            loading={loading}
            live={true}
          />
        </div>
        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={(page) => fetchSub(page)}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />
          <DialogTemplateSubject auth={auth} />
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default FilterTemplateSubject;
