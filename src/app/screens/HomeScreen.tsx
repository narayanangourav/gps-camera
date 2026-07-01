import Button from "../../components/ui/Button";
import PageFrame from "../../components/ui/PageFrame";
import PageShell from "../../components/ui/PageShell";
import Pill from "../../components/ui/Pill";

import styles from "./HomeScreen.module.css";

type HomeScreenProps = {
  onOpenOverview: () => void;
};

export default function HomeScreen({ onOpenOverview }: HomeScreenProps) {
  return (
    <PageShell centered className="min-h-dvh" fullHeight inset="compact">
      <PageFrame
        className={`${styles.card} flex w-full flex-col px-5 py-8 sm:px-8 sm:py-10`}
        fullHeight
      >
        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-app-primary">
          Pure web GPS capture
        </p>
        <h1
          className={`${styles.title} m-0 text-center text-[clamp(2.4rem,9vw,4.5rem)] font-bold leading-[0.95] text-slate-950`}
        >
          GPS Camera
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-app-muted sm:text-lg">
          Browser-native photo capture with OpenStreetMap context, timestamped
          metadata, manual coordinate fallback, and GitHub Pages-ready static
          deployment.
        </p>
        <div className="mt-6 grid gap-3">
          <Pill className="min-h-12">
            OpenStreetMap-first live and manual location capture
          </Pill>
          <Pill className="min-h-12">
            Stamped downloads with project naming and browser sharing
          </Pill>
          <Pill className="min-h-12">
            Pure web runtime with no Expo or React Native dependency target
          </Pill>
        </div>
        <Button
          className="mx-auto mt-auto rounded-full px-6 sm:w-auto"
          block={false}
          onClick={onOpenOverview}
          variant="primary"
        >
          Open Workspace
        </Button>
      </PageFrame>
    </PageShell>
  );
}
