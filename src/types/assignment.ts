export type AssignmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
export type TaskType = 'watering' | 'pruning' | 'planting' | 'mulching' | 'cleanup' | 'inspection' | 'other';

export interface WeatherCondition {
  temperature: number; // in Celsius
  condition: string; // e.g., 'sunny', 'cloudy', 'rainy'
  windSpeed?: number; // km/h
}

export interface Assignment {
  id: string;
  siteId: string;
  date: Date;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  status: AssignmentStatus;
  taskType: TaskType;
  description: string;
  requiredSkills: string[];
  maxVolunteers: number;
  assignedVolunteerIds: string[];
  weather?: WeatherCondition;
  notes: string;
  createdBy: string; // volunteer ID
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentFormData {
  siteId: string;
  date: Date;
  startTime: string;
  endTime: string;
  taskType: TaskType;
  description: string;
  requiredSkills: string[];
  maxVolunteers: number;
  notes?: string;
}

// Made with Bob
