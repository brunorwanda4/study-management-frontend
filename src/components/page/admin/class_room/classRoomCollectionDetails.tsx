import { BsCardChecklist } from "react-icons/bs";
import { LiaUsersSolid } from "react-icons/lia";

interface props {
  totalRoomClass: number;
  totalRoomClassRole ?: number | boolean
}

const ClassRoomCollectionDetails = ({ totalRoomClass, totalRoomClassRole }: props) => {
  return (
    <div className=" happy-card w-1/2">
      <div className="">
        <h2 className=" happy-title-base">Class room collection Details</h2>
      </div>
      <div className=" flex flex-row items-center h-full gap-4 w-full">
        <div className=" happy-line gap-1 items-center">
          <LiaUsersSolid size={52} className=" text-info" />
          <h3 className=" font-semibold text-4xl">{totalRoomClass}</h3>
          <span className=" text-xs font-semibold">classes</span>
        </div>
        <div className=" happy-line gap-1 items-center">
          <BsCardChecklist size={50} className=" text-info" />
          <h3 className=" font-semibold text-4xl">{totalRoomClassRole}</h3>
          <span className="text-xs font-semibold">classes role</span>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomCollectionDetails;
