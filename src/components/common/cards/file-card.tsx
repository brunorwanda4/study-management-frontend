import { Item, ItemHeader, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { LuFileText } from "react-icons/lu";
interface FileCardProps {
  file?: any;
  className?: string;
}

const FileCard = ({ file, className }: FileCardProps) => {
  return (
    <Item variant={"muted"} className={cn(" p-2", className)}>
      <ItemHeader className="  ">
        <div className="flex items-center gap-2 justify-start ">
          <LuFileText size={28} />
          <ItemTitle>File name</ItemTitle>
        </div>
      </ItemHeader>
    </Item>
  );
};

export default FileCard;
