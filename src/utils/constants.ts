export const SITE_TYPES = [
  { value: 'park', label: 'Park' },
  { value: 'street', label: 'Street' },
  { value: 'community-garden', label: 'Community Garden' },
  { value: 'natural-area', label: 'Natural Area' },
] as const;

export const TASK_TYPES = [
  { value: 'watering', label: 'Watering' },
  { value: 'pruning', label: 'Pruning' },
  { value: 'planting', label: 'Planting' },
  { value: 'mulching', label: 'Mulching' },
  { value: 'cleanup', label: 'Cleanup' },
  { value: 'inspection', label: 'Inspection' },
  { value: 'other', label: 'Other' },
] as const;

export const VOLUNTEER_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
] as const;

export const USER_ROLES = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'coordinator', label: 'Coordinator' },
  { value: 'admin', label: 'Admin' },
] as const;

export const SITE_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const ASSIGNMENT_STATUS = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'no-show', label: 'No Show' },
] as const;

export const COMMON_SKILLS = [
  'Tree Identification',
  'Pruning',
  'Planting',
  'Watering',
  'Mulching',
  'First Aid',
  'Tool Maintenance',
  'Group Leadership',
  'Photography',
  'Data Collection',
];

export const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Made with Bob
