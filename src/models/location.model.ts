export type LocationSource = "automatic" | "manual";

export type AddressLines = {
  line1: string;
  line2: string;
};

export type LocationAddress = {
  line1: string;
  line2: string;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  displayLabel: string | null;
};

export type AppLocation = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  heading: number | null;
  timestamp: number;
  source: LocationSource;
  address: LocationAddress | null;
};

export type ManualLocationInput = {
  latitude: number;
  longitude: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  displayLabel?: string;
};

export type LocationSelection = {
  automaticLocation: AppLocation | null;
  manualLocation: AppLocation | null;
  mode: LocationSource;
};
