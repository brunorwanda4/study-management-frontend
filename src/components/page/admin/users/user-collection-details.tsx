import DataDetailsCard from "@/components/common/cards/data-details.-card";
import { UserModel } from "@/lib/types/userModel";

interface props {
  users: UserModel;
}

const UserCollectionDetails = ({ users }: props) => {
  const components = [
    {
      title: "Total users",
      size: 432,
      icon: "/icons/family.png",
    },
  ];
  return (
    <main className="grid grid-cols-4 gap-4">
      {components.map((item, i) => (
        <DataDetailsCard title={item.title} icon={item.icon} size={item.size} />
      ))}
    </main>
  );
};

export default UserCollectionDetails;
