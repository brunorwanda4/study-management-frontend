import SubjectTemplateForm from "@/components/page/admin/tempate-subject/subject-template-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SchoolCalendar() {
  return (
    <div className=" px-4 py-4 space-y-4 min-h-screen grid place-content-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Subject card</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectTemplateForm />
        </CardContent>
      </Card>
    </div>
  );
}
