import MyImage from "@/components/common/myImage";
import { cn } from "@/lib/utils";

interface props {
  name?: string;
}

const AppLogo = ({ name }: props) => {
  return (
    <div className="flex items-center gap-2">
      <MyImage src="/logo.png" priority className="size-10" />
      <div className="flex flex-col">
        <h2
          className={cn(
            "logo-font flex flex-row text-start text-base font-semibold",
          )}
        >
          space-together
        </h2>
        <span className="my-sm-text">{name}</span>
      </div>
    </div>
  );
};

export default AppLogo;
