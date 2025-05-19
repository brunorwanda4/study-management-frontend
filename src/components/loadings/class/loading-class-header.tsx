import React from "react";

const LoadingClassHeader = () => {
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex space-x-2 items-center">
        <div className=" size-20 mask mask-squircle skeleton" />
        <div className=" flex flex-col space-y-3">
          <span className=" skeleton h-6 w-96" />
          <span className="w-80 skeleton h-6" />
          <span className="w-20 skeleton h-4" />
        </div>
      </div>
      {/* school data */}
      <div>
        <div className=" flex items-center space-x-2">
          <div className=" size-16 skeleton" />
          <span className="skeleton h-6 w-40" />
        </div>
      </div>
    </div>
  );
};

export default LoadingClassHeader;
