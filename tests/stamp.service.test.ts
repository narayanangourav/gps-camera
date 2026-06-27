import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_STAMP_CONFIG,
  buildDownloadFileName,
  createCapturedMediaItem,
  isStampFieldEnabled,
  isValidTimerSetting,
  mergeStampConfig,
  sanitizeProjectName,
} from "../src/services/stamp.service";

test("provides stable stamp defaults and merge behavior", () => {
  const merged = mergeStampConfig({ showMap: false, showTimezone: true });

  assert.equal(DEFAULT_STAMP_CONFIG.showMap, true);
  assert.equal(merged.showMap, false);
  assert.equal(merged.showTimezone, true);
  assert.equal(isStampFieldEnabled(merged, "showTimezone"), true);
});

test("validates timer settings", () => {
  assert.equal(isValidTimerSetting(0), true);
  assert.equal(isValidTimerSetting(3), true);
  assert.equal(isValidTimerSetting(2), false);
});

test("sanitizes project names and generates download filenames", () => {
  const sanitized = sanitizeProjectName(" Site: 1 / Demo ");
  const fileName = buildDownloadFileName("Site: 1 / Demo", "picture", 0);

  assert.equal(sanitized, "Site-1-Demo");
  assert.match(fileName, /^Site-1-Demo_1970-01-01T00-00-00-000Z\.jpg$/);
});

test("creates capture history metadata", () => {
  const item = createCapturedMediaItem(
    "blob:test",
    "picture",
    "Site 1",
    "Bengaluru",
    1234,
  );

  assert.equal(item.projectName, "Site 1");
  assert.equal(item.locationLabel, "Bengaluru");
  assert.equal(item.id, "1234-picture");
});
