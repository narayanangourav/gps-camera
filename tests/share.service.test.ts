import test from "node:test";
import assert from "node:assert/strict";

import { canShareCapture } from "../src/services/share.service";

test("detects browser share support only when navigator share and File API exist", () => {
  assert.equal(canShareCapture(undefined, true), false);
  assert.equal(canShareCapture({ share: async () => undefined }, false), false);
  assert.equal(canShareCapture({ share: async () => undefined }, true), true);
});
