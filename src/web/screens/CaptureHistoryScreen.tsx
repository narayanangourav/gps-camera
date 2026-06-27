import { CapturedMediaItem } from "../../models/preferences.model";
import { useCaptureHistoryActions } from "../hooks/useCaptureHistoryActions";

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
    <section className="history-screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">Session</p>
          <h1 className="screen-title">Capture History</h1>
        </div>
        <div className="app-action-row">
          {captureHistory.length > 0 ? (
            <button
              className="app-secondary-button"
              onClick={logic.clearCaptureHistory}
              type="button"
            >
              Clear
            </button>
          ) : null}
          <button className="app-secondary-button" onClick={onBack} type="button">
            Back
          </button>
        </div>
      </header>

      {captureHistory.length === 0 ? (
        <article className="app-card">
          <p className="app-muted-text">No captures are stored in this session yet.</p>
        </article>
      ) : (
        <div className="history-grid">
          {captureHistory.map((item) => (
            <article className="app-card history-card" key={item.id}>
              <img
                alt={item.projectName}
                className="history-thumbnail"
                src={item.uri}
              />
              <h2 className="app-card-title">{item.projectName}</h2>
              <p className="app-muted-text">
                {new Date(item.createdAt).toLocaleString()}
              </p>
              {item.locationLabel ? (
                <p className="app-muted-text">{item.locationLabel}</p>
              ) : null}
              <div className="app-action-row">
                <button
                  className="app-secondary-button"
                  onClick={() => logic.openCapture(item.uri)}
                  type="button"
                >
                  Open
                </button>
                <button
                  className="app-secondary-button"
                  onClick={() =>
                    logic.downloadCapture(item.uri, item.projectName, item.createdAt)
                  }
                  type="button"
                >
                  Download
                </button>
                {logic.shareSupported ? (
                  <button
                    className="app-secondary-button"
                    onClick={() =>
                      void logic.shareHistoryCapture(
                        item.uri,
                        item.projectName,
                        item.createdAt,
                      )
                    }
                    type="button"
                  >
                    Share
                  </button>
                ) : null}
                <button
                  className="app-secondary-button"
                  onClick={() => logic.removeCaptureHistoryItem(item.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
