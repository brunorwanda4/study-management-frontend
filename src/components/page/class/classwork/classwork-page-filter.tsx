"use client";
import SearchBox from "@/components/common/form/search-box";
import MyLink from "@/components/common/myLink";
import SmartPagination from "@/components/common/smart-pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuthContext } from "@/lib/utils/auth-context";

interface ClassworkPageFilterProps {
  auth: AuthContext;
}

const ClassworkPageFilter = ({ auth }: ClassworkPageFilterProps) => {
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <SearchBox
            onSearch={() => {}} // ✅ update filter state only
            placeholder="Search classwork..."
            loading={false}
            live={false}
          />

          <div>
            <Select value={""} onValueChange={() => {}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select subject" />
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
            totalPages={6}
            currentPage={1}
            onPageChange={() => {}}
            loading={false}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />
          <MyLink
            href=""
            button={{
              variant: "primary",
              library: "daisy",
              role: "create",
              size: "sm",
            }}
          >
            New classwork
          </MyLink>
        </div>
      </div>
    </div>
  );
};

export default ClassworkPageFilter;
