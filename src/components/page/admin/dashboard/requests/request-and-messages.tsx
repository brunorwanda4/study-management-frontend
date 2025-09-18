"use client";
import { FaMessage } from "react-icons/fa6";
import RequestAndMessagesCard from "./request-and-messages-card";
import Link from "next/link";

const RequestAndMessagesDashboard = () => {
  return (
    <div className=" w-3/4 happy-card min-h-96">
      <div>
        <div className=" flex justify-between items-center ">
          <div className="flex gap-3 items-center">
            <FaMessage />
            <h2 className=" happy-title-base">Request and messages</h2>
          </div>
          <Link href={"/"} className=" btn btn-sm btn-ghost  happy-title-base">
            See all <span className="  ">38</span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 w-full gap-4 max-h-[28rem] overflow-y-auto">
          <RequestAndMessagesCard />
          <RequestAndMessagesCard />
          <RequestAndMessagesCard />
          <RequestAndMessagesCard />
          <RequestAndMessagesCard />
        </div>
      </div>
    </div>
  );
};

export default RequestAndMessagesDashboard;
