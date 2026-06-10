import type { DisruptionSeverity, JourneyType, TransportMode, UndergroundLine } from './enums';

export interface CallingPoint {
  station: string;
  departureTime: string;
  estimatedDepartureTime?: string;
  platform?: string;
  focus?: boolean;
}

export interface Service {
  departureTime: string;
  estimatedDepartureTime: string;
  platform: string;
  arrivalTime: string;
  estimatedArrivalTime: string;
  arrivalCrs: string;
  arrivalStation: string;
  duration: number;
  numberOfStops: number;
  serviceId: string;
}

export interface Services {
  fromCrs: string;
  toCrs?: string;
  services: Service[];
}

export interface ServiceDetails {
  callingPoints: CallingPoint[];
  cancelReasons: string[];
}

export interface Alert {
  message: string;
  severity: DisruptionSeverity;
}

export interface Journey {
  firstStation: string;
  firstCrs: string;
  secondStation: string;
  secondCrs: string;
  name: string;
  id: number;
  type: JourneyType;
}

export interface Station {
  name: string;
  crs: string;
}

export interface User {
  email: string;
  name: string;
  dateCreated: string;
  journeyCount: number;
}

export interface Plan {
  legs: Leg[];
  duration: number;
}

export interface Leg {
  arrival: LegPoint;
  departure: LegPoint;
  mode?: TransportMode;
  line?: UndergroundLine;
  number?: string;
}

export interface LegPoint {
  station: string;
  time: string;
}
