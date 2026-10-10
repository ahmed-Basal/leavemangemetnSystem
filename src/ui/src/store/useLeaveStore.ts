import { create } from 'zustand';
import type {
  ICreateLeaveRequest,
  IModalState,
  INotification,
  IFilterState,
  ModalMode,
  NotificationType,
} from '../types';

/**
 * Initial state for leave application form.
 */
const initialFormData: ICreateLeaveRequest = {
  requestingEmployeeId: 'EMP-104',
  leaveTypeId: 1,
  startDate: '',
  endDate: '',
  requestComments: '',
};

/**
 * Initial filtering parameters.
 */
const initialFilters: IFilterState = {
  searchQuery: '',
  statusFilter: 'all',
  leaveTypeFilter: undefined,
};

/**
 * Complete Leave Store State & Actions contract.
 */
export interface ILeaveStoreState {
  // Modal Slice
  modal: IModalState;
  showModal: boolean; // Convenience alias

  // Notification Slice
  notification: string | null; // Text alias for Toast
  notificationDetails: INotification | null;

  // Form Slice
  formData: ICreateLeaveRequest;

  // Filter Slice
  filters: IFilterState;

  // Actions - Modal
  openModal: (mode?: ModalMode, selectedId?: number) => void;
  closeModal: () => void;
  setShowModal: (show: boolean) => void;

  // Actions - Notification
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
  clearNotification: () => void;
  setNotification: (msg: string | null) => void;

  // Actions - Form
  updateFormField: <K extends keyof ICreateLeaveRequest>(
    key: K,
    value: ICreateLeaveRequest[K]
  ) => void;
  setFormData: (data: Partial<ICreateLeaveRequest>) => void;
  resetFormData: () => void;

  // Actions - Filters
  setSearchFilter: (query: string) => void;
  setStatusFilter: (status: IFilterState['statusFilter']) => void;
  setLeaveTypeFilter: (typeId?: number) => void;
  resetFilters: () => void;
}

export const useLeaveStore = create<ILeaveStoreState>((set) => ({
  // State
  modal: {
    isOpen: false,
    mode: 'create',
    selectedId: undefined,
  },
  showModal: false,

  notification: null,
  notificationDetails: null,

  formData: { ...initialFormData },
  filters: { ...initialFilters },

  // Modal Actions
  openModal: (mode = 'create', selectedId) =>
    set({
      modal: { isOpen: true, mode, selectedId },
      showModal: true,
    }),

  closeModal: () =>
    set({
      modal: { isOpen: false, mode: 'create', selectedId: undefined },
      showModal: false,
    }),

  setShowModal: (show: boolean) =>
    set((state) => ({
      showModal: show,
      modal: {
        ...state.modal,
        isOpen: show,
      },
    })),

  // Notification Actions
  showNotification: (message, type = 'success', duration = 4000) => {
    set({
      notification: message,
      notificationDetails: { message, type, duration },
    });

    if (duration > 0) {
      setTimeout(() => {
        set({ notification: null, notificationDetails: null });
      }, duration);
    }
  },

  clearNotification: () =>
    set({
      notification: null,
      notificationDetails: null,
    }),

  setNotification: (msg: string | null) =>
    set({
      notification: msg,
      notificationDetails: msg ? { message: msg, type: 'success' } : null,
    }),

  // Form Actions
  updateFormField: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),

  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  resetFormData: () => set({ formData: { ...initialFormData } }),

  // Filter Actions
  setSearchFilter: (query) =>
    set((state) => ({
      filters: {
        ...state.filters,
        searchQuery: query,
      },
    })),

  setStatusFilter: (status) =>
    set((state) => ({
      filters: {
        ...state.filters,
        statusFilter: status,
      },
    })),

  setLeaveTypeFilter: (typeId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        leaveTypeFilter: typeId,
      },
    })),

  resetFilters: () => set({ filters: { ...initialFilters } }),
}));
