export type JourneyType = 'DEPARTURES' | 'PLANS';

export type DisruptionSeverity = 'MINOR' | 'NORMAL' | 'MAJOR' | 'SEVERE';

export type TransportMode =
  | 'TRAIN'
  | 'UNDERGROUND'
  | 'WALK'
  | 'TRANSFER'
  | 'BUS'
  | 'DLR'
  | 'TRAM'
  | 'CABLE_CAR'
  | 'CYCLE'
  | 'RIVER';

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
