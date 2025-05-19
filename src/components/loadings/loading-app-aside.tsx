import React from "react";

const LoadingAppAside = () => {
  return (
    <div className=" px-2 space-y-2 pt-4 bg-base-100 border-r border-base-300 h-screen  w-64">
      <div className=" flex flex-col space-y-2">
        {[...Array(3)].map((_, i) => {
          return (
            <div key={i} className="w-full flex items-center space-x-2">
              <div className=" size-8 skeleton card" />
              <span className=" h-4 w-52 skeleton" />
            </div>
          );
        })}
      </div>
      <span>For you</span>
      <div className=" mt-4 flex flex-col space-y-2">
        {[...Array(3)].map((_, i) => {
          return (
            <div key={i} className="w-full flex items-center space-x-2">
              <div className=" size-8 skeleton card" />
              <span className=" h-4 w-52 skeleton" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingAppAside;
