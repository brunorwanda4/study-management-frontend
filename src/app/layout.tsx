import { ThemeProvider } from "@/components/theme-provider";
import { ToastManager } from "@/lib/context/toast/ToastContext";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student-management",
  description:
    "System which helps students to study anywhere, communicate, collaborate, and helps teachers and schools manage learning.",
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

interface LayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
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
