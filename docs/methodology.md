# Roster Generation Methodology

A formal account of the mathematics behind player and roster generation in
Gridiron Tools: how overall ratings, stat lines, archetypes, development traits,
abilities, and physical measurables are produced, and what statistical model
each subsystem is approximating.

The generator's design goal is **football-plausible randomness**: every player
should look like a draw from a realistic population of college athletes, with
ratings, body types, recruiting histories, and skill trees that all _cohere_
with one another rather than being sampled independently. The sections below
move from the keystone model (the overall-rating regression) outward to the
traits derived from it.

> **Source files.** Pure logic lives in `src/lib/roster-generator/`
> (`index.ts`, `stats.ts`, `attributes.ts`). Data tables — the per-archetype
> regressions, scheme weights, position metadata, and roster presets — live in
> `src/data/roster-generator/`. Domain enumerations live in `src/lib/domain/`.

---

## 1. Notation

| Symbol                           | Meaning                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| $O$                              | A player's **overall rating** (OVR), an integer in $[25, 99]$ |
| $s_k$                            | The player's value for stat $k$, an integer in $[1, 99]$      |
| $\mathcal{S}$                    | The full set of 55 stat codes (`SPD`, `STR`, …, `RET`)        |
| $W_a \subseteq \mathcal{S}$      | The stats that carry nonzero weight for archetype $a$         |
| $w_k$                            | Regression weight on stat $k$ for the active archetype        |
| $\beta_0$                        | The archetype's regression intercept                          |
| $\Sigma w = \sum_{k\in W_a} w_k$ | Total weight of an archetype                                  |
| $U(a,b)$                         | A continuous uniform draw on $[a,b]$                          |
| $\mathrm{clamp}(x,a,b)$          | $\max(a,\min(b,x))$                                           |

The atomic random primitives (`src/lib/util/random.ts`) are all built on
`Math.random()`: `randomFloat` $= U(a,b)$, `randomInt` is its discrete
counterpart, and `pick` draws uniformly from a list.

---

## 2. The Overall-Rating Model — a per-archetype linear regression

Every archetype carries an `ovrFormula` that maps a stat line to an overall
rating through an **affine (multiple-linear-regression) model**:

$$
Ovr \;=\; \mathrm{round}\!\left(\beta_0 \;+\; \sum_{k \in W_a} w_k \, s_k\right)
$$

This is implemented verbatim in `calculateOvr` (`stats.ts`):

```ts
let ovr = formula.intercept; // β₀
for (const [stat, weight] of Object.entries(formula.weights))
  ovr += (weight ?? 0) * (stats[stat] ?? 0);
return Math.round(ovr);
```

The four-decimal coefficients (e.g. Pocket Passer's `THP: 0.4456`,
`AWR: 0.2879`, `intercept: -71.0487`) are characteristic of **ordinary least
squares fit against an external ratings dataset** — they are not hand-authored
round numbers. Each of the 77 archetypes is its own fitted model, so the same
77-attribute stat line yields a different OVR depending on which archetype lens
is applied. This is what makes archetype a _first-class_ property rather than a
cosmetic label: a "Pure Runner" QB and a "Pocket Passer" QB reward completely
different attributes.

### Aggregate structure of the fitted models

Measured across all 77 archetype regressions in the data table:

| Quantity                                    | Min      | Mean     | Median  | Max      |
| ------------------------------------------- | -------- | -------- | ------- | -------- |
| Intercept $\beta_0$                         | $-87.11$ | $-60.04$ | —       | $-11.08$ |
| Total weight $\Sigma w$                     | $1.112$  | $1.712$  | $1.712$ | $2.298$  |
| Number of weighted stats $\lvert W_a\rvert$ | 3        | 12.5     | —       | 25       |

Two facts matter downstream:

1. **$\Sigma w \approx 1.7 > 1$.** A uniform one-point lift across _every_
   weighted stat raises OVR by $\approx 1.7$ points. Stats have leverage
   greater than 1:1, and the regression's negative intercept (mean $-60$) is
   what pulls the result back into the $[0,99]$ band. OVR is, loosely,
   $\beta_0$ plus $\Sigma w$ times the _mean weighted stat_.
2. **Unweighted stats do not affect OVR at all.** Of the 55 stats, only the
   3–25 in $W_a$ enter the formula. The rest are flavor — but they are not
   wasted: `STR` and `SPD` feed the physical-measurables model (§10), and every
   stat is surfaced on the player card.

