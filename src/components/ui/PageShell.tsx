import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

type PageShellProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    centered?: boolean;
    fullHeight?: boolean;
    inset?: "compact" | "regular";
  }
>;

const INSET_CLASS_MAP = {
  compact: "p-3 sm:p-4 md:p-5",
  regular: "px-3 py-5 sm:px-5 sm:py-8",
};

export default function PageShell({
  centered = false,
  children,
  className,
  fullHeight = false,
  inset = "regular",
  ...props
}: PageShellProps) {
  return (
    <section
      {...props}
      className={cn(
        "w-full",
        INSET_CLASS_MAP[inset],
        fullHeight && "min-h-dvh",
        centered && "flex items-stretch justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
