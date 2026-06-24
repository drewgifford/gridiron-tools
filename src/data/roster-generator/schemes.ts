import type { ArchetypeNameByGroup } from "@/lib/domain/archetypes";
import type { PositionGroupId } from "@/lib/domain/positions";

export const OffenseSchemes = ["Air Raid", "Multiple", "Spread"] as const;
export type OffenseScheme = (typeof OffenseSchemes)[number];

export const DefenseSchemes = ["4-3", "3-4", "3-3-5", "4-2-5"] as const;
export type DefenseScheme = (typeof DefenseSchemes)[number];

export type SchemeArchetypeWeights = {
  [G in PositionGroupId]?: Partial<Record<ArchetypeNameByGroup[G], number>>;
};

export type SchemeData = {
  archetypeWeights: SchemeArchetypeWeights;
};

export const OFFENSE_SCHEMES: Record<OffenseScheme, SchemeData> = {
  "Air Raid": {
    archetypeWeights: {
      QB: {
        "Pocket Passer": 3,
        "Backfield Creator": 2,
        "Dual Threat": 1.5,
        "Pure Runner": 1,
      },
      RB: {
        "Backfield Threat": 3,
        "East/West Playmaker": 2.5,
        "North/South Receiver": 2,
        "Elusive Bruiser": 1.5,
      },
      FB: {
        Utility: 2,
        Blocking: 1,
      },
      WR: {
        "Route Artist": 3,
        Speedster: 2.5,
        "Elusive Route Runner": 2.5,
        "Contested Specialist": 1.5,
      },
      TE: {
        "Vertical Threat": 3,
        "Physical Route Runner": 2,
        "Pure Possession": 2,
        "Pure Blocker": 1,
      },
      OL: {
        "Pass Protector": 3,
        Agile: 2.5,
        "Well Rounded": 1.5,
        "Raw Strength": 1,
      },
    },
  },
  Multiple: {
    archetypeWeights: {
      QB: {
        "Pocket Passer": 2.5,
        "Backfield Creator": 2.5,
        "Dual Threat": 2,
        "Pure Runner": 1,
      },
      RB: {
        "Contact Seeker": 3,
        "North/South Blocker": 2.5,
        "Elusive Bruiser": 2,
        "North/South Receiver": 2,
      },
      FB: {
        Blocking: 3,
        Utility: 2,
      },
      WR: {
        "Physical Route Runner": 3,
        "Contested Specialist": 2.5,
        "Route Artist": 2,
      },
      TE: {
        "Pure Blocker": 2.5,
        "Pure Possession": 2.5,
        "Gritty Possession": 2,
        "Vertical Threat": 1.5,
      },
      OL: {
        "Well Rounded": 3,
        "Raw Strength": 2.5,
        "Pass Protector": 2,
        Agile: 1,
      },
    },
  },
  Spread: {
    archetypeWeights: {
      QB: {
        "Dual Threat": 3,
        "Pure Runner": 2.5,
        "Backfield Creator": 2,
        "Pocket Passer": 1,
      },
      RB: {
        "East/West Playmaker": 3,
        "Elusive Bruiser": 2.5,
        "Backfield Threat": 2.5,
        "Contact Seeker": 1.5,
      },
      FB: {
        Utility: 2,
        Blocking: 1,
      },
      WR: {
        Speedster: 3,
        "Elusive Route Runner": 2.5,
        "Route Artist": 2,
      },
      TE: {
        "Vertical Threat": 2.5,
        "Physical Route Runner": 2.5,
        "Pure Blocker": 1,
      },
      OL: {
        Agile: 3,
        "Pass Protector": 2,
        "Well Rounded": 2,
        "Raw Strength": 1,
      },
    },
  },
};

export const DEFENSE_SCHEMES: Record<DefenseScheme, SchemeData> = {
  "4-3": {
    archetypeWeights: {
      DL: {
        "Speed Rusher": 3,
        "Gap Specialist": 2.5,
        "Power Rusher": 2,
        "Pure Power": 1.5,
      },
      LB: {
        Lurker: 3,
        "Signal Caller": 2.5,
        Thumper: 1.5,
      },
      CB: {
        Zone: 3,
        Field: 2.5,
        Boundary: 2,
        "Bump and Run": 1,
      },
      S: {
        "Coverage Specialist": 3,
        "Box Specialist": 2,
        Hybrid: 2,
      },
      K: { Accurate: 2, Power: 2 },
      P: { Accurate: 2, Power: 2 },
    },
  },
  "3-4": {
    archetypeWeights: {
      DL: {
        "Pure Power": 3,
        "Gap Specialist": 3,
        "Power Rusher": 1.5,
        "Speed Rusher": 1,
      },
      LB: {
        Thumper: 3,
        "Signal Caller": 2.5,
        Lurker: 1.5,
      },
      CB: {
        Boundary: 2.5,
        "Bump and Run": 2.5,
        Field: 2,
        Zone: 1.5,
      },
      S: {
        "Box Specialist": 3,
        Hybrid: 2.5,
        "Coverage Specialist": 2,
      },
      K: { Power: 2.5, Accurate: 1.5 },
      P: { Power: 2.5, Accurate: 1.5 },
    },
  },
  "3-3-5": {
    archetypeWeights: {
      DL: {
        "Speed Rusher": 2.5,
        "Gap Specialist": 2.5,
        "Power Rusher": 2,
        "Pure Power": 1,
      },
      LB: {
        Lurker: 3,
        "Signal Caller": 2,
        Thumper: 1,
      },
      CB: {
        Field: 3,
        Zone: 2.5,
        Boundary: 2,
        "Bump and Run": 1.5,
      },
      S: {
        Hybrid: 3,
        "Coverage Specialist": 2.5,
        "Box Specialist": 1.5,
      },
      K: { Accurate: 2, Power: 2 },
      P: { Accurate: 2, Power: 2 },
    },
  },
  "4-2-5": {
    archetypeWeights: {
      DL: {
        "Speed Rusher": 3,
        "Power Rusher": 2.5,
        "Gap Specialist": 2,
        "Pure Power": 1,
      },
      LB: {
        Lurker: 3,
        "Signal Caller": 2.5,
        Thumper: 1,
      },
      CB: {
        Boundary: 2.5,
        Field: 2.5,
        "Bump and Run": 2,
        Zone: 2,
      },
      S: {
        Hybrid: 3,
        "Box Specialist": 2.5,
        "Coverage Specialist": 2,
      },
      K: { Power: 2.5, Accurate: 1.5 },
      P: { Power: 2.5, Accurate: 1.5 },
    },
  },
};
