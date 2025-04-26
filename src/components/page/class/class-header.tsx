import MyImage from "@/components/myComponents/myImage";

const ClassHeader = () => {
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex space-x-2 items-center">
        <MyImage
          src="/images/17.jpg"
          classname="mask mask-squircle"
          className=" size-20"
        />
        <div className=" ">
          <h4 className=" basic-title">
            Level 5 software development Green Hills
          </h4>
          <span>@ L5SODGreenHills</span>
          <div className=" flex gap-2">
            <MyImage
              src="/images/p.jpg"
              classname="mask mask-squircle"
              className=" size-6"
            />
            Irakoze Chris
          </div>
        </div>
      </div>
      {/* school data */}
      <div>
        <div className=" flex items-center space-x-2">
          <MyImage src="/images/REB_Logo.png" className=" size-14" />
          <div className="">
            <h4 className=" basic-title">School name</h4>
            <span>example@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;
