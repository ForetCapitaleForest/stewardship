import { AppData } from '@/types';

const STORAGE_KEY = 'stewardship_data';
const STORAGE_VERSION = '1.0.0';

function getDefaultData(): AppData {
  return {
    version: STORAGE_VERSION,
    volunteers: {},
    sites: {},
    assignments: {},
    activityLogs: {},
    currentUser: null,
  };
}

export const storage = {
  get: (): AppData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return getDefaultData();
      }
      const parsed = JSON.parse(data);
      
      // Convert date strings back to Date objects
      Object.values(parsed.volunteers || {}).forEach((volunteer: any) => {
        volunteer.joinDate = new Date(volunteer.joinDate);
        volunteer.createdAt = new Date(volunteer.createdAt);
        volunteer.updatedAt = new Date(volunteer.updatedAt);
        volunteer.certifications?.forEach((cert: any) => {
          cert.issueDate = new Date(cert.issueDate);
          if (cert.expiryDate) cert.expiryDate = new Date(cert.expiryDate);
        });
      });
      
      Object.values(parsed.sites || {}).forEach((site: any) => {
        site.createdAt = new Date(site.createdAt);
        site.updatedAt = new Date(site.updatedAt);
      });
      
      Object.values(parsed.assignments || {}).forEach((assignment: any) => {
        assignment.date = new Date(assignment.date);
        assignment.createdAt = new Date(assignment.createdAt);
        assignment.updatedAt = new Date(assignment.updatedAt);
      });
      
      Object.values(parsed.activityLogs || {}).forEach((log: any) => {
        log.date = new Date(log.date);
        log.createdAt = new Date(log.createdAt);
        log.updatedAt = new Date(log.updatedAt);
        if (log.verifiedAt) log.verifiedAt = new Date(log.verifiedAt);
      });
      
      return parsed;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return getDefaultData();
    }
  },

  set: (data: AppData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      throw new Error('Failed to save data. Storage may be full.');
    }
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  export: (): string => {
    const data = storage.get();
    return JSON.stringify(data, null, 2);
  },

  import: (jsonString: string): void => {
    try {
      const data = JSON.parse(jsonString);
      storage.set(data);
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid data format');
    }
  },
};

// Made with Bob
