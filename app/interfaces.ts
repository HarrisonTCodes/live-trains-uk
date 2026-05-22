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
  category:
    | 'Train service'
    | 'Connecting services'
    | 'System related'
    | 'Prior (trains)'
    | 'Prior (other)';
  severity: 'Minor' | 'Normal' | 'Major' | 'Severe';
  xhtmlMessage: string;
  description: string;
}

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
  severity: 'Minor' | 'Normal' | 'Major' | 'Severe';
}

export type JourneyType = 'DEPARTURES' | 'PLANS';

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

export interface Plan {
  legs: Leg[];
  duration: number;
}

export interface Leg {
  arrival: LegPoint;
  departure: LegPoint;
  mode: TransportMode;
  line?: UndergroundLine;
  number?: string;
}

export interface LegPoint {
  station: string;
  time: string;
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
