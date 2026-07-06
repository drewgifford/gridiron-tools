/**
 * Approximates EA's in-game name filter, which rejects a name field if it
 * *contains* a banned token anywhere as a substring — the "Scunthorpe problem".
 * That's why innocent surnames get blocked in-game (e.g. "Cummings" → "cum",
 * "Cockburn" → "cock", "Cassidy" → "ass"). We mirror that substring behaviour
 * so generated names won't trip the real filter.
 *
 * The real list is proprietary and unknowable, so this errs aggressive on
 * purpose: over-blocking only trims name variety, under-blocking risks a name
 * the game rejects. Tune `BANNED_SUBSTRINGS` to taste.
 */
const BANNED_SUBSTRINGS = [
  "anal",
  "anus",
  "arse",
  "ass",
  "bastard",
  "bitch",
  "boob",
  "clit",
  "cock",
  "coon",
  "cum",
  "cunt",
  "dago",
  "dick",
  "dyke",
  "fag",
  "fuck",
  "fuk",
  "gook",
  "hoe",
  "homo",
  "jiz",
  "kike",
  "kkk",
  "molest",
  "nazi",
  "nig",
  "paki",
  "pedo",
  "penis",
  "porn",
  "pussy",
  "queer",
  "rape",
  "rapist",
  "retard",
  "sex",
  "shit",
  "slut",
  "spic",
  "tit",
  "twat",
  "vag",
  "wank",
  "whore",
  "wop",
];

/** True when a name field contains no banned substring (case-insensitive). */
export function isNameClean(name: string): boolean {
  const normalized = name.toLowerCase();
  return !BANNED_SUBSTRINGS.some((bad) => normalized.includes(bad));
}
