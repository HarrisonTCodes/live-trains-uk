export type JourneyType = 'DEPARTURES' | 'PLANS';

export type DisruptionSeverity = 'MINOR' | 'NORMAL' | 'MAJOR' | 'SEVERE';

export type TransportMode =
  | 'train'
  | 'underground'
  | 'walk'
  | 'transfer'
  | 'bus'
  | 'dlr'
  | 'tram'
  | 'cableCar'
  | 'cycle'
  | 'river';

export type UndergroundLine =
  | 'bakerloo'
  | 'central'
  | 'circle'
  | 'district'
  | 'hammersmith-city'
  | 'jubilee'
  | 'metropolitan'
  | 'northern'
  | 'piccadilly'
  | 'victoria'
  | 'waterloo-city'
  | 'elizabeth';
