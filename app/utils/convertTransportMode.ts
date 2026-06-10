import type { TransportMode } from '../types/enums';

const modes: Record<TransportMode, Set<string>> = {
  underground: new Set(['tube', 'elizabeth-line']),
  bus: new Set(['replacement-bus', 'public-bus', 'coach']),
  train: new Set(['national-rail', 'overground']),
  walk: new Set(['walking']),
  transfer: new Set(),
  dlr: new Set(),
  tram: new Set(),
  cableCar: new Set(['cable-car']),
  cycle: new Set(['cycle-hire']),
  river: new Set(['river-bus', 'river-tour']),
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