---

## 3. The Inverse Problem — generating a stat line for a target OVR

`generateStats(position, archetype, targetOvr)` solves the **inverse** of §2:
given a desired integer OVR, synthesize a full 55-stat line that (a) evaluates
to _exactly_ that OVR under the archetype's regression and (b) has realistic
internal spread. Because the forward model is linear, this is tractable in
closed form up to integer rounding.

### Step 1 — baseline seed for all stats

Every stat is seeded at roughly 70% of the target, with noise:

$$
s_k \;\leftarrow\; \mathrm{clamp}\big(\mathrm{round}(0.7\,O^\* + U(-8,8)),\,1,\,99\big)
\qquad \forall k \in \mathcal{S}
$$

This gives the unweighted stats a plausible floor (a 90-overall player still has
non-trivial secondary attributes) without touching OVR.

### Step 2 — the closed-form "uniform level"

For the weighted stats, define the **target level**

$$
\ell \;=\; \mathrm{clamp}\!\left(\frac{O^\* - \beta_0}{\Sigma w},\; 1,\; 99\right).
$$

This is the keystone of the whole module. If _every_ weighted stat were set to
exactly $\ell$, the forward formula returns

$$
\beta_0 + \Sigma w \cdot \ell
= \beta_0 + \Sigma w \cdot \frac{O^\* - \beta_0}{\Sigma w}
= O^\*.
$$

So $\ell$ is the single uniform value at which the archetype's stat line hits
its target exactly. The generator sets each weighted stat to

$$
s_k \;\leftarrow\; \mathrm{clamp}\big(\mathrm{round}(\ell + U(-5,5)),\,1,\,99\big),
$$

injecting $\pm5$ of per-stat spread around the analytic solution so that no two
players with the same OVR have identical, flat stat lines. (Empirically this
yields an average max-minus-min spread of **≈ 8 points** across an archetype's
weighted stats.) Because $\beta_0 \approx -60$ and $\Sigma w \approx 1.7$, the
level $\ell$ sits just above the target OVR — e.g. an 85-OVR Pocket Passer is
built around weighted stats near $\ell \approx 87.6$.

### Step 3 — discrete coordinate-descent correction

The $\pm5$ noise and integer rounding knock the OVR off target, so a correction
loop restores it exactly:

```ts
for (let i = 0; i < 300; i++) {
  const ovr = calculateOvr(ovrFormula, stats);
  if (ovr === targetOvr) break;
  const stat = pick(weightedStats); // random coordinate
  const next = stats[stat] + (targetOvr > ovr ? 1 : -1); // ±1 toward target
  if (next >= 1 && next <= 99) stats[stat] = next;
}
```

This is **randomized coordinate descent on a step function**. Each iteration
picks one weighted coordinate and nudges it one point in the direction that
moves OVR toward the target; a single point of stat $k$ moves OVR by $w_k$.
Because all weights are positive, OVR is monotone in every coordinate, so the
process cannot oscillate away from the target. With up to 300 iterations and
$\lvert W_a\rvert$ usually ≥ 8, convergence to the **exact** integer OVR is
effectively guaranteed: a 5,000-trial simulation against the Pocket Passer model
hit the target OVR exactly **100%** of the time. The 300-iteration cap and the
$[1,99]$ guard exist only to bound pathological cases (a target near the rating
floor/ceiling where $\ell$ saturates).

The net effect: **OVR is pinned exactly to the requested integer, while the
underlying stat line is a noisy, archetype-shaped sample** rather than a
deterministic function of the OVR.

---

## 4. Target OVR — the depth-chart talent curve

`getTargetOvr` (`attributes.ts`) decides _what_ OVR each slot should target,
before §3 builds stats for it. It composes three independent effects on top of
a team-level base rating $B$ (offensive or defensive, chosen by unit):

$$
O^\* \;=\; \mathrm{clamp}\big(\mathrm{round}(\, B + R(\text{role}) - D(\text{depth}) \,),\; 25,\; 99\big)
$$

**(a) Role modifier $R$.** Each slot is first assigned a _role_ by
`getRosterRole`, a depth-dependent categorical draw:

