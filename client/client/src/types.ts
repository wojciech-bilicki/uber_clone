interface Vehicle {
  id: string;
  name: string;
  long: number;
  lat: number;
}

interface VehicleResponse {
  [id: string]: Vehicle;
}

export type { Vehicle, VehicleResponse };
