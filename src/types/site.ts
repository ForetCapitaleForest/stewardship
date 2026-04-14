export type SiteType = 'standard-planting' | 'private-property' | 'food-forest' | 'tiny-forest';
export type SiteStatus = 'active' | 'seasonal' | 'inactive';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TreeSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  count: number;
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean;
  parkingAvailable: boolean;
  publicTransitNearby: boolean;
  restrooms: boolean;
  notes?: string;
}

export interface MaintenanceSchedule {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'seasonal';
  preferredDays: number[]; // 0-6 (Sunday-Saturday)
  preferredTime: string; // HH:mm format
  duration: number; // in hours
  notes?: string;
}

export interface Site {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  coordinates?: Coordinates;
  siteType: SiteType;
  size: number; // in acres or square meters
  treeCount: number;
  species: TreeSpecies[];
  accessibility: AccessibilityInfo;
  amenities: string[];
  coordinatorId?: string;
  status: SiteStatus;
  maintenanceSchedule?: MaintenanceSchedule;
  photos: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  siteType: SiteType;
  size: number;
  treeCount: number;
  coordinatorId?: string;
  status: SiteStatus;
  notes?: string;
}

// Made with Bob
