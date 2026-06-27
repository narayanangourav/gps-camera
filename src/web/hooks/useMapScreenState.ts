import { useEffect, useState } from "react";

import { AppLocation } from "../../models/location.model";

export const useMapScreenState = (location: AppLocation | null) => {
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    setZoom(15);
  }, [location?.latitude, location?.longitude]);

  return {
    zoom,
    zoomIn: () => setZoom((current) => Math.min(current + 1, 19)),
    zoomOut: () => setZoom((current) => Math.max(current - 1, 1)),
    recenter: () => setZoom((current) => current),
  };
};
