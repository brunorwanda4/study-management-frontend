import MyImage from "../common/myImage";
import AppLogo from "../page/application/navbar/app-logo";
import { Button } from "../ui/button";

const LoadingAppNav = () => {
  return (
    <nav className="border-base-300 bg-base-100 fixed z-50 flex h-14 max-h-14 w-full justify-between border-b p-2 shadow-sm">
      <div className="flex items-center space-x-2">
<button className="skeleton size-10 rounded-md" type="button" />
        <AppLogo lang="en" />
      </div>
      <div className="mr-4 flex items-center gap-2">
        {/* <NavMessageDropDown lang={lang}/> */}
        <div role="button" className="btn btn-circle btn-ghost">
          <MyImage
            className="size-8"
            src="https://cdn-icons-png.flaticon.com/512/1827/1827312.png"
          />
        </div>
        <Button library="daisy" variant="ghost" shape="circle">
          <MyImage className="size-8" src="/icons/chat.png" />
        </Button>
        <div className="skeleton mask mask-squircle size-12" />
      </div>
    </nav>
  );
};

export default LoadingAppNav;
