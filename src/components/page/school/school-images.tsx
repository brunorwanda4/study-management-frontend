import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa6";

const SchoolImages = () => {
  return (
    <div className=" basic-card  space-y-4">
      <div className=" space-y-1">
        <div className=" flex space-x-2 items-center">
          <FaImage /> <h3 className=" font-semibold">School images</h3>
        </div>
        <div className=" grid grid-cols-2 gap-2">
          <MyImage src="https://img.freepik.com/free-photo/happy-school-friends-copy-space_23-2148764068.jpg?t=st=1745211928~exp=1745215528~hmac=52b1d1e31bae73ff03326ca470b628e520d5a49b53849f228b8bb5a9e7324927&w=1480" className=" w-full" classname=" card" />
          <MyImage src="https://img.freepik.com/free-photo/kids-getting-back-school-together_23-2149507650.jpg?t=st=1745211995~exp=1745215595~hmac=c6173bfa61d3fd75fb7307ed1c90846e219118861fd4070e72df673dd02fb0f5&w=1380" className=" w-full" classname=" card" />
          <MyImage src="https://i.pinimg.com/736x/6c/51/b8/6c51b876ad99f5992955615ac5adcd5c.jpg" className=" w-full" classname=" card" />
          <MyImage src="https://i.pinimg.com/474x/9b/c2/03/9bc2037910edbc44583ee014de50f7d5.jpg" className=" w-full" classname=" card" />
          <MyImage src="https://i.pinimg.com/474x/dd/90/78/dd90786031959a12577cf56fee4b85db.jpg" className=" w-full" classname=" card" />
          <MyImage src="https://i.pinimg.com/736x/5f/18/06/5f1806769df1180b69a9097116f48e00.jpg" className=" w-full" classname=" card" />
        </div>
        <Button variant="ghost" size="sm" className=" w-full">
          see more
        </Button>
      </div>
    </div>
  );
};

export default SchoolImages;
