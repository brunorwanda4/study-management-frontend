import AttendanceChart from "@/components/cards/attendance-chart";

const StaffDashboardActions = () => {
  return (
    <div className=" basic-card ">
      <AttendanceChart refreshInterval={5000} />
    </div>
  );
};

export default StaffDashboardActions;
