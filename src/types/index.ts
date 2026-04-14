export * from './volunteer';
export * from './site';
export * from './assignment';
export * from './activity';

export interface AppData {
  version: string;
  volunteers: Record<string, import('./volunteer').Volunteer>;
  sites: Record<string, import('./site').Site>;
  assignments: Record<string, import('./assignment').Assignment>;
  activityLogs: Record<string, import('./activity').ActivityLog>;
  currentUser: {
    id: string;
    role: import('./volunteer').UserRole;
  } | null;
}

// Made with Bob
