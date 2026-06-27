type HomeScreenProps = {
  onOpenOverview: () => void;
};

export default function HomeScreen({ onOpenOverview }: HomeScreenProps) {
  return (
    <section className="app-home-screen">
      <div className="app-home-card">
        <p className="app-home-eyebrow">Pure web GPS capture</p>
        <h1 className="app-home-title">GPS Camera</h1>
        <p className="app-home-subtitle">
          Browser-native photo capture with OpenStreetMap context, timestamped
          metadata, manual coordinate fallback, and GitHub Pages-ready static
          deployment.
        </p>
        <div className="app-home-feature-list">
          <div className="app-home-feature-item">
            OpenStreetMap-first live and manual location capture
          </div>
          <div className="app-home-feature-item">
            Stamped downloads with project naming and browser sharing
          </div>
          <div className="app-home-feature-item">
            Pure web runtime with no Expo or React Native dependency target
          </div>
        </div>
        <button className="app-primary-button" onClick={onOpenOverview} type="button">
          Open Workspace
        </button>
      </div>
    </section>
  );
}
