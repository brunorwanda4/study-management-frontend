"use client";

import { cn } from "@/lib/utils";
import Link, { useLinkStatus } from "next/link";
import type { UrlObject } from "node:url";
import {
  Button,
  type DaisyButtonProps,
  type ShadcnButtonProps,
} from "../ui/button";

interface LoadingIndicatorTextProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const LoadingIndicatorText = ({
  children,
  className,
  title,
}: LoadingIndicatorTextProps) => {
  const { pending } = useLinkStatus();
  return (
    <div
      title={title}
      className={cn(className, pending && "skeleton skeleton-text")}
    >
      {children}
    </div>
  );
};

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
  href: UrlObject | __next_route_internal_types__.RouteImpl<string>;
  type?: "button" | "link";
  className?: string;
  children: React.ReactNode;
  button?: ShadcnButtonProps | DaisyButtonProps;
  loading?: boolean;
  classname?: string;
  roleTag?: string; // "cls", "s", "su", etc
};

const MyLink = ({
  href,
  type = "link",
  className = "",
  children,
  button,
  classname,
  loading = false,
  roleTag,
}: Props) => {
  if (type === "button" || button) {
    return (
      <Link href={href} className={className}>
        <Button {...button} className={cn(classname)}>
          {loading ? (
            <LoadingIndicatorText className=" flex flex-row items-center gap-2">
              {roleTag && (
                <span className={"text-base-content/50 text-sm"}>
                  {roleTag}/{" "}
                </span>
              )}
              {children}
            </LoadingIndicatorText>
          ) : (
            <div className=" flex flex-row items-center gap-2">
              {roleTag && (
                <span className={"text-base-content/50 text-sm"}>
                  {roleTag}/{" "}
                </span>
              )}
              {children}
            </div>
          )}
        </Button>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(loading && "skeleton skeleton-text", className || "")}
    >
      {loading ? (
        <LoadingIndicatorText className=" flex flex-row items-center gap-2">
          {roleTag && (
            <span className={"text-base-content/50 text-sm"}>{roleTag}/ </span>
          )}
          {children} {loading}
        </LoadingIndicatorText>
      ) : (
        <div className=" flex flex-row items-center gap-2">
          {roleTag && (
            <span className={"text-base-content/50 text-sm"}>{roleTag}/ </span>
          )}
          {children} {loading}
        </div>
      )}
    </Link>
  );
};

export default MyLink;
