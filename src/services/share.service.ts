type ShareNavigator = {
  share?: (data: ShareData) => Promise<void>;
  canShare?: (data?: ShareData) => boolean;
};

const buildSharedFile = async (uri: string, fileName: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const mimeType = blob.type || "image/jpeg";

  return new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  });
};

export const canShareCapture = (
  navigatorLike: ShareNavigator | undefined,
  hasFileApi = typeof File !== "undefined",
) => Boolean(navigatorLike?.share && hasFileApi);

export const shareCapture = async (
  uri: string,
  fileName: string,
  navigatorLike: ShareNavigator = navigator,
) => {
  if (!canShareCapture(navigatorLike)) {
    return false;
  }

  const file = await buildSharedFile(uri, fileName);
  const data: ShareData = {
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
