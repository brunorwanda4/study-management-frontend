"use client";
import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
const WelcomeImage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === "black";
  return (
    <div className=" w-full h-full bg-gradient-to-tr from-base-100 to-base-300 rounded-3xl p-4 px-6 space-y-4">
      <div className=" space-y-2">
        <h2 className=" font-semibold text-4xl">
          Start learning wherever you are.
        </h2>
        <p className=" ">
          Access your lessons, connect with your class, and stay organized —
          whether you&apos;re at home, at school, or on the go
        </p>
      </div>
      <MyImage
        className=" w-full h-96 "
        classname="rounded-3xl"
        src={cn(
          isDark
            ? "https://img.freepik.com/free-photo/happy-black-father-children-having-video-call-laptop-home_637285-10589.jpg?uid=R104131663&ga=GA1.1.136419951.1706506037&w=740"
            : "https://img.freepik.com/free-photo/two-siblings-home-together-playing-laptop_23-2148890942.jpg"
        )}
      />
      <div className="">
        <div className=" space-y-2">
          <h3 className=" font-semibold">Educations</h3>
          <div className=" flex flex-row space-x-2">
            <Button role="button" variant={"ghost"}>
              <MyImage
                src="https://cdn-icons-png.flaticon.com/512/5331/5331750.png"
                role="ICON"
              />{" "}
              Nursery
            </Button>
            <Button role="button" variant={"ghost"}>
              <MyImage
                src="https://cdn-icons-png.flaticon.com/512/17359/17359911.png"
                role="ICON"
              />{" "}
              Primary
            </Button>
            <Button role="button" variant={"ghost"}>
              <MyImage
                src="https://cdn-icons-png.flaticon.com/512/2793/2793593.png"
                role="ICON"
              />{" "}
              Secondary
            </Button>
            <Button role="button" variant={"ghost"}>
              <MyImage
                src="https://cdn-icons-png.flaticon.com/512/10337/10337470.png"
                role="ICON"
              />{" "}
              Etc..
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeImage;
