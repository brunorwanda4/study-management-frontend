import AuthProvider from "@/components/page/auth/auth-provider";

interface props {
  children: React.ReactNode;
}
const MainAuthLayout = ({ children }: props) => {
  return (
    <main className=" flex  md:items-center flex-col md:space-x-4 md:flex-row">
      <div className=" space-y-2">
        <AuthProvider />
      </div>
      <div>{children}</div>
    </main>
  );
};

export default MainAuthLayout;
