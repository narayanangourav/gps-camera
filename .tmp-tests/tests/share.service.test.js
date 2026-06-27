"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const share_service_1 = require("../src/services/share.service");
(0, node_test_1.default)("detects browser share support only when navigator share and File API exist", () => {
    strict_1.default.equal((0, share_service_1.canShareCapture)(undefined, true), false);
    strict_1.default.equal((0, share_service_1.canShareCapture)({ share: async () => undefined }, false), false);
    strict_1.default.equal((0, share_service_1.canShareCapture)({ share: async () => undefined }, true), true);
});
