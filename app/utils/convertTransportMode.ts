import { TransportMode } from '../interfaces';

const modes: Record<TransportMode, Set<string>> = {
  underground: new Set(['tube']),
  bus: new Set(['replacement_bus']),
  train: new Set(['national-rail', 'overground']),
  walk: new Set(['walking']),
  transfer: new Set(),
  dlr: new Set(),
};

export default function convertTransportMode(rawMode: string): TransportMode | undefined {
  if (rawMode in modes) {
    return rawMode as TransportMode;
  }

  for (const [mode, otherNames] of Object.entries(modes)) {
    if (otherNames.has(rawMode)) {
      return mode as TransportMode;
    }
  }
}