| Role       | Modifier $R$    | Starter (d=1) | Rotation (d ≤ ⌈max/2⌉) | Reserve (deeper) |
| ---------- | --------------- | ------------- | ---------------------- | ---------------- |
| Star       | $+10 + U(-3,3)$ | 15%           | 5%                     | —                |
| Quality    | $+4 + U(-2,2)$  | 45%           | 20%                    | 2%               |
| Average    | $0 + U(-3,3)$   | 30%           | 45%                    | 28%              |
| Developing | $-5 + U(-3,3)$  | 10%           | 20%                    | 50%              |
| Project    | $-10 + U(-4,4)$ | —             | 10%                    | 20%              |

The role _distribution_ shifts down the depth chart: starters are most likely
"Quality/Star," deep reserves are mostly "Developing/Project." This makes the
marginal OVR at each depth a **5-component Gaussian-like mixture** whose mixing
weights are indexed by depth tier.

**(b) Depth penalty $D$.** A piecewise-linear decline with a plateau at the
bottom of the chart. With $p = \max(2, \text{maxDepth} - 2)$ the plateau start:

$$
D(d) =
\begin{cases}
0 & d = 1 \\
3\,(d-1) & 1 < d < p \\
3\,(p-1) + 0.5\,(d - p) & d \ge p
\end{cases}
\quad\text{then } D \mathrel{*}= U(0.9, 1.1).
$$

Starters pay no penalty; each rung down the rotation costs ~3 OVR; once you
reach the last two slots the curve flattens to 0.5/rung (walk-ons at the bottom
of a position group are all roughly equally low). The $U(0.9,1.1)$ multiplier
adds ±10% jitter so the curve isn't mechanically smooth.

The result is the familiar shape of a real depth chart: a strong top, a steady
mid-roster decline, and a long flat tail.

---

## 5. Class Year — coupling age to talent

`getYear` makes recruiting class correlate with ability, because in reality the
better players on a roster skew toward developed upperclassmen. It builds a
**maturity score** and adds it to a uniform draw:

$$
m = \frac{O^\* - 60}{40}\cdot 0.7 + \mathbb{1}[d=1]\cdot 0.3,
\qquad
r = U(0,1) + 0.6\,m
$$

then bins $r$ into class years (with a 60% chance of the _redshirt_ variant at
each boundary, via `orRedshirt`):

| Condition | Class        |
| --------- | ------------ |
| $r > 1.3$ | R-SR         |
| $r > 1.1$ | SR (or R-JR) |
| $r > 0.8$ | JR (or R-SO) |
| $r > 0.4$ | SO (or R-FR) |
| otherwise | FR           |

A 95-OVR starter has $m \approx 0.91$, pushing $r$ high and skewing senior; a
60-OVR reserve sits near $r \approx U(0,1)$ and skews freshman. Age then follows
deterministically from class via a fixed years-in-school table
($\text{age} = 17 + \text{years}$), so R-SR ⇒ 22, FR ⇒ 18.

---

## 6. Development Trait — OVR-gated, program-conditioned draw

`getDevTrait` returns one of `Normal | Impact | Star | Elite`. It is a
**hard-gated random draw**: a player must clear an OVR threshold _and_ win a
probability roll to earn each tier.

First, an absolute floor: an upperclassman (`SR`/`JR`) below 75 OVR is locked to
`Normal` — an old, mediocre player has no remaining upside. Otherwise a
program-prestige term shifts the roll:

$$
\text{bonus} = \frac{20\,P - 70}{100},
\qquad r = U(0,1) - \text{bonus}
$$

where $P \in [1,5]$ is program prestige. At $P = 3.5$ the bonus is zero;
stronger programs subtract more, sliding $r$ left and making elite traits easier
to roll (better programs develop more blue-chip talent). The tiers cascade:

| Tier   | OVR gate | Roll gate |
| ------ | -------- | --------- |
| Elite  | $O > 88$ | $r < 0.3$ |
| Star   | $O > 80$ | $r < 0.5$ |
| Impact | $O > 74$ | $r < 0.7$ |
| Normal | —        | otherwise |

So dev trait is jointly determined by a talent ceiling (the OVR gate) and a
program-adjusted Bernoulli-style roll.

---

## 7. Potential — a development-ceiling model

`getPlayerPotential` estimates how high a player could _climb_, returning
`Low | Medium | High`. It models a **ceiling** as the larger of current ability
and a dev-trait-anchored noisy draw:

