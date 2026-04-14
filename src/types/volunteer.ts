export type VolunteerStatus = 'active' | 'inactive' | 'pending';
export type UserRole = 'volunteer' | 'coordinator' | 'admin';

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Certification {
  id: string;
  name: string;
  issueDate: Date;
  expiryDate?: Date;
  issuingOrganization: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string; // Optional for demo purposes, should be hashed in production
  address?: Address;
  joinDate: Date;
  status: VolunteerStatus;
  role: UserRole;
  skills: string[];
  availability: Availability[];
  emergencyContact?: EmergencyContact;
  totalHours: number;
  certifications: Certification[];
  notes: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Partial<Address>;
  skills: string[];
  emergencyContact?: Partial<EmergencyContact>;
  notes?: string;
}

// Made with Bob
