// import LoadingAppAside from "@/components/loading/loading-app-aside";
// import LoadingAppNav from "@/components/loading/loading-app-nav";
import { Card } from "@/components/ui/card";
import React from "react";

const ApplicationLayout = () => {
  return (
    <div className=" min-h-screen">
      {/* nav */}
      {/* <LoadingAppNav /> */}
      <section className=" pt-14 flex space-x-2">
        {/* <LoadingAppAside /> */}
        <div className=" py-4 grid w-full grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <Card key={i} className=" skeleton h-40 p-4">
              <div className=" skeleton w-full h-full" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ApplicationLayout;
