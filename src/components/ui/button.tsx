"use client";

import { LoadingIndicator } from "@/components/common/myLink";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, Pen } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { BsTrash3 } from "react-icons/bs";
import { CiCircleCheck, CiCirclePlus } from "react-icons/ci";
import { MdArrowOutward, MdBlockFlipped } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";

/* -------------------------------- Variants -------------------------------- */

export const shadcnVariants = cva(
  "inline-flex items-center justify-center text-base-content gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-base-content shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-base-100 shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-base-300 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-base-200 hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 rounded-md px-2.5 py-1 has-[>svg]:px-2",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const daisyVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary border-none",
      secondary: "btn-secondary border-none",
      accent: "btn-accent border-none",
      info: "btn-info border-none",
      ghost: "btn-ghost border-none",
      link: "btn-link border-none",
      outline: "btn-outline border border-base-content/50",
      error: "btn-error border-none",
      warning: "btn-warning border-none",
      success: "btn-success border-none",
      default: "",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    shape: {
      circle: "btn-circle",
      square: "btn-square",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

/* ------------------------------ Prop Types ------------------------------ */

export type ShadcnButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    library?: "shadcn";
    href?: string;
    target?: string;
    role?:
      | "create"
      | "loading"
      | "update"
      | "block"
      | "check"
      | "href"
      | "delete"
      | "message"
      | "page";
  } & VariantProps<typeof shadcnVariants>;

export type DaisyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  library: "daisy";
  href?: string;
  target?: string;
  role?:
    | "create"
    | "loading"
    | "update"
    | "block"
    | "check"
    | "href"
    | "delete"
    | "message"
    | "page";
} & VariantProps<typeof daisyVariants>;

type UniversalButtonProps = ShadcnButtonProps | DaisyButtonProps;

/* ------------------------------ Icon Sizes ------------------------------ */

const iconSizeMap: Record<string, string> = {
  xs: "size-3",
  sm: "size-3.5",
  default: "size-4",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
  icon: "size-5",
};

/* ------------------------------ Component ------------------------------ */

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  UniversalButtonProps
>((props, forwardedRef) => {
  const {
    className,
    asChild = false,
    library = "daisy",
    role,
    children,
    disabled,
    href,
    target,
    ...rest
  } = props;

  const styles =
    library === "daisy"
      ? daisyVariants({ ...(props as DaisyButtonProps), className })
      : shadcnVariants({ ...(props as ShadcnButtonProps), className });

  const iconSizeClass = iconSizeMap[(props as any).size || "default"];

  const renderIcon = () => {
    switch (role) {
      case "create":
        return <CiCirclePlus className={iconSizeClass} />;
      case "loading":
        return <Loader2 className={cn(iconSizeClass, "-ms-1 animate-spin")} />;
      case "block":
        return <MdBlockFlipped className={iconSizeClass} />;
      case "check":
        return <CiCircleCheck className={iconSizeClass} />;
      case "update":
        return <Pen className={iconSizeClass} />;
      case "href":
        return <LoadingIndicator className={iconSizeClass} />;
      case "delete":
        return <BsTrash3 className={iconSizeClass} />;
      case "page":
        return <MdArrowOutward className={iconSizeClass} />;
      case "message":
        return <TbMessageCircle className={iconSizeClass} />;
      default:
        return null;
    }
  };

  const isLoading = role === "loading";

  /* ---------- If asChild: use Slot ---------- */
  if (asChild) {
    return (
      <Slot
        ref={forwardedRef as any}
        className={cn("cursor-pointer", styles)}
        {...(rest as React.ComponentPropsWithoutRef<typeof Slot>)}
      >
        {role !== "page" && renderIcon()}
        {children}
        {role === "page" && renderIcon()}
      </Slot>
    );
  }

  /* ---------- If href provided: use Next.js Link ---------- */
  if (href) {
    const {
      onClick,
      onKeyDown,
      onKeyUp,
      id,
      title,
      role: ariaRole,
      style,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden,
      tabIndex,
    } = rest as any;

    const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
      onClick,
      onKeyDown,
      onKeyUp,
      id,
      title,
      role: ariaRole as any,
      style,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden,
      tabIndex,
      className: cn("cursor-pointer", styles),
      target,
      rel: target === "_blank" ? "noopener noreferrer" : undefined,
    };

    return (
      <Link href={href} {...(anchorProps as any)} ref={forwardedRef as any}>
        {role !== "page" && renderIcon()}
        {children}
        {role === "page" && renderIcon()}
      </Link>
    );
  }

  /* ---------- Default: <button> ---------- */
  return (
    <button
      ref={forwardedRef as React.Ref<HTMLButtonElement>}
      className={cn("cursor-pointer", styles)}
      disabled={isLoading || disabled}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {role !== "page" && renderIcon()}
      {children}
      {role === "page" && renderIcon()}
    </button>
  );
});

Button.displayName = "Button";

/* ------------------------------ Utility ------------------------------ */

const buttonVariants = (
  options:
    | (VariantProps<typeof shadcnVariants> & {
        library?: "shadcn";
        className?: string;
        role?:
          | "create"
          | "loading"
          | "update"
          | "block"
          | "check"
          | "href"
          | "delete";
      })
    | (VariantProps<typeof daisyVariants> & {
        library: "daisy";
        className?: string;
        role?:
          | "create"
          | "loading"
          | "update"
          | "block"
          | "check"
          | "href"
          | "delete";
      }) = {
    library: "shadcn",
  },
) => {
  const { library = "shadcn", ...rest } = options as any;
  return library === "daisy"
    ? daisyVariants(rest as VariantProps<typeof daisyVariants>)
    : shadcnVariants(rest as VariantProps<typeof shadcnVariants>);
};

export { Button, buttonVariants };
