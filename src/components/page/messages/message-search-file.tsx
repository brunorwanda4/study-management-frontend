"use client";
import SearchBox from "@/components/common/form/search-box";

const MessageSearchFile = () => {
  return (
    <div className=" ">
      <SearchBox
        className=" w-96"
        placeholder="Search file..."
        onSearch={() => {}}
      />
    </div>
  );
};

export default MessageSearchFile;
