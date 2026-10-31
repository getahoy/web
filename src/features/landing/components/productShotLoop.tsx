"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useShotPlayer } from "../hooks/useShotPlayer";
import { SHOT_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { ProductShotScene } from "./productShotScene";
import { ShotControls } from "./shotControls";

export function ProductShotLoop() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { amount: SHOT_IN_VIEW_AMOUNT });
  const player = useShotPlayer(inView);

  return (
    <div className="flex flex-col items-center gap-8 lg:gap-10">
      <div ref={sceneRef} className="w-full">
        <ProductShotScene scene={player.scene} stage={player.stage} />
      </div>
      <ShotControls
        scene={player.scene}
        paused={player.paused}
        onScene={player.showScene}
        onTogglePaused={player.togglePaused}
      />
    </div>
  );
}
