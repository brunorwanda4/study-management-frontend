import AppNav from "@/components/page/application/app-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";

interface props {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
}
const ApplicationLayout = async (props: props) => {
  const { children } = props;
  return (
    <SidebarProvider>
      <AppNav />
      <main className="pt-14 bg-base-200 w-full">{children}</main>
    </SidebarProvider>
  );
};

export default ApplicationLayout;
