import MyImage from "@/components/common/myImage";
import Link from "next/link";

interface props {
  image: string;
  name: string;
  docs: number;
  link: string;
}

const MainCollectionCard = ({ image, name, docs, link }: props) => {
  return (
    <Link
      href={link}
      className="btn btn-ghost flex items-center justify-between"
    >
      <div className="flex flex-row items-center gap-2">
        <MyImage src={image} className="size-8" classname=" card" />
        <h5 className="font-medium">{name}</h5>
      </div>
      <div>
        <div className="text-sm font-medium">
          {docs} <span className="text-myGray">docs</span>
        </div>
      </div>
    </Link>
  );
};

export default MainCollectionCard;
