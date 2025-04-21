import MyImage from "@/components/myComponents/myImage"

const SubjectCardSmall = () => {
  return (
    <div className=" flex items-center btn btn-ghost justify-start">
      <MyImage src="/images/20.jpg" className=" size-10" classname=" card"/>
      <div className=" flex flex-col justify-start items-start">
        <p className=" font-medium ">Subject name</p>
        <span className=" text-sm">SRE4243</span>
      </div>
    </div>
  )
}

export default SubjectCardSmall
