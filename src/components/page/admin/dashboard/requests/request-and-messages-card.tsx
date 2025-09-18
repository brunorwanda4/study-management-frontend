import { FaUser } from "react-icons/fa6";
import RequestAndMessageDialog from "./request-and-message-dialog";

export interface RequestAndMessagesCardTypes {
  name: string;
  email: string;
  message: string;
  sendOn: string;
}

const RequestAndMessagesCard = () => {
  return (
    <div className=" happy-card h-48 relative shadow-none w-full bg-base-200">
      <div className=" flex justify-between items-center">
        <div className=" flex gap-2 items-center">
          <div className=" size-10 mask mask-squircle bg-base-100 items-center flex justify-center ">
            <FaUser className=" size-4 " />
          </div>
          <div className=" flex-1 flex flex-col">
            <h2 className=" happy-title-base text-base">Bruno Rwanda hello</h2>
            <span className=" text-sm font-medium -mt-2">bruno@gmail.com</span>
          </div>
        </div>
        <span className=" text-sm font-medium">2 days ago</span>
      </div>
      {/* paragraph */}
      <div className=" mt-2 line-clamp-3">
        <p>
          Hello Space-together how to change your profile image and how to make
          new things which is good and how to make items and what is you real
          name and why choose to use space-together us compony name
        </p>
      </div>
      <div className=" mt-2 flex justify-end">
        <RequestAndMessageDialog />
      </div>
    </div>
  );
};

export default RequestAndMessagesCard;
