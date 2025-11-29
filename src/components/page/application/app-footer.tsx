"use client";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  className?: string;
  lang: Locale;
}

const AppFooter = ({ className, lang }: props) => {
  const pathname = usePathname();
  if (pathname.startsWith(`/${lang}/messages`)) return null;
  return (
    <footer
      className={cn(
        "footer m-0 mt-0 footer-center text-base-content p-4 border-t border-t-base-300 bg-base-100 bottom-0",
        className,
      )}
    >
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <Link href={`/`} className=" font-medium link-hover">
            space-together
          </Link>{" "}
          - School Management & Learning System
        </p>
      </aside>
    </footer>
  );
};

export default AppFooter;
