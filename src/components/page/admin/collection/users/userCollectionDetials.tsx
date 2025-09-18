import { BsCardChecklist } from "react-icons/bs";
import { LiaUsersSolid } from "react-icons/lia";

interface props {
  totalUser: number;
  totalUserRole ?: number | boolean
}

const UserCollectionDetails = ({ totalUser, totalUserRole }: props) => {
  return (
    <div className=" happy-card w-1/2">
      <div className="">
        <h2 className=" happy-title-base">User collection Details</h2>
      </div>
      <div className=" flex flex-row items-center h-full gap-4 w-full">
        <div className=" happy-line gap-1 items-center">
          <LiaUsersSolid size={52} className=" text-info" />
          <h3 className=" font-semibold text-4xl">{totalUser}</h3>
          <span className=" text-xs font-semibold">Users</span>
        </div>
        <div className=" happy-line gap-1 items-center">
          <BsCardChecklist size={50} className=" text-info" />
          <h3 className=" font-semibold text-4xl">{totalUserRole}</h3>
          <span className="text-xs font-semibold">user role</span>
        </div>
      </div>
    </div>
  );
};

export default UserCollectionDetails;
