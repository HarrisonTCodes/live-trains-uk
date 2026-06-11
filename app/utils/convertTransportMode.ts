import type { TransportMode } from '../types/enums';

const modes: Record<TransportMode, Set<string>> = {
  UNDERGROUND: new Set(['tube', 'elizabeth-line']),
  BUS: new Set(['replacement-bus', 'public-bus', 'coach']),
  TRAIN: new Set(['national-rail', 'overground']),
  WALK: new Set(['walking']),
  TRANSFER: new Set(),
  DLR: new Set(),
  TRAM: new Set(),
  CABLE_CAR: new Set(['cable-car']),
  CYCLE: new Set(['cycle-hire']),
  RIVER: new Set(['river-bus', 'river-tour']),
};

export default function convertTransportMode(rawMode: string): TransportMode | undefined {
  // If raw mode appears directly as transport mode variant
  if (rawMode in modes) {
    return rawMode as TransportMode;
  }

  // If raw mode is a known synonym of a transport mode variant from other APIs
  for (const [mode, otherNames] of Object.entries(modes)) {
    if (otherNames.has(rawMode)) {
      return mode as TransportMode;
    }
  }
}
