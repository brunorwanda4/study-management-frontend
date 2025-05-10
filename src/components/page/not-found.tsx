"use client";
import { useState } from "react"; 
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import MyImage from "../myComponents/myImage";

interface props {
  message?: string;
}

const NotFoundPage = ({ message }: props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleRefresh = () => {
    setIsLoading(true); 
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full justify-center">
      <div className=" flex flex-col">
        <MyImage className="size-96" src="/notFound.svg" />
        <div>
          <div className="text-center">
            <h4 className="font-medium"> Not found item</h4>
            <p className=" text-myGray">
              {message
                ? message
                : "Check your internet connection or your params for this page."}
            </p>
          </div>
          <div className="flex space-x-2 mt-2 justify-center items-center">
            <Button library="daisy" variant="outline" onClick={handleGoBack} disabled={isLoading}>
              <BsArrowLeft /> Go back
            </Button>
            <Button
              library="daisy"
              variant="info"
              onClick={handleRefresh}
              disabled={isLoading} 
            >
              {isLoading ? (
                <>
                  <RefreshCcw size={12} className="animate-spin mr-2" /> Loading... 
                </>
              ) : (
                <>
                  Refresh <RefreshCcw size={12} /> 
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;