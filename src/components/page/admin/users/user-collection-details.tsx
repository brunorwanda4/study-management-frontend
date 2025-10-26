import DataDetailsCard, {
  type dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import type { UserStats } from "@/lib/types/User-stats";

interface Props {
  stats: UserStats;
}

const UserCollectionDetails = ({ stats }: Props) => {
  const allUsersComponents: dataDetailsCardProps[] = [
    {
      title: "Total Users",
      size: stats.total,
      icon: "/icons/family.png",
      items: [
        { key: "Male", value: stats.male },
        { key: "Female", value: stats.female },
        { key: "Other", value: stats.other },
      ],
    },
    {
      title: "All User Roles",
      size: "4",
      icon: "/icons/staff.png",
      items: [
        { key: "Admins", value: stats.admins },
        { key: "School Staffs", value: stats.staff },
        { key: "Students", value: stats.students },
        { key: "Teachers", value: stats.teachers },
      ],
    },
    {
      title: "School Assignment",
      size: "2",
      icon: "/icons/school.png",
      items: [
        { key: "Assigned to School", value: stats.assigned_school },
        { key: "No School", value: stats.no_school },
      ],
      ClassNameItems: "flex flex-col",
    },
    {
      title: "Recently Added Users",
      size: stats.recent_30_days,
      icon: "/icons/add-user.png",
      items: [{ key: "Added in Last 30 Days", value: stats.recent_30_days }],
      ClassNameItems: " flex",
    },
  ];

  return (
    <main className="grid w-full grid-cols-4 gap-4">
      {allUsersComponents.map((item, i) => (
        <DataDetailsCard
          key={i}
          title={item.title}
          icon={item.icon}
          size={item.size}
          items={item.items}
          ClassNameItems={item.ClassNameItems}
        />
      ))}
    </main>
  );
};

export default UserCollectionDetails;
