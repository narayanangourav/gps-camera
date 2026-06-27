"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const location_service_1 = require("../src/services/location.service");
(0, node_test_1.default)("validates coordinate ranges", () => {
    strict_1.default.equal((0, location_service_1.isValidCoordinates)(12.34, 56.78), true);
    strict_1.default.equal((0, location_service_1.isValidCoordinates)(-91, 20), false);
    strict_1.default.equal((0, location_service_1.isValidCoordinates)(20, 181), false);
});
(0, node_test_1.default)("creates a manual location with normalized address fields", () => {
    const manualLocation = (0, location_service_1.createManualLocation)({
        latitude: 12.34,
        longitude: 56.78,
        addressLine1: "Road 1",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
    });
    strict_1.default.ok(manualLocation);
    strict_1.default.equal(manualLocation?.source, "manual");
    strict_1.default.equal(manualLocation?.address?.line1, "Road 1");
    strict_1.default.equal(manualLocation?.address?.city, "Bengaluru");
});
(0, node_test_1.default)("selects manual location when manual mode is active", () => {
    const automaticLocation = (0, location_service_1.toAppLocation)({ latitude: 1, longitude: 2 }, "automatic", 1);
    const manualLocation = (0, location_service_1.toAppLocation)({ latitude: 3, longitude: 4 }, "manual", 2);
    strict_1.default.equal((0, location_service_1.selectActiveLocation)({
        automaticLocation,
        manualLocation,
        mode: "manual",
    }), manualLocation);
});
(0, node_test_1.default)("formats normalized address labels from providers", () => {
    const browserAddress = (0, location_service_1.buildAddressFromLookupRecord)({
        city: "Bengaluru",
        country: "India",
        district: "South",
        name: "Office",
        postalCode: "560001",
        region: "Karnataka",
        street: "MG Road",
        streetNumber: "1",
    });
    const nominatimAddress = (0, location_service_1.buildAddressFromNominatim)({
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
    const bigDataAddress = (0, location_service_1.buildAddressFromBigData)({
        locality: "MG Road",
        city: "Bengaluru",
        principalSubdivision: "Karnataka",
        postcode: "560001",
        countryName: "India",
    });
    strict_1.default.equal((0, location_service_1.formatLocationAddress)(browserAddress), "1, MG Road | South, Bengaluru, Karnataka, 560001, India");
    strict_1.default.equal((0, location_service_1.formatLocationAddress)(nominatimAddress), "1, MG Road | Bengaluru, Karnataka, 560001, India");
    strict_1.default.equal((0, location_service_1.formatLocationAddress)(bigDataAddress), "MG Road | Bengaluru, Karnataka, 560001, India");
});
