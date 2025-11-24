import { Item, ItemHeader, ItemTitle } from "@/components/ui/item";
import { LuFileText } from "react-icons/lu";
interface FileCardProps {
  file?: any;
}

const FileCard = ({ file }: FileCardProps) => {
  return (
    <Item variant={"muted"} className=" p-2">
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
