export interface ServiceResponse {
  std: string;
  etd: string;
  platform: string;
  subsequentCallingPoints: [{ callingPoint: CallingPoint[] }];
}

export interface CallingPoint {
  crs: string;
  st: string;
  et: string;
}

export interface Service {
  departureTime: string;
  estimatedDepartureTime: string;
  platform: string;
  arrivalTime: string;
  estimatedArrivalTime: string;
}
