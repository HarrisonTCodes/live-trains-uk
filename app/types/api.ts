import type { DisruptionSeverity, UndergroundLine } from './enums';

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
  severity: DisruptionSeverity;
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
      id: UndergroundLine;
    };
  }[];
}

export interface LegPointResponse {
  commonName: string;
}
