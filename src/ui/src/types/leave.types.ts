/**
 * Enum representation of Leave Request approval status.
 */
export const LeaveStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
  Cancelled: 3,
} as const;

export type LeaveStatus = typeof LeaveStatus[keyof typeof LeaveStatus];

/**
 * Domain Leave Type interface representing company leave policies.
 */
export interface ILeaveType {
  id: number;
  name: string;
  defaultDays: number;
  description?: string;
  dateCreated?: string;
}

/**
 * Payload interface for creating or updating a Leave Type.
 */
export interface ICreateLeaveType {
  name: string;
  defaultDays: number;
  description?: string;
}

/**
 * Primary Leave Request interface representing an employee leave application.
 */
export interface ILeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  leaveTypeId: number;
  leaveType?: ILeaveType;
  dateRequested?: string;
  requestComments?: string;
  approved?: boolean | null;
  cancelled: boolean;
  requestingEmployeeId: string;
}

/**
 * Creation payload for submitting a new Leave Request.
 */
export interface ICreateLeaveRequest {
  requestingEmployeeId: string;
  leaveTypeId: number;
  startDate: string;
  endDate: string;
  requestComments?: string;
}

/**
 * Status update payload for review or cancellation.
 */
export interface IUpdateLeaveRequestStatus {
  approved?: boolean | null;
  cancelled: boolean;
}

/**
 * Leave Allocation interface representing allocated days for an employee.
 */
export interface ILeaveAllocation {
  id: number;
  numberOfDays: number;
  employeeId: string;
  period: number;
  leaveTypeId: number;
  leaveType?: ILeaveType;
}

/**
 * Computed leave balance metrics interface.
 */
export interface ILeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

// Aliases for seamless backward compatibility
export type LeaveRequest = ILeaveRequest;
export type LeaveType = ILeaveType;
export type LeaveBalance = ILeaveBalance;
export type CreateLeaveRequest = ICreateLeaveRequest;
