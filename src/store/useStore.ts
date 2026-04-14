import { create } from 'zustand';
import { AppData, Volunteer, Site, Assignment, ActivityLog, UserRole } from '@/types';
import { storage } from '@/utils/storage';
import { sampleVolunteers, sampleSites, sampleAssignments } from '@/utils/sampleData';

interface StoreState extends AppData {
  // Actions
  setCurrentUser: (userId: string, role: UserRole) => void;
  logout: () => void;
  
  // Volunteer actions
  addVolunteer: (volunteer: Volunteer) => void;
  updateVolunteer: (id: string, volunteer: Partial<Volunteer>) => void;
  deleteVolunteer: (id: string) => void;
  
  // Site actions
  addSite: (site: Site) => void;
  updateSite: (id: string, site: Partial<Site>) => void;
  deleteSite: (id: string) => void;
  
  // Assignment actions
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  signUpForAssignment: (assignmentId: string, volunteerId: string) => void;
  cancelAssignmentSignup: (assignmentId: string, volunteerId: string) => void;
  
  // Activity log actions
  addActivityLog: (log: ActivityLog) => void;
  updateActivityLog: (id: string, log: Partial<ActivityLog>) => void;
  deleteActivityLog: (id: string) => void;
  verifyActivityLog: (id: string, verifierId: string) => void;
  
  // Utility actions
  loadData: () => void;
  saveData: () => void;
  clearData: () => void;
  exportData: () => string;
  importData: (jsonString: string) => void;
}

// Initialize store with sample data if empty
const initializeStore = (): AppData => {
  const data = storage.get();
  
  // If no data exists, populate with sample data
  if (Object.keys(data.volunteers).length === 0) {
    const initialData: AppData = {
      version: '1.0.0',
      volunteers: sampleVolunteers,
      sites: sampleSites,
      assignments: sampleAssignments,
      activityLogs: {},
      currentUser: null,
    };
    storage.set(initialData);
    return initialData;
  }
  
  return data;
};

