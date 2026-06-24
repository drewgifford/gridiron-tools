import Container from "@/components/Container";
import Latex from "@/components/Latex";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Text,
} from "@/components/typography/Heading";

export default function RosterBuilderMethodology() {
  return (
    <Container variant="prose">
      <div className="flex flex-col gap-10">
        <div>
          <Heading1>Roster Builder Methodology</Heading1>
          <Text>
            I designed this roster builder with one goal in mind: every player
            should look like a draw from a realistic population of athletes from
            the CFB 26/27 games, with ratings, body types, recruiting histories,
            and skill trees that all cohere with one another rather than being
            sampled independently.
          </Text>
        </div>

        <div>
          <Heading2>1. Calculation of Player Overalls</Heading2>
          <Text>
            In CFB 26, every position has a list of archetypes that can be
            assigned to each player. A player's overall is not calculated based
            on their position, but based on a combination of their{" "}
            <b>archetype</b> and <b>position</b>.
          </Text>
          <Text>
            Using Team Builder, I was able to calculate the formula for each of
            these archetypes through brute force. Each archetype formula is a
            simple slope/intercept formula where certain (not all) statistics
            are weighted then modified by an overall intercept.
          </Text>
          <Text>
            Concretely, an archetype's overall is its intercept plus each
            weighted stat multiplied by its weight, rounded to a whole number:
          </Text>
          <Latex>
            {
              "$$\\text{Ovr} = \\text{round}\\!\\left(\\beta_0 + \\sum_{k} w_k\\, s_k\\right)$$"
            }
          </Latex>
          <Text>
            The weights typically add up to around 1.7, which means a stat is
            worth a little more than one overall point each, and a deeply
            negative intercept (around -60 on average) pulls everything back
            into the normal 25-99 range. The same stat line can grade out very
            differently depending on the lens: a Pure Runner QB and a Pocket
            Passer QB with the same stats will have completely different OVRs
            despite sharing a position.
          </Text>
        </div>

        <div>
          <Heading2>
            2. Building a Player's Stat Line for a Target Overall
          </Heading2>
          <Text>
            Given a target overall for a player, we need to figure out what
            their individual stats should be to make that overall. Using this,
            we synthesize a full stat line that grades out to that target OVR
            while still seeming realistically uneven.
          </Text>
          <Heading4>a. Seed every stat</Heading4>
          <Text>
            Every position is assigned a believable mean/range that stat groups
            could be in. These stat groups include physical stats, defensive,
            coverage, etc.
          </Text>
          <Text>
            Every stat gets a rough floor of about 70% of the target, plus a
            little noise. This makes sure a 90-overall player still has
            believable secondary stats rather than zeroes.
          </Text>
          <Heading4>b. Solve for the level that lands the overall</Heading4>
          <Text>
            Because the overall formula is linear, there is one single value
            that, if every weighted stat were set to it, lands the overall
            exactly on target:
          </Text>
          <Latex>
            {
              "$$\\ell = \\text{clamp}\\!\\left(\\frac{O^{*} - \\beta_0}{\\sum w},\\; 1,\\; 99\\right)$$"
            }
          </Latex>
          <Text>
            Set every weighted stat to that level and the formula spits the
            target back out. To keep players from having flat, identical stat
            lines, we scatter each weighted stat a few points around that level
            instead of nailing it exactly.
          </Text>
          <Heading4>c. Nudge one stat at a time until it lands</Heading4>
          <Text>
            That scatter and the rounding knock the overall slightly off, so a
            correction loop fixes it: it repeatedly picks one weighted stat at
            random and bumps it a single point up or down, whichever direction
            moves the overall toward the target, until the calculation lands
            exactly at the target OVR.
          </Text>
        </div>

        <div>
          <Heading2>3. Setting Each Slot's Target Overall</Heading2>
          <Text>
            Each player's target overall is originally sourced from the
            user-defined Offense and Defense OVR. Based on the preset selected,
            players are assigned a position on the depth chart and a role
            ("Star", "Quality", "Average", "Developing", or "Project")
          </Text>
          <Latex>
            {
              "$$O^{*} = \\text{clamp}\\big(B + R(\\text{role}) - D(\\text{depth}),\\; 25,\\; 99\\big)$$"
            }
          </Latex>
          <Text>
            A player's role adds or subtracts overall (a Star is roughly +10, a
            Project roughly -10). The odds shift as you go down the chart:
            starters are mostly Quality or Star, while deep reserves are mostly
            Developing or Project.
          </Text>
          <Text>
            On top of that, each rung down the depth chart costs overall. The
            decline is steepest through the rotation (about three points per
            rung) and then flattens out near the very bottom, so the last couple
            of walk-on slots all land at roughly the same low number rather than
            falling off a cliff.
          </Text>
        </div>

        <div>
          <Heading2>4. Class Year and Age</Heading2>
          <Text>
            In real life the best players on a roster tend to be developed
            upperclassmen, so I tie class year to ability. A player gets a
            maturity score from their overall (with a bonus for being a
            starter), which is added to a random roll and then sorted into a
            class year:
          </Text>
          <Latex>
            {
              "$$m = \\frac{O^{*} - 60}{40}\\cdot 0.7 + 0.3\\,[\\,\\text{starter}\\,], \\qquad r = U(0,1) + 0.6\\,m$$"
            }
          </Latex>
          <Text>
            A 95-overall starter pushes that roll high and skews toward senior;
            a 60-overall reserve skews toward freshman. There is also a good
            chance of landing the redshirt version at each boundary. Age then
            follows directly from class through a fixed years-in-school table,
            so a redshirt senior is 22 and a true freshman is 18.
          </Text>
        </div>

        <div>
          <Heading2>5. Development Trait</Heading2>
          <Text>
            The development trait (Normal, Impact, Star, or Elite) decides how
            quickly a player improves. To earn a tier, a player has to both
            clear an overall cutoff and win a probability roll. There is also a
            hard floor: an older player (junior or senior) below 75 overall is
            locked to Normal, because a mediocre upperclassman has no upside
            left.
          </Text>
          <Text>
            The roll itself is shifted by program prestige, so stronger programs
            develop more blue-chip talent:
          </Text>
          <Latex>
            {
              "$$\\text{bonus} = \\frac{20P - 70}{100}, \\qquad r = U(0,1) - \\text{bonus}$$"
            }
          </Latex>
          <Text>
            The tiers then cascade from the top down: above 88 overall with a
            strong roll earns Elite, above 80 earns Star, above 74 earns Impact,
            and everything else is Normal. So the trait is jointly capped by
            talent (the overall gate) and luck nudged by program strength.
          </Text>
        </div>

        <div>
          <Heading2>6. Potential</Heading2>
          <Text>
            Potential (Low, Medium, or High) estimates how high a player could
            still climb. I model a ceiling anchored to the development trait,
            then take whichever is higher: that ceiling or the player's current
            overall.
          </Text>
          <Latex>
            {
              "$$\\text{ceiling} = \\max\\!\\big(O,\\; \\text{base}_\\text{trait} + U(-v, v)\\big)$$"
            }
          </Latex>
          <Text>
            The base climbs with the trait (96 for Elite down to 75 for Normal),
            and the spread widens with class year, since an upperclassman's
            trajectory is more fully revealed while an underclassman's
            projection stays tighter. The max with current overall enforces an
            obvious rule: potential can never be lower than what a player
            already is. That ceiling is then bucketed into High, Medium, or Low,
            and it goes on to drive how big a player's ability budgets are.
          </Text>
        </div>

        <div>
          <Heading2>7. Recruiting Star Rating</Heading2>
          <Text>
            Every player also gets the 1-to-5-star recruiting rating they would
            have carried coming out of high school. I work this out backwards
            from their current overall by subtracting the development they have
            picked up since:
          </Text>
          <Latex>
            {
              "$$\\text{score} = O - \\text{decay}(\\text{year}) + \\big[(P-3)\\cdot 3 + U(-1,1)\\big]$$"
            }
          </Latex>
          <Text>
            The decay term rolls the rating back by class (a senior loses about
            12 points, a freshman none), so an 85-overall senior is treated as a
            three-star who developed rather than a four-star bust. A small
            program-strength bias reflects that better programs land
            higher-rated recruits. The final score is then thresholded into
            stars, with 5 stars reserved for the very top.
          </Text>
        </div>

        <div>
          <Heading2>8. Physical Abilities</Heading2>
          <Text>
            Physical abilities are bought out of an experience-point budget,
            spent on the archetype's ability tree. This is the most game-like
            subsystem: the player earns XP and spends it, but only on abilities
            their stats actually qualify for.
          </Text>
          <Heading3>The budget</Heading3>
          <Text>
            XP is earned once when the player signs and again for each year in
            school. How much depends on their development trait and potential,
            so an Elite, high-potential senior commands far more XP than a
            Normal freshman:
          </Text>
          <Latex>
            {
              "$$\\text{XP}_\\text{total} = \\sum_{i=0}^{\\text{years}} \\max\\!\\big(1,\\; c_\\text{dev}\\cdot \\mu_\\text{pot} + U(-1,2)\\big)$$"
            }
          </Latex>
          <Heading3>The tree and its gates</Heading3>
          <Text>
            Each archetype offers up to five abilities, each with levels 0
            through 4. Climbing a level gets steadily more expensive (2, then 4,
            then 6, then 8 XP), which makes deep specialization costly compared
            to spreading out. Just as importantly, every level has stat
            requirements, so you cannot buy a tier your stats do not support.
          </Text>
          <Heading3>Spending it</Heading3>
          <Text>
            While XP is left, the generator looks at every ability whose next
            level is both affordable and unlocked by the player's current stats,
            then buys one of them at random and pays the cost. Choosing randomly
            rather than always buying the best value produces varied builds, so
            two players with identical stats end up with different ability
            mixes. And because the gates are checked against the stat line that
            was already generated, abilities always line up with the player's
            strengths.
          </Text>
        </div>

        <div>
          <Heading2>9. Mental Abilities</Heading2>
          <Text>
            Mental abilities use a simpler points economy. A player gets a pool
            of points scaled by potential (5 for Low, 10 for Medium, 20 for
            High), with each level costing a flat 5:
          </Text>
          <Latex>
            {
              "$$\\text{points} = M_\\text{pot}\\cdot\\big(1 + U(-0.25, 0.25)\\big)$$"
            }
          </Latex>
          <Text>
            Each step usually opens a brand new ability rather than deepening an
            existing one, biasing players toward breadth. So a high-potential
            player tends to pick up several mental traits while a low-potential
            player often gets just one. The available list is position-specific,
            with quarterbacks drawing from things like Field General and kickers
            from Clutch Kicker, on top of a shared core.
          </Text>
        </div>

        <div>
          <Heading2>10. Height and Weight</Heading2>
          <Text>
            Height and weight both come from a single hidden size score, which
            keeps them correlated (heavier players tend to be taller) while
            staying inside each position group's realistic range. Strength
            pushes size up, speed pushes it down, and a strong program adds a
            little bulk:
          </Text>
          <Latex>
            {
              "$$\\text{size} = \\text{clamp}\\big(0.7\\,\\hat{s} + 0.3\\,(1-\\hat{v}) + 0.04\\,(P-3) + U(-0.08, 0.08),\\; 0,\\; 1\\big)$$"
            }
          </Latex>
          <Text>
            Weight is read straight off that size score across the position
            group's range. Height uses the same score but with a bit of extra
            independent noise, so the height-weight link is strong without being
            rigid, and you still get the occasional tall, lean or short, stocky
            build. Each position group has its own bands, so the same size score
            produces an offensive lineman's frame in one spot and a cornerback's
            in another.
          </Text>
        </div>

        <div>
          <Heading2>11. Archetype Selection</Heading2>
          <Text>
            Which archetype a slot gets is a weighted draw governed by the
            team's offensive and defensive schemes. Each scheme assigns weights
            to the archetypes for a position group, and the generator draws one
            in proportion to those weights:
          </Text>
          <Latex>{"$$P(a) = \\frac{w_a}{\\sum_b w_b}$$"}</Latex>
          <Text>
            This is how scheme identity shows up on the field. An Air Raid
            offense favors Pocket Passers at quarterback, while a Spread offense
            tilts toward Dual Threats; defensively, a 3-4 leans on powerful
            linemen while a 4-2-5 wants speed rushers. Archetype is picked first
            in the whole pipeline, because it decides which overall formula and
            which ability tree every later step uses.
          </Text>
        </div>

        <div>
          <Heading2>12. Dealbreakers, Handedness, and Numbers</Heading2>
          <Text>
            A few smaller details round out each player. A recruiting{" "}
            <b>dealbreaker</b> is drawn from eight motivations, weighted by
            recruiting tier, so blue-chips lean toward things like Pro Potential
            and Brand Exposure while lower recruits lean toward staying close to
            home. <b>Handedness</b> is a simple coin flip weighted to the
            real-world 13% left-handed rate. And each <b>jersey number</b> is
            drawn from the legal range for the position group, skipping numbers
            already taken so the whole roster stays unique.
          </Text>
        </div>

        <div>
          <Heading2>How It All Ties Together</Heading2>
          <Text>
            The reason any of this hangs together is the order it runs in. For
            each player the steps happen in a deliberate chain: archetype first,
            then target overall, then class year, development trait, potential,
            and finally the stat line, with star rating, abilities, body, and
            mental traits branching off from there. Because every step builds on
            the ones before it, the right correlations appear on their own:
            high-overall players tend to be older, higher-development,
            higher-potential, more loaded with abilities, and were higher-rated
            recruits, without any of that being forced directly. It all falls
            out of building each player one well-ordered step at a time.
          </Text>
        </div>
      </div>
    </Container>
  );
}
