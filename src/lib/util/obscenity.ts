import {
  englishDataset,
  englishRecommendedTransformers,
  RegExpMatcher,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

/** True when user-entered text contains an obscene word (leetspeak-aware). */
export function containsProfanity(text: string): boolean {
  return matcher.hasMatch(text);
}
