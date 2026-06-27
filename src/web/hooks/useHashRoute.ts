import { useEffect, useState } from "react";

import { AppRoute, getCurrentRoute, toHashRoute } from "../routes";

export const useHashRoute = () => {
  const [route, setRoute] = useState<AppRoute>(getCurrentRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getCurrentRoute());
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigate = (nextRoute: AppRoute) => {
    const nextHash = toHashRoute(nextRoute);
    if (window.location.hash === nextHash) {
      setRoute(nextRoute);
      return;
    }

    window.location.hash = nextHash;
  };

  return {
    route,
    navigate,
  };
};
