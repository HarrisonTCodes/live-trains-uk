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
  serviceId: string;
}

export interface CallingPoint {
  station: string;
  departureTime: string;
  estimatedDepartureTime?: string;
  cancelReason?: string;
  platform?: string;
  focus?: boolean;
}