$$
\text{base} =
\begin{cases}
96 & \text{Elite}\\ 90 & \text{Star}\\ 84 & \text{Impact}\\ 75 & \text{Normal}
\end{cases}
\qquad
\text{ceiling} = \max\!\big(O,\; \text{base} + U(-v, v)\big)
$$

The variance $v$ widens with class — SR 10, JR 8, SO 6, else 4 — because an
upperclassman's trajectory is more fully revealed (more realized variance),
while an underclassman's projection is tighter around the trait anchor. The
$\max(O, \cdot)$ floor enforces a logical constraint: **potential can never be
below current ability**. The ceiling is then bucketed at $\ge 90 \Rightarrow$
High, $\ge 80 \Rightarrow$ Medium, else Low. Potential in turn drives ability
budgets (§9, §11).

---

## 8. Recruiting Star Rating — back-dated inference

`getHsStarRating` reconstructs the 1–5★ recruiting rating a player _would have
carried out of high school_, inferred from present-day OVR by **subtracting the
development they've since accumulated**:

$$
\text{score} = O - \text{decay}(\text{year}) + \big[(P-3)\cdot 3 + U(-1,1)\big]
$$

The decay term back-dates the rating by class — SR $-12$, JR $-8$, SO $-4$, FR
$0$ — so an 85-OVR senior is treated as having been recruited at ~73, i.e. a
3-star who developed, rather than a 4-star bust. The program-bias term
$(P-3)\cdot 3$ reflects that stronger programs land higher-rated recruits.
Thresholds: $\ge 90 \Rightarrow 5★$, $\ge 77 \Rightarrow 4★$,
$\ge 67 \Rightarrow 3★$, $\ge 56 \Rightarrow 2★$, else 1★.

---

## 9. Physical Abilities — a gated XP economy

`getPhysicalAbilities` is the most optimization-flavored subsystem: it spends an
experience budget on an archetype's ability tree subject to **per-tier stat
gates**, i.e. a randomized greedy knapsack.

**Budget.** XP accrues once at "signing" plus once per year in school. Each draw
is

$$
\text{xp} = \max\!\big(1,\; c_{\text{dev}} \cdot \mu_{\text{pot}} + U(-1,2)\big),
\qquad
\text{XP}_{\text{total}} = \text{xp}_0 + \sum_{i=1}^{\text{years}} \text{xp}_i
$$

with dev-trait base $c_{\text{dev}} \in \{$Normal 2, Impact 3, Star 5, Elite 8$\}$
and potential multiplier $\mu_{\text{pot}} \in \{$High ×1.25, Medium ×1.1, Low ×1$\}$.
An Elite, High-potential senior thus commands an order of magnitude more XP than
a Normal freshman.

**Tree & costs.** Each archetype exposes up to five abilities. An ability has
levels 0–4; advancing from level $\ell$ costs `TRAIT_COSTS[ℓ] = [2,4,6,8]` — an
**escalating, convex cost curve** that makes deep specialization expensive
relative to breadth. Each level also has stat-gate requirements: e.g. Pocket
Passer's _Resistance_ requires `TUP ≥ [81, 87, 91, 93]` at tiers 1–4. You cannot
buy a tier your stats don't support.

**Purchase loop.** While XP remains, compute the _buyable_ set — abilities below
level 4 whose next-tier cost fits the remaining budget **and** whose current-tier
stat requirements are all met — and buy one **at random**, paying its cost:

```ts
const buyable = slots.filter(slot =>
  slot.level < 4 &&
  TRAIT_COSTS[slot.level] <= xp &&
  every requirement[slot.level] is satisfied by the player's stats
);
const slot = pick(buyable);          // random, not greedy-by-value
xp -= TRAIT_COSTS[slot.level];
slot.level++;
```

The random choice (rather than value-maximizing) produces diverse builds: two
identical-stat players spend the same budget on different ability mixes. Because
gates are checked against the _already-generated_ stat line, abilities are
always consistent with the player's attributes — a high-`TUP` passer tends to
unlock _Resistance_, a high-`DAC` passer tends to unlock _Dot!_.

---

## 10. Physical Measurables — a correlated size model

`getPhysicals` derives height and weight from a single latent **size** score,
making the two correlated (heavier players tend to be taller) while keeping them
within position-group anthropometric ranges from `POSITION_META`.

