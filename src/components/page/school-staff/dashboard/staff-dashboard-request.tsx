"use client";
import type { JoinSchoolRequest } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import StaffEvents from "../staff-events";

interface props {
  requests: JoinSchoolRequest[];
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
