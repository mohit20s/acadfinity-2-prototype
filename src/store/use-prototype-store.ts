import { create } from 'zustand';

// Expanded roles to include specific admins and B2C users
export type Role = 'Director' | 'Principal' | 'School Admin' | 'Teacher' | 'Parent' | 'Student' | 'Independent Learner';

interface PrototypeState {
  currentRole: Role;
  setRole: (role: Role) => void;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  isShortsOpen: boolean;
  setShortsOpen: (open: boolean) => void;
}

export const usePrototypeStore = create<PrototypeState>((set) => ({
  currentRole: 'Director', // Default demo role
  setRole: (role) => set({ currentRole: role }),
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
   isShortsOpen: false,
  setShortsOpen: (open) => set({ isShortsOpen: open }),
}));