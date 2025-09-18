import React from "react";

const page = () => {
  return (
    <div className=" w-full pr-2 mt-2">
      <div className=" justify-between flex w-full">
        <div className=" flex gap-2  items-center">
          <div className="  mask-square size-20 skeleton" />
          <div className=" space-y-2">
            <div className=" h-4 w-80 skeleton" />
            <div className=" h-4 w-12 skeleton" />
            <div className=" space-y-1">
              <div className=" h-3 w-96 skeleton" />
              <div className=" h-3 w-40 skeleton" />
            </div>
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <div className=" size-12 skeleton " />
          <div className=" flex gap-1 flex-col">
            <div className=" w-14 h-4 skeleton " />
            <div className=" w-8 h-4 skeleton " />
          </div>
        </div>
      </div>
      <div className=" mt-4 flex gap-4">
        {/* percentage card */}
        <div className=" w-1/2 happy-card h-80">
          <div>
            <div className=" h-4 w-72 skeleton" />

            <div className=" flex justify-center  mt-8">
              {[...Array(4)].map((_, i) => (
                <div className=" flex flex-col items-center gap-1" key={i}>
                  <div className=" h-4 w-28 skeleton" />
                  <div className=" h-4 w-20 skeleton" />
                  <div className=" h-4 w-20 skeleton" />
                </div>
              ))}
            </div>
            <div className=" h-9 mt-8 skeleton w-full" />
            <div className=" mt-4 flex flex-col gap-1">
              <div className=" w-full h-3 skeleton" />
              <div className=" w-1/3 h-3 skeleton" />
            </div>
          </div>
          <div className=" flex justify-end">
            <div className=" w-28 h-12 skeleton" />
          </div>
        </div>
        {/* main 4 collections */}
        <div className=" grid grid-cols-2 grid-rows-2 gap-4 w-1/2 h-full">
          {[...Array(4)].map((_, i) => (
            <div className=" skeleton h-[9.4rem] card happy-card" key={i} />
          ))}
        </div>
      </div>
      {/* request */}
      <div className=" mt-4 flex gap-4">
        <div className=" w-2/3 skeleton h-[28rem] happy-card" />
        <div className=" w-1/3 h-full space-y-4">
          {[...Array(2)].map((_, i) => (
            <div className="  w-full skeleton h-52 happy-card" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
