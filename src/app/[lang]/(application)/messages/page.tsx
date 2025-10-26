import { Button } from "@/components/ui/button";
import { LuMessageCircle } from "react-icons/lu";

const MessagesPage = () => {
  return (
    <div className=" w-full h-screen grid place-content-center">
      <Button library={"daisy"} variant="info">
        <LuMessageCircle />
        Start conversation
      </Button>
    </div>
  );
};

export default MessagesPage;
