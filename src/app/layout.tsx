import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastManager } from "@/lib/context/toast/ToastContext";

export const metadata: Metadata = {
  title: "Student-management",
  description:
    "system which help student to study every ware they are and communication, collaboration and help teacher to manage them and school to manage the class and student how they study",
  icons: "/logo.png",
  keywords: [
    "School Management",
    "Education System",
    "Learning Platform",
    "Teachers",
    "Students",
    "Classes",
    "Subjects",
    "School Communication",
    "Space Together",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      rw: "/rw",
    },
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="cupcake">
      <body>
        <ThemeProvider
          attribute={["data-theme", "class"]}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastManager>{children}</ToastManager>
        </ThemeProvider>
      </body>
    </html>
  );
}
