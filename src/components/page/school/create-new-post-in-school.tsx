import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CreateNewPostInSchool = () => {
  return (
    <div>
      <div className=" items-center space-x-2 basic-card flex flex-row">
        <Avatar className=" size-12">
          <AvatarImage src="/profiles/b/20.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className=" w-full flex flex-col">
          <div className=" bg-base-200 w-full p-2 rounded-full px-4">
            <p>Announce something in school...</p>
          </div>
          <div>{/* TODO: add announcement in school dialog */}</div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPostInSchool;
