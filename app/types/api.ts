import type { DisruptionSeverity, UndergroundLine } from './enums';
import type { SnakeToKebabcase } from './utils';

export interface ServiceResponse {
  std: string;
  etd: string;
  platform: string;
  subsequentCallingPoints: [{ callingPoint: CallingPointResponse[] }];
  serviceID: string;
}

export interface CallingPointResponse {
  crs: string;
  st: string;
  et: string;
  locationName: string;
  cancelReason?: string;
}

export interface AlertResponse {
  generatedAt: string;
  crs: string;
  disruptions: DisruptionResponse[];
}

export interface DisruptionResponse {
  severity: Capitalize<Lowercase<DisruptionSeverity>>;
  xhtmlMessage: string;
  description: string;
}

export interface StopPointsResponse {
  total: number;
  matches: StopPointResponse[];
}

export interface StopPointResponse {
  icsId: string;
  modes: string[];
  name: string;
}

export interface PlansResponse {
  journeys: PlanResponse[];
}

export interface PlanResponse {
  duration: number;
  legs: LegResponse[];
}

export interface LegResponse {
  departurePoint: LegPointResponse;
  arrivalPoint: LegPointResponse;
  departureTime: string;
  arrivalTime: string;
  mode: {
    id: string;
  };
  routeOptions: {
    name: string;
    lineIdentifier: {
      id: Lowercase<SnakeToKebabcase<UndergroundLine>>;
    };
  }[];
}

export interface LegPointResponse {
  commonName: string;
}
