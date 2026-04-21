import { create } from 'zustand';

// Expanded roles to include specific admins and B2C users
export type Role = 'Director' | 'Principal' | 'Educational Institute Admin' | 'Teacher' | 'Parent' | 'Student' | 'Independent Learner';
export type NavContext = 'main' | 'explore';
interface PrototypeState {
  currentRole: Role;
  setRole: (role: Role) => void;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  isShortsOpen: boolean;
  setShortsOpen: (open: boolean) => void;
   // NEW: Notifications State
  isNotificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
   isLessonPlayerOpen: boolean;
  setLessonPlayerOpen: (open: boolean) => void;
    navContext: NavContext;
  setNavContext: (context: NavContext) => void;
}

export const usePrototypeStore = create<PrototypeState>((set) => ({
  currentRole: 'Director', // Default demo role
  setRole: (role) => set({ currentRole: role }),
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
   isShortsOpen: false,
  setShortsOpen: (open) => set({ isShortsOpen: open }),
   isNotificationsOpen: false,
  setNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
   isLessonPlayerOpen: false,
  setLessonPlayerOpen: (open) => set({ isLessonPlayerOpen: open }),
    navContext: 'main',
  setNavContext: (context) => set({ navContext: context }),
}));