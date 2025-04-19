"use client";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import MyImage from "../myComponents/myImage";

interface props {
  description: string;
}
const NotFoundItemsPage = ({ description }: props) => {
      const router = useRouter();
    
      const handleRefresh = () => {
        window.location.reload();
      };
    
      const handleGoBack = () => {
        router.back();
      };
  return (
    <div className="flex w-full justify-center">
      <div className=" flex flex-col">
        <MyImage
          className=" h-80 w-96"
          classname=" object-contain"
          src="/png/not-found.png"
        />
        <div>
          <div className="text-center">
            <p className=" ">{description}</p>
          </div>
          <div className="flex space-x-2 mt-2 justify-center">
            <Button size="sm" variant="outline" onClick={handleGoBack}>
              <BsArrowLeft /> Go back
            </Button>
            <Button library="daisy" size="sm" variant="info" onClick={handleRefresh}>
              Refresh <RefreshCcw size={12} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundItemsPage;
