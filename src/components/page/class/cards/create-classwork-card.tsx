import ClassWorkForm from "@/components/page/class/form/classwork-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreateClassWorkCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject name</CardTitle>
      </CardHeader>
      <CardContent>
        <ClassWorkForm />
      </CardContent>
    </Card>
  );
}

export default CreateClassWorkCard;
