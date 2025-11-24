"use client";
import SearchBox from "@/components/common/form/search-box";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { AuthContext } from "@/lib/utils/auth-context";

interface PeoplePageFilterProps {
  auth: AuthContext;
}

const PeoplePageFilter = ({ auth }: PeoplePageFilterProps) => {
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <SearchBox
            onSearch={() => {}} // ✅ update filter state only
            placeholder="Search people..."
            loading={false}
            live={false}
          />

          <div>
            <Select value={""} onValueChange={() => {}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="main">Male</SelectItem>
                  <SelectItem value="sub">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default PeoplePageFilter;
