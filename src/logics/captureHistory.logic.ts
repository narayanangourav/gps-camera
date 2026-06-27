import { useNavigation } from "@react-navigation/native";

import { useAppPreferences } from "../state/AppPreferencesProvider";
import { buildDownloadFileName } from "../services/stamp.service";
import { canShareCapture, shareCapture } from "../services/share.service";

export const useCaptureHistoryLogic = () => {
  const navigation = useNavigation<any>();
  const { captureHistory, removeCaptureHistoryItem, clearCaptureHistory } =
    useAppPreferences();
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
    if (typeof window === "undefined") {
      return;
    }

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
    captureHistory,
    removeCaptureHistoryItem,
    clearCaptureHistory,
    shareSupported,
    downloadCapture,
    shareHistoryCapture,
    openCapture,
    goBack: () => navigation.goBack(),
  };
};
