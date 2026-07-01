import { OSM_ATTRIBUTION_TEXT } from "../../services/mapConfig.service";

type MapAttributionProps = {
  compact?: boolean;
};

export default function MapAttribution({
  compact = false,
}: MapAttributionProps) {
  return (
    <div
      className={[
        "absolute right-2.5 bottom-2.5 z-[3] rounded-full border border-slate-200 bg-white/92 text-slate-700",
        compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]",
      ].join(" ")}
    >
      {OSM_ATTRIBUTION_TEXT}
    </div>
  );
}
