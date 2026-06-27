import { buildDownloadFileName } from "../../services/stamp.service";
import { canShareCapture, shareCapture } from "../../services/share.service";

export const useCaptureHistoryActions = (
  removeCaptureHistoryItem: (id: string) => void,
  clearCaptureHistory: () => void,
) => {
  const shareSupported =
    typeof navigator !== "undefined" && canShareCapture(navigator);

  const downloadCapture = (uri: string, projectName: string, createdAt: number) => {
    const link = document.createElement("a");
    link.href = uri;
    link.download = buildDownloadFileName(projectName, "picture", createdAt);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openCapture = (uri: string) => {
    window.open(uri, "_blank", "noopener,noreferrer");
  };

  const shareHistoryCapture = async (
    uri: string,
    projectName: string,
    createdAt: number,
  ) => {
    const fileName = buildDownloadFileName(projectName, "picture", createdAt);
    return shareCapture(uri, fileName);
  };

  return {
    shareSupported,
    removeCaptureHistoryItem,
    clearCaptureHistory,
    downloadCapture,
    openCapture,
    shareHistoryCapture,
  };
};
