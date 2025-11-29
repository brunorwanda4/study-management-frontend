import FileCard from "@/components/common/cards/file-card";
import MyImage from "@/components/common/myImage";
import MessageSearchFile from "@/components/page/messages/message-search-file";
import { Button } from "@/components/ui/button";

const ConversationFilesPage = () => {
  return (
    <div className=" flex flex-col gap-4 mt-2 min-h-screen px-2 ">
      <MessageSearchFile />
      <div className=" flex flex-col gap-2">
        <h4 className=" h5">Photo and videos</h4>
        <div className=" grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => {
            return (
              <MyImage
                key={i}
                classname="card"
                className=" w-full h-52"
                src="/images/3.jpg"
              />
            );
          })}
        </div>
        <Button library="daisy" variant={"ghost"}>
          See more (32)
        </Button>
      </div>
      <div className=" flex flex-col gap-2">
        <h4 className=" h5">Documents</h4>
        <div className=" grid grid-cols-4 gap-2">
          {[...Array(12)].map((_, i) => {
            return <FileCard className="bg-base-100" key={i} />;
          })}
        </div>
        <Button library="daisy" variant={"ghost"}>
          See more (14)
        </Button>
      </div>
    </div>
  );
};

export default ConversationFilesPage;
