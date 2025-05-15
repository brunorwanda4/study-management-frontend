import AuthLang from "@/components/lang/auth-lang";
import AuthTheme from "@/components/theme/auth-theme";

interface props {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: props) => {
  return (
    <main className="min-h-screen px-4 py-2 md:space-x-4 max-md:w-full">
      <nav className=" flex justify-end ">
        <AuthTheme />
      </nav>
      <div className=" grid place-content-center space-y-4 max-lg:w-full">
        <section className=" bg-base-100 card p-6 shadow">{children}</section>
        <AuthLang />
      </div>
    </main>
  );
};

export default AuthLayout;
