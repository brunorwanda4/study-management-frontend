import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBell } from "react-icons/fa6";

const HeroDashboard = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center space-x-4">
        <Avatar className="border-base-200 size-20 shadow-md">
          <AvatarImage src="/images/2.jpg" />
          <AvatarFallback>CEO</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">Good evening, Bruno Rwanda</h3>
          <span className="text-myGray font-bold">CEO</span>
          <div>
            <p className="text-myGray text-sm">
              CRUD in all collections and new features in system! 🌼🌼
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="hover:bg-base-200 flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-medium duration-300">
          <div className="flex items-center space-x-2">
            <FaBell size={32} className="text-info" />
            <div className="flex flex-col justify-start gap-1">
              <h6 className="">Notification</h6>
              <span className="-mt-2 justify-start text-start font-semibold">
                80+
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
