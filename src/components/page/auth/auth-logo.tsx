import MyImage from "@/components/common/myImage";

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <MyImage priority src="/logo.png" className="size-20" />
      <h2 className="font-mono text-2xl font-semibold">space-together</h2>
    </div>
  );
};

export default AuthLogo;