Normalize the two driving stats to $[0,1]$:
$\hat{s} = \mathrm{clamp}((\text{STR}-50)/49, 0, 1)$ and
$\hat{v} = \mathrm{clamp}((\text{SPD}-50)/49, 0, 1)$. Then

$$
\text{size} = \mathrm{clamp}\big(0.7\,\hat{s} + 0.3\,(1-\hat{v}) + 0.04\,(P-3) + U(-0.08,0.08),\; 0,\; 1\big)
$$

Strength pushes size up, speed pushes it down, and a strong program adds a
small bulk bonus. Weight is a linear interpolation across the group's range,
$\text{weight} = \text{min}_w + (\text{max}_w - \text{min}_w)\cdot\text{size}$;
height uses the same size but with **extra independent noise**
($\text{size} + U(-0.15, 0.15)$ before interpolation) so the height–weight
correlation is strong but not degenerate — you still get the occasional tall,
lean or short, stocky build. Each position group has its own
`heightRange`/`weightRange` (OL 74–82 in / 270–400 lb vs. CB 69–75 in /
170–210 lb), so the same size score maps to position-appropriate bodies.

---

## 11. Mental Abilities — a simpler points economy

`getMentalAbilities` spends a potential-scaled point pool on the position
group's mental-ability list. The budget is

$$
\text{points} = M_{\text{pot}} \cdot \big(1 + U(-0.25, 0.25)\big),
\qquad M_{\text{pot}} \in \{\text{Low }5,\ \text{Medium }10,\ \text{High }20\}
$$

with a flat cost of 5 per level (max level 4). Each step, with probability 0.4
it deepens an already-owned ability, otherwise it opens a fresh one — a
**breadth-vs-depth bias toward breadth**. High-potential players therefore tend
to acquire ~4 levels' worth of mental traits; low-potential players often get
just one. The available pool is position-specific (QBs draw from _Field
General_, kickers from _Clutch Kicker_, plus a common core).

---

## 12. Archetype Selection — scheme-weighted sampling

Which archetype a slot receives is a **weighted categorical draw** governed by
the team's offensive and defensive _schemes_. `buildArchetypeWeights` merges the
two scheme tables into one position-group → archetype → weight map, and
`pickArchetype` does standard cumulative-weight roulette selection:

```ts
const total = Σ weights;
let roll = U(0, total);
for (const [name, weight] of priorities) {
  roll -= weight;
  if (roll <= 0) return name;          // P(name) = weight / total
}
```

The probability of drawing archetype $a$ for a group is $w_a / \sum_b w_b$. The
scheme tables encode football identity as a probability distribution — _Air
Raid_ weights QB `Pocket Passer: 3` over `Pure Runner: 1` (75%-vs-25% odds at
the extremes), while _Spread_ inverts that to favor `Dual Threat: 3`. Defensive
schemes do the same for the front seven and secondary (a 3-4 favors `Pure Power`
/ `Gap Specialist` linemen; a 4-2-5 favors `Speed Rusher`). Archetype is chosen
_first_ in the pipeline because it selects which regression (§2) and which
ability tree (§9) all later steps use.

---

## 13. Other categorical draws

- **Dealbreaker** (`getDealbreaker`) — a recruit's deal-breaking priority, drawn
  by weighted roulette over 8 categories. Every category starts at weight 1;
  conditional boosts then reshape the distribution by recruiting tier:
  blue-chips (4–5★ or High potential) get heavy boosts to _Pro Potential_ (+10),
  _Brand Exposure_ (+8), _Championship Contender_ (+6); mid-tier recruits get
  _Playing Time_/_Conference Prestige_; low recruits get _Proximity to Home_
  (+6) and _Coach Prestige_. This produces psychologically plausible recruiting
  motivations conditioned on stature.
- **Handedness** (`getHandedness`) — a Bernoulli draw, $P(\text{Left}) = 0.13$,
  matching the real-world left-handed rate.
- **Jersey number** (`getJerseyNumber`) — a uniform draw from the position
  group's legal number ranges (`POSITION_META.numberRanges`, e.g. OL 50–79),
  excluding numbers already taken on the roster; falls back to the full range
  only if a group is exhausted. Uniqueness is enforced roster-wide via a shared
  `usedJerseyNumbers` set.

---

