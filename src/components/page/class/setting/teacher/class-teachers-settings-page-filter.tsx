"use client";
import SearchBox from "@/components/common/form/search-box";
import SmartPagination from "@/components/common/smart-pagination";

const ClassTeacherSettingPageFilter = () => {
  return (
    <div className=" flex flex-row justify-between  w-full mt-2">
      <div className=" flex flex-row gap-4 items-center">
        <h3 className=" h5">9Teachers</h3>
        <SearchBox
          placeholder="Search teacher..."
          loading={false}
          live={false}
          onSearch={() => {}}
        />
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
      </div>
      <div className=" flex gap-2">
        <span>5 Male</span>
        <span>4 Female</span>
      </div>
    </div>
  );
};

export default ClassTeacherSettingPageFilter;
