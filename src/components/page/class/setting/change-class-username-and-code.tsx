import ChangeClassUsernameDialog from "../dialog/change-class-username-dialog";

interface ChangeClassUsernameAndCodeProps {
  classUsername?: any;
}

const ChangeClassUsernameAndCode = ({
  classUsername,
}: ChangeClassUsernameAndCodeProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <p>Change class username can have some effects</p>
        <ChangeClassUsernameDialog />
      </div>
    </div>
  );
};

export default ChangeClassUsernameAndCode;
