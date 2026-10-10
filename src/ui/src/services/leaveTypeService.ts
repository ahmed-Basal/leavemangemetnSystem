import { apiClient } from './apiClient';
import { API_CONFIG } from '../config/api.config';
import type { LeaveType } from '../types/leave';

export const leaveTypeService = {
  async getAll(): Promise<LeaveType[]> {
    const response = await apiClient.get<LeaveType[]>(API_CONFIG.endpoints.leaveTypes);
    return response.data;
  },

  async getById(id: number): Promise<LeaveType> {
    const response = await apiClient.get<LeaveType>(`${API_CONFIG.endpoints.leaveTypes}/${id}`);
    return response.data;
  },
};
