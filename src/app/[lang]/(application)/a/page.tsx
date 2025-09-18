import CollectionInDatabase from "@/components/page/admin/dashboard/collections/collection-in-database";
import HeroDashboard from "@/components/page/admin/dashboard/hero-dashboard";
import RequestAndMessagesDashboard from "@/components/page/admin/dashboard/requests/request-and-messages";

const Dashboard = () => {
  return (
    <div className="happy-page">
      <div className="happy-line gap-4">
        <HeroDashboard />
        <CollectionInDatabase />
      </div>
      {/* errors and request */}
      <div>
        <RequestAndMessagesDashboard />
      </div>
      <div className="h-screen"></div>
    </div>
  );
};

export default Dashboard;