export const useStore = create<StoreState>((set, get) => ({
  ...initializeStore(),

  setCurrentUser: (userId: string, role: UserRole) => {
    set({ currentUser: { id: userId, role } });
    get().saveData();
  },

  logout: () => {
    set({ currentUser: null });
    get().saveData();
  },

  // Volunteer actions
  addVolunteer: (volunteer: Volunteer) => {
    set((state) => ({
      volunteers: { ...state.volunteers, [volunteer.id]: volunteer },
    }));
    get().saveData();
  },

  updateVolunteer: (id: string, updates: Partial<Volunteer>) => {
    set((state) => ({
      volunteers: {
        ...state.volunteers,
        [id]: {
          ...state.volunteers[id],
          ...updates,
          updatedAt: new Date(),
        },
      },
    }));
    get().saveData();
  },

  deleteVolunteer: (id: string) => {
    set((state) => {
      const { [id]: _, ...rest } = state.volunteers;
      return { volunteers: rest };
    });
    get().saveData();
  },

  // Site actions
  addSite: (site: Site) => {
    set((state) => ({
      sites: { ...state.sites, [site.id]: site },
    }));
    get().saveData();
  },

  updateSite: (id: string, updates: Partial<Site>) => {
    set((state) => ({
      sites: {
        ...state.sites,
        [id]: {
          ...state.sites[id],
          ...updates,
          updatedAt: new Date(),
        },
      },
    }));
    get().saveData();
  },

  deleteSite: (id: string) => {
    set((state) => {
      const { [id]: _, ...rest } = state.sites;
      return { sites: rest };
    });
    get().saveData();
  },

  // Assignment actions
  addAssignment: (assignment: Assignment) => {
    set((state) => ({
      assignments: { ...state.assignments, [assignment.id]: assignment },
    }));
    get().saveData();
  },

  updateAssignment: (id: string, updates: Partial<Assignment>) => {
    set((state) => ({
      assignments: {
        ...state.assignments,
        [id]: {
          ...state.assignments[id],
          ...updates,
          updatedAt: new Date(),
        },
      },
    }));
    get().saveData();
  },

  deleteAssignment: (id: string) => {
    set((state) => {
      const { [id]: _, ...rest } = state.assignments;
      return { assignments: rest };
    });
    get().saveData();
  },

  signUpForAssignment: (assignmentId: string, volunteerId: string) => {
    set((state) => {
      const assignment = state.assignments[assignmentId];
      if (!assignment) return state;
      
      const assignedVolunteerIds = [...assignment.assignedVolunteerIds];
      if (!assignedVolunteerIds.includes(volunteerId) && 
          assignedVolunteerIds.length < assignment.maxVolunteers) {
        assignedVolunteerIds.push(volunteerId);
      }
      
      return {
        assignments: {
          ...state.assignments,
          [assignmentId]: {
            ...assignment,
            assignedVolunteerIds,
            updatedAt: new Date(),
          },
        },
      };
    });
    get().saveData();
  },

  cancelAssignmentSignup: (assignmentId: string, volunteerId: string) => {
    set((state) => {
      const assignment = state.assignments[assignmentId];
      if (!assignment) return state;
      
      return {
        assignments: {
          ...state.assignments,
          [assignmentId]: {
            ...assignment,
            assignedVolunteerIds: assignment.assignedVolunteerIds.filter(
              (id) => id !== volunteerId
            ),
            updatedAt: new Date(),
          },
        },
      };
    });
    get().saveData();
  },

  // Activity log actions
  addActivityLog: (log: ActivityLog) => {
    set((state) => ({
      activityLogs: { ...state.activityLogs, [log.id]: log },
    }));
    
    // Update volunteer total hours
    const volunteer = get().volunteers[log.volunteerId];
    if (volunteer) {
      get().updateVolunteer(log.volunteerId, {
        totalHours: volunteer.totalHours + log.hoursWorked,
      });
    }
    
    get().saveData();
  },

  updateActivityLog: (id: string, updates: Partial<ActivityLog>) => {
    set((state) => ({
      activityLogs: {
        ...state.activityLogs,
        [id]: {
          ...state.activityLogs[id],
          ...updates,
          updatedAt: new Date(),
        },
      },
    }));
    get().saveData();
  },

  deleteActivityLog: (id: string) => {
    const log = get().activityLogs[id];
    if (log) {
      // Update volunteer total hours
      const volunteer = get().volunteers[log.volunteerId];
      if (volunteer) {
        get().updateVolunteer(log.volunteerId, {
          totalHours: Math.max(0, volunteer.totalHours - log.hoursWorked),
        });
      }
    }
    
    set((state) => {
      const { [id]: _, ...rest } = state.activityLogs;
      return { activityLogs: rest };
    });
    get().saveData();
  },

  verifyActivityLog: (id: string, verifierId: string) => {
    set((state) => ({
      activityLogs: {
        ...state.activityLogs,
        [id]: {
          ...state.activityLogs[id],
          verifiedBy: verifierId,
          verifiedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }));
    get().saveData();
  },

  // Utility actions
  loadData: () => {
    const data = storage.get();
    set(data);
  },

  saveData: () => {
    const state = get();
    storage.set({
      version: state.version,
      volunteers: state.volunteers,
      sites: state.sites,
      assignments: state.assignments,
      activityLogs: state.activityLogs,
      currentUser: state.currentUser,
    });
  },

  clearData: () => {
    storage.clear();
    set({
      version: '1.0.0',
      volunteers: {},
      sites: {},
      assignments: {},
      activityLogs: {},
      currentUser: null,
    });
  },

  exportData: () => {
    return storage.export();
  },

  importData: (jsonString: string) => {
    storage.import(jsonString);
    get().loadData();
  },
}));

// Made with Bob
