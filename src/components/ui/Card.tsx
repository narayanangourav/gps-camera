import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <article
      {...props}
      className={cn(
        "rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-5",
        className,
      )}
    >
      {children}
    </article>
  );
}
