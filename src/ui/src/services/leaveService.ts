import { apiClient } from './apiClient';
import { API_CONFIG } from '../config/api.config';
import type { LeaveRequest } from '../types/leave';

export const leaveService = {
  async getAll(): Promise<LeaveRequest[]> {
    const response = await apiClient.get<LeaveRequest[]>(API_CONFIG.endpoints.leaveRequests);
    return response.data;
  },

  async getById(id: number): Promise<LeaveRequest> {
    const response = await apiClient.get<LeaveRequest>(`${API_CONFIG.endpoints.leaveRequests}/${id}`);
    return response.data;
  },

  async create(request: Omit<LeaveRequest, 'id'>): Promise<LeaveRequest> {
    const response = await apiClient.post<LeaveRequest>(API_CONFIG.endpoints.leaveRequests, request);
    return response.data;
  },

  async updateStatus(id: number, approved: boolean | null, cancelled: boolean): Promise<void> {
    await apiClient.put(`${API_CONFIG.endpoints.leaveRequests}/${id}/status`, { approved, cancelled });
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`${API_CONFIG.endpoints.leaveRequests}/${id}`);
  },
};
