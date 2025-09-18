"use client";
import { FormError } from "@/components/common/form-message";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import MyImage from "../common/myImage";
import { Button } from "../ui/button";

interface props {
  message?: string;
}

const ErrorPage = ({ message }: props) => {
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
      <div className="flex flex-col">
        <MyImage
          className="h-54 w-96"
          src="/png/error-page.png"
          classname=" object-contain"
        />
        <div className="space-y-4">
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-medium">Some thing went wrong! 😥</h4>
            <FormError message={message} />
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <Button library="daisy" variant="outline" onClick={handleGoBack}>
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
                  <RefreshCcw size={12} className="mr-2 animate-spin" />{" "}
                  Refresh...
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

export default ErrorPage;
