import { ThemeProvider } from "@/components/theme-provider";
import { ToastManager } from "@/lib/context/toast/ToastContext";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Space Together – Smart School Management System",
    template: "%s | Space Together",
  },
  description:
    "Space Together is a modern school management system that helps students learn anywhere, allows teachers to manage classes, supports parents, and enables schools to organize academics, communication, attendance, and more.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  keywords: [
    "Space Together",
    "School Management System",
    "Student Information System",
    "Education Platform",
    "E-Learning",
    "Teachers Portal",
    "Parents Portal",
    "Class Management",
    "Student Attendance",
    "Academic Management",
    "School Communication",
    "Online Learning",
    "Multi-school Platform",
    "Timetable Management",
    "Real-time Messaging",
  ],
  authors: [{ name: "Space Together Team" }],
  creator: "Space Together",
  publisher: "Space Together",
  // metadataBase: new URL("https://space-together.com"), // change to your real domain
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      rw: "/rw",
    },
  },
  openGraph: {
    title: "Space Together – Smart School Management System",
    description:
      "A complete digital platform for schools, helping students learn, teachers teach, and parents stay connected.",
    // url: "https://space-together.com",
    siteName: "Space Together",
    images: [
      {
        url: "/og-image.png", // add your OG image
        width: 1200,
        height: 630,
        alt: "Space Together Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Together – School Management System",
    description:
      "Learn anywhere, communicate easily, and manage your school with modern tools.",
    images: ["/og-image.png"],
    creator: "@space_together", // optional
  },
  category: "Education",
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
