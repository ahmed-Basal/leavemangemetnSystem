/**
 * Notification / Toast alert interface.
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface INotification {
  id?: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

/**
 * Modal state interface.
 */
export type ModalMode = 'create' | 'edit' | 'view';

export interface IModalState {
  isOpen: boolean;
  mode: ModalMode;
  selectedId?: number;
}

/**
 * Dashboard search and filtering interface.
 */
export interface IFilterState {
  searchQuery: string;
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  leaveTypeFilter?: number;
}
