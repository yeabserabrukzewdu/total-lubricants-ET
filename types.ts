
export interface Product {
  id: string;
  name: string;
  category: LubricantCategory;
  price: number;
  image: string;
  description: string;
  specs: string[];
  viscosity?: string;
}

export enum LubricantCategory {
  PASSENGER_CAR = 'Passenger Car Oil',
  HEAVY_DUTY = 'Heavy Duty Engine Oil',
  GEAR_OIL = 'Gear & Transmission',
  BRAKE_FLUID = 'Brake Fluid & Coolant',
  INDUSTRIAL = 'Industrial & Hydraulic',
  MOTORCYCLE = 'Motorcycle Oil'
}

export type Language = 'en' | 'am';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RecommendationResult {
  recommendedProduct: string;
  reasoning: string;
}
