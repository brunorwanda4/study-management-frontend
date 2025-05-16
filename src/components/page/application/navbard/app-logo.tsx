import MyImage from "@/components/myComponents/myImage";
import { cn } from "@/lib/utils";

interface props {
  name?: string;
}

const AppLogo = ({ name }: props) => {
  return (
    <div className=" flex gap-2 items-center">
      <MyImage src="/logo.png" priority className=" size-10" />
      <div className=" flex flex-col">
        <h2
          className={cn(
            "font-semibold text-base text-start logo-font flex flex-row"
          )}
        >
          space-together
        </h2>
        <span className="  my-sm-text">{name}</span>
      </div>
    </div>
  );
};

export default AppLogo;
