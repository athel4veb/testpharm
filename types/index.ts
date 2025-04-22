export interface Visit {
  id: number;
  date: string;
  hcpId: number;
  productsDiscussed: string[];
  notes: string;
  followUpDate: string | null;
  outcome: string;
  status: 'planned' | 'completed' | 'canceled';
}

export interface Facility {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  equipment: string[];
  amenities: string[];
  contact: string;
  rating: number;
  reviews: number;
  price: number;
}

export interface HealthcareProfessional {
  id: number;
  name: string;
  specialty: string;
  organization: string;
  city: string;
  state: string;
  rating: number;
  potentialValue: number;
}
