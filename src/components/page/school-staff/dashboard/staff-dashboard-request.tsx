"use client";
import React from "react";
import StaffEvents from "../staff-events";
import { SchoolJoinRequestDto } from "@/lib/schema/school/school-join-request.schema";
interface props {
  requests: SchoolJoinRequestDto[];
}
const StaffSchoolDashboardRequest = ({ requests }: props) => {
  return (
    <div className=" basic-card-no-p  py-2 space-y-2">
      <h1 className="basic-title text-my px-4">School Join Requests:</h1>
      <div className=" px-2">
        {requests.map((item) => {
          return <StaffEvents key={item.id} request={item} />;
        })}
      </div>
    </div>
  );
};

export default StaffSchoolDashboardRequest;