## 14. Roster Assembly & Composition of Randomness

`generateRoster(config)` ties it together. The chosen **preset**
(`RosterPresetData`) is a position → headcount map — _Air It Out_ carries 5 QBs
and 9 WRs, _Option Attack_ carries 3 FBs — so the preset sets roster _shape_
while the schemes set archetype _style_. For each position the generator walks
depth $1 \ldots \text{maxDepth}$, choosing the offensive or defensive base OVR by
unit, and calls `generatePlayer` for each slot.

Within a single player the random subsystems compose in a deliberate dependency
order, so that correlations are induced rather than assumed:

```
archetype ─▶ targetOVR ─▶ classYear ─▶ devTrait ─▶ potential ─▶ stats
   (scheme)    (role,depth)  (maturity)  (OVR,program) (dev,year)   (inverse OVR)
                                                          │
        ┌─────────────────────────────────────────────────┼──────────────┐
        ▼                          ▼                        ▼              ▼
   hsStarRating              physicalAbilities         physicals    mentalAbilities
   (OVR,year,program)        (XP gates vs stats)      (STR,SPD,prog) (potential)
```

Because each stage conditions on its predecessors, the emergent joint
distribution has the right correlations _for free_: high-OVR players tend to be
older, higher-dev, higher-potential, more ability-laden, and were higher-rated
recruits — none of which is sampled directly; all of it falls out of the
conditioning chain. A roster's marginal OVR-by-position distribution is a
depth-indexed mixture (§4), and its archetype distribution is the scheme's
categorical (§12).

---

## 15. What is principled vs. heuristic

For an analyst reading this, it's worth being explicit about which parts rest on
fitted models and which are tuned heuristics:

| Subsystem                             | Basis                                                                         | Confidence                                                  |
| ------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| OVR formula (§2)                      | Per-archetype OLS regression on a real ratings dataset                        | **Empirical** — four-decimal fitted coefficients            |
| Stat generation (§3)                  | Exact closed-form inverse of the linear model + coordinate-descent correction | **Provably exact** — converges to target OVR with prob. ≈ 1 |
| Anthropometric ranges (§10)           | Position-group height/weight bands                                            | **Empirical-ish** — realistic ranges, linear size map       |
| Handedness (§13)                      | Bernoulli(0.13)                                                               | **Empirical** — matches real lefty rate                     |
| Talent curve, roles (§4)              | Hand-tuned mixture + piecewise depth penalty                                  | **Heuristic** — shaped to look like a real depth chart      |
| Class/dev/potential/recruiting (§5–8) | Threshold gates + program-shifted rolls                                       | **Heuristic** — internally consistent, not externally fit   |
| Ability economies (§9, §11)           | Randomized greedy spend under stat gates                                      | **Heuristic** — gates keep results consistent with stats    |
| Scheme & dealbreaker weights (§12–13) | Authored categorical distributions                                            | **Design choice** — encode football identity                |

The headline result is the §3 stat-generation guarantee: **whatever target OVR
the talent-curve heuristics produce, the synthesized stat line evaluates to that
exact integer under the archetype's fitted regression** — the principled inverse
and the heuristic target-setting meet cleanly at the OVR boundary.

---

## 16. Summary of mathematical objects

| #   | Subsystem          | Model class                                                   |
| --- | ------------------ | ------------------------------------------------------------- |
| 2   | Overall rating     | Multiple linear regression (affine, fitted)                   |
| 3   | Stat line          | Closed-form linear inverse + randomized coordinate descent    |
| 4   | Target OVR         | Depth-indexed Gaussian-mixture + piecewise-linear penalty     |
| 5   | Class year         | Talent-conditioned binned draw                                |
| 6   | Dev trait          | Threshold-gated, program-shifted Bernoulli cascade            |
| 7   | Potential          | Trait-anchored noisy ceiling (max with current OVR)           |
| 8   | Star rating        | Back-dated linear inference + thresholding                    |
| 9   | Physical abilities | Randomized greedy knapsack with per-tier gates & convex costs |
| 10  | Measurables        | Latent-size linear model with correlated noise                |
| 11  | Mental abilities   | Points economy with breadth-biased allocation                 |
| 12  | Archetype          | Scheme-weighted categorical (roulette)                        |
| 13  | Dealbreaker etc.   | Conditional weighted categorical / Bernoulli / uniform        |
