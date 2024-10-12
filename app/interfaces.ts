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
