import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
  }
>;

export default function IconButton({
  children,
  className,
  label,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50",
        className,
      )}
      type={type}
    >
      {children}
    </button>
  );
}
