import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ClassWorkCardProps {
  classWork?: any;
}

const ClassWorkCard = ({ classWork }: ClassWorkCardProps) => {
  return (
    <Card>
      <CardHeader>hello</CardHeader>
      <CardContent>bruno</CardContent>
    </Card>
  );
};

export default ClassWorkCard;
