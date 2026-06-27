"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRemoteLocationAddress = exports.selectActiveLocation = exports.createManualLocation = exports.toAppLocationFromBrowserPosition = exports.toAppLocation = exports.isValidCoordinates = exports.isValidLongitude = exports.isValidLatitude = exports.formatLocationAddress = exports.buildAddressFromBigData = exports.buildAddressFromNominatim = exports.buildAddressFromLookupRecord = void 0;
const normalizeAddressToken = (value) => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const pushUniqueText = (target, value) => {
    if (!value) {
        return;
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return;
    }
    const normalized = normalizeAddressToken(trimmed);
    if (!normalized) {
        return;
    }
    const exists = target.some((existing) => normalizeAddressToken(existing) === normalized);
    if (!exists) {
        target.push(trimmed);
    }
};
const buildAddressLines = (line1Candidates, line2Parts) => {
    const line1 = line1Candidates[0] || null;
    const normalizedLine1 = line1 ? normalizeAddressToken(line1) : null;
    const filteredLine2Parts = line2Parts.filter((part) => {
        if (!normalizedLine1) {
            return true;
        }
        return normalizeAddressToken(part) !== normalizedLine1;
    });
    if (!line1 && filteredLine2Parts.length === 0) {
        return null;
    }
    if (line1) {
        return {
            line1,
            line2: filteredLine2Parts.join(", "),
        };
    }
    return {
        line1: filteredLine2Parts[0],
        line2: filteredLine2Parts.slice(1).join(", "),
    };
};
const splitDisplayNameParts = (displayName) => {
    if (!displayName) {
        return [];
    }
    const parts = [];
    displayName
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((part) => {
        pushUniqueText(parts, part);
    });
    return parts;
};
const toDisplayLabel = (line1, line2) => [line1, line2].filter(Boolean).join(" | ") || null;
const buildAddressFromLines = (lines, city, state, country, postalCode) => {
    if (!lines) {
        return null;
    }
    return {
        line1: lines.line1,
        line2: lines.line2,
        city,
        state,
        country,
        postalCode,
        displayLabel: toDisplayLabel(lines.line1, lines.line2),
    };
};
const buildAddressFromLookupRecord = (address) => {
    if (!address) {
        return null;
    }
    const line1Candidates = [];
    pushUniqueText(line1Candidates, [address.streetNumber, address.street].filter(Boolean).join(", "));
    pushUniqueText(line1Candidates, address.name);
    const line2Parts = [];
    pushUniqueText(line2Parts, address.district);
    pushUniqueText(line2Parts, address.city);
    pushUniqueText(line2Parts, address.region);
    pushUniqueText(line2Parts, address.postalCode);
    pushUniqueText(line2Parts, address.country);
    return buildAddressFromLines(buildAddressLines(line1Candidates, line2Parts), address.city ?? null, address.region ?? null, address.country ?? null, address.postalCode ?? null);
};
exports.buildAddressFromLookupRecord = buildAddressFromLookupRecord;
const buildAddressFromNominatim = (data) => {
    const address = data.address ?? {};
    const displayNameParts = splitDisplayNameParts(data.display_name);
    const line1Parts = [];
    pushUniqueText(line1Parts, [
        address.house_number ||
            address.house ||
            address.house_name ||
            address.building ||
            address.shop,
        address.road ||
            address.residential ||
            address.pedestrian ||
            address.footway ||
            address.path,
    ]
        .filter(Boolean)
        .join(", "));
    pushUniqueText(line1Parts, [
        address.house_name || address.building || address.amenity || address.office,
        address.road,
    ]
        .filter(Boolean)
        .join(", "));
    pushUniqueText(line1Parts, address.road);
    pushUniqueText(line1Parts, address.residential);
    pushUniqueText(line1Parts, address.amenity);
    pushUniqueText(line1Parts, address.building);
    pushUniqueText(line1Parts, data.name);
    pushUniqueText(line1Parts, displayNameParts[0]);
    pushUniqueText(line1Parts, displayNameParts[1]);
    const line2Parts = [];
    pushUniqueText(line2Parts, address.suburb ||
        address.neighbourhood ||
        address.city_district ||
        address.hamlet);
    pushUniqueText(line2Parts, address.city || address.town || address.village);
    pushUniqueText(line2Parts, address.state);
    pushUniqueText(line2Parts, address.postcode);
    pushUniqueText(line2Parts, address.country);
    if (line2Parts.length === 0) {
        displayNameParts.slice(1).forEach((part) => {
            pushUniqueText(line2Parts, part);
        });
    }
    return buildAddressFromLines(buildAddressLines(line1Parts, line2Parts), address.city ?? address.town ?? address.village ?? null, address.state ?? null, address.country ?? null, address.postcode ?? null);
};
exports.buildAddressFromNominatim = buildAddressFromNominatim;
const buildAddressFromBigData = (data) => {
    const informative = Array.isArray(data.localityInfo?.informative)
        ? data.localityInfo.informative
        : [];
    const roadInfo = informative.find((item) => /road|street|avenue|lane|nagar|main/i.test(`${item.description ?? ""} ${item.name ?? ""}`));
    const houseInfo = informative.find((item) => /house|building|door|plot/i.test(`${item.description ?? ""} ${item.name ?? ""}`));
    const line1Parts = [];
    pushUniqueText(line1Parts, [houseInfo?.name, roadInfo?.name].filter(Boolean).join(", "));
    pushUniqueText(line1Parts, roadInfo?.name);
    pushUniqueText(line1Parts, data.locality);
    const line2Parts = [];
    pushUniqueText(line2Parts, data.locality);
    pushUniqueText(line2Parts, data.city);
    pushUniqueText(line2Parts, data.principalSubdivision);
    pushUniqueText(line2Parts, data.postcode);
    pushUniqueText(line2Parts, data.countryName);
    return buildAddressFromLines(buildAddressLines(line1Parts, line2Parts), data.city ?? null, data.principalSubdivision ?? null, data.countryName ?? null, data.postcode ?? null);
};
exports.buildAddressFromBigData = buildAddressFromBigData;
const formatLocationAddress = (address) => address?.displayLabel ?? null;
exports.formatLocationAddress = formatLocationAddress;
const isValidLatitude = (latitude) => Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
exports.isValidLatitude = isValidLatitude;
const isValidLongitude = (longitude) => Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
exports.isValidLongitude = isValidLongitude;
const isValidCoordinates = (latitude, longitude) => (0, exports.isValidLatitude)(latitude) && (0, exports.isValidLongitude)(longitude);
exports.isValidCoordinates = isValidCoordinates;
const toAppLocation = (coords, source, timestamp, address = null) => ({
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: coords.accuracy ?? null,
    altitude: coords.altitude ?? null,
    heading: coords.heading ?? null,
    timestamp,
    source,
    address,
});
exports.toAppLocation = toAppLocation;
const toAppLocationFromBrowserPosition = (location, address = null) => (0, exports.toAppLocation)({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    accuracy: location.coords.accuracy ?? null,
    altitude: location.coords.altitude ?? null,
    heading: location.coords.heading ?? null,
}, "automatic", location.timestamp, address);
exports.toAppLocationFromBrowserPosition = toAppLocationFromBrowserPosition;
const createManualLocation = (input) => {
    if (!(0, exports.isValidCoordinates)(input.latitude, input.longitude)) {
        return null;
    }
    const line1 = input.addressLine1?.trim() ?? "";
    const line2 = input.addressLine2?.trim() ?? "";
    const label = input.displayLabel?.trim() ?? "";
    const address = line1 ||
        line2 ||
        input.city ||
        input.state ||
        input.country ||
        input.postalCode ||
        label
        ? {
            line1,
            line2,
            city: input.city?.trim() || null,
            state: input.state?.trim() || null,
            country: input.country?.trim() || null,
            postalCode: input.postalCode?.trim() || null,
            displayLabel: label ||
                toDisplayLabel(line1, line2) ||
                [input.city, input.state, input.country]
                    .filter(Boolean)
                    .join(", ") ||
                null,
        }
        : null;
    return (0, exports.toAppLocation)({
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: null,
        altitude: null,
        heading: null,
    }, "manual", Date.now(), address);
};
exports.createManualLocation = createManualLocation;
const selectActiveLocation = ({ automaticLocation, manualLocation, mode, }) => {
    if (mode === "manual" && manualLocation) {
        return manualLocation;
    }
    return automaticLocation;
};
exports.selectActiveLocation = selectActiveLocation;
const fetchRemoteLocationAddress = async (latitude, longitude) => {
    try {
        const nominatim = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18&namedetails=1`, { headers: { "Accept-Language": "en" } });
        if (nominatim.ok) {
            const data = (await nominatim.json());
            const address = (0, exports.buildAddressFromNominatim)(data);
            if (address) {
                return address;
            }
        }
    }
    catch (_error) {
        // Fall through to the next provider.
    }
    try {
        const bigData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        if (bigData.ok) {
            const data = (await bigData.json());
            const address = (0, exports.buildAddressFromBigData)(data);
            if (address) {
                return address;
            }
        }
    }
    catch (_error) {
        // No further fallback is available in the pure web runtime.
    }
    return null;
};
exports.fetchRemoteLocationAddress = fetchRemoteLocationAddress;
