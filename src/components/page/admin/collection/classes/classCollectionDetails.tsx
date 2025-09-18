import { BsCardChecklist } from "react-icons/bs";
import { LiaUsersSolid } from "react-icons/lia";

interface props {
  totalClasses: number;
  totalClassesRole ?: number | boolean
}

const ClassesCollectionDetails = ({ totalClasses, totalClassesRole }: props) => {
  return (
    <div className=" happy-card w-1/2">
      <div className="">
        <h2 className=" happy-title-base">User collection Details</h2>
      </div>
      <div className=" flex flex-row items-center h-full gap-4 w-full">
        <div className=" happy-line gap-1 items-center">
          <LiaUsersSolid size={52} className=" text-info" />
          <h3 className=" font-semibold text-4xl">{totalClasses}</h3>
          <span className=" text-xs font-semibold">classes</span>
        </div>
        <div className=" happy-line gap-1 items-center">
          <BsCardChecklist size={50} className=" text-info" />
          <h3 className=" font-semibold text-4xl">{totalClassesRole}</h3>
          <span className="text-xs font-semibold">classes role</span>
        </div>
      </div>
    </div>
  );
};

export default ClassesCollectionDetails;
