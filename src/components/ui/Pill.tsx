import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

type PillProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>>;

export default function Pill({ children, className, ...props }: PillProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full border border-blue-100 bg-app-pill px-3 py-2 text-center text-[0.95rem] text-blue-900",
        className,
      )}
    >
      {children}
    </span>
  );
}
