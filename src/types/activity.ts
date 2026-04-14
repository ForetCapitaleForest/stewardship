export interface SupplyUsage {
  itemName: string;
  quantity: number;
  unit: string;
}

export interface ActivityLog {
  id: string;
  volunteerId: string;
  siteId: string;
  assignmentId?: string;
  date: Date;
  hoursWorked: number;
  taskType: string;
  tasksCompleted: string[];
  treesPlanted?: number;
  treesPruned?: number;
  areaCleared?: number; // in square meters
  supplies: SupplyUsage[];
  conditions: {
    weather: string;
    temperature: number;
  };
  photos: string[];
  notes: string;
  verifiedBy?: string; // coordinator ID
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLogFormData {
  siteId: string;
  assignmentId?: string;
  date: Date;
  hoursWorked: number;
  taskType: string;
  tasksCompleted: string[];
  treesPlanted?: number;
  treesPruned?: number;
  areaCleared?: number;
  notes?: string;
}

// Made with Bob
