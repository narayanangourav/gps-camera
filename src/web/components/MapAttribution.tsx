import { OSM_ATTRIBUTION_TEXT } from "../../services/mapConfig.service";

type MapAttributionProps = {
  compact?: boolean;
};

export default function MapAttribution({
  compact = false,
}: MapAttributionProps) {
  return (
    <div
      className={`map-attribution ${compact ? "map-attribution-compact" : ""}`.trim()}
    >
      {OSM_ATTRIBUTION_TEXT}
    </div>
  );
}
