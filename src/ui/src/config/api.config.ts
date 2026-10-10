export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  endpoints: {
    leaveRequests: '/LeaveRequests',
    leaveTypes: '/LeaveTypes',
  },
} as const;
