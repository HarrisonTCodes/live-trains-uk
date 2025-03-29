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

export interface CallingPoint {
  station: string;
  departureTime: string;
  estimatedDepartureTime?: string;
  platform?: string;
  focus?: boolean;
}

export interface Alert {
  message: string;
  severity: 'Minor' | 'Normal' | 'Major' | 'Severe';
}

export interface Journey {
  firstStation: string;
  firstCrs: string;
  secondStation: string;
  secondCrs: string;
  name: string;
  id: number;
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
