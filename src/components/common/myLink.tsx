"use client";

import { cn } from "@/lib/utils";
import Link, { useLinkStatus } from "next/link";
import { Button, DaisyButtonProps, ShadcnButtonProps } from "../ui/button";

interface props {
  className?: string;
}

export function LoadingIndicator({ className }: props) {
  const { pending } = useLinkStatus();
  return pending ? (
    <div
      role="status"
      aria-label="Loading"
      className={cn("loading loading-spinner", className)}
    />
  ) : null;
}

type Props = {
  href: string;
  type?: "button" | "link";
  className?: string;
  children: React.ReactNode;
  button?: ShadcnButtonProps | DaisyButtonProps;
  loading?: boolean;
  classname?: string;
};

const MyLink = ({
  href,
  type = "link",
  className = "",
  children,
  button,
  classname,
  loading = false,
}: Props) => {
  if (type === "button") {
    return (
      <Link href={href} className={className}>
        <Button {...button} className={cn("", classname)}>
          {children}
          {loading && <LoadingIndicator />}
        </Button>
      </Link>
    );
  }

  return (
    <Link href={href} className={className || "underline"}>
      {children} {loading && <LoadingIndicator />}
    </Link>
  );
};

export default MyLink;
