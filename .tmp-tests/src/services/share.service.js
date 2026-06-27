"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareCapture = exports.canShareCapture = void 0;
const buildSharedFile = async (uri, fileName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const mimeType = blob.type || "image/jpeg";
    return new File([blob], fileName, {
        type: mimeType,
        lastModified: Date.now(),
    });
};
const canShareCapture = (navigatorLike, hasFileApi = typeof File !== "undefined") => Boolean(navigatorLike?.share && hasFileApi);
exports.canShareCapture = canShareCapture;
const shareCapture = async (uri, fileName, navigatorLike = navigator) => {
    if (!(0, exports.canShareCapture)(navigatorLike)) {
        return false;
    }
    const file = await buildSharedFile(uri, fileName);
    const data = {
        files: [file],
        title: fileName,
        text: "GPS Camera capture",
    };
    if (navigatorLike.canShare && !navigatorLike.canShare(data)) {
        return false;
    }
    await navigatorLike.share?.(data);
    return true;
};
exports.shareCapture = shareCapture;
