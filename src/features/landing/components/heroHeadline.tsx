"use client";

import { MotionConfig } from "motion/react";
import { Fragment } from "react";
import { landingCopy } from "../copy/landingCopy";
import { HeroWord } from "./heroWord";

const leadWords = landingCopy["hero.lead"].split(" ");
const tailWords = landingCopy["hero.tail"].split(" ");
const italicOrder = leadWords.length + tailWords.length + 1;

export function HeroHeadline() {
  return (
    <MotionConfig reducedMotion="user">
      <h1 className="max-w-hero text-balance font-display font-light text-display">
        {leadWords.map((word, index) => (
          <Fragment key={word}>
            <HeroWord order={index}>{word}</HeroWord>{" "}
          </Fragment>
        ))}
        <HeroWord order={italicOrder}>
          <em>{landingCopy["hero.italic"]}</em>
          {landingCopy["hero.italicTrail"]}
        </HeroWord>
        {tailWords.map((word, index) => (
          <Fragment key={word}>
            {" "}
            <HeroWord order={leadWords.length + index}>{word}</HeroWord>
          </Fragment>
        ))}
      </h1>
    </MotionConfig>
  );
}
