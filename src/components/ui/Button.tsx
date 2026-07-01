import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    block?: boolean;
    variant?: ButtonVariant;
  }
>;

const VARIANT_CLASS_MAP: Record<ButtonVariant, string> = {
  primary:
    "border-app-primary bg-app-primary text-white shadow-sm hover:bg-blue-700",
  secondary:
    "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
  ghost: "border-transparent bg-transparent px-0 text-app-primary hover:text-blue-700",
};

export default function Button({
  block = false,
  children,
  className,
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-2xl border px-4 py-3 text-[0.95rem] font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASS_MAP[variant],
        block && "w-full",
        className,
      )}
      type={type}
    >
      {children}
    </button>
  );
}
