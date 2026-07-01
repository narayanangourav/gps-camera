import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

type PageFrameProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    fullHeight?: boolean;
  }
>;

export default function PageFrame({
  children,
  className,
  fullHeight = false,
  ...props
}: PageFrameProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-[0_18px_48px_rgba(15,23,42,0.08)]",
        fullHeight && "min-h-[calc(100dvh-1.5rem)] sm:min-h-[calc(100dvh-2.5rem)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
