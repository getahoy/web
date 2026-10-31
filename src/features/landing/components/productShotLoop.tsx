"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { landingCopy } from "../copy/landingCopy";
import { useShotPlayer } from "../hooks/useShotPlayer";
import { useTryShot } from "../hooks/useTryShot";
import { SHOT_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { ProductShotScene } from "./productShotScene";
import { ShotControls } from "./shotControls";
import { VoiceTryPanel } from "./voiceTryPanel";

const hints = [
  landingCopy["try.hint.pause"],
  landingCopy["try.hint.note"],
  landingCopy["try.hint.draft"],
];

export function ProductShotLoop() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { amount: SHOT_IN_VIEW_AMOUNT });
  const player = useShotPlayer(inView);
  const tryShot = useTryShot(player.playHeard);

  return (
    <div className="flex flex-col items-center gap-8 lg:gap-10">
      <div ref={sceneRef} className="w-full">
        <ProductShotScene
          scene={player.scene}
          stage={player.stage}
          heard={player.heard}
        />
      </div>
      <ShotControls
        scene={player.scene}
        paused={player.paused}
        onScene={player.showScene}
        onTogglePaused={player.togglePaused}
      />
      <VoiceTryPanel
        startLabel={landingCopy["try.start"]}
        hints={hints}
        status={tryShot.status}
        busy={false}
        message={tryShot.message}
        onStart={tryShot.start}
        onStop={tryShot.stop}
      />
    </div>
  );
}
