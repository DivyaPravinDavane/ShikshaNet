import { create } from "zustand";

export type Role = "secretary" | "minister" | "commissioner" | "field" | "principal";
export type LayoutVariant = "1" | "2" | "3";
export type Density = "normal" | "compact";

interface FilterState {
  programme: string;
  district: string;
  dateRange: string;
  setProgramme: (programme: string) => void;
  setDistrict: (district: string) => void;
  setDateRange: (range: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  programme: "All Education Programmes",
  district: "All Districts",
  dateRange: "01 Apr 2026 - 31 Mar 2027",
  setProgramme: (programme) => set({ programme }),
  setDistrict: (district) => set({ district }),
  setDateRange: (dateRange) => set({ dateRange }),
  resetFilters: () =>
    set({
      programme: "All Education Programmes",
      district: "All Districts",
      dateRange: "01 Apr 2026 - 31 Mar 2027",
    }),
}));

interface AppState {
  role: Role;
  variant: LayoutVariant;
  density: Density;
  chatOpen: boolean;
  activeChatQuestion: string | null;
  unreadNotifications: number;
  selectedDecisionId: number | null;
  completedDecisions: number[];
  language: "EN" | "HI";
  
  setRole: (role: Role) => void;
  setVariant: (variant: LayoutVariant) => void;
  setDensity: (density: Density) => void;
  setChatOpen: (open: boolean) => void;
  openChatWithQuestion: (question: string) => void;
  clearNotifications: () => void;
  setSelectedDecisionId: (id: number | null) => void;
  markDecisionDone: (id: number) => void;
  toggleLanguage: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: "secretary",
  variant: "1",
  density: "normal",
  chatOpen: false,
  activeChatQuestion: null,
  unreadNotifications: 12,
  selectedDecisionId: null,
  completedDecisions: [],
  language: "EN",

  setRole: (role) => set({ role }),
  setVariant: (variant) => set({ variant }),
  setDensity: (density) => set({ density }),
  setChatOpen: (chatOpen) => set({ chatOpen }),
  openChatWithQuestion: (question) => set({ chatOpen: true, activeChatQuestion: question }),
  clearNotifications: () => set({ unreadNotifications: 0 }),
  setSelectedDecisionId: (id) => set({ selectedDecisionId: id }),
  markDecisionDone: (id) =>
    set((state) => ({
      completedDecisions: [...state.completedDecisions, id],
      selectedDecisionId: null,
    })),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "EN" ? "HI" : "EN" })),
}));
