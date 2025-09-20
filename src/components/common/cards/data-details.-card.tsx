import MyImage from "@/components/common/myImage";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface props {
  title: string;
  icon: string;
  size: string | number | undefined;
}

const DataDetailsCard = ({ title, icon, size }: props) => {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b-0">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <span className="text-2xl font-semibold">{size}</span>
          </div>
          <MyImage src={icon} className="size-12" alt={`icon: ${icon}`} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default DataDetailsCard;
