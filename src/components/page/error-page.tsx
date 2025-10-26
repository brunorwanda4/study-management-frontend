"use client";
import { FormError } from "@/components/common/form-message";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import MyImage from "../common/myImage";
import { Button } from "../ui/button";

interface Props {
  message?: string;
  details?: string;
  error?: string;
}

const ErrorPage = ({ message, details, error }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <MyImage
          className="h-54 w-96"
          src="/png/error-page.png"
          classname="object-contain"
        />

        <div className="space-y-4 text-center">
          <h4 className="text-lg font-medium">Something went wrong! 😥</h4>

          {message && <FormError message={message} />}

          {details && <p className="text-sm text-gray-500">{details}</p>}

          {/* Show error */}
          {error && (
            <pre className="bg-error/20 text-error overflow-x-auto rounded p-2 text-sm">
              {error}
            </pre>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center space-x-2">
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
  );
};

export default ErrorPage;
