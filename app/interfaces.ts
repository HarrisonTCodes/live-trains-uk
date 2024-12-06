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

export interface Service {
  departureTime: string;
  estimatedDepartureTime: string;
  platform: string;
  arrivalTime: string;
  estimatedArrivalTime: string;
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
