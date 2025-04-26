import ClassTeacherCard from "@/components/page/class/cards/class-teachers-card";
import ClassHeader from "@/components/page/class/class-header";
import { Separator } from "@/components/ui/separator";

const ClassIdPage = () => {
  return (
    <div className=" px-4 py-2 space-y-4">
      <ClassHeader />
      <Separator />
      <div className=" flex">
        <ClassTeacherCard />
        <div />
      </div>
    </div>
  );
};

export default ClassIdPage;
