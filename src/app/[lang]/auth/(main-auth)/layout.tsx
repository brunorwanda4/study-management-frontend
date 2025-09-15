import AuthProvider from '@/components/page/auth/auth-provider';

interface props {
  children: React.ReactNode;
}
const MainAuthLayout = ({ children }: props) => {
  return (
    <main className=" flex  md:items-center flex-col md:space-x-10 space-x-8 md:flex-row space-y-2">
      <AuthProvider />
      <div>{children}</div>
    </main>
  );
};

export default MainAuthLayout;
