export interface ServiceResponse {
  std: string;
  etd: string;
  platform: string;
  subsequentCallingPoints: [{ callingPoint: CallingPoint[] }];
  serviceID: string;
}

export interface CallingPoint {
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
  serviceId: string;
}
