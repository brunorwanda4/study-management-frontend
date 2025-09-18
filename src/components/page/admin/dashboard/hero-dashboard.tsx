import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBell } from "react-icons/fa6";
const HeroDashboard = () => {

  return (
    <div className=" w-full justify-between  flex items-center">
      <div className=" w-full flex items-center space-x-4">
        <Avatar className=" size-20 shadow-md border-base-200">
          <AvatarImage src="/images/2.jpg" />
          <AvatarFallback>CEO</AvatarFallback>
        </Avatar>
        <div>
          <h3 className=" font-semibold text-xl">Good evening, Bruno Rwanda</h3>
            <span className=" font-bold text-myGray">CEO</span>
          <div>
            <p className=" text-myGray text-sm">CRUD in all collections and new features in system! 🌼🌼</p>
          </div>
        </div>
      </div>
      <div>
        <div className=" justify-center px-4 py-2 items-center rounded-lg text-sm hover:bg-base-200 duration-300 flex font-medium cursor-pointer">
          <div className=" flex  space-x-2 items-center">
            <FaBell size={32} className=" text-info " />
            <div className=" flex flex-col gap-1 justify-start">
              <h6 className="">Notification</h6>
              <span className=" justify-start text-start font-semibold -mt-2">80+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
