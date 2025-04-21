import Link from "next/link";
import MyImage from "@/components/myComponents/myImage";

interface props {
    image: string;
    name : string;
    docs : number;
    link: string;
}

const MainCollectionCard = ({image , name , docs , link} : props) => {
  return (
    <Link href={link} className=" flex justify-between items-center btn btn-ghost">
      <div className=" flex flex-row gap-2 items-center">
        <MyImage
          src={image}
          className=" size-8"
          classname=" card"
        />
        <h5 className=" font-medium">{name}</h5>
      </div>
      <div>
        <div className=" text-sm font-medium">
          {docs} <span className=" text-myGray">docs</span>
        </div>
      </div>
    </Link>
  );
};

export default MainCollectionCard;
