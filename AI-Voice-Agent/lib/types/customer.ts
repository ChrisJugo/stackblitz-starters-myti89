export interface ServiceRecord {
  date: string;
  type: 'maintenance' | 'repair' | 'warranty';
  description: string;
  cost: number;
  mileage: number;
  technician: string;
  recommendations: string[];
}

export interface VehicleWarranty {
  id: string;
  type: 'basic' | 'powertrain' | 'extended' | 'comprehensive';
  startDate: string;
  endDate: string;
  mileageLimit: number;
  coverage: {
    components: string[];
    exclusions: string[];
    deductible: number;
  };
  cost: number;
  monthlyPayment?: number;
  status: 'active' | 'expired' | 'pending';
  claims: {
    date: string;
    description: string;
    amount: number;
    approved: boolean;
  }[];
}

export interface Vehicle {
  vin: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  mileage: number;
  color: string;
  transmission: 'automatic' | 'manual';
  fuelType: string;
  purchaseInfo: {
    date: string;
    type: 'new' | 'used' | 'certified';
    price: number;
    dealership: string;
  };
  serviceHistory: ServiceRecord[];
  warranties: VehicleWarranty[];
  recalls: {
    id: string;
    description: string;
    status: 'open' | 'completed';
    completionDate?: string;
  }[];
}

export interface CustomerRecord {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  vehicles: Vehicle[];
  preferences: {
    contactMethod: 'email' | 'phone' | 'text';
    preferredServiceDay: string;
    preferredServiceTime: string;
    marketingOptIn: boolean;
  };
  metrics: {
    lifetimeValue: number;
    serviceVisits: number;
    warrantyPurchases: number;
    referrals: number;
    satisfactionScore: number;
    lastInteraction: string;
    loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  };
  engagement: {
    lastContact: string;
    nextScheduledContact: string;
    communicationHistory: {
      date: string;
      type: 'call' | 'email' | 'text' | 'service' | 'warranty';
      outcome: 'successful' | 'unsuccessful' | 'no_answer' | 'callback_requested';
      notes: string;
    }[];
    preferences: {
      bestTimeToCall: string[];
      doNotCall: boolean;
      specialInstructions: string;
    };
  };
  opportunities: {
    warrantyRenewal: {
      eligible: boolean;
      expiringWithin: number; // days
      estimatedValue: number;
      recommendedPlans: string[];
    };
    serviceReminders: {
      due: boolean;
      services: string[];
      estimatedCost: number;
      priority: 'high' | 'medium' | 'low';
    };
    tradein: {
      eligible: boolean;
      estimatedValue: number;
      recommendedVehicles: string[];
    };
  };
}

