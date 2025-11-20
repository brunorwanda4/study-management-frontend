"use client";

import SearchBox from "@/components/common/form/search-box";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import CreateNewUserDialog from "@/components/page/admin/users/createNewUserDialog";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { PaginatedUsers } from "@/lib/schema/relations-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
}

const UsersFilter = ({ auth }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });

  const { data, addItem, deleteItem } = useRealtimeData<UserModel>("user");

  async function fetchUsers(page = 1, filterValue = filter) {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        skip: skip.toString(),
      });

      if (filterValue) params.set("filter", filterValue);

      const res = await apiRequest<void, PaginatedUsers>(
        "get",
        `/users?${params.toString()}`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
          realtime: "user",
        },
      );

      if (res?.data) {
        // Clear old data
        data.forEach((s) => deleteItem(s._id || s.id || ""));
        res.data.users.forEach((s) => addItem(s));

        setPagination({
          total_pages: res.data.total_pages,
          current_page: res.data.current_page,
        });
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔁 Refetch whenever filter changes
  useEffect(() => {
    fetchUsers(1);
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={(value) => setFilter(value)}
            placeholder="Search user..."
            loading={loading}
            live={false}
          />
        </div>

        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={(page) => fetchUsers(page)}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />
          <CreateNewUserDialog auth={auth} />
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default UsersFilter;
