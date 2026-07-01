export const APP_ROUTES = [
  "home",
  "overview",
  "camera",
  "settings",
  "location-settings",
  "stamp-settings",
  "capture-history",
  "map",
] as const;

export type AppRoute = (typeof APP_ROUTES)[number];

const DEFAULT_ROUTE: AppRoute = "home";

export const parseHashRoute = (hash: string): AppRoute => {
  const normalized = hash.replace(/^#\/?/, "").trim();

  if (!normalized) {
    return DEFAULT_ROUTE;
  }

  return APP_ROUTES.includes(normalized as AppRoute)
    ? (normalized as AppRoute)
    : DEFAULT_ROUTE;
};

export const toHashRoute = (route: AppRoute) => `#/${route}`;

export const getCurrentRoute = () =>
  typeof window === "undefined" ? DEFAULT_ROUTE : parseHashRoute(window.location.hash);
