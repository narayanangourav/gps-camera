import { CapturedMediaItem } from "../../models/preferences.model";
import { useCaptureHistoryActions } from "../../hooks/useCaptureHistoryActions";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageShell from "../../components/ui/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

import styles from "./CaptureHistoryScreen.module.css";

type CaptureHistoryScreenProps = {
  captureHistory: CapturedMediaItem[];
  clearCaptureHistory: () => void;
  onBack: () => void;
  removeCaptureHistoryItem: (id: string) => void;
};

export default function CaptureHistoryScreen({
  captureHistory,
  clearCaptureHistory,
  onBack,
  removeCaptureHistoryItem,
}: CaptureHistoryScreenProps) {
  const logic = useCaptureHistoryActions(
    removeCaptureHistoryItem,
    clearCaptureHistory,
  );

  return (
    <PageShell className="mx-auto max-w-6xl" inset="regular">
      <SectionHeader
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
          {captureHistory.length > 0 ? (
                <Button onClick={logic.clearCaptureHistory}>
              Clear
                </Button>
          ) : null}
            <Button onClick={onBack}>
            Back
            </Button>
          </div>
        }
        eyebrow="Session"
        title="Capture History"
      />

      {captureHistory.length === 0 ? (
        <Card>
          <p className="text-base leading-7 text-app-muted">No captures are stored in this session yet.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {captureHistory.map((item) => (
            <Card className="flex flex-col gap-3" key={item.id}>
              <img
                alt={item.projectName}
                className={`${styles.thumbnail} h-52 w-full rounded-[1.125rem] bg-slate-200`}
                src={item.uri}
              />
              <h2 className="m-0 text-lg font-semibold text-slate-950">{item.projectName}</h2>
              <p className="text-base leading-7 text-app-muted">
                {new Date(item.createdAt).toLocaleString()}
              </p>
              {item.locationLabel ? (
                <p className="text-base leading-7 text-app-muted">{item.locationLabel}</p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => logic.openCapture(item.uri)}>
                  Open
                </Button>
                <Button
                  onClick={() =>
                    logic.downloadCapture(item.uri, item.projectName, item.createdAt)
                  }
                >
                  Download
                </Button>
                {logic.shareSupported ? (
                  <Button
                    onClick={() =>
                      void logic.shareHistoryCapture(
                        item.uri,
                        item.projectName,
                        item.createdAt,
                      )
                    }
                  >
                    Share
                  </Button>
                ) : null}
                <Button onClick={() => logic.removeCaptureHistoryItem(item.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
