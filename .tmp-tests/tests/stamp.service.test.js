"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const stamp_service_1 = require("../src/services/stamp.service");
(0, node_test_1.default)("provides stable stamp defaults and merge behavior", () => {
    const merged = (0, stamp_service_1.mergeStampConfig)({ showMap: false, showTimezone: true });
    strict_1.default.equal(stamp_service_1.DEFAULT_STAMP_CONFIG.showMap, true);
    strict_1.default.equal(merged.showMap, false);
    strict_1.default.equal(merged.showTimezone, true);
    strict_1.default.equal((0, stamp_service_1.isStampFieldEnabled)(merged, "showTimezone"), true);
});
(0, node_test_1.default)("validates timer settings", () => {
    strict_1.default.equal((0, stamp_service_1.isValidTimerSetting)(0), true);
    strict_1.default.equal((0, stamp_service_1.isValidTimerSetting)(3), true);
    strict_1.default.equal((0, stamp_service_1.isValidTimerSetting)(2), false);
});
(0, node_test_1.default)("sanitizes project names and generates download filenames", () => {
    const sanitized = (0, stamp_service_1.sanitizeProjectName)(" Site: 1 / Demo ");
    const fileName = (0, stamp_service_1.buildDownloadFileName)("Site: 1 / Demo", "picture", 0);
    strict_1.default.equal(sanitized, "Site-1-Demo");
    strict_1.default.match(fileName, /^Site-1-Demo_1970-01-01T00-00-00-000Z\.jpg$/);
});
(0, node_test_1.default)("creates capture history metadata", () => {
    const item = (0, stamp_service_1.createCapturedMediaItem)("blob:test", "picture", "Site 1", "Bengaluru", 1234);
    strict_1.default.equal(item.projectName, "Site 1");
    strict_1.default.equal(item.locationLabel, "Bengaluru");
    strict_1.default.equal(item.id, "1234-picture");
});
