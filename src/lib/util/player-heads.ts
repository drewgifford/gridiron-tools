import { randomInt } from "@/lib/util/random";

export const SKIN_TONE_COUNT = 8;
export const HEADS_PER_SKIN_TONE = 8;

export function getPlayerHeadUrl(player: {
  skinToneIndex?: number;
  headIndex?: number;
}) {
  return `/heads/${player.skinToneIndex ?? 0}/${player.headIndex ?? 0}.webp`;
}

export function getRandomHead() {
  return {
    skinToneIndex: randomInt(0, SKIN_TONE_COUNT - 1),
    headIndex: randomInt(0, HEADS_PER_SKIN_TONE - 1),
  };
}
