import MyImage from "@/components/common/myImage";

const SubjectCardSmall = () => {
  return (
    <div className="btn btn-ghost flex items-center justify-start">
      <MyImage src="/images/20.jpg" className="size-10" classname=" card" />
      <div className="flex flex-col items-start justify-start">
        <p className="font-medium">Subject name</p>
        <span className="text-sm">SRE4243</span>
      </div>
    </div>
  );
};

export default SubjectCardSmall;
