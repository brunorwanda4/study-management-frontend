"use client";

import { RefreshCcw } from "lucide-react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <MyImage
            className="h-64 w-64 mx-auto"
            classname="object-contain"
            src="/png/not-found-page.png"
            alt="Not Found"
          />
          <h1 className="text-5xl font-bold">Page Not Found</h1>
          <p className="py-6">
            he page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={handleGoBack}
              className="gap-2"
            >
              <BsArrowLeft /> Go back
            </Button>
            <Button
              library="daisy"
              size="sm"
              variant="info"
              onClick={handleRefresh}
              className="gap-2"
            >
              Refresh <RefreshCcw size={12} />
            </Button>
            <Button
              library="daisy"
              size="sm"
              variant="primary"
              onClick={handleGoHome}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
