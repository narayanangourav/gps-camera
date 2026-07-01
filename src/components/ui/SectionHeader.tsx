import { PropsWithChildren, ReactNode } from "react";

import { cn } from "../../lib/cn";

type SectionHeaderProps = PropsWithChildren<{
  actions?: ReactNode;
  eyebrow: string;
  title?: string;
  compact?: boolean;
}>;

export default function SectionHeader({
  actions,
  children,
  compact = false,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4",
        compact ? "mb-5" : "mb-6",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-app-primary">
          {eyebrow}
        </p>
        {title ? (
          <h1 className="m-0 text-[clamp(1.9rem,6vw,3.25rem)] font-bold leading-[1.05] text-slate-950">
            {title}
          </h1>
        ) : null}
        {children}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
