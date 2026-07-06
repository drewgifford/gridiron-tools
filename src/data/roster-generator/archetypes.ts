import type { PlayerArchetype } from "@/lib/domain/archetypes";
import type { RosterPosition } from "@/lib/domain/positions";

export const PositionArchetypes: Record<RosterPosition, PlayerArchetype[]> = {
  QB: [
    {
      name: "Backfield Creator",
      abilities: [
        {
          name: "Off Platform",
          requirements: {
            THP: [90, 92, 94, 96],
            SAC: [82, 83, 84, 86],
          },
        },
        {
          name: "Pull Down",
          requirements: {
            CAR: [72, 75, 79, 83],
          },
        },
        {
          name: "On Time",
          requirements: {
            SAC: [89, 90, 92, 94],
          },
        },
        {
          name: "Sleight of Hand",
          requirements: {
            PAC: [84, 86, 90, 93],
          },
        },
        {
          name: "Mobile Deadeye",
          requirements: {
            RUN: [84, 88, 92, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -35.321,
        weights: {
          SPD: 0.0285,
          AGI: 0.0297,
          ACC: 0.0122,
          AWR: 0.2134,
          COD: 0.0143,
          THP: 0.2404,
          SAC: 0.1125,
          MAC: 0.0554,
          DAC: 0.2117,
          RUN: 0.1704,
          TUP: 0.2108,
          BSK: 0.1145,
        },
      },
    },
    {
      name: "Dual Threat",
      abilities: [
        {
          name: "Downhill",
          requirements: {
            BTK: [80, 82, 84, 88],
          },
        },
        {
          name: "Extender",
          requirements: {
            BSK: [83, 86, 89, 93],
          },
        },
        {
          name: "Option King",
          requirements: {
            BTK: [80, 83, 86, 90],
          },
        },
        {
          name: "Dot!",
          requirements: {
            DAC: [85, 87, 90, 93],
          },
        },
        {
          name: "Mobile Resistance",
          requirements: {
            TUP: [80, 83, 84, 86],
          },
        },
      ],
      ovrFormula: {
        intercept: -53.2765,
        weights: {
          SPD: 0.0939,
          AGI: 0.0308,
          ACC: 0.0527,
          AWR: 0.1131,
          COD: 0.0171,
          BCV: 0.0505,
          CAR: 0.0322,
          THP: 0.3542,
          SAC: 0.2236,
          MAC: 0.2091,
          RUN: 0.158,
          TUP: 0.1115,
          BSK: 0.1616,
        },
      },
    },
    {
      name: "Pocket Passer",
      abilities: [
        {
          name: "Resistance",
          requirements: {
            TUP: [81, 87, 91, 93],
          },
        },
        {
          name: "Step Up",
          requirements: {
            MAC: [83, 87, 90, 93],
          },
        },
        {
          name: "Sleight of Hand",
          requirements: {
            PAC: [84, 86, 90, 93],
          },
        },
        {
          name: "Dot!",
          requirements: {
            DAC: [85, 87, 90, 93],
          },
        },
        {
          name: "On Time",
          requirements: {
            SAC: [86, 90, 92, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -71.0487,
        weights: {
          AWR: 0.2879,
          THP: 0.4456,
          SAC: 0.3208,
          MAC: 0.3228,
          DAC: 0.2127,
          RUN: 0.0514,
          TUP: 0.0888,
          PAC: 0.0519,
        },
      },
    },
    {
      name: "Pure Runner",
      abilities: [
        {
          name: "Downhill",
          requirements: {
            BTK: [85, 87, 91, 92],
          },
        },
        {
          name: "Option King",
          requirements: {
            BTK: [80, 83, 86, 90],
          },
        },
        {
          name: "Shifty",
          requirements: {
            COD: [83, 85, 87, 89],
            SPD: [89, 90, 91, 92],
          },
        },
        {
          name: "Side Step",
          requirements: {
            JKM: [86, 87, 91, 93],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -52.578,
        weights: {
          SPD: 0.1591,
          STR: 0.0318,
          AGI: 0.1449,
          ACC: 0.1593,
          AWR: 0.1273,
          TGH: 0.0293,
          BTK: 0.0802,
          TRK: 0.0312,
          COD: 0.1134,
          BCV: 0.2084,
          SPM: 0.0794,
          JKM: 0.0814,
          CAR: 0.1584,
          THP: 0.0314,
          SAC: 0.0325,
          MAC: 0.0316,
          DAC: 0.0327,
          RUN: 0.0312,
          BSK: 0.0311,
        },
      },
    },
  ],
  WR: [
    {
      name: "Contested Specialist",
      abilities: [
        {
          name: "50/50",
          requirements: {
            SPC: [89, 91, 94, 96],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Balanced",
          requirements: {
            BTK: [80, 82, 86, 90],
          },
        },
        {
          name: "Headfirst",
          requirements: {
            TRK: [85, 88, 92, 95],
          },
        },
        {
          name: "Downhill",
          requirements: {
            BTK: [80, 82, 84, 88],
          },
        },
      ],
      ovrFormula: {
        intercept: -72.852,
        weights: {
          SPD: 0.0712,
          STR: 0.0707,
          AGI: 0.052,
          ACC: 0.1104,
          AWR: 0.0907,
          BTK: 0.0514,
          TRK: 0.0161,
          SFA: 0.0348,
          JMP: 0.1604,
          CTH: 0.1806,
          SRR: 0.1237,
          MRR: 0.0545,
          CIT: 0.2862,
          SPC: 0.2694,
          RLS: 0.2106,
        },
      },
    },
    {
      name: "Elusive Route Runner",
      abilities: [
        {
          name: "360",
          requirements: {
            SPM: [83, 85, 87, 89],
          },
        },
        {
          name: "Cutter",
          requirements: {
            MRR: [86, 88, 91, 93],
          },
        },
        {
          name: "Double Dip",
          requirements: {
            DRR: [84, 86, 88, 90],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [95, 96, 97, 98],
          },
        },
        {
          name: "Side Step",
          requirements: {
            JKM: [86, 87, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -80.2281,
        weights: {
          SPD: 0.1484,
          AGI: 0.1855,
          ACC: 0.1465,
          AWR: 0.1495,
          BTK: 0.0791,
          COD: 0.1123,
          SPM: 0.0776,
          JKM: 0.2245,
          JMP: 0.0379,
          CTH: 0.1865,
          SRR: 0.0908,
          MRR: 0.2226,
          DRR: 0.0908,
          CIT: 0.0576,
          SPC: 0.0561,
        },
      },
    },
    {
      name: "Physical Route Runner",
      abilities: [
        {
          name: "Downhill",
          requirements: {
            BTK: [80, 82, 84, 88],
          },
        },
        {
          name: "Press Pro",
          requirements: {
            RLS: [80, 86, 88, 90],
          },
        },
        {
          name: "Sure Hands",
          requirements: {
            CIT: [86, 88, 91, 94],
          },
        },
        {
          name: "50/50",
          requirements: {
            SPC: [89, 91, 94, 96],
          },
        },
        {
          name: "Cutter",
          requirements: {
            MRR: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -70.463,
        weights: {
          SPD: 0.1058,
          STR: 0.0347,
          AGI: 0.1072,
          ACC: 0.1428,
          AWR: 0.1399,
          TGH: 0.0347,
          BTK: 0.0349,
          TRK: 0.0158,
          SFA: 0.0356,
          JMP: 0.0691,
          CTH: 0.141,
          SRR: 0.1582,
          MRR: 0.0893,
          DRR: 0.0347,
          CIT: 0.2299,
          SPC: 0.1956,
          RLS: 0.1933,
        },
      },
    },
    {
      name: "Route Artist",
      abilities: [
        {
          name: "Cutter",
          requirements: {
            MRR: [86, 88, 91, 93],
          },
        },
        {
          name: "Lay Out",
          requirements: {
            SPC: [88, 89, 92, 94],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [95, 96, 97, 98],
          },
        },
        {
          name: "Double Dip",
          requirements: {
            DRR: [84, 86, 88, 90],
          },
        },
        {
          name: "Sure Hands",
          requirements: {
            CIT: [86, 88, 91, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -72.6534,
        weights: {
          SPD: 0.1072,
          STR: 0.0148,
          AGI: 0.1571,
          ACC: 0.1235,
          AWR: 0.1977,
          COD: 0.0553,
          CTH: 0.16,
          SRR: 0.2502,
          MRR: 0.3922,
          DRR: 0.1448,
          CIT: 0.0712,
          SPC: 0.0331,
          RLS: 0.0722,
        },
      },
    },
    {
      name: "Speedster",
      abilities: [
        {
          name: "Side Step",
          requirements: {
            JKM: [86, 87, 91, 93],
          },
        },
        {
          name: "Double Dip",
          requirements: {
            DRR: [84, 86, 88, 90],
          },
        },
        {
          name: "Takeoff",
          requirements: {
            ACC: [95, 96, 97, 98],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [95, 96, 97, 98],
          },
        },
        {
          name: "Shifty",
          requirements: {
            COD: [94, 95, 96, 97],
            ACC: [90, 91, 93, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -73.6512,
        weights: {
          SPD: 0.2156,
          AGI: 0.1446,
          ACC: 0.2178,
          AWR: 0.1602,
          COD: 0.0358,
          SPM: 0.0162,
          JKM: 0.0169,
          JMP: 0.0194,
          CTH: 0.2167,
          MRR: 0.1068,
          DRR: 0.2687,
          CIT: 0.1454,
          SPC: 0.0711,
          RLS: 0.162,
        },
      },
    },
  ],
  RB: [
    {
      name: "Backfield Threat",
      abilities: [
        {
          name: "360",
          requirements: {
            SPM: [85, 86, 87, 89],
          },
        },
        {
          name: "Safety Valve",
          requirements: {
            CTH: [73, 76, 80, 85],
          },
        },
        {
          name: "Takeoff",
          requirements: {
            ACC: [95, 96, 97, 98],
          },
        },
        {
          name: "Side Step",
          requirements: {
            JKM: [87, 88, 91, 93],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [95, 96, 97, 98],
          },
        },
      ],
      ovrFormula: {
        intercept: -76.2462,
        weights: {
          SPD: 0.2099,
          AGI: 0.1509,
          ACC: 0.2128,
          AWR: 0.2085,
          COD: 0.1162,
          BCV: 0.0955,
          SPM: 0.0938,
          JKM: 0.098,
          CAR: 0.1111,
          CTH: 0.2671,
          SRR: 0.2275,
          CIT: 0.0958,
          RLS: 0.019,
        },
      },
    },
    {
      name: "Contact Seeker",
      abilities: [
        {
          name: "Downhill",
          requirements: {
            BTK: [84, 87, 92, 94],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Battering Ram",
          requirements: {
            TGH: [90, 91, 92, 94],
            AWR: [88, 89, 90, 91],
          },
        },
        {
          name: "Ball Security",
          requirements: {
            CAR: [90, 91, 92, 94],
          },
        },
        {
          name: "Balanced",
          requirements: {
            STR: [83, 85, 87, 92],
          },
        },
      ],
      ovrFormula: {
        intercept: -73.1283,
        weights: {
          SPD: 0.1653,
          STR: 0.183,
          AGI: 0.0705,
          ACC: 0.1675,
          AWR: 0.2033,
          BTK: 0.219,
          TRK: 0.238,
          BCV: 0.1649,
          SFA: 0.1819,
          CAR: 0.2357,
        },
      },
    },
    {
      name: "East/West Playmaker",
      abilities: [
        {
          name: "Recoup",
          requirements: {
            STA: [95, 96, 97, 98],
          },
        },
        {
          name: "Shifty",
          requirements: {
            COD: [87, 88, 89, 90],
            SPD: [92, 93, 94, 95],
          },
        },
        {
          name: "Side Step",
          requirements: {
            JKM: [87, 88, 91, 93],
          },
        },
        {
          name: "360",
          requirements: {
            SPM: [83, 85, 87, 89],
          },
        },
        {
          name: "Arm Bar",
          requirements: {
            SFA: [83, 86, 90, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -72.6977,
        weights: {
          SPD: 0.234,
          AGI: 0.2182,
          ACC: 0.2387,
          AWR: 0.1969,
          BTK: 0.0931,
          COD: 0.1474,
          BCV: 0.1797,
          SPM: 0.1462,
          JKM: 0.1673,
          CAR: 0.1998,
        },
      },
    },
    {
      name: "Elusive Bruiser",
      abilities: [
        {
          name: "Shifty",
          requirements: {
            COD: [87, 88, 89, 90],
            SPD: [92, 93, 94, 95],
          },
        },
        {
          name: "Headfirst",
          requirements: {
            TRK: [85, 88, 92, 95],
          },
        },
        {
          name: "Side Step",
          requirements: {
            JKM: [87, 88, 91, 93],
          },
        },
        {
          name: "Downhill",
          requirements: {
            BTK: [84, 87, 92, 94],
          },
        },
        {
          name: "Arm Bar",
          requirements: {
            SFA: [83, 86, 90, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -76.3225,
        weights: {
          SPD: 0.1749,
          STR: 0.191,
          AGI: 0.1313,
          ACC: 0.1733,
          AWR: 0.2099,
          TGH: 0.0403,
          BTK: 0.1324,
          TRK: 0.1497,
          COD: 0.0961,
          BCV: 0.1516,
          SFA: 0.0956,
          SPM: 0.0771,
          JKM: 0.0954,
          CAR: 0.1889,
        },
      },
    },
    {
      name: "North/South Blocker",
      abilities: [
        {
          name: "Headfirst",
          requirements: {
            TRK: [85, 88, 92, 95],
          },
        },
        {
          name: "Balanced",
          requirements: {
            SFA: [81, 86, 91, 96],
          },
        },
        {
          name: "Sidekick",
          requirements: {
            PBK: [63, 65, 67, 70],
          },
        },
        {
          name: "Ball Security",
          requirements: {
            CAR: [90, 91, 92, 94],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [83, 85, 87, 92],
          },
        },
      ],
      ovrFormula: {
        intercept: -76.2739,
        weights: {
          SPD: 0.171,
          STR: 0.1716,
          AGI: 0.0568,
          ACC: 0.1714,
          AWR: 0.2112,
          TGH: 0.0379,
          BTK: 0.1728,
          TRK: 0.1897,
          BCV: 0.1322,
          SFA: 0.1347,
          CAR: 0.1903,
          PBK: 0.0955,
          PBP: 0.0767,
          PBF: 0.095,
        },
      },
    },
    {
      name: "North/South Receiver",
      abilities: [
        {
          name: "Balanced",
          requirements: {
            STR: [83, 85, 87, 92],
          },
        },
        {
          name: "Arm Bar",
          requirements: {
            SFA: [81, 85, 90, 93],
          },
        },
        {
          name: "Safety Valve",
          requirements: {
            CTH: [73, 76, 80, 85],
          },
        },
        {
          name: "Headfirst",
          requirements: {
            TRK: [83, 86, 89, 91],
          },
        },
        {
          name: "Downhill",
          requirements: {
            BTK: [84, 87, 92, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -78.6658,
        weights: {
          SPD: 0.1959,
          STR: 0.1592,
          AGI: 0.1204,
          ACC: 0.1977,
          AWR: 0.2169,
          TGH: 0.0404,
          BTK: 0.1182,
          TRK: 0.1164,
          COD: 0.038,
          BCV: 0.1189,
          SFA: 0.1184,
          SPM: 0.0386,
          JKM: 0.0397,
          CAR: 0.1379,
          CTH: 0.1376,
          SRR: 0.118,
          CIT: 0.0579,
        },
      },
    },
  ],
  LT: [
    {
      name: "Pass Protector",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBK: [84, 86, 91, 95],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "PA Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Wear Down",
          requirements: {
            PBK: [85, 88, 93, 95],
          },
        },
      ],
      ovrFormula: {
        intercept: -46.7998,
        weights: {
          SPD: 0.0292,
          STR: 0.0593,
          AGI: 0.0295,
          ACC: 0.0337,
          AWR: 0.212,
          PBK: 0.1496,
          PBP: 0.485,
          PBF: 0.4859,
          IBL: 0.0315,
        },
      },
    },
    {
      name: "Raw Strength",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Second Level",
          requirements: {
            IBL: [89, 91, 93, 94],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
        {
          name: "Ground N Pound",
          requirements: {
            RBK: [83, 85, 88, 91],
          },
        },
      ],
      ovrFormula: {
        intercept: -42.7524,
        weights: {
          SPD: 0.0287,
          STR: 0.2225,
          AGI: 0.0284,
          ACC: 0.0293,
          AWR: 0.1486,
          PBK: 0.0575,
          PBP: 0.3548,
          RBK: 0.1479,
          RBP: 0.3705,
          LBK: 0.0302,
          IBL: 0.0583,
        },
      },
    },
    {
      name: "Well Rounded",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -42.7987,
        weights: {
          SPD: 0.0296,
          STR: 0.1487,
          AGI: 0.0112,
          ACC: 0.0312,
          AWR: 0.1464,
          TGH: 0.072,
          PBK: 0.1482,
          PBP: 0.1468,
          PBF: 0.1479,
          RBK: 0.1472,
          RBP: 0.1484,
          RBF: 0.1493,
          LBK: 0.0753,
          IBL: 0.074,
        },
      },
    },
    {
      name: "Agile",
      abilities: [
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [88, 89, 91, 94],
          },
        },
        {
          name: "Quick Step",
          requirements: {
            ACC: [79, 81, 83, 84],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -43.3758,
        weights: {
          SPD: 0.0433,
          STR: 0.2087,
          AGI: 0.0495,
          ACC: 0.032,
          AWR: 0.1493,
          PBK: 0.089,
          PBF: 0.3682,
          RBK: 0.1178,
          RBF: 0.3567,
          LBK: 0.029,
          IBL: 0.0448,
        },
      },
    },
  ],
  LG: [
    {
      name: "Pass Protector",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBK: [84, 86, 91, 95],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "PA Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Wear Down",
          requirements: {
            PBK: [85, 88, 93, 95],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.723,
        weights: {
          SPD: 0.0291,
          STR: 0.0639,
          AGI: 0.031,
          ACC: 0.0291,
          AWR: 0.2295,
          PBK: 0.1558,
          PBP: 0.4622,
          PBF: 0.4629,
          IBL: 0.0804,
        },
      },
    },
    {
      name: "Raw Strength",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Second Level",
          requirements: {
            IBL: [89, 91, 93, 94],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
        {
          name: "Ground N Pound",
          requirements: {
            RBK: [83, 85, 88, 91],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.746,
        weights: {
          SPD: 0.0299,
          STR: 0.2323,
          AGI: 0.0299,
          ACC: 0.0306,
          AWR: 0.1724,
          PBK: 0.0307,
          PBP: 0.3381,
          RBK: 0.1524,
          RBP: 0.295,
          LBK: 0.1217,
          IBL: 0.1092,
        },
      },
    },
    {
      name: "Well Rounded",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.804,
        weights: {
          SPD: 0.0318,
          STR: 0.1533,
          AGI: 0.0155,
          ACC: 0.0331,
          AWR: 0.153,
          TGH: 0.0782,
          PBK: 0.155,
          PBP: 0.1558,
          PBF: 0.1527,
          RBK: 0.1549,
          RBP: 0.1546,
          RBF: 0.1534,
          LBK: 0.0758,
          IBL: 0.0772,
        },
      },
    },
    {
      name: "Agile",
      abilities: [
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [88, 89, 91, 94],
          },
        },
        {
          name: "Quick Step",
          requirements: {
            ACC: [79, 81, 83, 84],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.6035,
        weights: {
          SPD: 0.0296,
          STR: 0.2147,
          AGI: 0.0451,
          ACC: 0.0307,
          AWR: 0.1532,
          PBK: 0.0625,
          PBF: 0.3566,
          RBK: 0.1221,
          RBF: 0.3081,
          LBK: 0.1268,
          IBL: 0.091,
        },
      },
    },
  ],
  C: [
    {
      name: "Pass Protector",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBK: [84, 86, 91, 95],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "PA Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Wear Down",
          requirements: {
            PBK: [85, 88, 93, 95],
          },
        },
      ],
      ovrFormula: {
        intercept: -52.2256,
        weights: {
          STR: 0.0487,
          AGI: 0.0294,
          ACC: 0.0325,
          AWR: 0.3352,
          PBK: 0.1569,
          PBP: 0.4634,
          PBF: 0.4581,
          IBL: 0.0631,
        },
      },
    },
    {
      name: "Raw Strength",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Second Level",
          requirements: {
            IBL: [89, 91, 93, 94],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
        {
          name: "Ground N Pound",
          requirements: {
            RBK: [83, 85, 88, 91],
          },
        },
      ],
      ovrFormula: {
        intercept: -53.3366,
        weights: {
          SPD: 0.0333,
          STR: 0.2243,
          AGI: 0.0334,
          ACC: 0.0325,
          AWR: 0.2423,
          PBK: 0.033,
          PBP: 0.3184,
          RBK: 0.1626,
          RBP: 0.3369,
          LBK: 0.0977,
          IBL: 0.0949,
        },
      },
    },
    {
      name: "Well Rounded",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -52.8963,
        weights: {
          SPD: 0.034,
          STR: 0.1603,
          AGI: 0.0165,
          ACC: 0.0323,
          AWR: 0.1589,
          TGH: 0.0788,
          PBK: 0.1595,
          PBP: 0.1607,
          PBF: 0.159,
          RBK: 0.1573,
          RBP: 0.1612,
          RBF: 0.1606,
          LBK: 0.082,
          IBL: 0.0799,
        },
      },
    },
    {
      name: "Agile",
      abilities: [
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [88, 89, 91, 94],
          },
        },
        {
          name: "Quick Step",
          requirements: {
            ACC: [79, 81, 83, 84],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -52.8175,
        weights: {
          SPD: 0.047,
          STR: 0.2081,
          AGI: 0.0497,
          ACC: 0.0327,
          AWR: 0.2395,
          PBK: 0.0643,
          PBF: 0.3203,
          RBK: 0.1285,
          RBF: 0.3359,
          LBK: 0.0955,
          IBL: 0.0783,
        },
      },
    },
  ],
  RG: [
    {
      name: "Pass Protector",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBK: [84, 86, 91, 95],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "PA Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Wear Down",
          requirements: {
            PBK: [85, 88, 93, 95],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.723,
        weights: {
          SPD: 0.0291,
          STR: 0.0639,
          AGI: 0.031,
          ACC: 0.0291,
          AWR: 0.2295,
          PBK: 0.1558,
          PBP: 0.4622,
          PBF: 0.4629,
          IBL: 0.0804,
        },
      },
    },
    {
      name: "Raw Strength",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Second Level",
          requirements: {
            IBL: [89, 91, 93, 94],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
        {
          name: "Ground N Pound",
          requirements: {
            RBK: [83, 85, 88, 91],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.746,
        weights: {
          SPD: 0.0299,
          STR: 0.2323,
          AGI: 0.0299,
          ACC: 0.0306,
          AWR: 0.1724,
          PBK: 0.0307,
          PBP: 0.3381,
          RBK: 0.1524,
          RBP: 0.295,
          LBK: 0.1217,
          IBL: 0.1092,
        },
      },
    },
    {
      name: "Well Rounded",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.804,
        weights: {
          SPD: 0.0318,
          STR: 0.1533,
          AGI: 0.0155,
          ACC: 0.0331,
          AWR: 0.153,
          TGH: 0.0782,
          PBK: 0.155,
          PBP: 0.1558,
          PBF: 0.1527,
          RBK: 0.1549,
          RBP: 0.1546,
          RBF: 0.1534,
          LBK: 0.0758,
          IBL: 0.0772,
        },
      },
    },
    {
      name: "Agile",
      abilities: [
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [88, 89, 91, 94],
          },
        },
        {
          name: "Quick Step",
          requirements: {
            ACC: [79, 81, 83, 84],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -47.6035,
        weights: {
          SPD: 0.0296,
          STR: 0.2147,
          AGI: 0.0451,
          ACC: 0.0307,
          AWR: 0.1532,
          PBK: 0.0625,
          PBF: 0.3566,
          RBK: 0.1221,
          RBF: 0.3081,
          LBK: 0.1268,
          IBL: 0.091,
        },
      },
    },
  ],
  RT: [
    {
      name: "Pass Protector",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBK: [84, 86, 91, 95],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "PA Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Wear Down",
          requirements: {
            PBK: [85, 88, 93, 95],
          },
        },
      ],
      ovrFormula: {
        intercept: -46.7998,
        weights: {
          SPD: 0.0292,
          STR: 0.0593,
          AGI: 0.0295,
          ACC: 0.0337,
          AWR: 0.212,
          PBK: 0.1496,
          PBP: 0.485,
          PBF: 0.4859,
          IBL: 0.0315,
        },
      },
    },
    {
      name: "Raw Strength",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Second Level",
          requirements: {
            IBL: [89, 91, 93, 94],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
        {
          name: "Ground N Pound",
          requirements: {
            RBK: [83, 85, 88, 91],
          },
        },
      ],
      ovrFormula: {
        intercept: -42.7524,
        weights: {
          SPD: 0.0287,
          STR: 0.2225,
          AGI: 0.0284,
          ACC: 0.0293,
          AWR: 0.1486,
          PBK: 0.0575,
          PBP: 0.3548,
          RBK: 0.1479,
          RBP: 0.3705,
          LBK: 0.0302,
          IBL: 0.0583,
        },
      },
    },
    {
      name: "Well Rounded",
      abilities: [
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [84, 86, 91, 95],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Inside Shield",
          requirements: {
            RBP: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -42.7987,
        weights: {
          SPD: 0.0296,
          STR: 0.1487,
          AGI: 0.0112,
          ACC: 0.0312,
          AWR: 0.1464,
          TGH: 0.072,
          PBK: 0.1482,
          PBP: 0.1468,
          PBF: 0.1479,
          RBK: 0.1472,
          RBP: 0.1484,
          RBF: 0.1493,
          LBK: 0.0753,
          IBL: 0.074,
        },
      },
    },
    {
      name: "Agile",
      abilities: [
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [88, 89, 91, 94],
          },
        },
        {
          name: "Quick Step",
          requirements: {
            ACC: [79, 81, 83, 84],
          },
        },
        {
          name: "Option Shield",
          requirements: {
            RBF: [88, 89, 91, 93],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [82, 82, 83, 84],
            SPD: [68, 69, 69, 70],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [88, 89, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -43.3758,
        weights: {
          SPD: 0.0433,
          STR: 0.2087,
          AGI: 0.0495,
          ACC: 0.032,
          AWR: 0.1493,
          PBK: 0.089,
          PBF: 0.3682,
          RBK: 0.1178,
          RBF: 0.3567,
          LBK: 0.029,
          IBL: 0.0448,
        },
      },
    },
  ],
  TE: [
    {
      name: "Pure Blocker",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Quick Drop",
          requirements: {
            ACC: [83, 85, 87, 89],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [69, 70, 72, 78],
          },
        },
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [69, 71, 73, 75],
          },
        },
        {
          name: "Second Level",
          requirements: {
            IBL: [89, 91, 93, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -84.9748,
        weights: {
          STR: 0.1388,
          AWR: 0.2066,
          BTK: 0.0469,
          TRK: 0.0232,
          SFA: 0.0464,
          CTH: 0.0677,
          SRR: 0.1162,
          MRR: 0.0912,
          CIT: 0.0694,
          PBK: 0.185,
          PBP: 0.1385,
          PBF: 0.1372,
          RBK: 0.2289,
          RBP: 0.2051,
          RBF: 0.2072,
          LBK: 0.1846,
          IBL: 0.2046,
        },
      },
    },
    {
      name: "Vertical Threat",
      abilities: [
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Balanced",
          requirements: {
            BTK: [82, 84, 87, 90],
          },
        },
        {
          name: "Takeoff",
          requirements: {
            ACC: [95, 96, 97, 98],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [95, 96, 97, 98],
          },
        },
        {
          name: "50/50",
          requirements: {
            SPC: [86, 88, 92, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -78.2172,
        weights: {
          SPD: 0.1444,
          AGI: 0.1025,
          ACC: 0.1446,
          AWR: 0.1854,
          BTK: 0.0601,
          TRK: 0.0201,
          COD: 0.0205,
          BCV: 0.0413,
          SFA: 0.0415,
          JMP: 0.0621,
          CTH: 0.2264,
          SRR: 0.1455,
          MRR: 0.1876,
          DRR: 0.1023,
          CIT: 0.1656,
          SPC: 0.0829,
          RLS: 0.0613,
          PBK: 0.0411,
          PBP: 0.0196,
          PBF: 0.0215,
          RBK: 0.06,
          RBP: 0.0617,
          RBF: 0.062,
        },
      },
    },
    {
      name: "Physical Route Runner",
      abilities: [
        {
          name: "Balanced",
          requirements: {
            STR: [83, 85, 87, 92],
          },
        },
        {
          name: "50/50",
          requirements: {
            SPC: [86, 88, 92, 94],
          },
        },
        {
          name: "Cutter",
          requirements: {
            MRR: [82, 84, 85, 90],
          },
        },
        {
          name: "Downhill",
          requirements: {
            BTK: [80, 82, 84, 88],
          },
        },
        {
          name: "Sure Hands",
          requirements: {
            CIT: [83, 84, 88, 90],
          },
        },
      ],
      ovrFormula: {
        intercept: -78.1049,
        weights: {
          SPD: 0.0858,
          STR: 0.0863,
          AGI: 0.1023,
          ACC: 0.0643,
          AWR: 0.1888,
          TGH: 0.0424,
          BTK: 0.0423,
          TRK: 0.0214,
          COD: 0.0209,
          SFA: 0.0427,
          CTH: 0.1898,
          SRR: 0.2524,
          MRR: 0.1898,
          DRR: 0.0858,
          CIT: 0.2124,
          SPC: 0.0626,
          RLS: 0.0624,
          PBK: 0.0418,
          PBP: 0.0211,
          PBF: 0.0211,
          RBK: 0.0612,
          RBP: 0.0634,
          RBF: 0.0649,
          LBK: 0.0212,
          IBL: 0.0634,
        },
      },
    },
    {
      name: "Gritty Possession",
      abilities: [
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [83, 85, 87, 92],
          },
        },
        {
          name: "Sure Hands",
          requirements: {
            CIT: [83, 84, 88, 90],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [69, 70, 72, 78],
          },
        },
        {
          name: "Battering Ram",
          requirements: {
            TGH: [90, 91, 92, 94],
            AWR: [88, 89, 90, 91],
          },
        },
      ],
      ovrFormula: {
        intercept: -87.113,
        weights: {
          SPD: 0.0221,
          STR: 0.1151,
          AGI: 0.0455,
          ACC: 0.045,
          AWR: 0.2062,
          TGH: 0.0457,
          BTK: 0.0467,
          TRK: 0.0215,
          SFA: 0.0443,
          CTH: 0.1379,
          SRR: 0.1617,
          MRR: 0.1147,
          CIT: 0.1614,
          RLS: 0.0229,
          PBK: 0.1388,
          PBP: 0.1357,
          PBF: 0.1362,
          RBK: 0.1622,
          RBP: 0.1386,
          RBF: 0.139,
          LBK: 0.1162,
          IBL: 0.1373,
        },
      },
    },
    {
      name: "Pure Possession",
      abilities: [
        {
          name: "Sure Hands",
          requirements: {
            CIT: [83, 84, 88, 90],
          },
        },
        {
          name: "Wear Down",
          requirements: {
            PBK: [84, 88, 93, 97],
          },
        },
        {
          name: "Strong Grip",
          requirements: {
            STR: [87, 91, 95, 99],
          },
        },
        {
          name: "Outside Shield",
          requirements: {
            RBF: [69, 70, 72, 78],
          },
        },
        {
          name: "Balanced",
          requirements: {
            BTK: [82, 84, 87, 90],
          },
        },
      ],
      ovrFormula: {
        intercept: -77.7045,
        weights: {
          SPD: 0.0631,
          STR: 0.0631,
          AGI: 0.0835,
          ACC: 0.0846,
          AWR: 0.1874,
          BTK: 0.0432,
          TRK: 0.0209,
          BCV: 0.021,
          SFA: 0.0428,
          CTH: 0.2095,
          SRR: 0.2534,
          MRR: 0.125,
          CIT: 0.295,
          SPC: 0.0215,
          RLS: 0.0424,
          PBK: 0.0642,
          PBP: 0.0416,
          PBF: 0.0414,
          RBK: 0.1044,
          RBP: 0.0829,
          RBF: 0.0837,
          LBK: 0.0403,
          IBL: 0.0865,
        },
      },
    },
  ],
  FB: [
    {
      name: "Blocking",
      abilities: [
        {
          name: "Strong Grip",
          requirements: {
            STR: [86, 90, 94, 98],
          },
        },
        {
          name: "Second Level",
          requirements: {
            LBK: [84, 89, 93, 97],
          },
        },
        {
          name: "Pocket Shield",
          requirements: {
            PBP: [69, 71, 73, 75],
          },
        },
        {
          name: "Sidekick",
          requirements: {
            PBK: [75, 80, 86, 93],
          },
        },
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [75, 80, 86, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -64.3608,
        weights: {
          SPD: 0.0187,
          STR: 0.1771,
          AGI: 0.0374,
          ACC: 0.0389,
          AWR: 0.1939,
          BTK: 0.1169,
          TRK: 0.1368,
          CAR: 0.0961,
          CTH: 0.0402,
          SRR: 0.0974,
          CIT: 0.0403,
          PBK: 0.0776,
          PBP: 0.0198,
          PBF: 0.0185,
          RBK: 0.1951,
          RBP: 0.0982,
          RBF: 0.0593,
          LBK: 0.3489,
          IBL: 0.1364,
        },
      },
    },
    {
      name: "Utility",
      abilities: [
        {
          name: "Safety Valve",
          requirements: {
            CTH: [73, 76, 80, 85],
          },
        },
        {
          name: "Balanced",
          requirements: {
            STR: [87, 91, 94, 98],
          },
        },
        {
          name: "Screen Enforcer",
          requirements: {
            IBL: [75, 80, 86, 94],
          },
        },
        {
          name: "Sidekick",
          requirements: {
            PBK: [75, 80, 86, 93],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [81, 88, 95, 99],
          },
        },
      ],
      ovrFormula: {
        intercept: -62.3397,
        weights: {
          SPD: 0.0947,
          STR: 0.1147,
          AGI: 0.1152,
          ACC: 0.0933,
          AWR: 0.189,
          BTK: 0.0777,
          TRK: 0.0939,
          COD: 0.0397,
          BCV: 0.1139,
          SFA: 0.0749,
          CAR: 0.1303,
          CTH: 0.1521,
          SRR: 0.1708,
          CIT: 0.0382,
          PBK: 0.0391,
          RBK: 0.0554,
          LBK: 0.0932,
          IBL: 0.2083,
        },
      },
    },
  ],
  LE: [
    {
      name: "Edge Setter",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Inside Disruptor",
          requirements: {
            BSH: [87, 89, 92, 94],
          },
        },
        {
          name: "Outside Disruptor",
          requirements: {
            BSH: [88, 90, 93, 94],
          },
        },
        {
          name: "Option Disruptor",
          requirements: {
            PRC: [85, 88, 90, 94],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.3918,
        weights: {
          SPD: 0.0816,
          STR: 0.2001,
          AGI: 0.0851,
          ACC: 0.1352,
          AWR: 0.0995,
          PRC: 0.1995,
          TAK: 0.3002,
          POW: 0.051,
          PMV: 0.0329,
          FMV: 0.0339,
          BSH: 0.3017,
          PUR: 0.1512,
        },
      },
    },
    {
      name: "Pure Power",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Pocket Disruptor",
          requirements: {
            PMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Inside Disruptor",
          requirements: {
            BSH: [87, 89, 92, 94],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [90, 92, 94, 96],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.5446,
        weights: {
          SPD: 0.0342,
          STR: 0.2992,
          AGI: 0.0526,
          ACC: 0.1333,
          AWR: 0.1004,
          TGH: 0.0845,
          PRC: 0.0321,
          TAK: 0.253,
          POW: 0.0822,
          PMV: 0.2992,
          BSH: 0.2538,
          PUR: 0.0509,
        },
      },
    },
    {
      name: "Speed Rusher",
      abilities: [
        {
          name: "Quick Jump",
          requirements: {
            ACC: [89, 91, 93, 94],
          },
        },
        {
          name: "Duress",
          requirements: {
            PMV: [88, 89, 91, 94],
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Take Down",
          requirements: {
            TAK: [82, 87, 91, 97],
          },
        },
        {
          name: "Pocket Disruptor",
          requirements: {
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [86, 88, 90, 92],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.5993,
        weights: {
          SPD: 0.1688,
          STR: 0.0823,
          AGI: 0.1494,
          ACC: 0.2317,
          AWR: 0.2038,
          PRC: 0.0324,
          TAK: 0.2507,
          POW: 0.0346,
          PMV: 0.0183,
          FMV: 0.3852,
          PUR: 0.118,
        },
      },
    },
    {
      name: "Power Rusher",
      abilities: [
        {
          name: "Pocket Disruptor",
          requirements: {
            PMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Duress",
          requirements: {
            PMV: [88, 89, 91, 94],
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [90, 92, 94, 96],
          },
        },
        {
          name: "Take Down",
          requirements: {
            TAK: [86, 88, 90, 92],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.5929,
        weights: {
          SPD: 0.1154,
          STR: 0.2521,
          AGI: 0.1032,
          ACC: 0.1658,
          AWR: 0.2,
          PRC: 0.0342,
          TAK: 0.2517,
          POW: 0.0349,
          PMV: 0.3864,
          FMV: 0.0158,
          PUR: 0.1157,
        },
      },
    },
  ],
  RE: [
    {
      name: "Edge Setter",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Inside Disruptor",
          requirements: {
            BSH: [87, 89, 92, 94],
          },
        },
        {
          name: "Outside Disruptor",
          requirements: {
            BSH: [88, 90, 93, 94],
          },
        },
        {
          name: "Option Disruptor",
          requirements: {
            PRC: [85, 88, 90, 94],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.3918,
        weights: {
          SPD: 0.0816,
          STR: 0.2001,
          AGI: 0.0851,
          ACC: 0.1352,
          AWR: 0.0995,
          PRC: 0.1995,
          TAK: 0.3002,
          POW: 0.051,
          PMV: 0.0329,
          FMV: 0.0339,
          BSH: 0.3017,
          PUR: 0.1512,
        },
      },
    },
    {
      name: "Pure Power",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Pocket Disruptor",
          requirements: {
            PMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Inside Disruptor",
          requirements: {
            BSH: [87, 89, 92, 94],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [90, 92, 94, 96],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.5446,
        weights: {
          SPD: 0.0342,
          STR: 0.2992,
          AGI: 0.0526,
          ACC: 0.1333,
          AWR: 0.1004,
          TGH: 0.0845,
          PRC: 0.0321,
          TAK: 0.253,
          POW: 0.0822,
          PMV: 0.2992,
          BSH: 0.2538,
          PUR: 0.0509,
        },
      },
    },
    {
      name: "Speed Rusher",
      abilities: [
        {
          name: "Quick Jump",
          requirements: {
            ACC: [89, 91, 93, 94],
          },
        },
        {
          name: "Duress",
          requirements: {
            PMV: [88, 89, 91, 94],
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Take Down",
          requirements: {
            TAK: [82, 87, 91, 97],
          },
        },
        {
          name: "Pocket Disruptor",
          requirements: {
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Recoup",
          requirements: {
            STA: [86, 88, 90, 92],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.5993,
        weights: {
          SPD: 0.1688,
          STR: 0.0823,
          AGI: 0.1494,
          ACC: 0.2317,
          AWR: 0.2038,
          PRC: 0.0324,
          TAK: 0.2507,
          POW: 0.0346,
          PMV: 0.0183,
          FMV: 0.3852,
          PUR: 0.118,
        },
      },
    },
    {
      name: "Power Rusher",
      abilities: [
        {
          name: "Pocket Disruptor",
          requirements: {
            PMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Duress",
          requirements: {
            PMV: [88, 89, 91, 94],
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [90, 92, 94, 96],
          },
        },
        {
          name: "Take Down",
          requirements: {
            TAK: [86, 88, 90, 92],
          },
        },
      ],
      ovrFormula: {
        intercept: -58.5929,
        weights: {
          SPD: 0.1154,
          STR: 0.2521,
          AGI: 0.1032,
          ACC: 0.1658,
          AWR: 0.2,
          PRC: 0.0342,
          TAK: 0.2517,
          POW: 0.0349,
          PMV: 0.3864,
          FMV: 0.0158,
          PUR: 0.1157,
        },
      },
    },
  ],
  DT: [
    {
      name: "Pure Power",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [94, 95, 96, 97],
          },
        },
        {
          name: "Pocket Disruptor",
          requirements: {
            PMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Inside Disruptor",
          requirements: {
            BSH: [87, 89, 92, 94],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [80, 85, 90, 97],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [86, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -61.4432,
        weights: {
          SPD: 0.0332,
          STR: 0.3088,
          AGI: 0.0477,
          ACC: 0.1349,
          AWR: 0.1023,
          TGH: 0.0844,
          PRC: 0.0345,
          TAK: 0.2589,
          POW: 0.0865,
          PMV: 0.309,
          BSH: 0.2553,
          PUR: 0.052,
        },
      },
    },
    {
      name: "Power Rusher",
      abilities: [
        {
          name: "Pocket Disruptor",
          requirements: {
            PMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Duress",
          requirements: {
            PMV: [88, 89, 91, 94],
            FMV: [88, 89, 91, 94],
          },
        },
        {
          name: "Grip Breaker",
          requirements: {
            STR: [84, 89, 94, 99],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [86, 88, 90, 94],
          },
        },
        {
          name: "Take Down",
          requirements: {
            TAK: [88, 89, 91, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -61.6847,
        weights: {
          SPD: 0.086,
          STR: 0.3246,
          AGI: 0.0348,
          ACC: 0.1037,
          AWR: 0.2066,
          PRC: 0.1016,
          TAK: 0.2222,
          POW: 0.0522,
          PMV: 0.3751,
          FMV: 0.0158,
          BSH: 0.1036,
          PUR: 0.0857,
        },
      },
    },
  ],
  LOLB: [
    {
      name: "Lurker",
      abilities: [
        {
          name: "Knockout",
          requirements: {
            POW: [84, 86, 88, 92],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [71, 73, 75, 78],
          },
        },
        {
          name: "Robber",
          requirements: {
            ACC: [91, 92, 94, 95],
          },
        },
        {
          name: "Bouncer",
          requirements: {
            ZCV: [82, 84, 86, 90],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -69.5041,
        weights: {
          SPD: 0.1654,
          STR: 0.0346,
          AGI: 0.0594,
          ACC: 0.1991,
          AWR: 0.2767,
          COD: 0.0709,
          PRC: 0.1263,
          TAK: 0.2541,
          PUR: 0.2031,
          MCV: 0.13,
          ZCV: 0.3093,
        },
      },
    },
    {
      name: "Signal Caller",
      abilities: [
        {
          name: "Take Down",
          requirements: {
            STR: [86, 88, 90, 92],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            BSH: [80, 82, 85, 88],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [86, 88, 90, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -77.6341,
        weights: {
          SPD: 0.098,
          STR: 0.1567,
          AGI: 0.0805,
          ACC: 0.1745,
          AWR: 0.1746,
          COD: 0.0578,
          PRC: 0.1739,
          TAK: 0.3497,
          BSH: 0.1378,
          PUR: 0.2722,
          MCV: 0.0754,
          ZCV: 0.1902,
        },
      },
    },
    {
      name: "Thumper",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [87, 90, 93, 95],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Aftershock",
          requirements: {
            POW: [88, 90, 92, 94],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            BSH: [80, 82, 85, 88],
          },
        },
        {
          name: "Hammer",
          requirements: {
            BSH: [83, 85, 87, 89],
          },
        },
      ],
      ovrFormula: {
        intercept: -70.0942,
        weights: {
          SPD: 0.1126,
          STR: 0.1839,
          AGI: 0.0368,
          ACC: 0.1625,
          AWR: 0.0739,
          COD: 0.0368,
          PRC: 0.1689,
          TAK: 0.2975,
          POW: 0.0571,
          BSH: 0.2917,
          PUR: 0.2924,
          MCV: 0.0363,
          ZCV: 0.0912,
        },
      },
    },
  ],
  ROLB: [
    {
      name: "Lurker",
      abilities: [
        {
          name: "Knockout",
          requirements: {
            POW: [84, 86, 88, 92],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [71, 73, 75, 78],
          },
        },
        {
          name: "Robber",
          requirements: {
            ACC: [91, 92, 94, 95],
          },
        },
        {
          name: "Bouncer",
          requirements: {
            ZCV: [82, 84, 86, 90],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -69.5041,
        weights: {
          SPD: 0.1654,
          STR: 0.0346,
          AGI: 0.0594,
          ACC: 0.1991,
          AWR: 0.2767,
          COD: 0.0709,
          PRC: 0.1263,
          TAK: 0.2541,
          PUR: 0.2031,
          MCV: 0.13,
          ZCV: 0.3093,
        },
      },
    },
    {
      name: "Signal Caller",
      abilities: [
        {
          name: "Take Down",
          requirements: {
            STR: [86, 88, 90, 92],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            BSH: [80, 82, 85, 88],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [86, 88, 90, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -77.6341,
        weights: {
          SPD: 0.098,
          STR: 0.1567,
          AGI: 0.0805,
          ACC: 0.1745,
          AWR: 0.1746,
          COD: 0.0578,
          PRC: 0.1739,
          TAK: 0.3497,
          BSH: 0.1378,
          PUR: 0.2722,
          MCV: 0.0754,
          ZCV: 0.1902,
        },
      },
    },
    {
      name: "Thumper",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [87, 90, 93, 95],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Aftershock",
          requirements: {
            POW: [88, 90, 92, 94],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            BSH: [80, 82, 85, 88],
          },
        },
        {
          name: "Hammer",
          requirements: {
            BSH: [83, 85, 87, 89],
          },
        },
      ],
      ovrFormula: {
        intercept: -70.0942,
        weights: {
          SPD: 0.1126,
          STR: 0.1839,
          AGI: 0.0368,
          ACC: 0.1625,
          AWR: 0.0739,
          COD: 0.0368,
          PRC: 0.1689,
          TAK: 0.2975,
          POW: 0.0571,
          BSH: 0.2917,
          PUR: 0.2924,
          MCV: 0.0363,
          ZCV: 0.0912,
        },
      },
    },
  ],
  MLB: [
    {
      name: "Lurker",
      abilities: [
        {
          name: "Knockout",
          requirements: {
            POW: [84, 86, 88, 92],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [71, 73, 75, 78],
          },
        },
        {
          name: "Robber",
          requirements: {
            ACC: [91, 92, 94, 95],
          },
        },
        {
          name: "Bouncer",
          requirements: {
            ZCV: [82, 84, 86, 90],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -69.5041,
        weights: {
          SPD: 0.1654,
          STR: 0.0346,
          AGI: 0.0594,
          ACC: 0.1991,
          AWR: 0.2767,
          COD: 0.0709,
          PRC: 0.1263,
          TAK: 0.2541,
          PUR: 0.2031,
          MCV: 0.13,
          ZCV: 0.3093,
        },
      },
    },
    {
      name: "Signal Caller",
      abilities: [
        {
          name: "Take Down",
          requirements: {
            STR: [86, 88, 90, 92],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            BSH: [80, 82, 85, 88],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [86, 88, 90, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -77.6341,
        weights: {
          SPD: 0.098,
          STR: 0.1567,
          AGI: 0.0805,
          ACC: 0.1745,
          AWR: 0.1746,
          COD: 0.0578,
          PRC: 0.1739,
          TAK: 0.3497,
          BSH: 0.1378,
          PUR: 0.2722,
          MCV: 0.0754,
          ZCV: 0.1902,
        },
      },
    },
    {
      name: "Thumper",
      abilities: [
        {
          name: "Grip Breaker",
          requirements: {
            STR: [87, 90, 93, 95],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Aftershock",
          requirements: {
            POW: [84, 88, 92, 95],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            BSH: [80, 82, 85, 88],
          },
        },
        {
          name: "Hammer",
          requirements: {
            BSH: [86, 88, 90, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -70.0942,
        weights: {
          SPD: 0.1126,
          STR: 0.1839,
          AGI: 0.0368,
          ACC: 0.1625,
          AWR: 0.0739,
          COD: 0.0368,
          PRC: 0.1689,
          TAK: 0.2975,
          POW: 0.0571,
          BSH: 0.2917,
          PUR: 0.2924,
          MCV: 0.0363,
          ZCV: 0.0912,
        },
      },
    },
  ],
  CB: [
    {
      name: "Boundary",
      abilities: [
        {
          name: "Jammer",
          requirements: {
            PRS: [82, 84, 87, 91],
          },
        },
        {
          name: "Blanket Coverage",
          requirements: {
            MCV: [84, 86, 88, 92],
          },
        },
        {
          name: "Lay Out",
          requirements: {
            SPC: [72, 74, 77, 80],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Quick Jump",
          requirements: {
            ACC: [92, 93, 95, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -73.4837,
        weights: {
          SPD: 0.2263,
          AGI: 0.0946,
          ACC: 0.2619,
          AWR: 0.1293,
          COD: 0.1514,
          JMP: 0.0399,
          CTH: 0.0376,
          PRC: 0.1842,
          TAK: 0.2259,
          BSH: 0.0407,
          PUR: 0.0751,
          MCV: 0.2629,
          ZCV: 0.0929,
          PRS: 0.0589,
        },
      },
    },
    {
      name: "Bump and Run",
      abilities: [
        {
          name: "Blanket Coverage",
          requirements: {
            MCV: [84, 86, 88, 92],
          },
        },
        {
          name: "Jammer",
          requirements: {
            PRS: [82, 84, 87, 91],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [75, 78, 81, 83],
          },
        },
        {
          name: "Ballhawk",
          requirements: {
            AWR: [86, 88, 91, 94],
          },
        },
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -71.7133,
        weights: {
          SPD: 0.3573,
          AGI: 0.0524,
          ACC: 0.3247,
          AWR: 0.1968,
          COD: 0.0902,
          JMP: 0.0379,
          CTH: 0.036,
          PRC: 0.0879,
          TAK: 0.0534,
          MCV: 0.3947,
          ZCV: 0.0355,
          PRS: 0.129,
        },
      },
    },
    {
      name: "Field",
      abilities: [
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Robber",
          requirements: {
            COD: [89, 90, 92, 93],
          },
        },
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
        {
          name: "Blanket Coverage",
          requirements: {
            MCV: [84, 86, 88, 92],
          },
        },
        {
          name: "Ballhawk",
          requirements: {
            AWR: [86, 88, 91, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -71.8809,
        weights: {
          SPD: 0.3205,
          AGI: 0.0717,
          ACC: 0.3261,
          AWR: 0.1432,
          COD: 0.1085,
          JMP: 0.0363,
          CTH: 0.035,
          PRC: 0.1415,
          TAK: 0.0735,
          PUR: 0.0388,
          MCV: 0.2172,
          ZCV: 0.2152,
          PRS: 0.0708,
        },
      },
    },
    {
      name: "Zone",
      abilities: [
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
        {
          name: "Lay Out",
          requirements: {
            SPC: [72, 74, 77, 80],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [75, 78, 81, 83],
          },
        },
        {
          name: "Ballhawk",
          requirements: {
            AWR: [86, 88, 91, 94],
          },
        },
        {
          name: "Bouncer",
          requirements: {
            ZCV: [86, 90, 94, 95],
          },
        },
      ],
      ovrFormula: {
        intercept: -71.9529,
        weights: {
          SPD: 0.3251,
          AGI: 0.0542,
          ACC: 0.3589,
          AWR: 0.1981,
          COD: 0.0735,
          JMP: 0.037,
          CTH: 0.0371,
          PRC: 0.1237,
          TAK: 0.0919,
          MCV: 0.0731,
          ZCV: 0.3563,
          PRS: 0.0702,
        },
      },
    },
  ],
  FS: [
    {
      name: "Box Specialist",
      abilities: [
        {
          name: "Aftershock",
          requirements: {
            POW: [88, 90, 92, 94],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [88, 90, 91, 93],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            PUR: [84, 85, 86, 89],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -67.423,
        weights: {
          SPD: 0.1635,
          STR: 0.0371,
          AGI: 0.1093,
          ACC: 0.1443,
          AWR: 0.1484,
          COD: 0.0549,
          JMP: 0.0555,
          PRC: 0.2931,
          TAK: 0.273,
          POW: 0.0872,
          BSH: 0.0376,
          PUR: 0.1645,
          MCV: 0.09,
          ZCV: 0.1464,
          PRS: 0.021,
        },
      },
    },
    {
      name: "Coverage Specialist",
      abilities: [
        {
          name: "Ballhawk",
          requirements: {
            AWR: [86, 88, 91, 94],
          },
        },
        {
          name: "Lay Out",
          requirements: {
            SPC: [72, 74, 77, 80],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [75, 78, 81, 83],
          },
        },
        {
          name: "Robber",
          requirements: {
            COD: [89, 90, 92, 93],
          },
        },
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -65.9789,
        weights: {
          SPD: 0.2504,
          STR: 0.0363,
          AGI: 0.1087,
          ACC: 0.1766,
          AWR: 0.3548,
          COD: 0.0716,
          JMP: 0.0529,
          PRC: 0.0525,
          TAK: 0.1593,
          PUR: 0.1236,
          ZCV: 0.392,
        },
      },
    },
    {
      name: "Hybrid",
      abilities: [
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [88, 90, 91, 93],
          },
        },
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
        {
          name: "Aftershock",
          requirements: {
            POW: [88, 90, 92, 94],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            PUR: [84, 85, 86, 89],
          },
        },
      ],
      ovrFormula: {
        intercept: -70.0389,
        weights: {
          SPD: 0.2579,
          STR: 0.0356,
          AGI: 0.129,
          ACC: 0.2019,
          AWR: 0.2551,
          COD: 0.0741,
          JMP: 0.0544,
          PRC: 0.1096,
          TAK: 0.203,
          PUR: 0.0744,
          MCV: 0.2576,
          ZCV: 0.1307,
          PRS: 0.0571,
        },
      },
    },
  ],
  SS: [
    {
      name: "Box Specialist",
      abilities: [
        {
          name: "Aftershock",
          requirements: {
            POW: [88, 90, 92, 94],
          },
        },
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [88, 90, 91, 93],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            PUR: [84, 85, 86, 89],
          },
        },
        {
          name: "Workhorse",
          requirements: {
            TGH: [92, 93, 94, 96],
          },
        },
      ],
      ovrFormula: {
        intercept: -68.0841,
        weights: {
          SPD: 0.1665,
          STR: 0.0375,
          AGI: 0.1138,
          ACC: 0.1478,
          AWR: 0.1491,
          COD: 0.0534,
          JMP: 0.0524,
          PRC: 0.2915,
          TAK: 0.274,
          POW: 0.0931,
          BSH: 0.0391,
          PUR: 0.164,
          MCV: 0.0901,
          ZCV: 0.1474,
          PRS: 0.0187,
        },
      },
    },
    {
      name: "Coverage Specialist",
      abilities: [
        {
          name: "Ballhawk",
          requirements: {
            AWR: [86, 88, 91, 94],
          },
        },
        {
          name: "Lay Out",
          requirements: {
            SPC: [72, 74, 77, 80],
          },
        },
        {
          name: "House Call",
          requirements: {
            CTH: [75, 78, 81, 83],
          },
        },
        {
          name: "Robber",
          requirements: {
            COD: [89, 90, 92, 93],
          },
        },
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
      ],
      ovrFormula: {
        intercept: -65.6209,
        weights: {
          SPD: 0.2493,
          STR: 0.0379,
          AGI: 0.1085,
          ACC: 0.1762,
          AWR: 0.3529,
          COD: 0.069,
          JMP: 0.051,
          PRC: 0.0523,
          TAK: 0.1608,
          PUR: 0.1265,
          ZCV: 0.3872,
        },
      },
    },
    {
      name: "Hybrid",
      abilities: [
        {
          name: "Wrap Up",
          requirements: {
            TAK: [88, 90, 92, 93],
          },
        },
        {
          name: "Hammer",
          requirements: {
            POW: [88, 90, 91, 93],
          },
        },
        {
          name: "Knockout",
          requirements: {
            MCV: [86, 88, 90, 94],
            ZCV: [86, 88, 90, 94],
          },
        },
        {
          name: "Aftershock",
          requirements: {
            POW: [88, 90, 92, 94],
          },
        },
        {
          name: "Blow Up",
          requirements: {
            PUR: [84, 85, 86, 89],
          },
        },
      ],
      ovrFormula: {
        intercept: -69.4356,
        weights: {
          SPD: 0.253,
          STR: 0.0356,
          AGI: 0.1292,
          ACC: 0.2034,
          AWR: 0.2549,
          COD: 0.0729,
          JMP: 0.0555,
          PRC: 0.1122,
          TAK: 0.2034,
          PUR: 0.0724,
          MCV: 0.2545,
          ZCV: 0.1277,
          PRS: 0.0551,
        },
      },
    },
  ],
  K: [
    {
      name: "Accurate",
      abilities: [
        {
          name: "Chip Shot",
          requirements: {
            KPW: [87, 90, 92, 94],
          },
        },
        {
          name: "Deep Range",
          requirements: {
            KPW: [86, 88, 91, 95],
          },
        },
        {
          name: "Mega Leg",
          requirements: {
            KAC: [93, 95, 96, 97],
          },
        },
      ],
      ovrFormula: {
        intercept: -13.6723,
        weights: {
          AWR: 0.3994,
          KPW: 0.1793,
          KAC: 0.5602,
        },
      },
    },
    {
      name: "Power",
      abilities: [
        {
          name: "Deep Range",
          requirements: {
            KPW: [86, 88, 91, 95],
          },
        },
        {
          name: "Mega Leg",
          requirements: {
            KAC: [93, 95, 96, 97],
          },
        },
        {
          name: "Coffin Corner",
          requirements: {
            KPW: [85, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -13.8986,
        weights: {
          AWR: 0.4691,
          KPW: Math.LOG10E,
          KAC: 0.2398,
        },
      },
    },
  ],
  P: [
    {
      name: "Accurate",
      abilities: [
        {
          name: "Chip Shot",
          requirements: {
            KPW: [87, 90, 92, 94],
          },
        },
        {
          name: "Deep Range",
          requirements: {
            KPW: [86, 88, 91, 95],
          },
        },
        {
          name: "Mega Leg",
          requirements: {
            KAC: [93, 95, 96, 97],
          },
        },
      ],
      ovrFormula: {
        intercept: -11.0826,
        weights: {
          AWR: 0.4106,
          KPW: 0.2228,
          KAC: 0.4787,
        },
      },
    },
    {
      name: "Power",
      abilities: [
        {
          name: "Deep Range",
          requirements: {
            KPW: [86, 88, 91, 95],
          },
        },
        {
          name: "Mega Leg",
          requirements: {
            KAC: [93, 95, 96, 97],
          },
        },
        {
          name: "Coffin Corner",
          requirements: {
            KPW: [85, 88, 91, 93],
          },
        },
      ],
      ovrFormula: {
        intercept: -11.1721,
        weights: {
          AWR: 0.4488,
          KPW: 0.4428,
          KAC: 0.2221,
        },
      },
    },
  ],
};
