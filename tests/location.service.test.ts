import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAddressFromBigData,
  buildAddressFromLookupRecord,
  buildAddressFromNominatim,
  createManualLocation,
  formatLocationAddress,
  isValidCoordinates,
  selectActiveLocation,
  toAppLocation,
} from "../src/services/location.service";

test("validates coordinate ranges", () => {
  assert.equal(isValidCoordinates(12.34, 56.78), true);
  assert.equal(isValidCoordinates(-91, 20), false);
  assert.equal(isValidCoordinates(20, 181), false);
});

test("creates a manual location with normalized address fields", () => {
  const manualLocation = createManualLocation({
    latitude: 12.34,
    longitude: 56.78,
    addressLine1: "Road 1",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
  });

  assert.ok(manualLocation);
  assert.equal(manualLocation?.source, "manual");
  assert.equal(manualLocation?.address?.line1, "Road 1");
  assert.equal(manualLocation?.address?.city, "Bengaluru");
});

test("selects manual location when manual mode is active", () => {
  const automaticLocation = toAppLocation(
    { latitude: 1, longitude: 2 },
    "automatic",
    1,
  );
  const manualLocation = toAppLocation(
    { latitude: 3, longitude: 4 },
    "manual",
    2,
  );

  assert.equal(
    selectActiveLocation({
      automaticLocation,
      manualLocation,
      mode: "manual",
    }),
    manualLocation,
  );
});

test("formats normalized address labels from providers", () => {
  const browserAddress = buildAddressFromLookupRecord({
    city: "Bengaluru",
    country: "India",
    district: "South",
    name: "Office",
    postalCode: "560001",
    region: "Karnataka",
    street: "MG Road",
    streetNumber: "1",
  });
  const nominatimAddress = buildAddressFromNominatim({
    display_name: "1, MG Road, Bengaluru, Karnataka, India",
    address: {
      house_number: "1",
      road: "MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      postcode: "560001",
      country: "India",
    },
  });
  const bigDataAddress = buildAddressFromBigData({
    locality: "MG Road",
    city: "Bengaluru",
    principalSubdivision: "Karnataka",
    postcode: "560001",
    countryName: "India",
  });

  assert.equal(formatLocationAddress(browserAddress), "1, MG Road | South, Bengaluru, Karnataka, 560001, India");
  assert.equal(formatLocationAddress(nominatimAddress), "1, MG Road | Bengaluru, Karnataka, 560001, India");
  assert.equal(formatLocationAddress(bigDataAddress), "MG Road | Bengaluru, Karnataka, 560001, India");
});
