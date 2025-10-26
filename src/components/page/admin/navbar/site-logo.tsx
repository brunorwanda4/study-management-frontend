import MyImage from "@/components/common/myImage";

const SiteLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <MyImage src="/logo/1.png" className="size-10" />
      <div className="flex flex-col">
        <h2 className="font-allura flex flex-row text-start text-base font-semibold">
          <span>space</span>-<span>together</span>
        </h2>
        <span className="my-sm-text">admin</span>
      </div>
    </div>
  );
};

export default SiteLogo;
