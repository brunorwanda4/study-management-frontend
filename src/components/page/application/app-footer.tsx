import { cn } from "@/lib/utils";
import Link from "next/link";

interface props {
  className?: string;
}

const AppFooter = ({ className }: props) => {
  return (
    <footer
      className={cn(
        "footer footer-center text-base-content p-4 border-t border-t-base-300 bg-base-100 bottom-0",
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
