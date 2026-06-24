type OvrTier = {
  threshold: number;
  box: string;
  accent: string;
};

const OVR_TIERS: OvrTier[] = [
  {
    threshold: 50,
    box: "bg-red-500/15 text-red-400",
    accent: "accent-red-500",
  },
  {
    threshold: 60,
    box: "bg-orange-500/15 text-orange-400",
    accent: "accent-orange-500",
  },
  {
    threshold: 70,
    box: "bg-amber-500/15 text-amber-400",
    accent: "accent-amber-500",
  },
  {
    threshold: 80,
    box: "bg-lime-500/15 text-lime-400",
    accent: "accent-lime-500",
  },
  {
    threshold: 90,
    box: "bg-emerald-500/15 text-emerald-400",
    accent: "accent-emerald-500",
  },
  {
    threshold: Number.POSITIVE_INFINITY,
    box: "bg-blue-500/15 text-blue-400",
    accent: "accent-blue-500",
  },
];

function ovrTier(ovr: number): OvrTier {
  return (
    OVR_TIERS.find((tier) => ovr < tier.threshold) ??
    OVR_TIERS[OVR_TIERS.length - 1]
  );
}

/** Tinted background + text classes for an OVR badge/box. */
export function ovrBoxClass(ovr: number) {
  return ovrTier(ovr).box;
}

/** Tailwind `accent-color` class for the same tier, e.g. a slider's fill. */
export function ovrAccentClass(ovr: number) {
  return ovrTier(ovr).accent;
}
