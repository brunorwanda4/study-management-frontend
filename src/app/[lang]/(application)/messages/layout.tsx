import MessagesAside from "@/components/page/messages/messages-aside";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface MessageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // ✅ use string, not Locale
}

export default async function MessageLayout({
  children,
  params,
}: MessageLayoutProps) {
  const { lang } = await params;
  const user = await authContext();

  if (!user) {
    redirect(`/${lang}/auth/login`);
  }

  return (
    <section className="w-full flex">
      <MessagesAside lang={lang as Locale} />
      <div className=" flex-1">{children}</div>
    </section>
  );
}
