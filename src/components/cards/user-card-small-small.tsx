 import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCardSmallSmall = () => {
  
  return (
    <div className=" flex space-x-1">
      <Avatar className=" size-8">
        <AvatarImage src="/profiles/b/20.png" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div className=" flex flex-col -space-y-1">
        <h5 className=" font-medium text-sm">Hakizimana Jea</h5>
        <span className=" text-myGray font-medium text-xs">TEACHER</span>
      </div>
    </div>
  );
};

export default UserCardSmallSmall;
