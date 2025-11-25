import ChangeClassUsernameDialog from "../dialog/change-class-username-dialog";
import ChangeClassCode from "./form/change-class-code";

interface ChangeClassUsernameAndCodeProps {
  classUsername?: any;
}

const ChangeClassUsernameAndCode = ({
  classUsername,
}: ChangeClassUsernameAndCodeProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>Change class username can have some effects</p>
        <ChangeClassUsernameDialog />
      </div>
      <div className="flex flex-col gap-2">
        <p>Change join class code</p>
        <ChangeClassCode />
      </div>
    </div>
  );
};

export default ChangeClassUsernameAndCode;
